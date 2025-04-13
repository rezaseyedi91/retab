import { Router } from "express";
import DB from "../../modules/DB";
import RetabUser from "../../modules/retab-modules/User";
import authMiddleware from '../../middleware/auth'
const router = Router();
const prisma = DB.getInstance();
router.use(authMiddleware)
router.get('/', async (req, res) => {
    try {
        return res.json({

        })
    } catch (err) {
        console.log(err)
        res.send('error loged')
    }
})
function includeChildrenRecursively(n = 1): any {
    if (n >= 20) return {
        include: { children: { orderBy: { indexAmongSiblings: 'asc' } }, attributes: true }
    }
    else return {
        include: { children: { ...includeChildrenRecursively(n + 1), orderBy: { indexAmongSiblings: 'asc' } }, attributes: true }
    }
}
export default router;