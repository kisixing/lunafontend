import { WsService } from "../WsService";
import { event } from "@lianmed/utils";
interface IData {
    "name": "time_endwork_tip",
    "device_no": 1,
    "bed_no": 1,
    "data": {
        "mac": "EB:CI:SE:38:90:22",  //插入探头的蓝牙地址
        "isfhr": boolean  //插入探头是否为胎心探头
    }

}

export function time_endwork_tip(this: WsService, received_msg: IData) {

    const { device_no, bed_no, data } = received_msg
    var item = this.getCacheItem({ device_no, bed_no });
    if (!item) return
    item.timeEndworkTipData = data
    event.emit('bed:announcer', `${item.id}`)
    event.once(`item_probetip_to_call:${item.id}`, cb => {

        cb(data)
        // event.emit('bed:announcer', `${item.id}`)
    })
    event.emit(`item_probetip_wait_to_call`, item.id)


}