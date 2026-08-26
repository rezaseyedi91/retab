import { Router } from "express";
import Authenticator from "../../../modules/Authenticator";
import { type RetabAdmin } from "../../../modules/retab-modules/User";

const router = Router();
router.use('/', async (req, res, next) => {
    const token = req.cookies['x-access-token'];
    const checkAdmin = true;
    const admin = await Authenticator.loggedInUser(token, checkAdmin);
    if (!admin) res.status(401).send('Not Authenticated')
    next();
})
router.get('/get-users-list', async (req, res) => {
    try {
        const token = req.cookies['x-access-token'];
        const checkAdmin = true;
        const admin = await Authenticator.loggedInUser(token, checkAdmin) as RetabAdmin;

        if (!admin) throw new Error('not authenticated')
        // const page = Number(req.query.page ) || undefined
        // const take = Number(req.query.take ) || undefined
        const users = await admin.getUsersList()
        return res.send(users)
    } catch (err) {
        return res.status(401).send('Not authenticated')
    }
})


router.delete('/remove-user', async (req, res) => {
    try {

        const token = req.cookies['x-access-token'];
        const admin = await Authenticator.loggedInUser(token, true) as RetabAdmin
        if (!admin) throw new Error('not authenticated')
            const result = await admin.removeUser(req.body.id)
        
        return res.send(result)
    } catch (err) {
        console.log(err);
        
        return res.status(401).send('Not authenticated')
    }

})

router.put('/reset-password', async (req, res) => {
    try {
        const token = req.cookies['x-access-token'];
        const admin = await Authenticator.loggedInUser(token, true) as RetabAdmin
        if (!admin) throw new Error('not authenticated')
            const result = await admin.resetUserPassword(req.body.data.id)
        return res.send(result)
    } catch (err) {
        console.log(err);
        return res.status(401).send('Not authenticated')
    }

})
export default router;



