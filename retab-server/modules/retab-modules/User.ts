import { Prisma } from "@prisma/client";
import DB from "../DB";
import { TRetabDoc, TUser } from "../db-types";

export default class RetabUser implements TUser {

    
    docs?: TRetabDoc[] | undefined;
    id?: number | undefined;
    name?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;

    // static async getUser(username = 'defaultUser') {
    static async getUser(id?:number) {
        const userData = await DB.getInstance().user.findUniqueOrThrow({where: {id}})
        // const userData = await DB.getInstance().user.upsert({
        //     where: { username },
        //     create: { username, name: 'DefaultUser' },
        //     update: { username }
        // });
        return new RetabUser().setInfo(userData);
    }

    setInfo(info: TUser) {
        this.name = info.name;
        this.email = info.email || undefined;
        this.username = info.username;
        this.id = info.id;
        return this;
    }

    async getSavedDocsList(page: number, perPage: number, contains = "") {
        const prisma = DB.getInstance();
        const where: Prisma.RetabDocWhereInput = {
            AND: [
                { user: { id: this.id } },
                ...!contains ? [] : [{
                    OR: [
                        { filename: { contains } },
                        { title: { contains } },


                    ]
                }]
            ]
        }
        const [docsList, totalCount] = await prisma.$transaction([
            prisma.retabDoc.findMany({
                where,
                select: {
                    id: true,
                    title: true,
                    filename: true,
                    createdAt: true,
                    lastModifiedAt: true,
                },
                take: perPage,
                skip: (page - 1) * perPage,
                orderBy: { lastModifiedAt: 'desc' }
            }),
            prisma.retabDoc.count({
                where
            })
        ])
        const totalPages = Math.ceil(totalCount / perPage)
        return {
            docsList, totalPages
        }
    }

    getSignInfo() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            name: this.name
        }
    }
}