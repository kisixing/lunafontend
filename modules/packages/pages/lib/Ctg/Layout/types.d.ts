/// <reference types="react" />
import { IPregnancy, IPrenatalVisit } from '@lianmed/f_types/lib/m';
import { BedStatus, ICacheItem, ICacheItemPregnancy } from "@lianmed/lmg/lib/services/types";
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
export interface ICtgLayoutProps extends ICtgLayoutTheme {
    RenderIn: any;
    items: IItemData[];
    listLayout: number[];
    fullScreenId?: string;
    onClose?: (data: any) => void;
    contentHeight: number;
    themeColor?: string;
    loading?: boolean;
    borderedId?: string;
    onSelect?: (unitId: string) => void;
}
export interface ICtgLayoutItemProps extends ICtgLayoutTheme {
    loading: boolean;
    onClose: (data: any) => void;
    itemData: any;
    children: React.ReactNode;
    startTime: string;
    pregnancy: ICacheItemPregnancy;
    data: ICacheItem;
    bedname: string;
    unitId: string;
    ismulti: boolean;
    docid: string;
    status: BedStatus;
    onSelect?: (unitId: string) => void;
    outPadding: number;
    fullScreenId: string;
    itemHeight: number;
    itemSpan: number;
    themeColor: string;
    bordered?: boolean;
}
export interface ICtgLayoutTheme {
    headColor?: string;
    backgroundColor?: string;
    borderedColor?: string;
    fontColor?: string;
    activeColor?: string;
}
