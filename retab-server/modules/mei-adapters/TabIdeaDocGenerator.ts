import { MeiAttribute } from "../interfaces";
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
export type TMeiJsonElemInput = {
    attributes: MeiAttribute[]
    tagTitle: string;
    children: TMeiJsonElemInput[];
    textContent?: string;
    selfClosing?: boolean
}


export default class TabIdeaDocGenerator extends MeiDocGenerator {

    static jsonElemToSection(jsonElem: TMeiJsonElemInput) {
        const childrenToMeiTags = jsonElem.children?.map(ch => this.meiTagInstanceFromJsonElem(ch)) || [];
        const section = new MeiTag({tagTitle: 'section'});
        section.setAttribute(new MeiAttribute('n', '1'))
        section.addChildren(...childrenToMeiTags);
        section.setChildrenAsSelfClosing('note')
        return section;
    }

    static meiTagInstanceFromJsonElem(jsonElem: TMeiJsonElemInput): MeiTag {
        let tag: MeiTag
        switch (jsonElem.tagTitle) {
            case 'measure':
                tag = new Measure(Number(jsonElem.attributes?.find(a => a.title == 'n')?.value || 1))
                break;
            case 'staff':
                tag = new Staff(Number(jsonElem.attributes?.find(a => a.title == 'n')?.value || 1))
                break;
            case 'tabGrp':
                tag = new TabGrp()
                break;
            case 'note':
                tag = new TabNote(jsonElem)
                break;
            case 'score':
                tag = new Section();

                break;
            case 'layer':
                tag = new Layer();
                break;
            case 'tabDurSym':
                tag = new TabDurSym();
                break;
            default:
                tag = new MeiTagInstance({ tagTitle: jsonElem.tagTitle, attributes: jsonElem.attributes, })//  Number(jsonElem.attributes?.find(a => a.title == 'n')?.value || 1))
                break;
        }

        jsonElem.attributes?.forEach(t => tag.pushAttribute(t))
        jsonElem.children?.forEach(ch => tag.pushChildren(this.meiTagInstanceFromJsonElem(ch)))
        return tag;
    }

    
    // setDoc(section: Section, head?: MeiTag) 
    setDoc(retabDoc: RetabDoc) {

 
        
        this.xml = retabDoc.mainChild?.getXML() || ''
        const pretty = MeiDocGenerator.prettifyXmlFile(this.xml )
        return pretty;

    }
}