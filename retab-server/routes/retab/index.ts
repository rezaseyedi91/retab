import { Router } from "express";
import docRouter from './doc'
import tuningPresetsRouter from './tuning-presets'
import DB from "../../modules/DB";
import authRouter from './auth'
const router = Router(); 
import authMiddleware from '../../miiddleware/auth'
router.use('*', authMiddleware)
router.use('/doc', docRouter)
router.use('/tuning-presets', tuningPresetsRouter)
router.use('/auth', authRouter)
router.get('/test', async (req, res) => {
    console.log('listen! see also /test/retab.')

    res.json('meiMainTag')
})
export default router