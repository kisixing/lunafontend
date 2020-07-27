import { ctg_exams_analyse_score, } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
import { inRange, getValue, isModified } from "./utils";
// function cycleAcc(accArr:AccPoint[]) {
//     let error = 8;

//     if (accArr.length < 3) return 0;
//     let base = accArr[1].index - accArr[0].index;
//     for (let i = 2; i < accArr.length; i++) {
//         let diff = accArr[i].index - accArr[i - 1].index;
//         if (diff > base + error || diff < base - error) {
//             return 1;
//         }
//     }
//     return 0;
// }

type TData = ctg_exams_analyse_score['cstdata']
export function Cst(_data: TData) {
    const cstdata: TData = JSON.parse(JSON.stringify(_data))
    const { bhrvalue, ltvvalue, stvvalue, accvalue, decvalue } = cstdata
    let bhr = Number(bhrvalue) || 0
    let zhenfu_tv = Number(ltvvalue) || 0
    let zhouqi_tv = Number(stvvalue) || 0
    let accnum = getValue(accvalue)
    let decnum = getValue(decvalue)

    // 基线选项
    if (bhr < 100 || bhr > 180) {
        cstdata.bhrscore = 0;
    } else if (inRange(bhr, 100, 109) || inRange(bhr, 161, 180)) {
        cstdata.bhrscore = 1;
    } else if (inRange(bhr, 110, 160)) {
        cstdata.bhrscore = 2;
    }
    // 振幅变异
    if (zhenfu_tv < 5) {
        cstdata.ltvscore = 0;
    } else if (inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 30) {
        cstdata.ltvscore = 1;
    } else if (inRange(zhenfu_tv, 10, 30)) {
        cstdata.ltvscore = 2;
    }
    // 周期变异
    if (zhouqi_tv < 3) {
        cstdata.stvscore = 0;
    } else if (inRange(zhouqi_tv, 3, 6)) {
        cstdata.stvscore = 1;
    } else if (zhouqi_tv > 6) {
        cstdata.stvscore = 2;
    }
    // 加速
    if (isModified(accnum)) {
        cstdata.accscore = accnum
    }
    // 减速
    if (isModified(decnum)) {
        cstdata.decscore = decnum
    }
    //@ts-ignore
    cstdata.total = cstdata.bhrscore + cstdata.accscore + cstdata.decscore + cstdata.ltvscore + cstdata.stvscore;

    return cstdata
}