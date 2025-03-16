import MeiAttribute from "./mei-modules/MeiAttribute";
import MeiTag, { TMeiTagFactoryArgs } from "./mei-modules/MeiTag";
import TabGroup from "./TabGroup";
import { DurNum, TNoteInfo } from "./types";
import { generateId } from "./utils";

export default class Note extends MeiTag {
    tagTitle = 'note';
    static MAX_FRET_INPUT = 14
    setAttributes(): void {
        this.setAttribute(new MeiAttribute('tab.course', (this.course || 0)))
        this.setAttribute(new MeiAttribute('tab.fret', this.fret!))
        if (this.xmlId) this.setAttribute({ title: 'xml:id', value: this.xmlId })
    }
    isSelected = false;
    updateChildren(): MeiTag {
        return this;
    }
    private _fret?: number;
    set fret(v: number | undefined) {
        if (!v || v && v <= Note.MAX_FRET_INPUT) this._fret = v;
    }
    get fret() { return this._fret }
    updateSelectionMode(mode = true) {
        this.isSelected = mode
        this.tabGroup.updateSelectionMode();
        if (mode) this.el?.classList.add('selected')
        else this.el?.classList.remove('selected')
    }

    static fromMeiFactoryArgs(tabGroup: TabGroup, arg: TMeiTagFactoryArgs) {

        const info: TNoteInfo = {};
        arg.attributes?.forEach(at => {
            if (at.title == 'tab.course') info.course = Number(at.value)
            else if (at.title == 'tab.fret') info.fret = Number(at.value)
        })

        const instance = new Note(tabGroup, info);
        return instance;

    }
    focus() {
        this.setupEl()
        setTimeout(() => {
            
            // const el = document.querySelector('#' + this.xmlId) as HTMLInputElement;
            // if (el) el.focus()
            this.el?.focus()
        }, 50)
    }
    el?: HTMLElement;
    tabGroup: TabGroup;
    // fret?: number
    
    id: string;
    course?: number;
    constructor(tabGroup: TabGroup, info?: TNoteInfo) {
        super();
        this.tabGroup = tabGroup
        this.xmlId = info?.xmlId || generateId();
        this.id = this.xmlId
        this.fret = info?.fret;
        this.course = info?.course;
        setTimeout(this.setupEl.bind(this), 100)
    }
    changeDuration(durnum: DurNum) {

        this.tabGroup.setDur(durnum);
    }

    static validCourseIndicator(someCourseNumber: string | undefined | number) {
        return !isNaN(Number(someCourseNumber))
    }
    setupEl() {
        this.el = document.querySelector('.note-input#' + this.xmlId)!
        if (!this.el && !this.fret) return;
        if (!this.el) {
            console.error('no el found for this id: ', this.xmlId, this.tabGroup.getIndexInPiece())
            
        }
    }
    isInSelectionHighliterRange(range: number[]) {
        const bcr = this.el?.getBoundingClientRect();
        if (!bcr) return;

        const { x: initialx, y: initialy } = bcr;
        const x = initialx + window.scrollX
        const y = initialy + window.scrollY
        const isInRange = x >= range[0] && x <= range[2] && y >= range[1] && y <= range[3]
        return isInRange
    }

    getDebugElData() {
        if (!this.el) return;
        this.setupEl()  
        const bcr = this.el.getBoundingClientRect();
        const { x: initialx, y: initialy } = bcr;
        const x = initialx + window.scrollX
        const y = initialy + window.scrollY
        return [this.el, x, y]
    }
    static validFretIndicator(somefret: string | undefined | number) {
        if ([0, '0'].includes(somefret!)) return true
        // if (somefret == '') somefret = undefined
        return   (!!somefret && !isNaN(Number(somefret))) //(typeof somefret == 'number' ) ||  (somefret != undefined) && (typeof somefret == 'string' && somefret.trim())
    }

    isThere() {
        return Note.validCourseIndicator(this.course) && Note.validFretIndicator(this.fret)
    }
    /**1 for nextCourse -1 for previous course */
    getNeighbour(courseDiff: number) {
        const neighbour =  this.tabGroup.notes.find(n => n.course == (this.course || 0) + courseDiff);
        
        return neighbour
    }

    getAboveNote() {
        return this.getNeighbour(1);
    }
    getBelowNote() {
        
        return this.getNeighbour(-1);
    }

    getRightNote() {
        

        return this.tabGroup.getNeighbour(1)?.notes.find(n => n.course == this.course)
            || this.getNextMeasureFirstNote()

    }
    getLeftNote() {
        
        return this.tabGroup.getNeighbour(-1)?.notes.find(n => n.course == this.course)
            || this.getPrevMeasureLastNote()
    }

    getNextMeasureFirstNote() {
        return this.tabGroup.getNextMeasureFirstNote(this.course);
    }
    getPrevMeasureFirstNote() {
        return this.tabGroup.getPrevMeasureFirstNote(this.course);
    }
    getPrevMeasureLastNote() {
        return this.tabGroup.getPrevMeasureLastNote(this.course);
    }

    softDelete() {
        this.fret = undefined
    }


    // clone(): Note {
    //     const n = new Note(this.tabGroup);
    //     n.course = this.course;
    //     n.fret = Number(this.fret);
    //     // n.setupEl();
    //     return n
    // }

}