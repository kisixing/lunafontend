import { ctg_exams_analyse_score } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
import { inRange } from "./utils";
type TData = ctg_exams_analyse_score['krebsdata']
export function Krebs(_data: TData) {
    const krebsdata: TData = JSON.parse(JSON.stringify(_data))
    const { bhrvalue, ltvvalue, stvvalue, accvalue, decvalue, fmvalue } = krebsdata
    let bhr = Number(bhrvalue) || 0
    let zhenfu_tv = Number(ltvvalue) || 0
    let zhouqi_tv = Number(stvvalue) || 0
    let accnum = Number(accvalue) || 0
    let decnum = Number(decvalue) || 0
    let fmnum = Number(fmvalue) || 0
    // 基线选项
    krebsdata.bhrvalue = bhr;
    if (bhr < 100 || bhr > 180) {
        krebsdata.bhrscore = 0;
    } else if (inRange(bhr, 100, 109) || inRange(bhr, 161, 180)) {
        krebsdata.bhrscore = 1;
    } else if (inRange(bhr, 110, 160)) {
        krebsdata.bhrscore = 2;
    }
    // 振幅变异
    krebsdata.ltvvalue = zhenfu_tv;
    if (zhenfu_tv < 5) {
        krebsdata.ltvscore = 0;
    } else if (inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 25) {
        krebsdata.ltvscore = 1;
    } else if (inRange(zhenfu_tv, 10, 25)) {
        krebsdata.ltvscore = 2;
    }
    // 周期变异
    krebsdata.stvvalue = zhouqi_tv;
    if (zhouqi_tv < 3) {
        krebsdata.stvscore = 0;
    } else if (inRange(zhouqi_tv, 3, 6)) {
        krebsdata.stvscore = 1;
    } else if (zhouqi_tv > 6) {
        krebsdata.stvscore = 2;
    }
    // 加速
    krebsdata.accvalue = accnum;
    if (accnum == 0) {
        krebsdata.accscore = 0;
    } else if (inRange(accnum, 1, 4)) {
        krebsdata.accscore = 1;
    } else if (accnum > 4) {
        krebsdata.accscore = 2;
    }
    // 减速

    if (decnum >= 2) {
        krebsdata.decscore = 0;
    } else if (decnum == 1) {
        krebsdata.decscore = 1;
    } else {
        krebsdata.decscore = 2;
    }
    // 胎动
    if (fmnum == 0) {
        krebsdata.fmscore = 0;
    } else if (inRange(fmnum, 1, 4)) {
        krebsdata.fmscore = 1;
    } else if (fmnum > 4) {
        krebsdata.fmscore = 2;
    }
    //@ts-ignore
    krebsdata.total = krebsdata.bhrscore + krebsdata.accscore + krebsdata.decscore + krebsdata.ltvscore + krebsdata.stvscore + krebsdata.fmscore;

    return krebsdata
}