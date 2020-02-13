import { WsService } from "../WsService";
interface IData {
    name: "heard";
    data: {
        time: any;
    };
}
export declare function heard(this: WsService, received_msg: IData): void;
export {};
