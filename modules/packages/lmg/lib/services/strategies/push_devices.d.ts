import { WsService } from "../WsService";
import { IDevice } from "../types";
interface IData {
    name: "push_devices";
    data: IDevice[];
}
export declare function push_devices(this: WsService, received_msg: IData): void;
export {};
