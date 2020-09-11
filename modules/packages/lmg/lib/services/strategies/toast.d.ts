import { WsService } from "../WsService";
interface IData {
    data: {
        toast_msg: string;
    };
    name: string;
}
export declare function toast(this: WsService, received_msg: IData): void;
export {};
