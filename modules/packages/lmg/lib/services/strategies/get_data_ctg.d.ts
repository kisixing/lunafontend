import { WsService } from "../WsService";
interface IData {
    fhr: number;
    fhr2: number;
    fhr3: number;
    toco: number;
    fm: number;
    fmp: number;
    index: number;
}
interface IData {
    bed_no: number;
    data: IData[];
    device_no: number;
    name: "get_data_ctg";
}
export declare function get_data_ctg(this: WsService, received_msg: IData): void;
export {};
