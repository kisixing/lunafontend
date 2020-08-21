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
    const { pregnancy, fetalposition, device_no, bed_no, ...others } = received_msg.data

    var unitId = this.getUnitId(device_no, bed_no);

    if (!datacache.has(unitId)) {
        datacache.set(unitId, getEmptyCacheItem({ id: unitId }));
    }

    const target = datacache.get(unitId)
    const extendObj: _ICacheItem = others
    Object.assign(target, extendObj)
    target.pregnancy = pregnancy ? JSON.parse(pregnancy) : null;
    target.fetalposition = fetalposition ? JSON.parse(fetalposition) : null;

    // target.fhr = Array(fetal_num || 1).fill(0).map((_, i) => {
    //     return target.fhr[i] || getMaxArray()
    // })
    // if (status == 0) {
    //     target.status = Working;
    // } else if (status == 1) {
    //     target.status = Stopped;
    // } else if (status == 2) {
    //     target.status = Offline;
    // }
    // else if (status == 3) {
    //     target.status = OfflineStopped;
    // } else {
    //     target.status = Uncreated;
    // }

    this.refresh('update_status')
}