import MeiJsonElem from "./MeiJsonXmlElement";
import MeiTag from "./MeiTag";

export default class MeiText extends MeiTag {
    tagTitle = '';
    constructor(public textContent: string,public indexAmongSiblings: number) {
        super()
    }
    updateChildren(options?: { keepEmptyNotes?: boolean; }): MeiTag {
        return this;
    }
    toJsonXmlElement(options?: { keepEmptyNotes: boolean; }): MeiJsonElem {
        return new MeiJsonElem({
            attributes: [], children: [], tagTitle: '', textContent: this.textContent, indexAmongSiblings: this.indexAmongSiblings,
            
        })
    }
}