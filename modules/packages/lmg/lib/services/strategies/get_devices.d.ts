import { WsService } from "../WsService";
declare type TF = 0 | 1;
interface IData {
    data: {
        isMute1: TF;
        vol: TF;
        fetel_num: number;
    };
    bed_no: number;
    name: "get_devices";
    device_no: number;
}
export declare function get_devices(this: WsService, received_msg: IData): void;
export {};
