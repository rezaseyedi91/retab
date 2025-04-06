import { Router } from "express";
import TuningPreset from "../../modules/retab-modules/TuningPreset";
import { writeFileSync } from "fs";
import { defineTuningPresets } from "../test/defineTuningPresets";

const router = Router();


router.get('/', async (req, res) => {
    const options = await TuningPreset.getOptions();

    writeFileSync('./tuning-presets.json', JSON.stringify(options))
    res.json(options)
})


router.get('/define', async (req, res) => {
    const options = await TuningPreset.getOptions();
    const tunings = [
        {
            "title": "preset-1",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-2",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-3",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-4",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "e",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-5",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "c",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-6",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "c",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "",
                    "oct": 0
                },
                {
                    "n": 10,
                    "pname": "",
                    "oct": 0
                }
            ]
        },
        {
            "title": "preset-7",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "d",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-8",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "e",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-9",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "eb",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-10",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "eb",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "c",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "bb",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-11",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "eb",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "c",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-12",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "eb",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "d",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-14",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "eb",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "c",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "bb",
                    "oct": 1
                },
                {
                    "n": 12,
                    "pname": "a",
                    "oct": 1
                },
                {
                    "n": 13,
                    "pname": "g",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-15",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "eb",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "c",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "bb",
                    "oct": 1
                },
                {
                    "n": 12,
                    "pname": "a",
                    "oct": 1
                },
                {
                    "n": 13,
                    "pname": "g",
                    "oct": 1
                },
                {
                    "n": 14,
                    "pname": "f",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-16",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "e",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-17",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-18",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "c",
                    "oct": 2
                },
                {
                    "n": 12,
                    "pname": "b",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-19",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "c",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-20",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "d",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-21",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "c",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-22",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-23",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-24",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-25",
            "tuning": [
                {
                    "n": 1,
                    "pname": "g",
                    "oct": 4
                },
                {
                    "n": 2,
                    "pname": "d",
                    "oct": 4
                },
                {
                    "n": 3,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "f",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "c",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "e",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "c",
                    "oct": 2
                }
            ]
        },
        {
            "title": "preset-26",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "c",
                    "oct": 2
                },
                {
                    "n": 12,
                    "pname": "b",
                    "oct": 1
                },
                {
                    "n": 13,
                    "pname": "a",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-27",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 2
                },
                {
                    "n": 10,
                    "pname": "d",
                    "oct": 2
                },
                {
                    "n": 11,
                    "pname": "c",
                    "oct": 2
                },
                {
                    "n": 12,
                    "pname": "b",
                    "oct": 1
                },
                {
                    "n": 13,
                    "pname": "a",
                    "oct": 1
                },
                {
                    "n": 14,
                    "pname": "g",
                    "oct": 1
                }
            ]
        },
        {
            "title": "preset-28",
            "tuning": [
                {
                    "n": 1,
                    "pname": "a",
                    "oct": 3
                },
                {
                    "n": 2,
                    "pname": "e",
                    "oct": 3
                },
                {
                    "n": 3,
                    "pname": "b",
                    "oct": 3
                },
                {
                    "n": 4,
                    "pname": "g",
                    "oct": 3
                },
                {
                    "n": 5,
                    "pname": "d",
                    "oct": 3
                },
                {
                    "n": 6,
                    "pname": "a",
                    "oct": 2
                },
                {
                    "n": 7,
                    "pname": "g",
                    "oct": 2
                },
                {
                    "n": 8,
                    "pname": "f",
                    "oct": 2
                },
                {
                    "n": 9,
                    "pname": "e",
                    "oct": 2
                }
            ]
        }
    ]
    const result: any[] = []
    for (const tuning of tunings) {
        result.push(await new TuningPreset(tuning.tuning, tuning.title).save())
    }
    res.json(result)
})



export default router