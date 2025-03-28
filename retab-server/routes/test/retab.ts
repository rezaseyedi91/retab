import { Router } from "express";
import DB from "../../modules/DB";

const router = Router();
const prisma = DB.getInstance();
router.get('/', async (req, res) => {
    const result = await  prisma.retabDoc.findFirst({
        where: {id: 1},
        include: {
            mainChild: {
                include: {
                    children: includeChildrenRecursively(),
                    attributes: true
                }
            }
        }

    }) 
    res.json(result);
})
function includeChildrenRecursively(n = 1): any {
    if (n >= 20) return {
        include: {children: {  orderBy: {indexAmongSiblings: 'asc'}}, attributes: true}
    }
    else return {
        include: { children: {...includeChildrenRecursively(n + 1),  orderBy: {indexAmongSiblings: 'asc'} },  attributes: true}
    }
}
export default router;