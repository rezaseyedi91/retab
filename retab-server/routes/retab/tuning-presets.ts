import { Router } from "express";
import TuningPreset from "../../modules/retab-modules/TuningPreset";

const router = Router();


router.get('/', async (req, res) => {console.log('heyy'); res.json(await TuningPreset.getOptions())})

export default router