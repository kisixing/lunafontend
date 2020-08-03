import Queue from "../Ecg/Queue";

export type TDeviceType = ('SR_K9' | 'SR_B5_B6' | 'V3' | 'F3' | 'LM_F0_PRO')
export type TAlarmType = 0 | 1 | 2
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
    OfflineStopped,
    Uncreated
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
export interface IMultiParamData {
    bloodOxygen?: string | number
    pulseRate?: string | number
    heartRate?: string | number
    temperature?: string | number
    respRate?: string | number
    bloodPress?: string | number
}
export interface ICacheItem {
    realTime?: boolean
    id: string
    volumeData?: IVolumeData
    deviceType?: TDeviceType
    is_include_volume?: boolean
    is_include_tocozero?: boolean
    disableStartWork?: boolean
    analyse?: any;
    // fhr?: Uint8Array[];
    // toco?: Uint8Array;
    // fm?: Uint8Array;
    fhr: number[][];
    toco: number[];
    fm?: number[];
    fmp?: number[];

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
    ple?: Queue;
    ecgdata?: IMultiParamData;
    // const keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];

    ismulti?: boolean;
    bloodList?: IBloodListItem[]

    alarms?: {
        alarm_pulse_rate?: TAlarmType
        alarm_sys_bp?: TAlarmType
        alarm_mean_bp?: TAlarmType
        alarm_blood_oxygen?: TAlarmType
        alarm_offline_blood_temperature?: TAlarmType
        alarm_temperature?: TAlarmType
        alarm_dia_bp?: TAlarmType
        alarm_offline_blood_oxygen?: TAlarmType
    }
    curindex?: number
    state?: number

}
export type ICache = Map<string, ICacheItem> & { clean?: (key: string) => void }
export interface IDeviceType {
    bed_no: number;
    device_no: number;
    device_type: TDeviceType;
}
export interface IDevice extends IDeviceType {
    ERP: string;
    beds: IBed[];

    ecg_sampling_rate: number;
    is_handshake_finish: boolean;
    wifi_conn_state: boolean;
}

export interface IBloodListItem {
    dia_bp: number
    mean_bp: number
    sys_bp: number
    time?: string
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

