export interface IProps {
    data: any;
    mutableSuitObject?: { suit: (Drawer | any) };
    onReady?: (suit: Drawer) => void;
    [x: string]: any
}

export interface Drawer {
    wrap: HTMLElement;
    resize: () => void;
    init: (data?: any) => void;
    destroy: () => void;
}
export type Canvas = HTMLCanvasElement
export type Div = HTMLDivElement
