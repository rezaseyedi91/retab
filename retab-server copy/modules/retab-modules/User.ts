import { Prisma } from "@prisma/client";
import DB from "../DB";
import * as bcryptjs from 'bcryptjs';
import { TEncoderHeader, TRetabDoc, TUser } from "../db-types";
import Authenticator from "../Authenticator";

export default class RetabUser implements TUser {
    joinedAt?: Date | null | undefined;
    isAdmin?: boolean | undefined;
    docs?: TRetabDoc[] | undefined;
    id?: number | undefined;
    name?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    encoderHeaders?: TEncoderHeader[] | undefined;
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
        this.isAdmin = info.isAdmin || false
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

    getSigninInfo() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            name: this.name,
            isAdmin: this.isAdmin
        }
    }


    async getEncoderHeaders(count = 10): Promise<TEncoderHeader[]> {
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
                    AND: [
                        {
                            headerTag: {
                                parents: {
                                    some: {
                                        doc: {
                                            AND: [
                                                { mainChildId: { not: null } },
                                                {
                                                    OR: [
                                                        { altTitle: { not: null } },
                                                    ]
                                                }

                                            ]
                                        },
                                    }
                                }
                            }
                        },
                        { userId: this.id || 0, }
                    ],
                },
                orderBy: {
                    id: 'desc'
                },
                take: count,
                select: {
                    id: true,
                    headerTag: {
                        select: {
                            parents: {
                                select: {
                                    doc: true,
                                    docId: true
                                }
                            },
                            indexAmongSiblings: true,
                            children: selectNested(10)

                        }
                    }
                },

            })

            return result as TEncoderHeader[]
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


    static async signup(info: TUser) {
        const password = await bcryptjs.hash(info.password || '', Authenticator.SALT_SIZE)
        const prisma = DB.getInstance();

        const result = await prisma.user.create({
            data: {
                name: info.name || '[NO NAME]',
                username: info.username || info.email || '',
                email: info.email || '',
                password
            },
            select: {
                name: true,
                username: true,
                email: true,
                id: true,
            }
        })

        return result
    }


    static async getAll() {

    }
}



export class RetabAdmin extends RetabUser {
    async resetUserPassword(id?: number) {
        if (!id) throw new Error("ID is not provided");
        const randomPassword = Authenticator.randomPassword();
        
        const result = await DB.getInstance().user.update({
            where: {
                id
            },
            data: {
                password: Authenticator.hash(randomPassword)
            }
        })
        
        return {newPassword: randomPassword}
    }
    async removeUser(id?: number) {
        if (!id) throw new Error("ID is not provided");
        const result = await DB.getInstance().user.delete({
            where: {
                id
            }
        })
        return result
    }
    docs?: TRetabDoc[] | undefined;
    email?: string | undefined;
    encoderHeaders?: TEncoderHeader[] | undefined;

    isAdmin = true

    static async getAdmin(id: number) {

        const userData = await DB.getInstance().user.findFirstOrThrow({ where: { AND: [{ id, isAdmin: true }] } })


        return new RetabAdmin().setInfo(userData);
    }

    async getUsersList() {
        const users = await DB.getInstance().user.findMany({
            orderBy: {
                id: 'desc'
            },
            // take,
            // skip:( page - 1 )*take,
            select: {
                name: true,
                docs: { select: { _count: true } },
                _count: { select: { docs: true } },
                email: true,
                encoderHeaders: true,
                id: true,
                username: true,
                joinedAt: true
            }
        })

        return users
    }
}