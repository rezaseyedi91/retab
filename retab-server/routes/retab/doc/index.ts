import { Router } from "express";
import TabIdeaDocGenerator from "../../../modules/mei-adapters/TabIdeaDocGenerator";
import RetabUser from "../../../modules/retab-modules/User";
import { MeiTag } from "../../../modules/mei-tags";
import { TStaffInfo } from "../../../modules/db-types";
import StaffInfoContainer from "../../../modules/retab-modules/StaffInfoContainer";
import RetabDoc from "../../../modules/retab-modules/RetabDoc";

const router = Router();

 
router.get('/get-all-saved', async (req, res) => {

    const page = Number(req.query.page)
    const perPage = Number(req.query.size || 20);
    const contains = req.query.search  as string || ""
    //@ts-ignore
    const userId = req.userId as number;
    const user = await RetabUser.getUser(userId);
    console.log(user)
    const {docsList, totalPages} = await user.getSavedDocsList(page, perPage, contains);
    return res.json({
        docsList, totalPages

    })
})
router.get('/:id', async (req, res) => {
    const docId = Number(req.params.id || 0)
    const retabDoc = await RetabDoc.getInstanceFromDb(docId);
    
    if (req.query.fileType == 'mei') {
        
        return res.send(await retabDoc?.toMei())
    }
     else return res.json(retabDoc?.getDataToEdit())
})
router.delete('/:id', async (req, res) => {
    const docId = Number(req.params.id || 0)
    const doc = new RetabDoc().setInfo({id: docId});
    const result = await doc.remove();
    return res.send(result)
})
 /**save doc */
 router.post('/:id', async (req, res) => {
    try {


    const retabDoc = new RetabDoc();
    //@ts-ignore
    const userId = req.userId
    console.log({userId})
    if (!userId) throw new Error('no user id')
    const user = await RetabUser.getUser(userId)

    const docInfo = req.body.docInfo
    retabDoc.setInfo({
        id: req.params.id == 'new' ? undefined : Number(req.params.id || 0) || undefined, 
        filename: docInfo.filename, 
        title: docInfo.title,
        user: user,
    })
    retabDoc.assignDocSettings(req.body.docSettings)
    retabDoc.initializeMeiMainTag()
    console.log(retabDoc.settings)
    const section = TabIdeaDocGenerator.jsonXmlElementToSection( req.body.sectionJsonXmlElement);
    retabDoc?.appendSection(section)
    const head = req.body.headJsonXmlElement ? MeiTag.makeTagsTree(req.body.headJsonXmlElement) : undefined;
    if (head) retabDoc?.appendHead(head)
    retabDoc.stavesInfo = docInfo.stavesInfo.map((si: TStaffInfo) => new StaffInfoContainer(si))
    retabDoc.setStavesInfo(retabDoc.stavesInfo)
    await retabDoc.save();
    return res.json({id: retabDoc.id})
} catch(err) {
    console.log(err)
        //@ts-ignore
    console.log(req.userId)
}
 })
export default router