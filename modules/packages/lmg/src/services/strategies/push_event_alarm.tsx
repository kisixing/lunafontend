import { WsService } from "../WsService";

interface IData {
    name: "push_event_alarm"
    data: { event_alarm_id: any }
}

export function push_event_alarm(this: WsService, received_msg: IData) {
    let devdata = received_msg.data;
    if (devdata.event_alarm_id) {

    }
}