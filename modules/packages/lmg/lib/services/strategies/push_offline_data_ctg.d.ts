import { WsService } from "../WsService";
interface IData {
    data: any;
    bed_no: number;
    name: "push_offline_data_ctg";
    device_no: number;
}
export declare function push_offline_data_ctg(this: WsService, received_msg: IData): void;
export {};
