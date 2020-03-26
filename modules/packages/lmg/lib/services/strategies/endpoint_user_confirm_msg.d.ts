import { WsService } from "../WsService";
interface IData {
    data: {
        title: string;
        content: string;
    };
    ip: string;
    name: string;
    target: number;
}
export declare function endpoint_user_confirm_msg(this: WsService, received_msg: IData): void;
export {};
