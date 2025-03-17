import MeiAttribute from "./MeiAttribute";
import MeiJSsonElem from "./MeiJsonXmlElement";


export type TMeiTagFactoryArgs = {
    tagTitle: MeiTag["tagTitle"],
    attributes?: {title: MeiAttribute["title"], value: MeiAttribute["value"]}[],
    children?: TMeiTagFactoryArgs[],
    selfClosing?: boolean
    textContent?: string
}
export default abstract class MeiTag {
    xmlId?: string;
    toJsonXmlElement(): MeiJSsonElem {
        this.updateChildren();
        this.setAttributes();
        return new MeiJSsonElem({
            tagTitle: this.tagTitle,
            attributes: this.attributes,
            children: this.children.map(ch => ch.toJsonXmlElement()),
            textContent: this.textContent,
            selfClosing: this.selfClosing
        })
    }
    selfClosing?: boolean
    children: MeiTag[] = []
    abstract tagTitle: string
    attributes: MeiAttribute[] = [];
    abstract setAttributes(): void;
    abstract updateChildren(): MeiTag;
    textContent?: string;
    setAttribute(att: MeiAttribute) {
        const alreadySameTitleAtt = this.attributes.find(a => a.title == att.title)
        if (alreadySameTitleAtt) alreadySameTitleAtt.value = att.value;
        else this.attributes.push(att)

    }
    
    removeAttribute(key :string) {
        const found = this.attributes.find(at => at.title == key)
        if (found) this.attributes.splice(this.attributes.indexOf(found), 1)

    }
    static makeTagsTree(args: TMeiTagFactoryArgs) {
        const newTag = new MeiTagInstance(args);
        newTag.selfClosing = args.selfClosing || false
        return newTag
    }
    hasTheSameAttributeAndValue({title, value}: {title: string, value: string}) {
        return !!this.attributes.find(a => a.title == title && a.value == value)
    }
    getChildrenByTagName(tagname: string) { return this.children.filter(ch => ch.tagTitle == tagname); }
    getAttribute(title: string) {
        return this.attributes.find(att => att.title == title)
    }
    getChildByTagName(tagname: string) {

        const testAtts = /(((?!\[).)*)\[((((?!=).)*)=(((?!\]).)*))\]/.exec(tagname);
        const attTofind = {title: '', value: ''}
        if (testAtts) {
            tagname = testAtts[1]
            attTofind.title = testAtts[4]
            attTofind.value = testAtts[6]
        }
        
        return this.children.find(ch => (ch.tagTitle == tagname && (!attTofind.title || attTofind.title && ch.hasTheSameAttributeAndValue(attTofind))))
    }
    /**getChildByTagName */
    __(tagname: string) {
        return this.getChildByTagName(tagname)!
    }


    setTextContent(str?: string) {
        this.textContent = str
    }
    pushChild(args: TMeiTagFactoryArgs) {this.children.push(MeiTag.makeTagsTree(args))}
    removeChildByIndex(idx: number) { this.children.splice(idx, 1) }
}

export class MeiTagInstance extends MeiTag {
    tagTitle: string;
    constructor(args: TMeiTagFactoryArgs) {
        super();
        this.tagTitle = args.tagTitle
        this.textContent = args.textContent
        this.selfClosing = args.selfClosing
        args.attributes?.forEach(att => this.setAttribute(new MeiAttribute(att.title, att.value)))
        this.children = args.children?.map(ch => ch instanceof MeiTag  ? ch:  new MeiTagInstance(ch)) || []
    }
    setAttributes(): void {return;}
    updateChildren(): MeiTag {
        return this;
    }

}