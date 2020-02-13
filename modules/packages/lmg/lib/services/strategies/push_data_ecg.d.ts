import { WsService } from "../WsService";
interface II {
    blood_oxygen: number;
    dia_bp: number;
    ecg: number;
    ecg_arr: number[];
    index: number;
    mean_bp: number;
    pulse_rate: number;
    resp_rate: number;
    sys_bp: number;
    temperature: string;
    temperature1: string;
}
interface IData {
    bed_no: 4;
    data: II[];
    device_no: 18;
    name: "push_data_ecg";
}
export declare function push_data_ecg(this: WsService, received_msg: IData): void;
export {};
