import { IDevice, _ICacheItem } from "../types";
import { getEmptyCacheItem } from "../utils";
import { WsService } from "../WsService";

interface IData {
    name: "push_devices"
    data: IDevice[]
}

export function push_devices(this: WsService, received_msg: IData) {

    const { datacache } = this
    var devlist = received_msg.data;
    for (var i in devlist) {
        var devdata = devlist[i];
        if (!devdata) continue;
        const { device_no, beds, device_type } = devdata
        for (let bi in beds) {
            const bedData = beds[bi]


            //
            const { pregnancy, fetalposition, bed_no, doc_id, ...others } = bedData

            var unitId = this.getUnitId(device_no, bed_no);

            //

            const old = datacache.get(unitId)

            if (!old || (old.doc_id !== doc_id)) {

                const target = getEmptyCacheItem({ id: unitId, doc_id, device_type })
                datacache.set(unitId, target);
                this.convertdocid(unitId, doc_id)

                const extendObj: _ICacheItem = others
                Object.assign(target, extendObj)
                target.pregnancy = pregnancy ? JSON.parse(pregnancy) : null;
                target.fetalposition = fetalposition ? JSON.parse(fetalposition) : null;
            }
        }
    }
    this.isReady && this.refresh()
    this.connectResolve(datacache)
    this.emit('read', datacache)
    this.isReady = true
}