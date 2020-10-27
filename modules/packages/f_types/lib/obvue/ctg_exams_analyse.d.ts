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
    remove?: boolean;
    user?: boolean;
    reliability?: number;
    dataClean?:boolean;
}
export interface AccPoint extends BasePoint {
}
export declare type DecType = 'ld' | 'ed' | 'vd';
export interface DecPoint extends BasePoint {
    type: DecType;
}
type numberOrString = number | string
export interface ctg_exams_analyse_score {
    sogcdata?: {
        bhrscore: numberOrString;
        ltvvalue: numberOrString;
        ltvscore: numberOrString;
        accscore: numberOrString;
        accvalue: numberOrString;
        bhrvalue: numberOrString;
        decscore: numberOrString;
        decvalue: numberOrString;
        total: numberOrString;
        result: numberOrString;
    };
    cstdata?: {
        bhrscore: numberOrString;
        ltvvalue: numberOrString;
        ltvscore: numberOrString;
        stvscore: numberOrString;
        stvvalue: numberOrString;
        accscore: numberOrString;
        accvalue: numberOrString;
        bhrvalue: numberOrString;
        decscore: numberOrString;
        decvalue: numberOrString;
        total: numberOrString;
    };
    cstoctdata?: {
        bhrscore: numberOrString;
        ltvvalue: numberOrString;
        ltvscore: numberOrString;
        accscore: numberOrString;
        accvalue: numberOrString;
        bhrvalue: numberOrString;
        decscore: numberOrString;
        decvalue: numberOrString;
        edscore: numberOrString;
        edvalue: numberOrString;
        ldscore: numberOrString;
        ldvalue: numberOrString;
        vdscore: numberOrString;
        vdvalue: numberOrString;
        sinusoidscore: numberOrString;
        sinusoidvalue: numberOrString;
        total: numberOrString;
        result: numberOrString;
    };
    ret: number;
    msg: string;
    nstdata?: {
        bhrscore: numberOrString;
        ltvscore: numberOrString;
        accdurationscore: numberOrString;
        accamplscore: numberOrString;
        fmscore: numberOrString;
        total: numberOrString;
        bhrvalue: numberOrString;
        ltvvalue: numberOrString;
        accdurationvalue: numberOrString;
        accamplvalue: numberOrString;
        fmvalue: numberOrString;
    };
    krebsdata?: {
        ltvvalue: numberOrString;
        bhrscore: numberOrString;
        ltvscore: numberOrString;
        stvscore: numberOrString;
        accscore: numberOrString;
        decscore: numberOrString;
        fmscore: numberOrString;
        total: numberOrString;
        bhrvalue: numberOrString;
        ltvalue: numberOrString;
        stvvalue: numberOrString;
        accvalue: numberOrString;
        decvalue: numberOrString;
        fmvalue: numberOrString;
    };
    fischerdata?: {
        ltvvalue: numberOrString;
        bhrscore: numberOrString;
        ltvscore: numberOrString;
        stvscore: numberOrString;
        accscore: numberOrString;
        decscore: numberOrString;
        total: numberOrString;
        bhrvalue: numberOrString;
        ltvalue: numberOrString;
        stvvalue: numberOrString;
        accvalue: numberOrString;
        decvalue: numberOrString;
    };
}
export interface _ctg_exams_analyse {
    analysis: {
        length?:number;
        bhr?: number;
        ltv?: number;
        stv?: number;
        edtimes?: number;
        ldtimes?: number;
        vdtimes?: number;
        acc?: AccPoint[];
        dec?: DecPoint[];
        fm?: number[];
        fhrbaselineMinute?: number[];
        ucdata?: {
            ucIndex: number[];
            uctimes: number;
            ucStrong: number;
            uckeeptime: number;
            ucdurationtime: number;
        };
        start?: number;
        end?: number;
        isSinusoid?: boolean;
    };
    score: ctg_exams_analyse_score
}
export { };
