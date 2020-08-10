import { WsService } from "../WsService";
import { getEmptyCacheItem } from "../utils";
import { IDevice } from "../types";

interface IData {
    name: "push_devices"
    data: IDevice[]
}

export function push_devices(this: WsService, received_msg: IData) {
    const { Working, Stopped, Offline, OfflineStopped, Uncreated } = this.BedStatus

    const { datacache } = this
    var devlist = received_msg.data;
    for (var i in devlist) {
        var devdata = devlist[i];
        if (!devdata) continue;
        const { device_no, beds, device_type } = devdata
        for (let bi in beds) {
            const bedData = beds[bi]
            const { is_include_tocozero, is_include_volume, is_include_toco, is_include_mother, doc_id, fetal_num, bed_no } = bedData
            var unitId = this.getUnitId(device_no, bed_no);

            const old = datacache.get(unitId)

            if (!old || (old.docid !== doc_id)) {

                const item = getEmptyCacheItem({ deviceType: device_type, device_no, bed_no, is_include_tocozero, is_include_toco, is_include_volume, fetal_num, id: unitId, docid: doc_id, ismulti: is_include_mother })


                datacache.set(unitId, item);
                this.convertdocid(unitId, doc_id)

                if (bedData.is_working == 0) {
                    item.status = Working;
                } else if (bedData.is_working == 1) {
                    item.status = Stopped;
                } else if (bedData.is_working == 2) {
                    item.status = Offline;
                }
                else if (bedData.is_working == 3) {
                    item.status = OfflineStopped;
                } else {
                    item.status = Uncreated;
                }
                console.log('zzx',bedData.is_working,unitId,item.status)
                //debugger
                if (bedData.pregnancy) {
                    item.pregnancy = JSON.parse(bedData.pregnancy);
                }
                if (bedData.fetalposition) {
                    item.fetalposition = JSON.parse(bedData.fetalposition);
                }
            }
        }
    }
    this.isReady && this.refresh()
    this.connectResolve(datacache)
    this.emit('read', datacache)
    this.isReady = true
}