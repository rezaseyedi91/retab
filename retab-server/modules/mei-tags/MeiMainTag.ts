import { Prisma } from "@prisma/client";
import { MeiTag, MeiTagInstance, TMeiTagFactoryArgs } from ".";
import DB from "../DB";
import { TMeiTag } from "../db-types";
import RetabDoc from "../retab-modules/RetabDoc";
import { IMeiTag, MeiAttribute } from "./interfaces";
import { writeFileSync } from "fs";
import { includeMeiTagChildrenRecursively } from "../../utils";

export default class MeiMainTag extends MeiTag implements TMeiTag {
    static XMLNS = 'http://www.music-encoding.org/ns/mei'
    // static MEI_VERSION = '5.1-dev'
    static MEI_VERSION = '5.1'
    static TAG_TITLE = 'mei'
    constructor(payload?: TMeiTag) {
        super({ ...payload, tagTitle: MeiMainTag.TAG_TITLE });


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
    getScoreMeiTag() {

        if (this.__('music')?.__('body')?.__('mdiv')?.__('score')) return this.__('music').__('body').__('mdiv').__('score');

        this.addChildIfNotExists(new MeiTag({ tagTitle: 'music' }));
        this.__('music').addChildIfNotExists(new MeiTag({ tagTitle: 'body' }))
        this.__('music').__('body').addChildIfNotExists(new MeiTag({ tagTitle: 'mdiv' }))
        return this.__('music').__('body').__('mdiv').addChildIfNotExists(new MeiTag({ tagTitle: 'score' }))
    }

    getStaffDefMeiTag(staffN = 1) {
        const scoreDef = this.getScoreMeiTag().addChildIfNotExists(new MeiTag({ tagTitle: 'scoreDef' }), 0)
        const staffGrp = scoreDef.addChildIfNotExists(new MeiTag({ tagTitle: 'staffGrp' }))
        const alreadyThere = staffGrp.children.find((ch) => ch.tagTitle == 'staffDef' && (ch as MeiTag).hasSameAttributeKeyValue({ title: 'n', value: staffN + '' }))
        return alreadyThere || staffGrp.addChild(new MeiTag({
            tagTitle: 'staffDef'
        }))
    }
    async initalizeSelfAndChildrenCurrentId(doc: RetabDoc) {
        try {

            const tagTitles = [
                'mei', 'music', 'body', 'mdiv', 'score', 'scoreDef', 'staffGrp', 'staffDef', 'tuning', 'course'
            ]
            const info = await DB.getInstance().retabDoc.findUnique({
                where: { id: doc.id || 0 }, select: {
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
            const staffDefTag = staffGrpTag.children?.[0] as TMeiTag
            const tuningTag = staffDefTag.children?.[0] as TMeiTag
            this.id = info.mainChild?.id
            this.__('music').id = musicTag.id
            this.__('music').__('body').id = bodyTag.id
            this.__('music').__('body').__('mdiv').id = mdivTag.id

            const score = this.getScoreMeiTag()
            score.id = scoreTag.id
            score.__('scoreDef').id = scoreDefTag.id
            score.__('scoreDef').__('staffGrp').id = staffGrpTag.id
            score.__('scoreDef').__('staffGrp').__('staffDef').id = staffDefTag.id
            const tuningChild = score.__('scoreDef').__('staffGrp').__('staffDef').__('tuning')
            tuningChild.id = tuningTag.id
            const coursesTunings = tuningTag.children?.filter(ch => ch.tagTitle == 'course').map(ch => new MeiTag(ch)) || []
            // coursesTunings.forEach((course, index) => {
            //     tuningChild.addChildIfNotExists(new MeiTagInstance(course as TMeiTagFactoryArgs), index)
            // })
            console.log(tuningChild.children);

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
                if (savedBefore) ch.id = savedBefore.id
            })
            console.log(tuningChild.children.map(ch => [ch.getAttribute('n'), ch.getAttribute('oct'), ch.getAttribute('pname')]));



            // this.id = undefined//?.mainChildId || undefined;
        } catch (error) {
            console.log(error);
        }
    }
    async save(doc: RetabDoc) {

        await this.initalizeSelfAndChildrenCurrentId(doc)
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
        console.log({ head });

        return (head)?.id
    }

}