import { WsService } from "../WsService";
import { IDeviceType, IBloodListItem } from "../types";
interface IMsg extends IDeviceType {
    name: "list_blood_pressure";
    data: IBloodListItem[];
}
export declare function list_blood_pressure(this: WsService, received_msg: IMsg): void;
export {};
