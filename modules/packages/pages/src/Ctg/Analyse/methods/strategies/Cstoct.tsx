import { ctg_exams_analyse_score, _ctg_exams_analyse } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
import { inRange } from "./utils";
type TData = ctg_exams_analyse_score['cstoctdata']
export function Cstoct(_data: TData, analysis: _ctg_exams_analyse['analysis']) {
    const cstoctdata: TData = JSON.parse(JSON.stringify(_data))
    const { bhrvalue, accvalue, sinusoidvalue, ldvalue, ltvvalue, edvalue, vdvalue } = cstoctdata
    cstoctdata.bhrscore = bhrvalue
    cstoctdata.accscore = accvalue
    cstoctdata.sinusoidscore = sinusoidvalue
    cstoctdata.ltvscore = ldvalue
    cstoctdata.ldscore = ltvvalue
    cstoctdata.edscore = edvalue
    cstoctdata.vdscore = vdvalue


    let bhr = Number(bhrvalue) || 0
    let acc = Number(accvalue) || 0
    let ltv = Number(ltvvalue) || 0
    let sinusoid = Number(sinusoidvalue) || 0
    let ld = Number(ldvalue) || 0
    let ed = Number(edvalue) || 0
    let vd = Number(vdvalue) || 0

    // 基线选项

    if (inRange(bhr, 110, 160))
        cstoctdata.bhrscore = 0;
    else if (inRange(bhr, 100, 109) || bhr > 160)
        cstoctdata.bhrscore = 1;
    else if (bhr < 100) { // bhr < 100 || (bhr > 160 && length > 30)
        cstoctdata.bhrscore = 2;
    }
    // 变异

    if (ltv < 5) {
        if (length < 40) {
            cstoctdata.ltvscore = 2;
        } else if (inRange(length, 40, 80)) {
            cstoctdata.ltvscore = 1;
        } else {
            cstoctdata.ltvscore = 0;
        }
    } else if (inRange(ltv, 5, 9) || ltv > 30) {
        cstoctdata.ltvscore = 1;
    } else if (inRange(ltv, 6, 25)) {
        cstoctdata.ltvscore = 2;
    }
    //正弦判断
    cstoctdata.sinusoidscore = sinusoid;

    // 加速
    cstoctdata.accvalue = acc;

    // 减速

    cstoctdata.edscore = ed;
    cstoctdata.ldscore = ld;
    cstoctdata.vdscore = vd;


    const { bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore } = cstoctdata
    const all = [bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore]
    cstoctdata.result = '可疑';
    //@ts-ignore
    if (all.every(_ => _ === 2)) {
        cstoctdata.result = '异常';
    } else if (all.every(_ => _ === 0)) {
        cstoctdata.result = '正常';
    }
    return cstoctdata
}