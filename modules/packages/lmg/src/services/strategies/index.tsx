import { start_work } from "./start_work";
import { end_work } from "./end_work";
import { update_status } from "./update_status";
import { push_notification } from "./push_notification";
import { heard } from "./heard";
import { getVolume } from "./getVolume";
import { get_data_ctg } from "./get_data_ctg";
import { get_devices } from "./get_devices";
import { push_devices } from "./push_devices";
import { push_event_alarm } from "./push_event_alarm";
import { push_data_ctg } from "./push_data_ctg";
import { push_data_ecg } from "./push_data_ecg";
import { push_offline_data_ctg } from "./push_offline_data_ctg";
import { endpoint_user_confirm_msg } from "./endpoint_user_confirm_msg";
import { WsService } from "../WsService";
export const strategies: { [x: string]: Function } = {
    start_work,
    end_work,

    heard,

    update_status,
    push_notification,

    getVolume,
    get_data_ctg,
    get_devices,

    push_devices,
    push_event_alarm,
    push_data_ctg,
    push_data_ecg,
    push_offline_data_ctg,

    endpoint_user_confirm_msg,
}

export function getStrategies(context: WsService): { [x: string]: Function } {
    const entries = Object.entries(strategies)
    return entries.reduce((r, [k, v]) => {
        r[k] = v.bind(context)
        return r
    }, {})
}