import { Router } from "express";

const router = Router();

router.post('/', async (req, res) => {
    
    console.log(req.headers["content-type"])
})


export default router;