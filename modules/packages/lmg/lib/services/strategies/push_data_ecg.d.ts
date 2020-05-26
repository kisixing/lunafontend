import { WsService } from "../WsService";
import { TDeviceType, TAlarmType } from "../types";
interface II {
    blood_oxygen: number;
    dia_bp: number;
    ecg: number;
    ecg_arr: number[] | number;
    ple_arr: number[] | number;
    index: number;
    mean_bp: number;
    pulse_rate: number;
    resp_rate: number;
    sys_bp: number;
    temperature: string;
    temperature1: string;
    cuff_bp: 0;
    alarm_pulse_rate: TAlarmType;
    alarm_sys_bp: TAlarmType;
    alarm_mean_bp: TAlarmType;
    alarm_blood_oxygen: TAlarmType;
    alarm_offline_blood_temperature: TAlarmType;
    alarm_temperature: TAlarmType;
    alarm_dia_bp: TAlarmType;
    alarm_offline_blood_oxygen: TAlarmType;
    power: number;
}
interface IData {
    bed_no: 4;
    data: II[];
    device_no: 18;
    name: "push_data_ecg";
    device_type: TDeviceType;
}
export declare function push_data_ecg(this: WsService, received_msg: IData): void;
export {};
