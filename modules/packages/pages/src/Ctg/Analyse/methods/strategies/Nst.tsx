import { ctg_exams_analyse_score } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
import { inRange } from "./utils";
type TData = ctg_exams_analyse_score['nstdata']
export function Nst(_data: TData) {
    const nstdata: TData = JSON.parse(JSON.stringify(_data))
    const { bhrvalue, ltvvalue, accdurationvalue, accamplvalue, fmvalue } = nstdata
    let bhr = Number(bhrvalue) || 0
    let ltv = Number(ltvvalue) || 0
    let fhr_uptime = Number(accdurationvalue) || 0
    let fhr_ampl = Number(accamplvalue) || 0
    let fmnum = Number(fmvalue)

    // 基线选项
    if (bhr < 100)
        nstdata.bhrscore = 0;
    else if (inRange(bhr, 100, 109) || bhr > 160)
        nstdata.bhrscore = 1;
    else if (inRange(bhr, 110, 160)) {
        nstdata.bhrscore = 2;
    }
    // 振幅

    if (ltv < 5) {
        nstdata.ltvscore = 0;
    } else if (inRange(ltv, 5, 9) || ltv > 30) {
        nstdata.ltvscore = 1;
    } else if (inRange(ltv, 10, 30)) {
        nstdata.ltvscore = 2;
    }
    // 胎动fhr上升时间
    if (fhr_uptime < 10) {
        nstdata.accdurationscore = 0;
    } else if (inRange(fhr_uptime, 10, 14)) {
        nstdata.accdurationscore = 1;
    } else if (fhr_uptime >= 15) {
        nstdata.accdurationscore = 2;
    }
    // 胎动fhr变化幅度
    if (fhr_ampl < 10) {
        nstdata.accamplscore = 0;
    } else if (inRange(fhr_ampl, 10, 14)) {
        nstdata.accamplscore = 1;
    } else if (fhr_ampl >= 15) {
        nstdata.accamplscore = 2;
    }
    // 胎动
    nstdata.fmvalue = fmnum;
    if (fmnum == 0) {
        nstdata.fmscore = 0;
    } else if (inRange(fmnum, 1, 2)) {
        nstdata.fmscore = 1;
    } else if (fmnum >= 3) {
        nstdata.fmscore = 2;
    }
    //kisi add 2020-04-26
    // 减速
    // analysis.ldtimes = countDec(analysis.start, analysis.end, 'LD');//analysis.ldtimes;
    // analysis.vdtimes = countDec(analysis.start, analysis.end, 'VD');//analysis.vdtimes;
    // analysis.edtimes = countDec(analysis.start, analysis.end, 'ED');//analysis.edtimes;
    //@ts-ignore
    nstdata.total = nstdata.accamplscore + nstdata.accdurationscore + nstdata.bhrscore + nstdata.fmscore + nstdata.ltvscore;

    return nstdata
}