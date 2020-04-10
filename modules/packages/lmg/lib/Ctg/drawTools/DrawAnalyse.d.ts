import Draw from "../../Draw";
import { obvue } from "@lianmed/f_types";
import { AnalyseType } from '../../interface';
import { Suit } from "../Suit";
export declare class DrawAnalyse extends Draw {
    analysisData: obvue.ctg_exams_analyse;
    suit: Suit;
    constructor(canvas: HTMLCanvasElement, width: number, height: number, suit: Suit);
    init(): void;
    setData(analyseData: obvue.ctg_exams_analyse): void;
    drawBaseline(cur: any, color: any, yspan: any, xspan: any, max: any, basetop: any): void;
    analyse(data?: obvue.ctg_exams_analyse): void;
    drawflag: (canvas: any, x: number, y: number, index: number) => void;
    inRange: (value: number, min: number, max: number) => boolean;
    ctgscore: (type: AnalyseType, start: number, end: number) => void;
    revice(x: number, y: number): void;
}
