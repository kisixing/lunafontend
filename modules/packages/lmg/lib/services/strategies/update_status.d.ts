import { WsService } from "../WsService";
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
}
interface IData {
    name: "update_status";
    data: IData;
}
export declare function update_status(this: WsService, received_msg: IData): void;
export {};
