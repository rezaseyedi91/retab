import store from "..";
import { TDbDocSettings, TUser } from "./db-types";
import Measure from "./Measure";
import MeiAttribute from "./mei-modules/MeiAttribute";
import MeiDocGenerator from "./mei-modules/MeiDocGenerator";
import MeiHead, { HARD_CODED_HEADER_ARGS } from "./mei-modules/MeiHead";
import { TMeiTagFactoryArgs } from "./mei-modules/MeiTag";
import Note from "./Note";
import Section from "./Section";
import { DurNum, Instrumnet, TabType, TRezTabFileInfo, TStaffInfo } from "./types";
import axios from 'axios'
import { generateId } from "./utils";



type DocSetttings = {
    linesCount: number,
    defaultFirstTabgrpDurSymShow: boolean,
    tabgroupsIncludeDurAttribute: boolean,
    proportion: {
        include: boolean
        num: number, numbase: number,
        sign?: 'C',
        slash?: 1
    },

}

export default class RezTabFile {
    info: TRezTabFileInfo;
    docSettings: DocSetttings = {
        linesCount: 6,
        defaultFirstTabgrpDurSymShow: true,
        tabgroupsIncludeDurAttribute: true,
        proportion: { include: false, num: 3, numbase: 2 },
    };
    id?: number
    head?: MeiHead
    section: Section;
    // measures: Measure[] = []
    constructor(info: TRezTabFileInfo) {
        this.info = info;
        this.section = new Section(this, [], { staves: [{ n: 1, tabType: TabType.ITALIAN, linesCount: this.docSettings.linesCount! }] })
        this.section.initializeDefaultTuning();
        this.setTabgroupsIncludeDurAttribute(this.docSettings.tabgroupsIncludeDurAttribute)
    }

    toggleTabgroupsIncludeDurAttribute() {

        this.docSettings.tabgroupsIncludeDurAttribute = !this.docSettings.tabgroupsIncludeDurAttribute;

        this.setTabgroupsIncludeDurAttribute(this.docSettings.tabgroupsIncludeDurAttribute);
    }
    setTabgroupsIncludeDurAttribute(mode: boolean) {
        this.section.setTabgroupsIncludeDurAttribute(mode);
    }
    updateDocSettings() {
        this.section.info.staves[0].linesCount = this.docSettings.linesCount;
    }
    unfreeze() {
        this.section.measures.forEach(meausre => {
            meausre.staves.forEach(staff => {
                staff.tabGroups.forEach(tabgroup => {
                    const currentNotes = tabgroup.notes;
                    tabgroup.notes = staff.lines.map(l => {
                        const c = l.courseInfo.number;
                        return currentNotes.find(n => n.course == c) || new Note(tabgroup, { course: c })

                    })
                })
            })
        });
    }
    init() {
        /**just testing for now */
        this.section.addMeasure();
        this.initializeHead();
        return this;
    }

    async save() {
        /**
         * we want to:
         *  -   clean up the tabgroups
         *  -   make mei elements and wrap them inside their parents
         *  -   export the mei file
         */
        // this.cleanupTabGroups();
        const section = this.section
        const jsonXmlElement = await MeiDocGenerator.generateJsomElem(section);

        const headJsonXmlElement = this.head ? await MeiDocGenerator.generateJsomElem(this.head) : undefined;
        // return ;
        const jsonXmlElementParsed = JSON.parse(JSON.stringify(jsonXmlElement));
        const stavesInfo = this.section.getStavesInfo()
        // const options = {
        //    tuning: stavesInfo[0].tuning
        // }
        const fileInfo: TRezTabFileInfo = this.info;

        type TRetabDocDBType = {
            instruments?: any[]
            stavesInfo?: TStaffInfo[]
            title?: string
            userId?: number
            filename?: string
        };
        // LOOK AT THE ABOVE!
        this.info.title = this.head?.getWorkTitle()

        const docInfo: TRetabDocDBType = {
            stavesInfo: this.section.getStavesInfo(),

            ...this.info
        }
        const reqBody = {
            sectionJsonXmlElement: jsonXmlElementParsed,
            docId: this.id,
            headJsonXmlElement: headJsonXmlElement,
            docInfo,
            docSettings: this.docSettings
        }
        
        const jsonResult = await axios.post(process.env.VUE_APP_API_URL + '/retab/doc/' + (this.id || 'new'), reqBody)
        return jsonResult.data
    }

    static async getInstanceFromServer(id: number) {

        const someResponse = (await axios.get(process.env.VUE_APP_API_URL + '/retab/doc/' + id)).data
        const doc = new RezTabFile({
            createdAt: someResponse.createdAt,
            filename: someResponse.filename,
            instruments: someResponse.instruments,
            tabType: someResponse.stavesInfo?.map((si: any) => si.notationType)?.[0],
            title: someResponse.title,
            // tuning: someResponse.stavesInfo?.map((si: any )=> si.tuning)?.[0],
        })
        doc.id = someResponse.id;
        doc.setLinesCount(someResponse.stavesInfo[0].tuning.length)
        doc.initializeSection(someResponse.sectionJsonXmlElement, someResponse.stavesInfo)
        doc.initializeHead(someResponse.headJsonXmlElement);
        doc.unfreeze()
        if (someResponse.settings) doc.assignSettings(someResponse.settings)
        return doc

    }
    assignSettings(settings: TDbDocSettings) {
        this.docSettings.defaultFirstTabgrpDurSymShow = settings.defaultFirstTabgrpDurSymShow || this.docSettings.defaultFirstTabgrpDurSymShow
        this.docSettings.proportion.include = settings.proportionInclude || this.docSettings.proportion.include
        this.docSettings.proportion.num = settings.proportionNum || this.docSettings.proportion.num
        this.docSettings.proportion.numbase = settings.proportionNumbase || this.docSettings.proportion.numbase
        this.docSettings.proportion.sign = (settings.proportionSign || this.docSettings.proportion.sign) as this["docSettings"]["proportion"]["sign"]
        this.docSettings.proportion.slash = (settings.proportionSlash || this.docSettings.proportion.slash) as this["docSettings"]["proportion"]["slash"]
        this.docSettings.tabgroupsIncludeDurAttribute = settings.tabgroupsIncludeDurAttribute || this.docSettings.tabgroupsIncludeDurAttribute
        
    }
    getAltTitle() {
        return this.head?.__('fileDesc').__('titleStmt').__('title[type=Alternative]')?.textContent

    }
    setLinesCount(count: number, staffIndex = 0) {
        this.docSettings.linesCount = count;
        this.section.info.staves[staffIndex].linesCount = count
    }
    getLinesCount(staffIndex = 0) {
        if (staffIndex == 0) return this.docSettings.linesCount
        else return this.section.info.staves[staffIndex].linesCount
    }
    async generateMEI() {
        if (!this.id) return alert('save it first!')
        const xmlResult = (await axios.get(process.env.VUE_APP_API_URL + '/retab/doc/' + this.id, { params: { fileType: 'mei' } })).data
        return xmlResult
    }



    initializeHead(fetchedHead?: TMeiTagFactoryArgs) {
        this.head = new MeiHead(fetchedHead || HARD_CODED_HEADER_ARGS)
    }

    initializeSection(fetchedSection?: TMeiTagFactoryArgs, stavesInfo?: TStaffInfo[]) {
        if (fetchedSection) {

            this.section = Section.fromMeiFactoryArgs(this, fetchedSection, stavesInfo)
            this.section.setAttribute(new MeiAttribute('xml:id', fetchedSection.attributes?.find(a => a.title == 'xml:id')?.value || generateId()))
        } else {
            return;
            // this.section = this.section
        }
    }

    getAllNotes(justTheExistingOnes = true): Note[] {
        return this.section.getAllNotes(justTheExistingOnes)
    }

    getFocusedNote() {
        const id = document.activeElement?.id
        return !id ? undefined : this.getAllNotes(false).find(n => n.xmlId == id)
    }

    // private cleanupTabGroups() {
    //     this.measures.forEach(s => s.cleanupTabGroups())
    // }


    // static prettifyXmlFile(input: string) {
    //     try {

    //         const xmlDoc = new DOMParser().parseFromString(input, 'application/xml');
    //         const xsltDoc = new DOMParser().parseFromString([
    //         // describes how we want to modify the XML - indent everything
    //         '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
    //         '  <xsl:strip-space elements="*"/>',
    //         '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
    //         '    <xsl:value-of select="normalize-space(.)"/>',
    //         '  </xsl:template>',
    //         '  <xsl:template match="node()|@*">',
    //         '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
    //         '  </xsl:template>',
    //         '  <xsl:output indent="yes"/>',
    //         '</xsl:stylesheet>',
    //     ].join('\n'), 'application/xml');

    //     const xsltProcessor = new XSLTProcessor();    
    //     xsltProcessor.importStylesheet(xsltDoc);
    //     const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    //     const resultXml = new XMLSerializer().serializeToString(resultDoc);
    //     return resultXml;
    //         } catch (err) {
    //             
    //             console.error('there is some error inporting XSLT DOC at prettyfy Xml file; continuing with ugly xml file for now :)')
    //             return input
    //         }
    // }
    static download(text: string, filename = 'result.mei') {
        const xml = text// const xml = this.prettifyXmlFile(text)
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml))
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        // document.body.removeChild(element)

    }

    turnOnDefaultFirstTabgroupDurSymShow() {
        this.section.measures.forEach(m => {
            m.staves.forEach(s => {
                let prev: {
                    dur: DurNum | null,
                    dots?: number
                } = { dur: null, dots: undefined };

                s.tabGroups.forEach(t => {
                    let isFirst = false;

                    const curr = {
                        dots: t.getDurDots(), dur: t.dur
                    }
                    if (!prev) isFirst = true;
                    else {
                        isFirst = !((prev.dur == curr.dur) && (prev.dots == (curr.dots || 0)));
                    }
                    prev = { dur: curr.dur, dots: curr.dots }
                    if (isFirst == true) t.showTabDurSym = true;


                })
            })
        })
    }
    getTuning(staffIndex = 0) {
        return this.section.info.staves[staffIndex].tuning
    }

    setupNotesEls() {
        setTimeout(() => {
            this.getAllNotes().forEach(n => /**n.xmlId && (n.el?.id == n.xmlId) || */  n.setupEl())

        }, 2)
    }
}