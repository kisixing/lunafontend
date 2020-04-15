import { BedStatus, ICacheItem, ICache } from './types';
export declare const mapStatusToColor: {
    3: string;
    2: string;
    4: string;
    1: string;
};
export declare const mapStatusToText: {
    3: string;
    2: string;
    4: string;
    1: string;
};
export declare function getMaxArray(): Uint8Array;
export declare function getEmptyCacheItem(base?: ICacheItem): ICacheItem;
export declare function cleardata(datacache: ICache, curid: string, fetal_num: number): void;
export declare function convertstarttime(pureid: string): string;
