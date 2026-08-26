import { Router } from "express";
import Authenticator from "../../modules/Authenticator";
import jwt from 'jsonwebtoken'
import RetabUser from "../../modules/retab-modules/User";
import { TUser } from "../../modules/db-types";
import DB from "../../modules/DB";
const router = Router();

router.post('/login', async (req, res) => {
    const userInfo = req.body;
    try {
        if (!userInfo.username || !userInfo.password) throw new Error('Username and password must be provided.')
        const user = await new Authenticator().login(userInfo.username, userInfo.password);
        const token = jwt.sign(user.getSigninInfo(), process.env.SECRET_KEY || '');

        res.cookie('x-access-token', token).send(user);

    } catch (err: any) {
        // if (process.env.MODE == 'development') throw err  ; else 

        res.status(401).send(err?.message)
    }
})

router.post('/admin-login', async (req, res) => {
    const userInfo = req.body;
    try {
        if (!userInfo.username || !userInfo.password) throw new Error('Username and password must be provided.')
        const admin = await new Authenticator().login(userInfo.username, userInfo.password, { checkAdmin: true });
        const token = jwt.sign(admin.getSigninInfo(), process.env.SECRET_KEY || '');

        res.cookie('x-access-token', token).send(admin);

    } catch (err: any) {
        // if (process.env.MODE == 'development') throw err  ; else 

        res.status(401).send(err?.message)
    }
})

router.post('/signup', async (req, res) => {
    const signupInfo = req.body;


    try {
        if (!signupInfo.email || !signupInfo.password) throw new Error('Email and password must be provided.')
        const user = await new Authenticator().singup({
            email: signupInfo.email,
            name: signupInfo.name,
            password: signupInfo.password
        }
        );
        const token = jwt.sign(user.getSigninInfo(), process.env.SECRET_KEY || '');

        res.cookie('x-access-token', token).send(user);

    } catch (err: any) {
        // if (process.env.MODE == 'development') throw err  ; else 

        res.status(401).send(err?.message)
    }

})


router.get('/', async (req, res) => {
    const checkAdmin = req.query.checkAdmin == 'true' ? true:false;
    const token = req.cookies['x-access-token']
    try {
        
        const result = await Authenticator.loggedInUser(token, checkAdmin);
        res.send(result)
    } catch (err) {
        res.send(false)
    }
    // if (!isValid) return res.send(false);
    // const userInfo = jwt.decode(token);
    // return res.send(userInfo)
})




export default router;