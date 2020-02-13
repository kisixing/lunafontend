import { WsService } from "../WsService";
interface ICtgData {
    fhr: number;
    fhr2: number;
    fhr3: number;
    toco: number;
    fm: number;
    index: number;
}
interface IData {
    bed_no: number;
    data: ICtgData[];
    device_no: number;
    name: "push_data_ctg";
}
export declare function push_data_ctg(this: WsService, received_msg: IData): void;
export {};
