
export interface IProps {
    data: any;
    mutableSuitObject?: { suit: (Drawer | any) };
    onReady?: (suit: Drawer) => void;
    loading?: boolean;
    [x: string]: any
}
export type AnalyseType = 'Nst' | 'Krebs' | 'Fischer' | 'Sogc' | 'Cst';
export type PointType = 'EditAccPoint' | 'EditDecPoint' | 'MarkAccPoint' | 'MarkDecPoint' | 'other';


export interface Drawer {
    wrap: HTMLElement;
    resize: () => void;
    init: (data?: any) => void;
    destroy: () => void;
}
export type Canvas = HTMLCanvasElement
export type Div = HTMLDivElement
