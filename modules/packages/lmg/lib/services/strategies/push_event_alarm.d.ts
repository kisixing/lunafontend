import { WsService } from "../WsService";
interface IData {
    name: "push_event_alarm";
    data: {
        event_alarm_id: any;
    };
}
export declare function push_event_alarm(this: WsService, received_msg: IData): void;
export {};
