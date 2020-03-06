
import { _prenatal_visitspage } from './prenatal_visitspage'
import { _ctg_exams_analyse, AccPoint, DecPoint } from './ctg_exams_analyse'
import { _ctg_exams_data } from './ctg-exams-data'
type Partial<T> = {
    [x in keyof T]?: T[x]
}
export declare namespace obvue {
    export type prenatal_visitspage = Partial<_prenatal_visitspage>
    export type ctg_exams_analyse = Partial<_ctg_exams_analyse>
    export type ctg_exams_data = Partial<_ctg_exams_data>

}

export { AccPoint, DecPoint }