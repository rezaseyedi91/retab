import { MeiTag } from ".";
import { debug } from "../../utils";
import DB from "../DB";
import { TMeiTag, TStaffInfo, TTabCourseTuningInfo } from "../db-types";
import RetabDoc from "../retab-modules/RetabDoc";
import { MeiAttribute } from "./interfaces";
import TabNote, { AccidedNotePname } from "./TabNote";

export default class Course extends MeiTag implements TTabCourseTuningInfo {
    n = 0;
    pname = 'NO_PNAME_COURSE';
    oct = 0;
    staves?: TStaffInfo[] | undefined;
    selfClosing = true
    constructor(payload?: TMeiTag) {
        super(payload);
        for (const at of payload?.attributes || []) {
            if (at.title == 'pname') { this.pname = at.value!; }
            else if (at.title == 'accid') { this.pname += at.value || '' }
            else if (at.title == 'n') this.setN(at.value || 0)
            else if (at.title == 'oct') this.setOct(at.value || 0)
        }
    }

    setN(n: string|number) {
        this.n = Number(n)
        this.setAttribute(new MeiAttribute('n', n + ''))
    }
    getN() {return Number(this.n)}
    setOct(oct: string|number) {
        this.setAttribute(new MeiAttribute('oct', oct + ''))
        this.oct = Number(oct)
    }
    getOct() {return Number(this.oct)}

    async save(doc: RetabDoc) {
        await super.save(doc)
    }
    
    correctXmlId(tunings: TTabCourseTuningInfo[]) {
        const found = tunings.find(t => t.n == this.n && t.oct == this.oct && t.pname == this.pname);

        if (found?.relatedXmlId) this.xmlId = found.relatedXmlId        
    }

    logData() {
        
        return {
            n: this.getAttribute('n')?.value,
            pname: this.getAttribute('pname')?.value,
            oct: this.getAttribute('oct')?.value,
            xmlId: this.xmlId
        } 
    }
}