import { debug } from "../../utils";
import DB from "../DB";
import { TTabCourseTuningInfo, TTuningPreset } from "../db-types";

export default class TuningPreset implements TTuningPreset {
    id?: number | undefined;
    title: string | undefined;
    tuning?: TTabCourseTuningInfo[] | undefined;
    static COUNT = 0;
    constructor(tuning: TTabCourseTuningInfo[], titleOrId?: string | number) {
        let title = typeof titleOrId == 'string' ? titleOrId : undefined
        title = title || 'preset-' + (this.id || ++TuningPreset.COUNT)
        this.title = title
        this.id = typeof titleOrId == 'number' ? titleOrId : undefined
        this.tuning = tuning;
    }
    async save() {
       
        const prisma = DB.getInstance();
        if (!this.tuning?.length) return
        const coursesIds = await prisma.$transaction(this.tuning?.map(c => {
            return prisma.tabCourseTuningInfo.upsert({
                where: { n_pname_oct: { n: c.n, oct: c.oct, pname: c.pname } },
                create: { n: c.n, oct: c.oct, pname: c.pname },
                update: {},
                select: { id: true }
            })
        }))

        const alreadySaved = await prisma.tuningPreset.findFirst({
            where: {
                OR: [
                    { title: this.title },
                    { id: this.id }
                ],
            },
            select: {
                id: true,
                tuning: { select: { id: true } }
            }
        })

        const extraIds = alreadySaved?.tuning.filter(c => !coursesIds.find(newCourse => newCourse.id == c.id))

        const result = await prisma.tuningPreset.upsert({
            where: {
                title: this.title!
            },
            update: {
                tuning: {
                    connect: coursesIds,
                    disconnect: extraIds
                },

            },
            create: {
                title: this.title!,
                tuning: {
                    connectOrCreate: this.tuning?.map(c => ({
                        create: { n: c.n, oct: c.oct, pname: c.pname, },
                        where: { n_pname_oct: { n: c.n, oct: c.oct, pname: c.pname } }
                    }))
                }
            }
        })

     
    }

    static async getOptions() {
        const all =  await DB.getInstance().tuningPreset.findMany({
            include: {
                tuning: true
            },
            orderBy: {
                title: 'asc'
            }
        })
        //@ts-ignore temporarily sort by prest-n;
        return all.sort((a, b) => a.title.length - b.title.length)

    }



}
