import { WsService } from "../WsService";
interface II {
    bed_no: number;
    device_no: number;
    doc_id: string;
    fetalposition: string;
    pregnancy: string;
    status: number;
}
interface IData {
    name: "update_status";
    data: II;
}
export declare function update_status(this: WsService, received_msg: IData): void;
export {};
