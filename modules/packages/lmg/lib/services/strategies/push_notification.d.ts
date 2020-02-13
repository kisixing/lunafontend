import { WsService } from "../WsService";
interface II {
    type: "update_subscribe_device" | '';
    content: {
        devices: string;
        wardId: string;
    }[];
}
interface IData {
    data: II;
    name: "push_notification";
    target: number;
}
export declare function push_notification(this: WsService, received_msg: IData): void;
export {};
