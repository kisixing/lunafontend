import { WsService } from "../WsService";
interface IData {
    name: "start_work";
    data: {
        bed_no: number;
        device_no: number;
        doc_id: string;
        fetal_num: number;
        is_working: number;
        ismulti: boolean;
    };
}
export declare function start_work(this: WsService, received_msg: IData): void;
export {};
