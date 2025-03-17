import { Router } from "express";
import jwt from 'jsonwebtoken'
const router = Router();

router.use( '*',(req, res, next) => {
    const token = req.cookies['x-access-token']
    const userData =  jwt.decode(token);
    
    Object.assign(req, {userId: (userData as any)?.id});
    next();
})
export default router;