import { Router } from "express";

import { getInstance as getVerovioToolkitInstance } from '../../modules/mei-adapters/VerovioToolkitInstance'
import { promises, readFile } from "fs";
import retabTestRouter from './retab'
import getMidiRouter from './get-midi'
import DB from "../../modules/DB";
import { PrismaClient } from "@prisma/client";
import { defineTuningPresets } from "./defineTuningPresets";
const router = Router();

router.get('/dbman', async (req, res) => {
})
router.use('/retab', retabTestRouter)

router.use('/get-midi', getMidiRouter)
 

router.get('/render', async (req, res) => {
    try {

 
        const query = req.query;
        const filename = query.filename;
        if (!filename) return res.json({msg: 'filename query must be provided'});
        const fileType = '.' + query.fileType || 'mei'
        const filepath = './mei-docs/' + filename + fileType
        const str = (await promises.readFile(filepath, {encoding: 'utf-8'})).toString();
        if (!str) return res.json({msg: filepath + ' not found.'});
        const verovioToolkit = await getVerovioToolkitInstance();
        if (!verovioToolkit) return res.json({msg:  'err.'});
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

    } catch(err) {
        res.send(err)
    }
})


export default router;