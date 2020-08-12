// import { IVolumeData, TDeviceType, ICacheItemPregnancy, BedStatus, IMultiParamData, IBloodListItem, TAlarmType } from "./types";
// import Queue from "../Ecg/Queue";
// class _ICacheItem {
//     replaceProbeTipData?: object
//     bed_no?: number;
//     device_no?: number;
//     realTime?: boolean
//     id: string
//     volumeData?: IVolumeData
//     deviceType?: TDeviceType
//     is_include_volume?: boolean
//     is_include_tocozero?: boolean
//     is_include_toco?: boolean
//     disableStartWork?: boolean
//     analyse?: any;
//     // fhr?: Uint8Array[];
//     // toco?: Uint8Array;
//     // fm?: Uint8Array;
//     fhr?: number[][];
//     toco?: number[];
//     fm?: number[];
//     fmp?: number[];

//     index?: number;
//     length?: number;
//     start?: number;
//     last?: number;
//     past?: number;
//     timestamp?: number;
//     docid?: string;
//     pregnancy?: ICacheItemPregnancy;
//     fetalposition?: {
//         fhr1: string,
//         fhr2: string,
//         fhr3: string
//     };
//     status?: BedStatus;
//     orflag?: boolean;
//     starttime?: string;
//     fetal_num?: number;
//     csspan?: number;
//     ecg?: Queue;
//     ple?: Queue;
//     ecgdata?: IMultiParamData;
//     // const keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];

//     ismulti?: boolean;
//     bloodList?: IBloodListItem[]

//     alarms?: {
//         alarm_pulse_rate?: TAlarmType
//         alarm_sys_bp?: TAlarmType
//         alarm_mean_bp?: TAlarmType
//         alarm_blood_oxygen?: TAlarmType
//         alarm_offline_blood_temperature?: TAlarmType
//         alarm_temperature?: TAlarmType
//         alarm_dia_bp?: TAlarmType
//         alarm_offline_blood_oxygen?: TAlarmType
//     }
//     curindex?: number
//     state?: number
// }
// export class CacheItem extends _ICacheItem {
//     public get isF0Pro(): boolean {
//         return this.deviceType === 'LM_F0_PRO';
//     }
//     public get hasToco(): boolean {
//         return this.toco && this.toco.length > 0;
//     }
//     public get hasPregnancy(): boolean {
//         return this.pregnancy && typeof this.pregnancy.id === 'number'
//     }
//     private _status: BedStatus;
//     public get status(): BedStatus {
//         return this._status;
//     }
//     public set status(remoteStatus: BedStatus) {
//         this._status = remoteStatus;
//     }
//     constructor(args: _ICacheItem) {
//         super()
//         Object.assign(this, args)
//     }
// }