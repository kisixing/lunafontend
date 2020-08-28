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
import { toast } from "./toast";
import { replace_probe_tip } from "./replace_probe_tip";
import { add_probe_tip } from "./add_probe_tip";
import { list_blood_pressure } from "./list_blood_pressure";
import { WsService } from "../WsService";
import { handleF0ProErr } from "../utils";

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
    toast,
    
    list_blood_pressure,
    replace_probe_tip,
    add_probe_tip,
}
const exp = /(.*)_res$/
export function getStrategies(context: WsService): { [x: string]: Function } {
    const entries = Object.entries(strategies)
    return entries.reduce((r, [k, v]) => {
        r[k] = v.bind(context)
        return r
    }, {})
}
function requestInterceptror(this: WsService, mesName: string, mes: { data: any }) {
    const obj = mesName.match(exp)
    if (obj) {
        const k = obj[1]
        const res = this.requests[k]
        if (res) {
            (mes.data && mes.data.res === 0) ? res(mes.data) : handleF0ProErr(k, mes.data.res)
            this.requests[k] = null
        }
        return true
    }
}
export function handleMessage(this: WsService, mesName: string, mes: any) {

    this.strategies = this.strategies || getStrategies(this)
    if (!requestInterceptror.call(this, mesName, mes)) {
        const strategy = this.strategies[mesName]
        strategy && strategy(mes)
    }
}