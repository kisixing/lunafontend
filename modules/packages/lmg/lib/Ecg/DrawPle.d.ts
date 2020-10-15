import Draw from "../Draw";
import { ICacheItem } from "../services/types";
import Queue from "./Queue";
export declare class DrawPle extends Draw {
    static Queue: typeof Queue;
    private ple_data;
    private _current_times?;
    get current_times(): number;
    set current_times(value: number);
    private max_times?;
    start?: number;
    private intervalIds;
    private last_points;
    constructor(wrap: HTMLElement, canvas: HTMLCanvasElement);
    data: ICacheItem;
    init(data: ICacheItem): void;
    destroy(): void;
    _resize(): void;
    loop(): void;
    initparm(): void;
    drawsingle(): void;
    clearcanvans(): void;
    clear(): void;
}
