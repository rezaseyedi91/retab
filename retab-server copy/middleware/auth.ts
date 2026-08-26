import { Router } from "express";
import jwt from 'jsonwebtoken'
const router = Router();

router.use( '*',(req, res, next) => {
    try {
        
        const token = req.cookies['x-access-token']
        const userData =  jwt.decode(token);
        Object.assign(req, {userId: (userData as any)?.id});
        next();
    } catch(err) {
        console.log(err);
        
    }
})
export default router;