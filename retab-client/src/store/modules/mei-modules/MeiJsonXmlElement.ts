import MeiAttribute from "./MeiAttribute";


type TMeiJsonXmlElementInput = {
    attributes: MeiAttribute[]
    tagTitle: string;
    children: MeiJsonElem[];
    textContent?: string,
    selfClosing?: boolean,
    indexAmongSiblings?: number
    id?: number
}

export default class MeiJsonElem {
    attributes: MeiAttribute[] = []
    tagTitle: string;
    textContent?: string
    selfClosing?: boolean
    children: MeiJsonElem[] = [];
    indexAmongSiblings?: number
    id?: number

    constructor(data: TMeiJsonXmlElementInput) {
        this.tagTitle = data.tagTitle;
        this.id = data.id
        this.indexAmongSiblings= data.indexAmongSiblings
        this.children = data.children;
        this.attributes = data.attributes
        this.textContent = data.textContent
        this.selfClosing = data.selfClosing
    }
    pushChildren(...children: MeiJsonElem[]) {
        this.children.push(...children)
    }
}