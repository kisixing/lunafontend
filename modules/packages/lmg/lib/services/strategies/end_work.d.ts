import { WsService } from "../WsService";
interface IData {
    name: "end_work";
    data: {
        is_working: number;
        bed_no: number;
        device_no: number;
        doc_id: string;
    };
}
export declare function end_work(this: WsService, received_msg: IData): void;
export {};
