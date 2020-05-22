import { ICacheItem } from "./services/types";
export interface IProps {
    data: ICacheItem;
    mutableSuitObject?: {
        suit: (Drawer | any);
    };
    onReady?: (suit: Drawer) => void;
    loading?: boolean;
    [x: string]: any;
}
export declare type AnalyseType = 'Nst' | 'Krebs' | 'Fischer' | 'Sogc' | 'Cst';
export declare type PointType = 'EditAccPoint' | 'EditDecPoint' | 'MarkAccPoint' | 'MarkDecPoint' | 'other';
export interface Drawer {
    wrap: HTMLElement;
    resize: () => void;
    init: (data?: any) => void;
    destroy: () => void;
}
export declare type Canvas = HTMLCanvasElement;
export declare type Div = HTMLDivElement;
