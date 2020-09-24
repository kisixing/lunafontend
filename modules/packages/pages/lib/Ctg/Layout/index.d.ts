import React from 'react';
import { IPrenatalVisit, IPregnancy } from '@lianmed/f_types/lib/m';
export interface IItemData {
    data: {
        pregnancy?: {
            age: any;
            name: any;
            GP: any;
            gestationalWeek: any;
            bedNO: any;
        };
        docid: string;
        starttime: string;
        status: any;
        ismulti: boolean;
    };
    bedname: string;
    unitId: string;
    id: any;
    prenatalvisit?: IPrenatalVisit;
    pregnancy?: IPregnancy;
}
interface IProps {
    RenderIn: any;
    RenderMaskIn?: any;
    items: IItemData[];
    listLayout: number[];
    fullScreenId?: string;
    onClose?: (data: any) => void;
    contentHeight: number;
    themeColor?: string;
    loading?: boolean;
    borderedId?: string;
    onSelect?: (unitId: string) => void;
    borderedColor?: string;
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
