import Draw from "../../Draw";
import { AccPoint, DecPoint } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
export interface AnalyseData {
    acc?: AccPoint[];
    dec?: DecPoint[];
    baseline?: number[];
    start?: number;
    end?: number;
}
export declare class DrawAnalyse extends Draw {
    analyseData: AnalyseData;
    constructor(canvas: HTMLCanvasElement, width?: number, height?: number);
    init(): void;
    setData(analyseData: AnalyseData): void;
    drawBaseline(cur: any, color: any, yspan: any, xspan: any, max: any, basetop: any): void;
    drawflag: (canvas: any, x: number, y: number, index: number) => void;
    revice(x: number, y: number): void;
}
