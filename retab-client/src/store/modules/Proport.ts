import MeiAttribute from "./mei-modules/MeiAttribute";
import MeiTag from "./mei-modules/MeiTag";

export default class Proport extends MeiTag {
    tagTitle =  'proport';
    num: number
    numbase: number;
    selfClosing = true
    constructor(  num: number, numbase: number,) {
        super()
        this.num = num; this.numbase = numbase
    }
    setAttributes(): void {
        this.attributes.push(
            new MeiAttribute('num', this.num),
            new MeiAttribute('numbase', this.numbase),
        )
    }
    updateChildren(): MeiTag {
       return this;
    }

}