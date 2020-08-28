import Queue from "../Ecg/Queue";
// import { WsService } from "./WsService";

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
export type TWsReqeustType = 'allot_probe' | 'release_probe' | 'add_more_fhr_probe' | 'add_toco_probe' | 'replace_probe'
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
    telephone?: string
}
export interface IMultiParamData {
    bloodOxygen?: string | number
    pulseRate?: string | number
    heartRate?: string | number
    temperature?: string | number
    respRate?: string | number
    bloodPress?: string | number
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
    dia_bp: number
    mean_bp: number
    sys_bp: number
    time?: string
}
export interface IBed {
    bed_no: number;
    doc_id: string;
    fetal_num: number;
    is_include_mother: boolean;
    is_working: number;
    pregnancy: string;
    fetalposition: string;
    disableStartWork?: boolean
    disableCreate?: boolean

    event_alarm_status: string
    vol2: number
    vol1: number
    event_alarm_id: string
    is_include_volume: boolean
    is_include_tocozero: boolean
    is_include_toco: boolean


    // 
    device_no: number
    status: number
    isMute1: number
    isMute2: number
    isMute3: number
    is_fhr_1_batterylow: boolean
    is_fhr_2_batterylow: boolean
    is_fhr_3_batterylow: boolean
    mother_type: boolean
    vol: number
    device_type: TDeviceType
}

export class _ICacheItem {
    selectBarHidden?: boolean
    // batterylowArr?: boolean[] = []
    replaceProbeTipData?: object
    addProbeTipData?: object
    bed_no?: number;
    device_no?: number;
    realTime?: boolean
    id?: string
    volumeData?: IVolumeData
    is_include_volume?: boolean
    is_include_tocozero?: boolean
    is_include_toco?: boolean
    disableStartWork?: boolean
    disableCreate?: boolean
    analyse?: any;
    // fhr?: Uint8Array[];
    // toco?: Uint8Array;
    // fm?: Uint8Array;
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
    is_fhr_1_batterylow?: boolean
    is_fhr_2_batterylow?: boolean
    is_fhr_3_batterylow?: boolean
    is_include_mother?: boolean
    isMute1?: number
    isMute2?: number
    isMute3?: number
    device_type?: TDeviceType
    vol?: number

}
export class ICacheItem extends _ICacheItem {


    public get isF0Pro() {
        return this.deviceType === 'LM_F0_PRO';
    }
    public get batterylowArr() {
        return [this.is_fhr_1_batterylow, this.is_fhr_2_batterylow, this.is_fhr_3_batterylow]
    }
    public get MuteArr() {
        return [this.isMute1, this.isMute2, this.isMute3].map(_ => Boolean(_))
    }


    public get isWorking() {
        return this.status === BedStatus.Working
    }
    public get isStopped() {
        return this.status === BedStatus.Stopped
    }
    public get isOffline() {
        return this.status === BedStatus.Offline
    }
    public get isOfflineStopped() {
        return this.status === BedStatus.OfflineStopped
    }
    public get isUncreated() {
        return this.status === BedStatus.Uncreated
    }
    public get hasToco(): boolean {
        return this.toco && this.toco.length > 0;
    }
    public get hasPregnancy(): boolean {
        return this.pregnancy && typeof this.pregnancy.id === 'number'
    }
    private _status: BedStatus;
    public get status(): BedStatus {
        return this._status + 1;
    }
    public set status(remoteStatus: BedStatus) {

        this._status = remoteStatus;
    }
    public get ismulti() {
        return this.is_include_mother;
    }
    public set ismulti(value: boolean) {

        this.is_include_mother = value;
    }
    public get deviceType() {
        return this.device_type
    }
    public set deviceType(type: TDeviceType) {

        this.device_type = type;
    }
    private _fetal_num: number;
    public get fetal_num(): number {
        return this._fetal_num;
    }
    public set fetal_num(value: number) {
        this._fetal_num = value;
        this.fhr = Array(value || 1).fill(0).map((_, i) => {
            return (this.fhr && this.fhr[i]) || []
        })
    }
    public get docid(): string {
        return this.doc_id;
    }
    public set docid(value: string) {
        this.doc_id = value;
    }

    constructor(args: _ICacheItem) {
        super()
        Object.assign(this, args)
    }
}


export type ICache = Map<string, ICacheItem> & { clean?: (key: string) => void }