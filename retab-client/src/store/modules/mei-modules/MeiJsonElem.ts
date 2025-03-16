import MeiAttribute from "./MeiAttribute";


type TMeiJsonElemInput = {
    attributes: MeiAttribute[]
    tagTitle: string;
    children: MeiJSsonElem[];
    textContent?: string,
    selfClosing?: boolean
}

export default class MeiJSsonElem {
    attributes: MeiAttribute[] = []
    tagTitle: string;
    textContent?: string
    selfClosing?: boolean
    children: MeiJSsonElem[] = [];
    constructor(data: TMeiJsonElemInput) {
        this.tagTitle = data.tagTitle;

        this.children = data.children;
        this.attributes = data.attributes
        this.textContent = data.textContent
        this.selfClosing = data.selfClosing
    }
    pushChildren(...children: MeiJSsonElem[]) {
        this.children.push(...children)
    }
}