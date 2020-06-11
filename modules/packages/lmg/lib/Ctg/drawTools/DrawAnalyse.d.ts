import { obvue } from "@lianmed/f_types";
import Draw from "../../Draw";
import { AnalyseType, PointType } from '../../interface';
import { Suit } from "../Suit";
import { DecType, AccPoint, DecPoint } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
export declare class DrawAnalyse extends Draw {
    pointToInsert: {
        type: PointType;
        index: number;
    };
    pointToEdit: AccPoint | DecPoint;
    mapXtoY: {
        [x: string]: {
            y: number;
            index: number;
        };
    };
    mapBaselilneXtoY: {
        [x: string]: number;
    };
    analysisData: obvue.ctg_exams_analyse;
    suit: Suit;
    constructor(wrap: HTMLElement, canvas: HTMLCanvasElement, suit: Suit);
    init(): void;
    setData(analyseData: obvue.ctg_exams_analyse): void;
    drawBaseline(cur: any, color: any, yspan: any, xspan: any, max: any, basetop: any): void;
    analyse(type: AnalyseType, start?: number, end?: number, data?: {
        analysis?: {
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
            isSinusoid: boolean;
        };
        score?: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").ctg_exams_analyse_score;
    }): {
        analysis?: {
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
            isSinusoid: boolean;
        };
        score?: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").ctg_exams_analyse_score;
    };
    drawflag: (canvas: CanvasRenderingContext2D, x: number, y: number, index: number) => void;
    inRange: (value: number, min: number, max: number) => boolean;
    countAcc: (start: number, end: number) => number;
    countDec: (start: number, end: number, type: string) => number;
    cycleAcc: () => 1 | 0;
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
            isSinusoid: boolean;
        };
        score?: import("@lianmed/f_types/lib/obvue/ctg_exams_analyse").ctg_exams_analyse_score;
    };
    revicePoint(x: number, y: number): string;
    refresh(): void;
    markAccPoint(): void;
    editAccPoint(marked?: boolean): void;
    markDecPoint(type: DecType): void;
    editDecPoint(type: DecType): void;
}
