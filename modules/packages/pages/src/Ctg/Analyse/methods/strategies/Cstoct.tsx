import { ctg_exams_analyse_score } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
// import { inRange } from "./utils";
type TData = ctg_exams_analyse_score['cstoctdata']
export function Cstoct(_data: TData) {
    const cstoctdata: TData = JSON.parse(JSON.stringify(_data))
    const { bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore } = cstoctdata
    const all = [bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore]
    cstoctdata.result = '可疑';
    //@ts-ignore
    if (all.every(_ => _ === 2)) {
        cstoctdata.result = '异常';
    } else if (all.some(_ => _ === 0)) {
        cstoctdata.result = '正常';
    }
    return cstoctdata
}