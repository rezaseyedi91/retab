import { useStore } from "vuex";
import store from "..";
import Measure from "./Measure"
import MeiAttribute from "./mei-modules/MeiAttribute";
import MeiJSsonElem from "./mei-modules/MeiJsonXmlElement";
import MeiTag, { TMeiTagFactoryArgs } from "./mei-modules/MeiTag";
import RezTabFile from "./RezTabFile";
import TabGroup from "./TabGroup";
import { TabCourseTuningInfo, TCourseInfo } from "./types";
import Note from "./Note";
import { generateId } from "./utils";

export default class Staff extends MeiTag {
    tagTitle = 'staff';
    static DEFAULT_TUNING: TabCourseTuningInfo[] = [
        {n: 1 , pname: "g" , oct: 4}, 
        {n: 2 , pname: "d" , oct: 4},
        {n: 3 , pname: "a" , oct: 3},
        {n: 4 , pname: "f" , oct: 3},
        {n: 5 , pname: "c" , oct: 3},
        {n: 6 , pname: "g" , oct: 2},
        {n: 7 , pname: "f" , oct: 2},
        {n: 8 , pname: "eb" , oct: 2},
        {n: 9 , pname: "d" , oct: 2},
        {n: 10 , pname: "c" , oct: 2},
        {n: 11 , pname: "bb" , oct: 1},
        {n: 12 , pname: "a" , oct: 1},
        {n: 13 , pname: "g" , oct: 1},
        {n: 14 , pname: "f" , oct: 1},
   
    ]
    n?: number
    measure: Measure;

    linesCount = 6
    constructor(measure: Measure, info?: { linesCount: number }, n = 1) {
        super();
        this.measure = measure
        this.linesCount = info?.linesCount || this.linesCount;
        this.n = n
        this.init()
    }
    getAllNotes(justTheExistingOnes = true): Note[] {
          return this.tabGroups.reduce((sf: Note[], tg) => [...sf, ...tg.getAllNotes(justTheExistingOnes)], [])
    }
    setTabgroupsIncludeDurAttribute(mode: boolean) {
        this.tabGroups.forEach(t => t.setIncludeDurAttribute(mode))
    }
    static getDefaultTuning(number: number) {
        const found =  this.DEFAULT_TUNING.find(c => c.n == number);
        if (!found) console.error(`cannot find a tuning for number: `, number, this.DEFAULT_TUNING)
        return {n: found?.n || number, pname: found?.pname || "", oct: found?.oct || 0}
    }
    setLinesCount(c: number) { 
        this.linesCount = c;
    }

    removeLine(lineN: number) {
        this.linesCount--;

        const index = this.lines.indexOf(this.lines.find(l => l.courseInfo.number == lineN)!)

        this.lines.splice(index, 1);
        this.measure.sortSelfAndSiblingsLines()
        
        
    }
    sortLines() {

        this.lines = this.lines.sort((a, b) => {
            return b.courseInfo.number - a.courseInfo.number}).map((line, index, arr) => {
            line.setCourseNumber(arr.length - index)
            return line
        })


    }

    setTuning() {
        this.measure.section.info.staves[0].linesCount = this.linesCount;


    }
    
    lines: StaffLine[] = []
    tabGroups: TabGroup[] = []
    setAttributes(): void {
        if (this.n) this.attributes.push(new MeiAttribute('n', this.n!))
    }
    updateChildren(): MeiTag {
        this.children = this.tabGroups.map(tg => tg.updateChildren());
        return this
    }
 
    addLine(){

        this.linesCount++;
        const newLine = new StaffLine(this, {
            number: this.linesCount,
            tuning: Staff.getDefaultTuning(this.linesCount)
        })
        this.lines.push(newLine) 
        this.measure.sortSelfAndSiblingsLines()
        
        return newLine

    }
    private initLines() {
        const foundStaffInfo = this.measure.section.info.staves.find(si => si.n == this.n)
        const docTuning = this.measure.section.getDoc().getTuning(!this.n ? 0 : this.n-1)
        
        // 
        this.lines = new Array(this.linesCount)
            .fill(null).map((i, index) => {
                const number = this.linesCount - index
                const foundTuning = docTuning?.find(t => t.n == number);
                
                
                return new StaffLine(this,   {number, tuning: foundTuning} )})

    }
    initializeTabgroups(tabGroupJsonXmlElements: TMeiTagFactoryArgs[]) {
        if (!this.lines.length) this.initLines();
        this.tabGroups = tabGroupJsonXmlElements.map(tje => {
            return TabGroup.fromMeiFactoryArgs(this, tje)
        })

    }

    static fromMeiFactoryArgs(measure: Measure, arg: TMeiTagFactoryArgs) {
        const instance =  new Staff(measure, {
            linesCount: measure.section.getDoc().docSettings.linesCount// measure.section.info.staves[0].linesCount
        }).init();
         instance.setAttribute(new MeiAttribute('xml:id', arg.attributes?.find(a => a.title == 'xml:id')?.value ||generateId()))
        if (arg.children?.length) instance.tabGroups = arg.children
            .filter(ch => ch.tagTitle == 'layer')
            .reduce((sf: TMeiTagFactoryArgs[], l) => [...sf, ...l.children?.filter(ch => ch.tagTitle == 'tabGrp') || []] , [])
            .map(tje => TabGroup.fromMeiFactoryArgs(instance, tje));
        
        return instance;
    }
    init() {
        // this.linesCount = this.info.staves[0].linesCount
        this.initLines()
        //ITALIAN:
        this.addTabGroup();
        return this;
    }


    addTabGroup(index?: number, tgToAdd?: TabGroup) {
        const newOne = tgToAdd ||  new TabGroup(this)
        if (!index && index != 0) this.tabGroups.push(newOne);
        else this.tabGroups.splice(index, 0, newOne)
        this.updateChildren();
        return newOne
    }

    removeTabgroup(tg: TabGroup) {
        const index = this.tabGroups.indexOf(tg)
        this.tabGroups.splice(index, 1)

        // this.tabGroups.splice(1, 1);
        // this.updateChildren();
        
        if (this.tabGroups.length == 0) this.measure.remove();
        this.measure.section.getDoc().setupNotesEls();
    }

    cleanupTabGroups() {
        this.tabGroups.forEach(tg => tg.cleanup());
    }
    toJsonXmlElement(): MeiJSsonElem {
        const superResult = super.toJsonXmlElement();
        superResult.children = [
            new MeiJSsonElem({
                attributes: [new MeiAttribute('n', 1)],
                children: superResult.children,
                tagTitle: 'layer'
            })
        ]
        return superResult;
    }
    insertTabgroupBefore(tg: TabGroup, tgToAdd?: TabGroup) {
        let index = this.tabGroups.indexOf(tg)

        if (index < 0) index = 0
        return this.addTabGroup(index, tgToAdd)
    }

    insertTabgroupAfter(tg: TabGroup, tgToAdd?: TabGroup) {
        let index = this.tabGroups.indexOf(tg)
        if (index < 0) index = 0
        return this.addTabGroup(index + 1, tgToAdd)
    }

}

export class StaffLine {
    staff: Staff;
    courseInfo: TCourseInfo
    tuning: TabCourseTuningInfo
    isLedgerLine = false;
    constructor(staff: Staff, courseInfo: TCourseInfo) {
        // 
        this.courseInfo = courseInfo
        this.staff = staff
        this.tuning = courseInfo.tuning || Staff.getDefaultTuning(this.courseInfo.number);
        if (courseInfo.number > 6) this.isLedgerLine = true
    }


    remove() {
        this.staff.removeLine(this.courseInfo.number)
    }

    setCourseNumber(n: number) {
        this.courseInfo.number = n
        if (this.tuning) {
            this.tuning.n = this.courseInfo.number
            this.courseInfo.tuning = this.tuning

        }
    }


}


export class LedgerLine extends StaffLine {
    
}