import { Router } from "express";
import docRouter from './doc'
import tuningPresetsRouter from './tuning-presets'
import DB from "../../modules/DB";
const router = Router(); 
import authMiddleware from '../../miiddleware/auth'
router.use('*', authMiddleware)
router.use('/doc', docRouter)
router.use('/tuning-presets', tuningPresetsRouter)
router.get('/test', async (req, res) => {

    console.log('listen! see also /test/retab.')
    const meiMainTag = await DB.getInstance().meiTag.findFirst({
        where: {id: {equals: 690}},
        include: {children: true, parent: true},
    })
    res.json(meiMainTag)
})
export default router