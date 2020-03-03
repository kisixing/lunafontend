import Draw from "../Draw";
interface AnalyseData {
    acc?: number[];
    dec?: number[];
    baseline?: number[];
    start?: number;
    end?: number;
}
export declare class DrawAnalyse extends Draw {
    analyseData: AnalyseData;
    constructor(canvas: HTMLCanvasElement, width?: number, height?: number);
    setData(analyseData: AnalyseData): void;
    drawBaseline(cur: any, color: any, yspan: any, xspan: any, max: any, basetop: any): void;
    drawflag: (x: any, y: any, index: any) => void;
}
export {};
