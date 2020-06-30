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
        const { dia_bp, mean_bp, sys_bp }: IBloodListItem = (list && list.length) ? list[list.length - 1] : { dia_bp: 0, mean_bp: 0, sys_bp: 0 }
        const bp = { bloodPress: `${dia_bp}/${mean_bp}/${sys_bp}` }
        target.ecgdata = target.ecgdata ? { ...target.ecgdata, ...bp } : bp
    }
}