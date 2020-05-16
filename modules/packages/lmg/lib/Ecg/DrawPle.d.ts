import Draw from "../Draw";
import Queue from "./Queue";
export declare class DrawPle extends Draw {
    static Queue: typeof Queue;
    private ecg_scope?;
    private ple_data;
    private _current_times?;
    get current_times(): number;
    set current_times(value: number);
    private max_times?;
    private start?;
    private intervalIds;
    private last_points;
    constructor(width: number, height: number, canvas: HTMLCanvasElement);
    init(ple_data: Queue): void;
    destroy(): void;
    initparm(): void;
    drawsingle(): void;
    clearcanvans(): void;
    GetYStarts(C: any): any[];
}
