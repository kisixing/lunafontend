import { BedStatus, ICacheItem, ICache, TWsReqeustType } from './types';
export declare const mapStatusToColor: {
    3: string;
    2: string;
    4: string;
    1: string;
    5: string;
};
export declare const mapStatusToText: {
    3: string;
    2: string;
    4: string;
    1: string;
    5: string;
};
export declare const f0Pro_errText: {
    [x in TWsReqeustType]: {
        [x: number]: string;
    };
};
export declare const handleF0ProErr: (k: string, status: string | number) => void;
export declare function getMaxArray(): number[];
export declare function getEmptyCacheItem(base: {
    [x in keyof ICacheItem]?: ICacheItem[x];
}): any;
export declare function cleardata(datacache: ICache, curid: string, fetal_num: number): void;
export declare function convertstarttime(pureid: string): string;
