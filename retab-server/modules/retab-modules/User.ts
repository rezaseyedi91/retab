import { Prisma } from "@prisma/client";
import DB from "../DB";
import { TEncoderHeader, TRetabDoc, TUser } from "../db-types";

export default class RetabUser implements TUser {


    docs?: TRetabDoc[] | undefined;
    id?: number | undefined;
    name?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;

    // static async getUser(username = 'defaultUser') {
    static async getUser(id: number) {

        const userData = await DB.getInstance().user.findUniqueOrThrow({ where: { id } })
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
                    altTitle: true,
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


    async getEncoderHeaders(count = 1): Promise<TEncoderHeader[]> {
        try {

            function selectNested(remainingLevel = 20): any {
                const simple = {
                    orderBy: { indexAmongSiblings: 'asc' },
                    select: {
                        attributes: true,
                        selfClosing: true,
                        tagTitle: true,
                        xmlId: true,
                        textContent: true,
                        indexAmongSiblings: true,
                    }
                }
                if (!remainingLevel) return simple
                else return {
                    ...simple,
                    select: {
                        ...simple.select,
                        children: selectNested(remainingLevel - 1)
                    }
                    // children: includeNested(remainingLevel-1)
                }
            }
            const result = await DB.getInstance().encoderHeader.findMany({
                where: {
                    userId: this.id || 0,
                },
                orderBy: {
                    id: 'desc'
                },
                take: count,
                select: {
                    id: true,
                    headerTag: {
                        select: {
                            indexAmongSiblings: true,
                            children: selectNested(10)

                        }
                    }
                }
            })

            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async saveEncoderHeader(enHeader: TEncoderHeader) {
        try {
            const saveResult = await DB.getInstance().encoderHeader.upsert({
                where: {
                    headerTagId_userId: {
                        headerTagId: enHeader.headerTagId || 0, userId: this.id || 0
                    }

                },
                update: {
                    headerTag: {
                        connect: { id: enHeader.headerTagId },

                    },
                    user: { connect: { id: this.id } }
                },
                create: {
                    headerTag: {
                        connect: { id: enHeader.headerTagId },

                    },
                    user: { connect: { id: this.id } }
                }
            })

        } catch (error) {
            console.log(error);

        }
    }
}