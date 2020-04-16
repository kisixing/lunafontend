interface BasePoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
    x: number;
    y: number;
    marked: boolean;
}
export interface AccPoint extends BasePoint {
    reliability: number;
}
export interface DecPoint extends BasePoint {
    type: string;
}
export interface _ctg_exams_analyse {
    analysis: {
        bhr: number;
        ltv: number;
        stv: number;
        edtimes: number;
        ldtimes: number;
        vdtimes: number;
        acc: AccPoint[];
        dec: DecPoint[];
        fm: number[];
        fhrbaselineMinute: number[];
        ucdata: {
            ucIndex: number[];
            uctimes: number;
            ucStrong: number;
            uckeeptime: number;
            ucdurationtime: number;
        };
        start: number;
        end: number;
    };
    score: {
        ret: number;
        msg: string;
        cstdata?: {

        };
        sogcdata?: {
            bhrscore: number;
            ltvscore: number;
            accscore: number;
            decscore: number;
            totalscore: number;
            bhrvalue: number;
            ltvvalue: number;
            accvalue: number;
            decvalue: string;
        };
        nstdata?: {
            bhrscore: number;
            ltvscore: number;
            accdurationscore: number;
            accamplscore: number;
            fmscore: number;
            totalscore: number;
            bhrvalue: number;
            ltvvalue: number;
            accdurationvalue: number;
            accamplvalue: number;
            fmvalue: number;
        };
        Krebsdata?: {
            bhrscore: number;
            ltvscore: number;
            stvscore: number;
            accscore: number;
            decscore: number;
            fmscore: number;
            totalscore: number;
            bhrvalue: number;
            ltvvalue: number;
            stvvalue: number;
            accvalue: number;
            decvalue: string;
            fmvalue: number;
        };
        fischerdata?: {
            bhrscore: number;
            ltvscore: number;
            stvscore: number;
            accscore: number;
            decscore: number;
            totalscore: number;
            bhrvalue: number;
            ltvvalue: number;
            stvvalue: number;
            accvalue: number;
            decvalue: string;
        };
    };
}
export {};
