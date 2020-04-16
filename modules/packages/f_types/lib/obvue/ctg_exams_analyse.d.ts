interface BasePoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
    x?: number;
    y?: number;
    marked?: boolean;
}
export interface AccPoint extends BasePoint {
    reliability: number;
}
export declare type DecType = 'ld' | 'ed' | 'vd';
export interface DecPoint extends BasePoint {
    type: DecType;
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
        sogcdata?: {
            bhrscore: number;
            ltvvalue: number;
            ltvscore: number;
            accscore: number;
            accvalue: number;
            bhrvalue: number;
        };
        ret: number;
        msg: string;
        cstdata?: null;
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
            ltvvalue: number;
            totalscore: number;
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
            decvalue: string;
            fmvalue: number;
        };
        fischerdata?: {
            ltvvalue: number;
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
            decvalue: string;
        };
    };
}
export {};
