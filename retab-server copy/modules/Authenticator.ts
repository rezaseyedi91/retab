import DB from "./DB";
import { TUser } from "./db-types";
import RetabUser, { RetabAdmin } from "./retab-modules/User";
import * as bcryptjs from 'bcryptjs';
import * as  jwt from 'jsonwebtoken'
export default class Authenticator {
    static SALT_SIZE = 10;
    async login(username: string, password: string, { checkAdmin } = { checkAdmin: false }): Promise<RetabUser> {

        try {

            await DB.getInstance().$connect().catch(e => { throw new Error('No Connection To Database') })
            const existingUser = await DB.getInstance().user.findFirst({
                where: {
                    AND: [
                        { OR: [{ username }, { email: username }] },
                        ...checkAdmin ? [{ isAdmin: true }] : []
                    ]
                },
            })

            if (!existingUser) throw new Error('No such ' + (checkAdmin ? 'admin' : 'user'));

            const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password!);
            if (!isPasswordCorrect) throw new Error('Password is not correct');
            existingUser.password = ''


            const user = new RetabUser().setInfo(existingUser)
            return user
        } catch (err) {
            throw err
        }
    }

    async singup(info: TUser) {
        const prisma = DB.getInstance();
        const alreadyThere = await prisma.user.findFirst({
            where: {
                email: info.email
            }
        })

        if (alreadyThere) throw new Error('user already Exists');
        const hashedPassword = Authenticator.hash(info.password!);

        const savedUser = await prisma.user.upsert({
            where: {
                email: info.email || info.email!,
            },
            create: {
                name: info.name || '[NO NAME]',
                password: hashedPassword,
                email: info.email || '[NO EMAIL]',
                username: '[NO USERNAME]' + '[' + info.email + ']',

            }, update: {}

        })
        const user = new RetabUser();
        user.setInfo(savedUser)
        return user;
    }


    static async loggedInUser(token: string, checkAdmin: boolean) {
        const userData = jwt.decode(token) as any;
            const foundUser = checkAdmin ? await RetabAdmin.getAdmin(userData.id) : await RetabUser.getUser(userData.id)
            const result = !checkAdmin ? foundUser || false : foundUser?.isAdmin ? foundUser : false
            return result
    }


    static randomPassword(length = 5) {
        const strings = ['a', 'b','c','d','e','f','g','h', '1', '2', '3', '4','5', '6', '7', '8', '9'];
        return new Array(length).fill(null).map(() => strings[Math.floor(Math.random() * strings.length)]).join('');
    }


    static hash(string?: string) {
        return bcryptjs.hashSync(string!, Authenticator.SALT_SIZE);
    }
} 