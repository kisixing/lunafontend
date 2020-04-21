import Queue from "../Ecg/Queue";

type TDeviceType = ('SR_K9' | 'SR_B5_B6')

type TF = 0 | 1

export interface IVolumeData {
    isMute1: TF
    vol: TF
    fetel_num: number
}


export enum EWsStatus {
    Pendding, Success, Error
}

export enum BedStatus {
    Working = 1,
    Stopped,
    Offline,
    OfflineStopped
}
export enum EWsEvents {
    pong = "pong",
    explode = "explode",
    updateSubscriptionIfNecessary = "updateSubscriptionIfNecessary"
}

export interface ICacheItemPregnancy {
    pvId?: string
    GP?: string
    gestationalWeek?: string
    age?: string
    bedNO?: string
    edd?: string
    id?: number
    inpatientNO?: string
    name?: string
    outpatientNO?: string
}
export interface ICacheItem {
    volumeData?: IVolumeData
    deviceType?: TDeviceType
    is_include_volume?: boolean
    is_include_tocozero?: boolean
    disableStartWork?: boolean
    analyse?: any;
    // fhr?: Uint8Array[];
    // toco?: Uint8Array;
    // fm?: Uint8Array;
    fhr?: number[][];
    toco?: number[];
    fm?: number[];
    
    index?: number;
    length?: number;
    start?: number;
    last?: number;
    past?: number;
    timestamp?: number;
    docid?: string;
    pregnancy?: ICacheItemPregnancy;
    fetalposition?: {
        fhr1: string,
        fhr2: string,
        fhr3: string
    };
    status?: BedStatus;
    orflag?: boolean;
    starttime?: string;
    fetal_num?: number;
    csspan?: number;
    ecg?: Queue;
    ecgdata?: any;
    ismulti?: boolean;
}
export type ICache = Map<string, ICacheItem> & { clean?: (key: string) => void }
export interface IDevice {
    ERP: string;
    bed_num: number;
    beds: IBed[];
    device_no: number;
    device_type: TDeviceType;
    ecg_sampling_rate: number;
    is_handshake_finish: boolean;
    wifi_conn_state: boolean;
}
interface IBed {
    bed_no: number;
    doc_id: string;
    fetal_num: number;
    is_include_mother: boolean;
    is_working: number;
    pregnancy: string;
    fetalposition: string;


    event_alarm_status: string
    vol2: number
    vol1: number
    event_alarm_id: string
    is_include_volume: boolean
    is_include_tocozero: boolean
}

