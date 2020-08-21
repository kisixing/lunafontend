import { IBed } from "../types";
import { WsService } from "../WsService";
interface IMessage {
    name: "update_status";
    data: IBed;
}
export declare function update_status(this: WsService, received_msg: IMessage): void;
export {};
