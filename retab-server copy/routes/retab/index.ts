import { Router } from "express";
import docRouter from './doc'
import tuningPresetsRouter from './tuning-presets'
import DB from "../../modules/DB";
import authRouter from './auth'
import userRouter from './user'
import adminRouter from './admin'
const router = Router(); 
import authMiddleware from '../../middleware/auth'
router.use('*', authMiddleware)
router.use('/doc', docRouter)
router.use('/tuning-presets', tuningPresetsRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.get('/test', async (req, res) => {
    res.json('meiMainTag')
})
export default router