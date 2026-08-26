import { MeiTag, TMeiTagConstructorOptions } from ".";
import { debug } from "../../utils";
import { TMeiJsonXmlElementInput } from "../mei-adapters/TabIdeaDocGenerator";
import { IMeiAttribute, IMeiTag } from "./interfaces";
import Layer from "./Layer";

export default class Staff extends MeiTag {
    n: number;
    constructor(n: number | TMeiJsonXmlElementInput, options?: TMeiTagConstructorOptions) {
        super(typeof n == 'number' ? undefined : n, options);
        if (typeof n == 'number') this.n = n
        else {
            this.n = Number(n.attributes.find(at => at.title == 'n')?.value || 1)
        }
    }
    tagTitle = 'staff';
    attributes: IMeiAttribute[] = [];


    addLayer() {
        this.children.push(new Layer(this.children.filter(ch => ch instanceof Layer).length + 1));
        return this
    }



}