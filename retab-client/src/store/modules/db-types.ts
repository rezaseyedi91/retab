import { TRezTabFileInfo, TStaffInfo } from "./types"

export type TUser = {
    // docs?: TRetabDoc[]
    id?: number
    name?: string
    username?: string
    password?: string | null
    email?: string | null
}


export type TDbDocSettings = {
    doc?: TRezTabFileInfo
    id?: number
    docId?: number
    defaultFirstTabgrpDurSymShow?: boolean
    tabgroupsIncludeDurAttribute?: boolean
    proportionInclude?: boolean
    proportionNum?: number | null
    proportionNumbase?: number | null
    proportionSign?: string | null
    proportionSlash?: number | null
}
export type TTabCourseTuningInfo = {
    staves?: TStaffInfo[]
    id?: number
    n: number
    pname: string
    oct: number
}
export type TTuningPreset = {
    tuning?: TTabCourseTuningInfo[]
    id?: number
    title?: string | null
}
