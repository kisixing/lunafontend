import { WsService } from "../WsService";
interface IData {
    name: "end_work";
    data: {
        is_working: number;
    };
}
export declare function end_work(this: WsService, received_msg: IData): void;
export {};
