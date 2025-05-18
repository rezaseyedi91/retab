import { Router } from "express";
import RetabUser from "../../../modules/retab-modules/User";

const router = Router();

router.get('/encoder-headers', async (req, res) => {
    //@ts-ignore
    const user = await RetabUser.getUser(req.userId!)
    const encoderHeaders  = await user.getEncoderHeaders();
     return res.send(encoderHeaders)
})



export default router