import { Prisma } from "@prisma/client";
import { MeiTag, MeiTagInstance, TMeiTagFactoryArgs } from ".";
import DB from "../DB";
import { TMeiTag } from "../db-types";
import RetabDoc from "../retab-modules/RetabDoc";
import { IMeiTag, MeiAttribute } from "./interfaces";
import { writeFileSync } from "fs";
import { debug, includeMeiTagChildrenRecursively } from "../../utils";
import Course from "./Course";

export default class MeiMainTag extends MeiTag implements TMeiTag {
    static XMLNS = 'http://www.music-encoding.org/ns/mei'
    // static MEI_VERSION = '5.1-dev'
    static MEI_VERSION = '5.1'
    static TAG_TITLE = 'mei'
    constructor(payload?: TMeiTag) {
        super({ ...payload, tagTitle: MeiMainTag.TAG_TITLE });
    }

    async init() {
        await this.initalizeSelfAndChildrenCurrentId(this.doc?.id || this.docId)
        return this
    }
    setAttributes(): void {
        this.attributes.push(
            new MeiAttribute('xmlns', MeiMainTag.XMLNS),
            new MeiAttribute('meiversion', MeiMainTag.MEI_VERSION),
            new MeiAttribute('xml:id', this.xmlId),
        )
    }
    appendHead(head: MeiTag) {
        if (this.__('head')) {
            throw new Error('already has the head')
        }
        this.addChild(head, 0)
    }


    appendSection(section: MeiTag) {
        this.getScoreMeiTag().addOrReplaceChild(section)
    }


    getSection() {
        return this.getScoreMeiTag().__('section')
    }
    getHead() {
        return this.__('meiHead')
    }

    getMusicMeiTag() {
        if (this.__('music')) return this.__('music')
        this.addChildIfNotExists(new MeiTag({ tagTitle: 'music' }));
        return this.__('music')
    }

    getBodyMeiTag() {
        const musicTag = this.getMusicMeiTag()
        if (musicTag.__('body')) return musicTag.__('body')
        musicTag.addChildIfNotExists(new MeiTag({ tagTitle: 'body' }));
        return musicTag.__('body')

    }
    getBodyMdivMeiTag() {
        const bodyTag = this.getBodyMeiTag()
        if (bodyTag.__('mdiv')) return bodyTag.__('mdiv')
        bodyTag.addChildIfNotExists(new MeiTag({ tagTitle: 'mdiv' }));
        return bodyTag.__('mdiv')

    }
    getScoreMeiTag() {
        if (this.__('music')?.__('body')?.__('mdiv')?.__('score')) return this.__('music')?.__('body')?.__('mdiv')?.__('score');
        return this.getBodyMdivMeiTag().addChildIfNotExists(new MeiTag({ tagTitle: 'score' }))
    }

    getScoreDefMeiTag() {
        const scoreTag = this.getScoreMeiTag();

        if (!scoreTag.__('scoreDef')) scoreTag.addChildIfNotExists(new MeiTag({ tagTitle: 'scoreDef' }))
        return scoreTag.__('scoreDef')
    }

    getStaffGrpMeiTag(staffGrpIndex = 0) {
        const scoreDef = this.getScoreDefMeiTag();
        // just for index 0
        if (!scoreDef.__('staffGrp')) scoreDef.addChildIfNotExists(new MeiTag({ tagTitle: 'staffGrp' }))
        return scoreDef.__('staffGrp')
    }


    getStaffDefMeiTag(staffN = 1) {
        const scoreDef = this.getScoreMeiTag().addChildIfNotExists(new MeiTag({ tagTitle: 'scoreDef' }), 0)
        const staffGrp = scoreDef.addChildIfNotExists(new MeiTag({ tagTitle: 'staffGrp' }))
        const alreadyThere = staffGrp.children.find((ch) => ch.tagTitle == 'staffDef' && (ch as MeiTag).hasSameAttributeKeyValue({ title: 'n', value: staffN + '' }))

        return alreadyThere || staffGrp.addChild(new MeiTag({
            tagTitle: 'staffDef',
            attributes: [
                new MeiAttribute('n', staffN)
            ]
        }))
    }


    getTuningTag(staffN = 1) {
        const staffDefMeiTag = this.getStaffDefMeiTag(staffN);
        return staffDefMeiTag.__('tuning')

    }
    async initalizeSelfAndChildrenCurrentId(docId?: number, stavesCount = 1) {
        try {
            const tagTitles = [
                'mei', 'music', 'body', 'mdiv', 'score', 'scoreDef', 'staffGrp', 'staffDef', 'tuning', 'course'
            ]
            const info = await DB.getInstance().retabDoc.findUnique({
                where: { id: docId || 0 }, select: {
                    mainChild: {
                        ...this.selectTagTree(tagTitles),

                    }
                }
            })

            if (!info?.mainChild) return;

            const mainChild = info?.mainChild as TMeiTag
            const musicTag = mainChild.children?.[0] as TMeiTag
            const bodyTag = musicTag.children?.[0] as TMeiTag
            const mdivTag = bodyTag.children?.[0] as TMeiTag
            const scoreTag = mdivTag.children?.[0] as TMeiTag
            const scoreDefTag = scoreTag.children?.[0] as TMeiTag
            const staffGrpTag = scoreDefTag.children?.[0] as TMeiTag

            this.id = info.mainChild?.id
            this.xmlId = info.mainChild?.xmlId
            this.getMusicMeiTag().id = musicTag.id
            this.getMusicMeiTag().xmlId = musicTag.xmlId || ''
            this.getBodyMeiTag().id = bodyTag.id
            this.getBodyMeiTag().xmlId = bodyTag.xmlId || ''
            this.getBodyMdivMeiTag().id = mdivTag.id
            this.getBodyMdivMeiTag().xmlId = mdivTag.xmlId || ''

            const score = this.getScoreMeiTag()
            score.id = scoreTag.id
            score.xmlId = scoreTag.xmlId || ''
            this.getScoreDefMeiTag().id = scoreDefTag.id
            this.getScoreDefMeiTag().xmlId = scoreDefTag.xmlId || ''
            this.getStaffGrpMeiTag().id = staffGrpTag.id
            this.getStaffGrpMeiTag().xmlId = staffGrpTag.xmlId || ''



            ////////////////////for Each Staff
            for (let staffN = 1; staffN <= stavesCount; staffN++) {
                const staffDefTag = staffGrpTag.children?.find(ch => ch.attributes?.find(at => at.title == 'n' && at.value == staffN + '')) as TMeiTag
                const tuningTag = staffDefTag.children?.[0] as TMeiTag
                this.getStaffDefMeiTag(staffN).id = staffDefTag.id
                this.getStaffDefMeiTag(staffN).xmlId = staffDefTag.xmlId || ''

                const tuningChild = this.getStaffDefMeiTag(staffN).addChildIfNotExists(new MeiTag({
                    tagTitle: 'tuning',
                    id: tuningTag?.id, xmlId: tuningTag?.xmlId
                }))
                const coursesTunings = tuningTag.children?.filter(ch => ch.tagTitle == 'course').map(ch => new Course(ch)) || []
                coursesTunings.forEach((course, index) => {

                    if (!tuningChild.children.find(c => c.xmlId == course.xmlId)) {
                        tuningChild.addChild(new Course(course), index)
                    }
                })
                tuningChild.children = tuningChild.children.sort((a, b) => Number(a.getAttribute('n')?.value || 0) - Number(b.getAttribute('n')?.value || 0))

                tuningChild.children.forEach(ch => {


                    const child_pname = ch.getAttribute('pname')?.value
                    const child_n = ch.getAttribute('n')?.value
                    const child_oct = ch.getAttribute('oct')?.value
                    const child_accid = ch.getAttribute('accid')?.value

                    const savedBefore = coursesTunings.find((ct: MeiTag) => {
                        return ct.getAttribute('pname')?.value == child_pname
                            && ct.getAttribute('n')?.value == child_n
                            && ct.getAttribute('oct')?.value == child_oct
                            && ct.getAttribute('accid')?.value == child_accid
                    });
                    if (savedBefore) {
                        ch.id = savedBefore.id
                        ch.xmlId = savedBefore.xmlId

                    }
                })
            }




            debug.getTimepan(4)

            // this.id = undefined//?.mainChildId || undefined;
        } catch (error) {
            console.log(error);
        }
    }
    async save(doc: RetabDoc) {

        // await this.initalizeSelfAndChildrenCurrentId(doc)
        return await super.save(doc);
    }
    async getHeadId() {
        const alreadyInChildren = this.getHead()
        if (alreadyInChildren) return alreadyInChildren.id
        const head = await DB.getInstance().meiTag.findFirst({
            where: {
                AND: [
                    // {parent: {id: this.id || 0}},
                    { parents: { some: { id: this.id || 0 } } },
                    { tagTitle: 'meiHead' }
                ]
            },
            select: { id: true }
        })


        return (head)?.id
    }

}