import axios from "axios";
import MeiTag, { TMeiTagFactoryArgs } from "./MeiTag";
import store from "@/store";
import { TEncoderHeader, TMeiTag } from "../db-types";
import MeiJsonElem from "./MeiJsonXmlElement";



export default class MeiHead extends MeiTag {
    
    constructor(info: TMeiTagFactoryArgs) {
        super()
        this.id = info.id
        // this.xmlId = 
        this.setXmlId(info.attributes?.find(at => at.title == 'xml:id')?.value)
        this.children = info.children?.map(ch => ch instanceof MeiTag ? ch : MeiTag.makeTagsTree(ch, this)) || []
        this.textContent = info.textContent
    }
    tagTitle = 'meiHead';
    // setAttributes(): void {
    //     return
    // }
    updateChildren(): MeiTag {
        function removeEmptyChildrenNested(tag: MeiTag) {
            if (tag.attributes.length <= 1 && !tag.children.length && !tag.textContent) {
                tag.removeAttribute('xml:id');
                tag.remove();
            }
            if (tag.children.length < 1) {
                return tag.children.forEach(removeEmptyChildrenNested) 
            } else return tag.children.map(t => t.removeEmptyChildren())
        }
        removeEmptyChildrenNested(this)
        return this
    }

    cleanupEmptyTags() {
        return 
    }
    /**adds an <annot/> element to the [index = 0] <work/> in the <workList/> */
    addAnnot(workIndex = 0) {
        this.__('workList')?.getChildrenByTagName('work')?.[workIndex]?.__('notesStmt')?.pushChild({
            tagTitle: 'annot'
        })
    }

    removeAnnot(index: number, workIndex = 0) {
        this.__('workList')?.getChildrenByTagName('work')?.[workIndex]?.__('notesStmt')?.removeChildByIndex(index)
    }
    getWorkTitle() {
        return this.__('fileDesc')?.__('titleStmt')?.__('title')?.textContent
    }
    static async getUserEncoderHeaders() {
        const result = await axios.get(store.state.apiUrl + '/retab/user/encoder-headers')
        return result.data
    }
    async setLastUserEncoderHeader() {
        const ueh = await MeiHead.getUserEncoderHeaders() as TEncoderHeader;
    }






}