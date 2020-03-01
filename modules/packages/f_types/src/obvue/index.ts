
import { _prenatal_visitspage } from './prenatal_visitspage'
import { _ctg_exams_analyse } from './ctg_exams_analyse'
type Partial<T> = {
    [x in keyof T]?: T[x]
}
export declare namespace obvuew {
    export type prenatal_visitspage = Partial<_prenatal_visitspage>
    export type ctg_exams_analyse = Partial<_ctg_exams_analyse>
}
