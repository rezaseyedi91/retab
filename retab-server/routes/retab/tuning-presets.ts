import { Router } from "express";
import TuningPreset from "../../modules/retab-modules/TuningPreset";
import { writeFileSync } from "fs";
import { defineTuningPresets } from "../test/defineTuningPresets";
import DB from "../../modules/DB";
import { TTuningPreset } from "../../modules/db-types";

const router = Router();


router.get('/', async (req, res) => {
    const options = await TuningPreset.getOptions();

    // writeFileSync('./tuning-presets.json', JSON.stringify(options))
    res.json(options)
})

router.get('/define', async (req, res) => {
    const tunings: TTuningPreset[] = [{
        title: 'Lute in E',
        tuning: [


            { n: 1, pname: "e", oct: 4, },
            { n: 2, pname: "b", oct: 3, },
            { n: 3, pname: "f#", oct: 3, },
            { n: 4, pname: "d", oct: 3, },
            { n: 5, pname: "a", oct: 2, },
            { n: 6, pname: "e", oct: 2, },]
    },
    {
        title: 'Lute in D',
        tuning: [



            { n: 1, pname: "d", oct: 4, },
            { n: 2, pname: "a", oct: 3, },
            { n: 3, pname: "e", oct: 3, },
            { n: 4, pname: "c", oct: 3, },
            { n: 5, pname: "g", oct: 2, },
            { n: 6, pname: "d", oct: 2, },]
    },
    {
        title: 'Lute in A',
        tuning: [



            { n: 1, pname: "a", oct: 4, },
            { n: 2, pname: "e", oct: 4, },
            { n: 3, pname: "b", oct: 3, },
            { n: 4, pname: "g", oct: 3, },
            { n: 5, pname: "d", oct: 3, },
            { n: 6, pname: "a", oct: 2, },]
    },
    {
        title: 'Lute in G (Default)',
        tuning: [




            { n: 1, pname: "g", oct: 4, },
            { n: 2, pname: "d", oct: 4, },
            { n: 3, pname: "a", oct: 3, },
            { n: 4, pname: "f", oct: 3, },
            { n: 5, pname: "c", oct: 3, },
            { n: 6, pname: "g", oct: 2, },]
    },



    {
        title: 'Theorbo',
        tuning: [



            { n: 1, pname: "a", oct: 3, },
            { n: 2, pname: "e", oct: 3, },
            { n: 3, pname: "b", oct: 3, },
            { n: 4, pname: "g", oct: 3, },
            { n: 5, pname: "d", oct: 3, },
            { n: 6, pname: "a", oct: 2, },
            { n: 7, pname: "g", oct: 2, },
            { n: 8, pname: "f", oct: 2, },
            { n: 9, pname: "e", oct: 2, },
            { n: 10, pname: "d", oct: 2, },
            { n: 11, pname: "c", oct: 2, },
            { n: 12, pname: "b", oct: 1, },
            { n: 13, pname: "a", oct: 1, },
            { n: 14, pname: "g", oct: 1, },]
    },

    ]
    const options = await TuningPreset.getOptions();
    await DB.getInstance().tuningPreset.deleteMany({});

    const result: any[] = []
    for (const tuning of tunings) {
        result.push(await new TuningPreset(tuning.tuning!, tuning.title!).save())
    }
    res.json(result)
})




export default router 