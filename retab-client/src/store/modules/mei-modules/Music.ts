import MeiAttribute from "./MeiAttribute";
import MeiJsonElem from "./MeiJsonXmlElement";
import MeiTag, { MeiTagInstance } from "./MeiTag";

export default class Music extends MeiTag {
    tagTitle = 'music';
    updateChildren(options?: { keepEmptyNotes?: boolean; }): MeiTag {
        return this;
    }

    private constructor(meiTagInstace: MeiTagInstance) {
          super();
          this.id = meiTagInstace.id
          this.tagTitle = meiTagInstace.tagTitle
          this.textContent = meiTagInstace.textContent
          this.selfClosing = meiTagInstace.selfClosing
          meiTagInstace.attributes?.forEach(att => this.setAttribute(new MeiAttribute(att.title, att.value)))
          this.children = meiTagInstace.children?.map(ch => ch instanceof MeiTag ? ch : new MeiTagInstance(ch)) || []
    }
    /**@override */
    toJsonXmlElement(options = { keepEmptyNotes: false }): MeiJsonElem {
        this.updateChildren(options);
        this.setAttributes();
        console.log(this.children);
        
        return new MeiJsonElem({
            indexAmongSiblings: this.indexAmongSiblings,
            tagTitle: this.tagTitle,
            attributes: this.attributes,
            children: this.children.filter(ch => ch.tagTitle != 'body').map(ch => ch.toJsonXmlElement(options)),
            textContent: this.textContent,
            selfClosing: this.selfClosing,
            id: this.id,
            xmlId: this.xmlId || this.getAttribute('xml:id')?.value
        })
    }
    static instanceFromXmlElement(el: Element, indexAmongSiblings?: number): Music {
        return new Music(super.instanceFromXmlElement(el, indexAmongSiblings))
    }
}