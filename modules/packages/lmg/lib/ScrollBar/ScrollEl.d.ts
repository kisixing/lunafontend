import { EventEmitter } from "@lianmed/utils";
interface IOptions {
    lockMovementX?: boolean;
    lockMovementY?: boolean;
    mates?: ScrollEl[];
}
export default class ScrollEl extends EventEmitter {
    hasMoved: boolean;
    wrapper: HTMLElement;
    el: HTMLElement;
    lockMovementX: false;
    lockMovementY: false;
    mates: ScrollEl[];
    private matesOldRect;
    private oldRect;
    constructor(wrapper: HTMLElement, options?: IOptions);
    setStyle(key: string, value: string | number): this;
    setStyles(styles: {
        [x: string]: string | number;
    }): this;
    toggleVisibility(): this;
    setVisibility(isHidden: any): void;
    addEventListener<k extends keyof HTMLElementEventMap>(key: k, cb: (e: HTMLElementEventMap[k]) => void): this;
    moveCb: (baseX: number, baseY: number, e: any) => void;
    mousedownCb: (e: any) => void;
    touchstartCb: (e: any) => void;
    setPosition(offset: number, isfire: boolean, direction: 'left' | 'top'): this;
    setLeft(offset: number, isfire?: boolean): this;
    getLeft(): number;
    setTop(offset: number, isfire?: boolean): this;
    getTop(): number;
    getRect(): ClientRect | DOMRect;
}
export declare function getCoordInDocument(e: any): {
    x: any;
    y: any;
};
export {};
