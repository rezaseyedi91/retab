import DB from "../../modules/DB";
import { TTabCourseTuningInfo, TTuningPreset } from "../../modules/db-types";
import TuningPreset from "../../modules/retab-modules/TuningPreset";

export async function defineTuningPresets(tunings: TTabCourseTuningInfo[][]) {
    const result:any[] =[]
    TuningPreset.COUNT = 0;
    for (const tuning of tunings) {
        result.push(await new TuningPreset(tuning).save())
    }
    return result
}