import { Router } from "express";
import RetabUser from "../../../modules/retab-modules/User";
import { TUser } from "../../../modules/db-types";
import DB from "../../../modules/DB";

const router = Router();

router.get('/encoder-headers', async (req, res) => {
    //@ts-ignore
    const user = await RetabUser.getUser(req.userId!)
    const encoderHeaders  = await user.getEncoderHeaders();
     return res.send(encoderHeaders)
})
router.get('/signup', async (req, res) => {
    const prisma = DB.getInstance();

    
    const lastTestUser = await prisma.user.findFirst({
        where: {
            name: {
                contains: 'TestUser'
            }
        },
        orderBy: {id: 'desc'},

    })

    const testingCount =  Number(/(\d+)/.exec(lastTestUser?.name || '')?.[1]) + 1 || 1
    const userInfo: TUser = {
        email: 'testEmail'+ testingCount + '@gmail.com',
        password: 'testPass', 
        username: 'TestUsername' + testingCount,
        name: 'TestUser Asghari ' +   testingCount,
        
    }
    
    const result = await RetabUser.signup(userInfo);

    
    return res.send(result)
})
router.get('/logout', async (req, res) => {
    res.clearCookie('x-access-token')
    res.status(200).json({
        message: 'Logged out successfully',
    })
});


export default router