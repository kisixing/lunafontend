export interface IProps {
    data: any;
    mutableSuitObject?: {
        suit: (Drawer | any);
    };
    onReady?: (suit: Drawer) => void;
    loading?: boolean;
    [x: string]: any;
}
export declare type AnalyseType = 'Nst' | 'Krebs' | 'Fischer' | 'Sogc' | 'Cst';
export declare type PointType = 'AccPoint' | 'DecPoint' | 'other';
export interface Drawer {
    wrap: HTMLElement;
    resize: () => void;
    init: (data?: any) => void;
    destroy: () => void;
}
export declare type Canvas = HTMLCanvasElement;
export declare type Div = HTMLDivElement;
