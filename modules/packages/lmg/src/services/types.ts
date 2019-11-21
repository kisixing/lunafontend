import Queue from "../Ecg/Queue";

export enum EWsStatus {
    Pendding, Success, Error
}

export enum BedStatus {
    Working = 1,
    Stopped,
    Offline,
}
export interface ICacheItem {
    fhr: number[][];
    toco: number[];
    fm: number[];
    index: number;
    length: number;
    start: number;
    last: number;
    past: number;
    timestamp: number;
    docid: string;
    pregnancy: {
        GP: string
        age: string
        bedNO: string
        edd: string
        id: number
        inpatientNO: string
        name: string
        outpatientNO: string
    };
    status: BedStatus;
    orflag: boolean;
    starttime: string;
    fetal_num: number;
    csspan: number;
    ecg: Queue;
    ecgdata: any[];
    ismulti: boolean;
}
export type ICache = Map<string, ICacheItem> & { clean?: (key: string) => void }
export interface IDevice {
    ERP: string;
    bed_num: number;
    beds: IBed[];
    device_no: number;
    device_type: string;
    ecg_sampling_rate: number;
    is_handshake_finish: boolean;
    wifi_conn_state: boolean;
}
export interface IBed {
    bed_no: number;
    doc_id: string;
    fetal_num: number;
    is_include_mother: boolean;
    is_working: number;
    pregnancy: string;
}