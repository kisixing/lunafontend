import { EventEmitter } from "@lianmed/utils";
import { Drawer } from "./interface";
export default class Draw extends EventEmitter implements Drawer {
    sid: number;
    canvas: HTMLCanvasElement;
    context2D: CanvasRenderingContext2D;
    _width: number;
    _height: number;
    get width(): number;
    set width(v: number);
    get height(): number;
    set height(v: number);
    wrap: HTMLElement;
    constructor(wrap: HTMLElement, canvas?: HTMLCanvasElement);
    log: any;
    destroy(): void;
    init(data: any): void;
    resize(): void;
    autoWH(): void;
    _resize(): void;
}
