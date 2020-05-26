import { WsService } from "../WsService";
import { IDeviceType, IBloodListItem } from "../types";
import { convertstarttime } from "../utils";



interface IMsg extends IDeviceType {
    name: "list_blood_pressure"
    data: IBloodListItem[]
}

export function list_blood_pressure(this: WsService, received_msg: IMsg) {
    const target = this.getCacheItem(received_msg)
    if (target) {
        const list = (received_msg.data || []).map(_ => ({ ..._, time: convertstarttime(_.time) }))
        target.bloodList = list
    }
}