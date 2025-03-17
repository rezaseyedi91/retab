import DB from "./DB";
import { TUser } from "./db-types";
import RetabUser from "./retab-modules/User";
import * as bcrypt from 'bcrypt';
export default class Authenticator {
    static SALT_SIZE = 10;
    async login(username: string, password: string): Promise<RetabUser> {
        const existingUser = await DB.getInstance().user.findUnique({
            where: {username},

        })
        if (!existingUser) throw new Error('No such user');
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password!);
        if (!isPasswordCorrect) throw new Error('Password is not correct');
        existingUser.password = ''
        const user = new RetabUser().setInfo(existingUser)
        return user
    }

    async singup(info: TUser) {
        const prisma = DB.getInstance();
        const alreadyThere = await prisma.user.findFirst({
            where: {
                username : info.username
            }
        })
        if (alreadyThere) throw new Error('user already Exists');
        const hashedPassword  = bcrypt.hashSync(info.password!, Authenticator.SALT_SIZE);
        const savedUser = await prisma.user.upsert({
            where :{
                username:  info.username || info.email!,
            },
            create: {
                name: info.name || '[NO NAME]',
                password: hashedPassword,
                username: info.username || '[NO USERNAME]' ,
                email: '[NO EMAIL]',

            }, update: {}

        })
        const user = new RetabUser();
        user.setInfo(savedUser)
        return user;
    }
} 