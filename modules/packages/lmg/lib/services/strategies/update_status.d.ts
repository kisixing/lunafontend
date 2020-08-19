import { WsService } from "../WsService";
import { TDeviceType } from "../types";
interface IData {
    bed_no: number;
    device_no: number;
    doc_id: string;
    fetalposition: string;
    pregnancy: string;
    status: number;
    fetal_num: number;
    is_include_mother: boolean;
    is_include_tocozero: boolean;
    is_include_toco: boolean;
    is_include_volume: boolean;
    disableStartWork: boolean;
    disableCreate: boolean;
    event_alarm_id: "3";
    event_alarm_status: "2";
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
interface IData {
    name: "update_status";
    data: IData;
}
export declare function update_status(this: WsService, received_msg: IData): void;
export {};
