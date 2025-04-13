import { Router } from "express";
import Authenticator from "../../modules/Authenticator";
import jwt from 'jsonwebtoken'
const router = Router();

router.post('/login', async (req, res) => {
    const userInfo = req.body;
    try {
    if (!userInfo.username || !userInfo.password) throw new Error('Username and password must be provided.')
        const user = await new Authenticator().login(userInfo.username, userInfo.password);
        const token = jwt.sign(user.getSignInfo(), process.env.SECRET_KEY || '');
        
        res.cookie('x-access-token', token).send(user);

    } catch(err: any) {
        // if (process.env.MODE == 'development') throw err  ; else 
        res.status(401).send(err?.message)
    }
    


})

router.get('/', async (req, res) => {
    
    const token = req.cookies['x-access-token']
    try {
        const userData =  jwt.decode(token);
        res.send(userData || false)
    } catch(err) {
        console.log(err)
    }
    // if (!isValid) return res.send(false);
    // const userInfo = jwt.decode(token);
    // return res.send(userInfo)
})


export default router;