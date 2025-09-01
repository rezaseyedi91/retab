import MeiAttribute from "./mei-modules/MeiAttribute";
import MeiTag, { TMeiTagFactoryArgs } from "./mei-modules/MeiTag";
import Note from "./Note";
import Section from "./Section";
import Staff, { StaffLine } from "./Staff";
import TabGroup from "./TabGroup";

export default class Measure extends MeiTag {
    updateChildren(): MeiTag {
        this.children = this.staves.map(s => s.updateChildren());
        return this;
    }
    staves: Staff[] = []
    tagTitle = 'measure';
    n : number;
    setAttributes(): void {
        this.attributes.push(
            new MeiAttribute('n', this.n)
        )
    }

    getAllNotes(justTheExistingOnes = true): Note[] {
          return this.staves.reduce((sf: Note[], s) => [...sf, ...s.getAllNotes(justTheExistingOnes)], [])
            }
    section: Section
    // linesCount = 6
    setTabgroupsIncludeDurAttribute(mode: boolean) {
        this.staves.forEach(s => s.setTabgroupsIncludeDurAttribute(mode))
    }

    constructor(section: Section, n: number) {

        super();
        this.section = section
        this.init();
        this.setN(n)
        this.n = n

    }
    initializeStaves(staffJsonXmlElements?: TMeiTagFactoryArgs[]) {
        if (!staffJsonXmlElements) this.addStaff();
        else {
            this.staves = staffJsonXmlElements.map(sje => Staff.fromMeiFactoryArgs(this, sje))
        }
        return this;

    }
    static fromMeiFactoryArgs(section: Section, arg: TMeiTagFactoryArgs) {
        const instance = new Measure(section, Number(arg.attributes?.find(a => a.title == 'n')?.value)).initializeStaves(arg.children)
        instance.id = arg.id;
        const argXmlId = arg.attributes?.find(a => a.title == 'xml:id')?.value || 'XMLIDNOTFOUND'
        instance.xmlId = argXmlId
          instance.setAttribute(new MeiAttribute('xml:id', argXmlId))
        if (arg.children?.length) instance.initializeStaves(arg.children);
        
        return instance;
    }
    findCurrentStaff(note: Note) {
        // this will be implemented later; we are returning the only staff our measure has, for now.
        return this.staves[0]


    }
    setN(n: number) {
        this.n = n;
        this.setAttribute({title: 'n', value: this.n + ''}) 
    }
    sortSelfAndSiblingsLines(staffIndex = 0) {
        this.section.measures.forEach(m => m.sortLines(staffIndex));
        setTimeout(() => this.section.unfreeze(), 500)
    }
    sortLines(staffIndex = 0) {
        this.staves[staffIndex].sortLines()
    }
    init() {
        // this.linesCount = this.staff.linesCount
        // this.linesCount = this.section.info.staves[0].linesCount
        // this.lines = new Array(this.linesCount).fill(null).map((i, index) => new StaffLine(this, { number: index }))
        this.initializeStaves();
        return this
    }
    remove() {
        this.section.removeMeasure(this)
    }
    addStaff(n = 1) {
        const linesCount = this.section.getDoc().getLinesCount()// this.section.info.staves[n-1].linesCount  //this.section.getDoc().docSettings // previously: 
        
        this.staves.push(new Staff(this, {

            linesCount

            // linesCount: this.section.getDoc().docSettings.linesCount // this.section.info.staves[0].linesCount
        }, n))
    }
    cleanupTabGroups() {
        this.staves.forEach(s => s.cleanupTabGroups())
    }


    getStaffFromN(n = 1) {
        return this.staves.find(s => s.n == n)
    }

    /**1 for nextCourse -1 for previous course */
    getNeighbour(diff: number) {
        const thisIndex = this.section.measures.indexOf(this);
        return this.section.measures[thisIndex + diff]
    }
}