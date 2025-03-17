import { Router } from "express";

const router = Router();

router.use( '*',(req, res, next) => {
    console.log('authentication, ')
    next();
})
export default router;