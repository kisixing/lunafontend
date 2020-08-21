import Queue from "../Ecg/Queue";
export declare type TDeviceType = ('SR_K9' | 'SR_B5_B6' | 'V3' | 'F3' | 'LM_F0_PRO');
export declare type TAlarmType = 0 | 1 | 2;
declare type TF = 0 | 1;
export interface IVolumeData {
    isMute1: TF;
    vol: TF;
    fetel_num: number;
}
export declare enum EWsStatus {
    Pendding = 0,
    Success = 1,
    Error = 2
}
export declare enum BedStatus {
    Working = 1,
    Stopped = 2,
    Offline = 3,
    OfflineStopped = 4,
    Uncreated = 5
}
export declare enum EWsEvents {
    pong = "pong",
    explode = "explode",
    updateSubscriptionIfNecessary = "updateSubscriptionIfNecessary"
}
export declare type TWsReqeustType = 'allot_probe' | 'release_probe' | 'add_more_fhr_probe' | 'add_toco_probe' | 'replace_probe';
export interface ICacheItemPregnancy {
    pvId?: string;
    GP?: string;
    gestationalWeek?: string;
    age?: string;
    bedNO?: string;
    edd?: string;
    id?: number;
    inpatientNO?: string;
    name?: string;
    outpatientNO?: string;
    telephone?: string;
}
export interface IMultiParamData {
    bloodOxygen?: string | number;
    pulseRate?: string | number;
    heartRate?: string | number;
    temperature?: string | number;
    respRate?: string | number;
    bloodPress?: string | number;
}
export interface IDeviceType {
    bed_no?: number;
    device_no?: number;
    device_type?: TDeviceType;
}
export interface IDevice extends IDeviceType {
    ERP: string;
    beds: IBed[];
    ecg_sampling_rate: number;
    is_handshake_finish: boolean;
    wifi_conn_state: boolean;
}
export interface IBloodListItem {
    dia_bp: number;
    mean_bp: number;
    sys_bp: number;
    time?: string;
}
export interface IBed {
    bed_no: number;
    doc_id: string;
    fetal_num: number;
    is_include_mother: boolean;
    is_working: number;
    pregnancy: string;
    fetalposition: string;
    disableStartWork?: boolean;
    disableCreate?: boolean;
    event_alarm_status: string;
    vol2: number;
    vol1: number;
    event_alarm_id: string;
    is_include_volume: boolean;
    is_include_tocozero: boolean;
    is_include_toco: boolean;
    device_no: number;
    status: number;
    isMute1: number;
    isMute2: number;
    isMute3: number;
    is_fhr_1_batterylow: boolean;
    is_fhr_2_batterylow: boolean;
    is_fhr_3_batterylow: boolean;
    mother_type: boolean;
    vol: number;
    device_type: TDeviceType;
}
export declare class _ICacheItem {
    selectBarHidden?: boolean;
    replaceProbeTipData?: object;
    bed_no?: number;
    device_no?: number;
    realTime?: boolean;
    id?: string;
    volumeData?: IVolumeData;
    is_include_volume?: boolean;
    is_include_tocozero?: boolean;
    is_include_toco?: boolean;
    disableStartWork?: boolean;
    disableCreate?: boolean;
    analyse?: any;
    fhr?: number[][];
    toco?: number[];
    fm?: number[];
    fmp?: number[];
    index?: number;
    length?: number;
    start?: number;
    last?: number;
    past?: number;
    timestamp?: number;
    doc_id?: string;
    pregnancy?: ICacheItemPregnancy;
    fetalposition?: {
        fhr1: string;
        fhr2: string;
        fhr3: string;
    };
    status?: BedStatus;
    orflag?: boolean;
    starttime?: string;
    fetal_num?: number;
    csspan?: number;
    ecg?: Queue;
    ple?: Queue;
    ecgdata?: IMultiParamData;
    bloodList?: IBloodListItem[];
    alarms?: {
        alarm_pulse_rate?: TAlarmType;
        alarm_sys_bp?: TAlarmType;
        alarm_mean_bp?: TAlarmType;
        alarm_blood_oxygen?: TAlarmType;
        alarm_offline_blood_temperature?: TAlarmType;
        alarm_temperature?: TAlarmType;
        alarm_dia_bp?: TAlarmType;
        alarm_offline_blood_oxygen?: TAlarmType;
    };
    curindex?: number;
    state?: number;
    is_fhr_1_batterylow?: boolean;
    is_fhr_2_batterylow?: boolean;
    is_fhr_3_batterylow?: boolean;
    is_include_mother?: boolean;
    isMute1?: number;
    isMute2?: number;
    isMute3?: number;
    device_type?: TDeviceType;
    vol?: number;
}
export declare class ICacheItem extends _ICacheItem {
    get isF0Pro(): boolean;
    get batterylowArr(): boolean[];
    get MuteArr(): boolean[];
    get isWorking(): boolean;
    get isStopped(): boolean;
    get isOffline(): boolean;
    get isOfflineStopped(): boolean;
    get isUncreated(): boolean;
    get hasToco(): boolean;
    get hasPregnancy(): boolean;
    private _status;
    get status(): BedStatus;
    set status(remoteStatus: BedStatus);
    get ismulti(): boolean;
    set ismulti(status: boolean);
    get deviceType(): TDeviceType;
    set deviceType(type: TDeviceType);
    private _fetal_num;
    get fetal_num(): number;
    set fetal_num(value: number);
    get docid(): string;
    set docid(value: string);
    constructor(args: _ICacheItem);
}
export declare type ICache = Map<string, ICacheItem> & {
    clean?: (key: string) => void;
};
export {};
