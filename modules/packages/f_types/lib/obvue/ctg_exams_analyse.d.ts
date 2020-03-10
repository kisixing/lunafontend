export interface AccPoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
    reliability: number;
}
export interface DecPoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
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
        fm: null;
        fhrbaselineMinute: number[];
        ucdata: {
            ucIndex: number[];
            uctimes: number;
            ucStrong: number;
            uckeeptime: number;
            ucdurationtime: number;
        };
    };
    score: {
        ret: number;
        msg: string;
        cstdata?: null;
        sogcdata?: null;
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
            total: number;
            bhrvalue: number;
            ltvalue: number;
            stvvalue: number;
            accvalue: number;
            decvalue: number;
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
            ltvalue: number;
            stvvalue: number;
            accvalue: number;
            decvalue: number;
        };
    };
}
