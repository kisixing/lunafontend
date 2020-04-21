import { obvue } from "@lianmed/f_types";
import Draw from "../../Draw";
import { AnalyseType } from '../../interface';
import { Suit } from "../Suit";
import { DecType } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
export declare class DrawAnalyse extends Draw {
    analysisData: obvue.ctg_exams_analyse;
    suit: Suit;
    constructor(canvas: HTMLCanvasElement, width: number, height: number, suit: Suit);
    init(): void;
    setData(analyseData: obvue.ctg_exams_analyse): void;
    drawBaseline(cur: any, color: any, yspan: any, xspan: any, max: any, basetop: any): void;
    analyse(type: AnalyseType, start: number, end: number, data: obvue.ctg_exams_analyse): {
        analysis?: {
            bhr: number;
            ltv: number;
            stv: number;
            edtimes: number;
            ldtimes: number;
            vdtimes: number;
            acc: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").AccPoint[];
            dec: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").DecPoint[];
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
        score?: {
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
                total: number;
                bhrvalue: number;
                ltvvalue: number;
                accdurationvalue: number;
                accamplvalue: number;
                fmvalue: number;
            };
            Krebsdata?: {
                ltvvalue: number;
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
                total: number;
                bhrvalue: number;
                ltvalue: number;
                stvvalue: number;
                accvalue: number;
                decvalue: string;
            };
        };
    };
    drawflag: (canvas: any, x: number, y: number, index: number) => void;
    inRange: (value: number, min: number, max: number) => boolean;
    countAcc: (start: number, end: number) => number;
    countDec: (start: number, end: number, type: string) => number;
    countFm: (start: number, end: number) => number;
    fhrDuration: (start: number, end: number) => number;
    fhrAmpl: (start: number, end: number) => number;
    ctgscore: (type: AnalyseType) => {
        analysis?: {
            bhr: number;
            ltv: number;
            stv: number;
            edtimes: number;
            ldtimes: number;
            vdtimes: number;
            acc: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").AccPoint[];
            dec: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").DecPoint[];
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
        score?: {
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
                total: number;
                bhrvalue: number;
                ltvvalue: number;
                accdurationvalue: number;
                accamplvalue: number;
                fmvalue: number;
            };
            Krebsdata?: {
                ltvvalue: number;
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
                total: number;
                bhrvalue: number;
                ltvalue: number;
                stvvalue: number;
                accvalue: number;
                decvalue: string;
            };
        };
    };
    revicePoint(x: number, y: number): string;
    refresh(): void;
    markAccPoint(x: number, y: number, marked?: boolean): void;
    markDecPoint(x: number, y: number, type: DecType): void;
}
