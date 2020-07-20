import { ctg_exams_analyse_score, _ctg_exams_analyse } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
// import { inRange } from "./utils";
type TData = ctg_exams_analyse_score['sogcdata']
export function Sogc(_data: TData) {
    const sogcdata: TData = JSON.parse(JSON.stringify(_data))
    const { bhrscore, accscore, decscore, ltvscore } = sogcdata
    const all = [bhrscore, accscore, decscore, ltvscore]
    sogcdata.result = '可疑'
    //@ts-ignore
    if (all.every(_ => _ === 2)) {
        sogcdata.result = '异常'

    } else if (all.some(_ => _ === 0)) {
        sogcdata.result = '正常'

    }
    return sogcdata
}