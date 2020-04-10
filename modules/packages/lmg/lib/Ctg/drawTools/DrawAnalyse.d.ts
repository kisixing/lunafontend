import Draw from "../../Draw";
import { obvue } from "@lianmed/f_types";
import { AccPoint, DecPoint } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
export interface AnalyseData {
    acc?: AccPoint[];
    dec?: DecPoint[];
    baseline?: number[];
    start?: number;
    end?: number;
}
export declare class DrawAnalyse extends Draw {
    analysisData: obvue.ctg_exams_analyse;
    constructor(canvas: HTMLCanvasElement, width?: number, height?: number);
    init(): void;
    setData(analyseData: obvue.ctg_exams_analyse): void;
    drawBaseline(cur: any, color: any, yspan: any, xspan: any, max: any, basetop: any): void;
    drawflag: (canvas: any, x: number, y: number, index: number) => void;
    inRange: (value: number, min: number, max: number) => boolean;
    ctgscore: (type: number, start: number, end: number) => void;
    revice(x: number, y: number): void;
}
