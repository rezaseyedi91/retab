import { MeiAttribute } from "../mei-tags/interfaces";
import { MeiTag, MeiTagInstance } from "../mei-tags";
import Layer from "../mei-tags/Layer";
import Measure from "../mei-tags/Measure";
import Section from "../mei-tags/Section";
import Staff from "../mei-tags/Staff";
import TabGrp, { TabDurSym } from "../mei-tags/TabGrp";
import TabNote from "../mei-tags/TabNote";
import { MeiDocGenerator } from "./MeiDocGenerator";
import { TTabCourseTuningInfo } from "../db-types";
import RetabDoc from "../retab-modules/RetabDoc";
export type TMeiJsonXmlElementInput = {
    attributes: MeiAttribute[]
    tagTitle: string;
    children: TMeiJsonXmlElementInput[];
    textContent?: string;
    selfClosing?: boolean
    xmlId?: string;
    id?: number
}


export default class TabIdeaDocGenerator extends MeiDocGenerator {
    static XML_DECLARATION = '<?xml-model href="https://music-encoding.org/schema/5.1/mei-all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>\n'
    static jsonXmlElementToSection(jsonXmlElement: TMeiJsonXmlElementInput) {
        const childrenToMeiTags = jsonXmlElement.children?.map(ch => this.meiTagInstanceFromJsonXmlElement(ch)) || [];
        const section = new MeiTag({tagTitle: 'section'});
        section.id = jsonXmlElement.id
        section.setAttribute(new MeiAttribute('n', '1'))
        section.addChildren(...childrenToMeiTags);
        section.setChildrenAsSelfClosing('note')
        return section;
    }

    static meiTagInstanceFromJsonXmlElement(jsonXmlElement: TMeiJsonXmlElementInput): MeiTag {
        let tag: MeiTag;
        jsonXmlElement.xmlId = jsonXmlElement.xmlId || jsonXmlElement.attributes.find(at => at.title == 'xml:id')?.value || undefined
        
        switch (jsonXmlElement.tagTitle) {
            case 'measure':
                tag = new Measure(jsonXmlElement)
                break;
            case 'staff':
                tag = new Staff(Number(jsonXmlElement.attributes?.find(a => a.title == 'n')?.value || 1))
                break;
            case 'tabGrp':
                tag = new TabGrp(jsonXmlElement)
                break;
            case 'note':
                tag = new TabNote(jsonXmlElement)
                break;
            case 'score':
                tag = new Section(jsonXmlElement);

                break;
            case 'layer':
                tag = new Layer(jsonXmlElement);
                break;
            case 'tabDurSym':
                tag = new TabDurSym(jsonXmlElement);
                break;
            default:
                tag = new MeiTagInstance({ tagTitle: jsonXmlElement.tagTitle, attributes: jsonXmlElement.attributes, })//  Number(jsonXmlElement.attributes?.find(a => a.title == 'n')?.value || 1))
                break;
        }
        if ((tag)?.tagTitle == 'measure') console.log(tag.xmlId);
        tag.id = jsonXmlElement.id
        jsonXmlElement.attributes?.forEach(t => tag.pushAttribute(t))
        jsonXmlElement.children?.forEach(ch => tag.pushChildren(this.meiTagInstanceFromJsonXmlElement(ch)))
        return tag;
    }

    
    // setDoc(section: Section, head?: MeiTag) 
    setDoc(retabDoc: RetabDoc) {

 
        
        this.xml =  retabDoc.mainChild?.getXML() || ''
        const pretty = MeiDocGenerator.prettifyXmlFile(this.xml )
        return TabIdeaDocGenerator.XML_DECLARATION +  pretty;

    }
}