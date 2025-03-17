import { Router } from "express";
import retabRouter from './retab'
import loginRouter from './login'
const router = Router();

router.get('/', async (req, res) => {
    try {
        
        res.send('retab server is working fine.')

    } catch(err) {
        res.send('err happened')
    }
})
router.use('/retab', retabRouter)
router.use('/login', loginRouter)


export default router