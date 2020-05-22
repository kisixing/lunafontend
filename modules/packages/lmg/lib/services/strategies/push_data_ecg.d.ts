import { WsService } from "../WsService";
import { TDeviceType } from "../types";
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
