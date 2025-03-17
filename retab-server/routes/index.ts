import { Router } from "express";
import retabRouter from './retab'

const router = Router();

router.get('/', async (req, res) => {
    try {
        
        res.send('retab server is working fine.')

    } catch(err) {
        res.send('err happened')
    }
})

router.use('/retab', retabRouter)



export default router