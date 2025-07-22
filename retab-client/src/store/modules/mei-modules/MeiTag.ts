import { generateId } from "../utils";
import MeiAttribute from "./MeiAttribute";
import MeiJsonElem from "./MeiJsonXmlElement";


export type TMeiTagFactoryArgs = {
    tagTitle: MeiTag["tagTitle"],
    attributes?: { title: MeiAttribute["title"], value: MeiAttribute["value"] }[],
    children?: TMeiTagFactoryArgs[],
    selfClosing?: boolean
    textContent?: string
    id?: number
}
export default abstract class MeiTag {
    xmlId?: string;
    indexAmongSiblings?: number
    id?: number;

    static instanceFromXmlElement(el: Element, indexAmongSiblings = 0): MeiTag {
        const instance = MeiTag.makeTagsTree({
            tagTitle: el.tagName,
            attributes: Array.from(el.attributes).map(at => ({ title: at.name, value: at.value })),
            children: Array.from(el.children).map((ch, index) => MeiTag.instanceFromXmlElement(ch, index)),
            selfClosing: el.children.length == 0 && !el.textContent,
            textContent: el.children.length == 0 ?  el.textContent?.trim() : undefined,
        })
        
        instance.indexAmongSiblings = indexAmongSiblings;
        instance.xmlId = el.getAttribute('xml:id')|| undefined

        return instance;

    }

    toJsonXmlElement(): MeiJsonElem {
        this.updateChildren();
        this.setAttributes();

        return new MeiJsonElem({
            indexAmongSiblings: this.indexAmongSiblings,
            tagTitle: this.tagTitle,
            attributes: this.attributes,
            children: this.children.map(ch => ch.toJsonXmlElement()),
            textContent: this.textContent,
            selfClosing: this.selfClosing,
            id: this.id
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

    removeAttribute(key: string) {
        const found = this.attributes.find(at => at.title == key)
        if (found) this.attributes.splice(this.attributes.indexOf(found), 1)

    }
    static makeTagsTree(args: TMeiTagFactoryArgs) {
        const newTag = new MeiTagInstance(args);
        newTag.selfClosing = args.selfClosing || false
        return newTag
    }
    addChildIfNotExists(child: MeiTag, index?: number): MeiTag {
        const found = this.children.find(ch => ch.tagTitle == child.tagTitle)
        return found ? found instanceof MeiTag ? found : new MeiTagInstance(found) : this.addChildIfNotExists(child, index)
    }
    hasTheSameAttributeAndValue({ title, value }: { title: string, value: string | undefined }) {
        if (value == undefined) return !!this.attributes.find(a => a.title == title)
        return !!this.attributes.find(a => a.title == title && a.value == value)
    }
    getChildrenByTagName(tagname: string) { return this.children.filter(ch => ch.tagTitle == tagname); }
    getAttribute(title: string) {
        return this.attributes.find(att => att.title == title)
    }
    getChildByTagName(tagname: string) {

        const testAtts = /(((?!\[).)*)\[((((?!=).)*)=(((?!\]).)*))\]/.exec(tagname);
        const attTofind = { title: <string>'', value: <string | undefined>'' }

        if (testAtts) {
            tagname = testAtts[1]
            attTofind.title = testAtts[4]
            attTofind.value = testAtts[6]
        } else {
            const testJustAttTitle = /(((?!\[).)*)\[((((?!\]).)*)\])/.exec(tagname)
            if (testJustAttTitle) {
                tagname = testJustAttTitle[1]
                attTofind.title = testJustAttTitle[4]
                attTofind.value = undefined
            }

        }

        return this.children.find(ch => (ch.tagTitle == tagname && (!attTofind.title || attTofind.title && ch.hasTheSameAttributeAndValue(attTofind))))
    }
    /**getChildByTagName */
    __(tagname: string) {
        return this.getChildByTagName(tagname)!
    }
    /**getChildByTagName and Add If note exists */
    __add(tagname: string) {
        return this.getChildByTagName(tagname)! || this.addChildIfNotExists(new MeiTagInstance({
            tagTitle: tagname
        }))
    }


    setTextContent(str?: string) {
        this.textContent = str
    }
    pushChild(args: TMeiTagFactoryArgs) { this.children.push(MeiTag.makeTagsTree(args)) }
    removeChildByIndex(idx: number) { this.children.splice(idx, 1) }


    removeEmptyChildren() {
        const indexesToRemove: number[] = []
        this.children.forEach((ch, index) => {

            const doesntHaveChildren = ch.children.length == 0
            const doesntHaveTextContent = ch.textContent == ''
            const doestHaveAttributes = ch.attributes.filter(at => at.value).length == this.attributes.length;
            const inNotSelfClosing = !(ch.selfClosing == true)
            if (doesntHaveChildren && doesntHaveTextContent && doestHaveAttributes && inNotSelfClosing) indexesToRemove.push(index)
            else ch.removeEmptyChildren()


        })
        this.children = this.children.filter((ch, index) => !indexesToRemove.includes(index));
    }
}

export class MeiTagInstance extends MeiTag {
    tagTitle: string;
    constructor(args: TMeiTagFactoryArgs) {
        super();
        this.id = args.id
        this.tagTitle = args.tagTitle
        this.textContent = args.textContent
        this.selfClosing = args.selfClosing
        args.attributes?.forEach(att => this.setAttribute(new MeiAttribute(att.title, att.value)))
        this.children = args.children?.map(ch => ch instanceof MeiTag ? ch : new MeiTagInstance(ch)) || []
    }
    setAttributes(): void { return; }
    updateChildren(): MeiTag {
        return this;
    }





}