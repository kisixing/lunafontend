import Draw from "../../Draw";
interface accPoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
}
interface decPoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
    type: string;
}
export interface AnalyseData {
    acc?: accPoint[];
    dec?: decPoint[];
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
