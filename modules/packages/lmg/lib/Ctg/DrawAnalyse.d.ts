import Draw from "../Draw";
interface accDecPoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
}
export interface AnalyseData {
    acc?: accDecPoint[];
    dec?: accDecPoint[];
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
    drawflag: (canvas: any, x: any, y: any, index: number) => void;
}
export {};
