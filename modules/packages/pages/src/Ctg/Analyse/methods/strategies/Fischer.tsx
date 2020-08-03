import { ctg_exams_analyse_score } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
import { inRange, getValue, isModified } from "./utils";
type TData = ctg_exams_analyse_score['fischerdata']
export function Fischer(_data: TData) {
    const fischerdata: TData = JSON.parse(JSON.stringify(_data))
    const { bhrvalue, ltvvalue, stvvalue, accvalue, decvalue } = fischerdata
    let bhr = Number(bhrvalue) || 0
    let zhenfu_tv = Number(ltvvalue) || 0
    let zhouqi_tv = Number(stvvalue) || 0
    let accnum = Number(accvalue) || 0
    let decnum = getValue(decvalue)
    // 基线选项

    if (bhr < 100 || bhr > 180) {
        fischerdata.bhrscore = 0;
    } else if (inRange(bhr, 100, 109) || inRange(bhr, 161, 180)) {
        fischerdata.bhrscore = 1;
    } else if (inRange(bhr, 110, 160)) {
        fischerdata.bhrscore = 2;
    }
    // 振幅变异
    if (zhenfu_tv < 5) {
        fischerdata.ltvscore = 0;
    } else if (inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 30) {
        fischerdata.ltvscore = 1;
    } else if (inRange(zhenfu_tv, 10, 30)) {
        fischerdata.ltvscore = 2;
    }
    // 周期变异
    fischerdata.stvvalue = zhouqi_tv;
    if (zhouqi_tv < 3) {
        fischerdata.stvscore = 0;
    } else if (inRange(zhouqi_tv, 3, 6)) {
        fischerdata.stvscore = 1;
    } else if (zhouqi_tv > 6) {
        fischerdata.stvscore = 2;
    }
    // 加速
    if (accnum == 0) {
        fischerdata.accscore = 0;
    } else if (inRange(accnum, 1, 4)) {
        fischerdata.accscore = 1;
    } else if (accnum > 4) {
        fischerdata.accscore = 2;
    }
    // 减速

    if (isModified(decnum)) {
        fischerdata.decscore = decnum;
    }

    //@ts-ignore
    fischerdata.total = fischerdata.bhrscore + fischerdata.accscore + fischerdata.decscore + fischerdata.ltvscore + fischerdata.stvscore;


    return fischerdata
}