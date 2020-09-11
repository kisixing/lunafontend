import { IBed, _ICacheItem } from "../types";
import { getEmptyCacheItem } from "../utils";
import { WsService } from "../WsService";



interface IMessage {
    name: "update_status"
    data: IBed
}

export function update_status(this: WsService, received_msg: IMessage) {
    const { datacache } = this
    // 状态机处理
    const { device_no, bed_no, ...others } = received_msg.data

    var unitId = this.getUnitId(device_no, bed_no);

    if (!datacache.has(unitId)) {
        datacache.set(unitId, getEmptyCacheItem({ id: unitId }));
    }

    const target = datacache.get(unitId)
    const extendObj: _ICacheItem = { device_no, bed_no, ...others }
    Object.assign(target, extendObj)

    this.refresh('update_status')
}