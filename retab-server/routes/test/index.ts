import { Router } from "express";

import { getInstance as getVerovioToolkitInstance } from '../../modules/mei-adapters/VerovioToolkitInstance'
import { promises, readFile } from "fs";
import retabTestRouter from './retab'
import Authenticator from "../../modules/Authenticator";
import DB from "../../modules/DB";
import RetabUser from "../../modules/retab-modules/User";
import authMiddleware from '../../middleware/auth'
import RetabDoc from "../../modules/retab-modules/RetabDoc";
const router = Router();


router.get('/', authMiddleware, async (req, res) => {
    return res.json('/test')
})
router.get('/dbman', authMiddleware, async (req, res) => {
    const prisma = DB.getInstance();
    //@ts-ignore
    // const user = await RetabUser.getUser(req.userId!);
    // const doc = await RetabDoc.getInstanceFromDb(412);
    // const result = doc
    const firstResult = await prisma.meiTag.findMany({
        where :{
            parentId: {gt: 0}
        },
        select: {
            id: true, parentId: true
        }
    })
    const result = await prisma.$transaction(firstResult.map(t => prisma.meiTag.update({
        where: {id: t.id},
        data: {
            parents: {
                connect: [{id: t.parentId!}]
            }
        }
    })))
    
    // const result = await prisma.meiTag.findMany({
    //     where: {
    //         // xmlId: 'v3x6k3o0b8s5',
    //         parents: {some: {id: 96957}}
    //     },
    //     include: {
    //         children: true
    //     }
    // })
    return res.json(result)
})
// router.get('/del', authMiddleware, async (req, res) => {
//     const prisma = DB.getInstance();
//     const result = await prisma.$transaction([
//         prisma.encoderHeader.deleteMany({}),
//         prisma.staffInfo.deleteMany({}),
//         prisma.meiTag.deleteMany({}),
//         prisma.meiAttribute.deleteMany({}),
//         prisma.retabDoc.deleteMany({}),
//     ])
//     return res.json(result)
// })
router.use('/retab', retabTestRouter)
// router.use('/get-midi', getMidiRouter)


router.get('/render', async (req, res) => {
    try {


        const query = req.query;
        const filename = query.filename;
        if (!filename) return res.json({ msg: 'filename query must be provided' });
        const fileType = '.' + query.fileType || 'mei'
        const filepath = './mei-docs/' + filename + fileType
        const str = (await promises.readFile(filepath, { encoding: 'utf-8' })).toString();
        if (!str) return res.json({ msg: filepath + ' not found.' });
        const verovioToolkit = await getVerovioToolkitInstance();
        if (!verovioToolkit) return res.json({ msg: 'err.' });
        verovioToolkit.loadData(str);
        verovioToolkit.setOptions({
            adjustPageHeight: true
        });


        const inf = verovioToolkit.edit({
            action: 'delete',
            param: {
                elementId: 'r.0.1.0.0_1'
            }
        });

        return res.send(verovioToolkit.renderToSVG(1))

    } catch (err) {
        res.send(err)
    }
})


export default router;