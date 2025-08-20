import { Router } from "express";

import { getInstance as getVerovioToolkitInstance } from '../../modules/mei-adapters/VerovioToolkitInstance'
import { promises, readFile } from "fs";
import retabTestRouter from './retab'
import Authenticator from "../../modules/Authenticator";
import DB from "../../modules/DB";
import RetabUser from "../../modules/retab-modules/User";
import authMiddleware from '../../middleware/auth'
import RetabDoc from "../../modules/retab-modules/RetabDoc";
import { log } from "console";
import { TMeiTag } from "../../modules/db-types";
import { some } from "lodash";
import { includeMeiTagChildrenRecursively } from "../../utils";
const router = Router();


router.get('/', authMiddleware, async (req, res) => {
    return res.json('/test')
})
router.get('/dbman', authMiddleware, async (req, res) => {
    const prisma = DB.getInstance();
    //@ts-ignore
    const user = await RetabUser.getUser(req.userId!);

    const IMPORTED_FILE_MAIN_CHILD_ID = 109718;

    const meiMainTagsAfter = await prisma.meiTag.findMany({
        where: {
            AND: [
                {
                    id: { gte: IMPORTED_FILE_MAIN_CHILD_ID }

                },
                { tagTitle: 'mei' }
            ]
        }, include: {
            doc: true
        },
        orderBy: {
            doc: { id: 'desc' }
        }
    })




    /*to remove extra mainTags 
        const mainTagsWithoutDoc = await prisma.meiTag.findMany({
        where: {
            AND: [
                { tagTitle: 'mei' },
                { doc: null }
            ]
        },

        ...includeMeiTagChildrenRecursively()
    });

    
    const mainTags = await prisma.meiTag.findMany({
        where: {
            AND: [
                { tagTitle: 'mei' },
            ]

        },
        select: {
            doc: true
        }
    })

    const idsToDelete: number[] = [...mainTagsWithoutDoc.map(i => i.id)];


    function pushChildrenIds(tag: TMeiTag) {

        const ids = tag.children?.map(ch => ch.id as number) || [];
        idsToDelete.push(...ids)
        if (!tag.children?.length) return;
        else tag.children?.forEach(ch => pushChildrenIds(ch))
    }

    mainTagsWithoutDoc.forEach(mainTag => pushChildrenIds(mainTag))

    const finalIdsToDelete = await prisma.meiTag.findMany({
        where: {
            AND: [
                { 
                    id: { in: idsToDelete } 
                }, 
                // {
                //     parents: {
                //      every:{
                //         AND: [
                //             {id: {in: idsToDelete}}
                //         ]
                //      }
                //     }
                // }
            ]
        },
        select: {
            id: true,
            parents: {select :{id: true}}
        }
    })


    const tagsMustBeDeleted = await prisma.meiTag.deleteMany({
        where:{
            AND: [
                {id: {in: finalIdsToDelete.map(i => i.id)}},
              
            ] 
        },
        // select: {
        //     parents: true
        // }
    })


    */
   
    const weirdHeads = [110366,110548,110848,110963,111093,111302,111704,111820,112413,112751,112940,113136,113327,113525,113790,114276,114496,114685,115008,115331,115664,115866,116072,116286,116476,116663,116880,117088,117284,117488,117821,118019,118230,118353,118572,118774,118969,119165]
    //    const luteConvs = await prisma.meiTag.findMany({
    //     where: {
    //         AND: [
    //             {xmlId: 'luteconv'},
    //             {
    //                 parents:{
    //                     every: {
    //                         parents: {
    //                             every: {
    //                                 parents: {
    //                                     every: {
    //                                         parents: {
    //                                             none: {
    //                                                 doc: null
    //                                             }
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }

    //         ]
    //     },
    //     select: {
    //         id: true,
    //         parents: {
    //             select: {
    //                 parents: {
    //                     select: {
    //                         parents: {
    //                             select: {
    //                                 id: true,
    //                                 tagTitle: true,
    //                                 parents: {
                                     
    //                                     select: {
    //                                         id: true,
    //                                         tagTitle: true,
    //                                         doc: true

    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })




    const docsInfected = [475,476,477,478,479,480,481,482,483,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513]
    const lastHealthyDoc = await prisma.retabDoc.findFirst({
        where: {
            id: {lt: Math.min(...docsInfected)},
        },
        orderBy: {id: 'desc'}
    })

    
   return res.json([
    // luteConvs.map(t => t.parents[0].parents[0].parents[0].id)
    // luteConvs,
    docsInfected.length,

    lastHealthyDoc
    // docsNotInfected
   ])
    return res.json('done!')
})

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