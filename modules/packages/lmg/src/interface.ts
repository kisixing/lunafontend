import { ICacheItem } from "./services/types";
import { CSSProperties } from "react";
export interface IProps {
    data: ICacheItem;
    mutableSuitObject?: { suit: (Drawer | any) };
    onReady?: (suit: Drawer) => void;
    loading?: boolean;
    isFullscreen?: boolean
    audios?: string[]
    style?: CSSProperties
    [x: string]: any
}
export type AnalyseType = 'Nst' | 'Krebs' | 'Fischer' | 'Sogc' | 'Cst' | 'Cstoct';
export type PointType = 'EditAccPoint' | 'EditDecPoint' | 'MarkAccPoint' | 'MarkDecPoint' | 'BaselinePoint' |'other';


export interface Drawer {
    wrap: HTMLElement;
    resize: () => void;
    init: (data?: any) => void;
    destroy: () => void;
}
export type Canvas = HTMLCanvasElement
export type Div = HTMLDivElement
