import { BedStatus, ICacheItem, ICache } from './types';
export declare const mapStatusToColor: {
    [BedStatus.Offline]: string;
    [BedStatus.Stopped]: string;
    [BedStatus.OfflineStopped]: string;
    [BedStatus.Working]: string;
};
export declare const mapStatusToText: {
    [BedStatus.Offline]: string;
    [BedStatus.Stopped]: string;
    [BedStatus.OfflineStopped]: string;
    [BedStatus.Working]: string;
};
export declare function getEmptyCacheItem(base?: any): ICacheItem;
export declare function cleardata(datacache: ICache, curid: string, fetal_num: number): void;
export declare function convertstarttime(pureid: string): string;
