import { WsService } from "../WsService";
import { getEmptyCacheItem } from "../utils";
import { IDevice } from "../types";

interface IData {
    name: "push_devices"
    data: IDevice[]
}

export function push_devices(this: WsService, received_msg: IData) {
    const { Working, Stopped, Offline, OfflineStopped } = this.BedStatus

    const { datacache } = this
    var devlist = received_msg.data;
    for (var i in devlist) {
        var devdata = devlist[i];
        if (!devdata) continue;
        for (let bi in devdata.beds) {
            const bedData = devdata.beds[bi]
            const { is_include_tocozero, is_include_volume, doc_id, fetal_num } = bedData
            var unitId = this.getUnitId(devdata.device_no, bedData.bed_no);
            const old = datacache.get(unitId)
    
            if (!old || (old.docid !== doc_id)) {

                const item = getEmptyCacheItem({ is_include_tocozero, is_include_volume, fetal_num, id: unitId, docid: doc_id })

                item.deviceType = devdata.device_type

                datacache.set(unitId, item);
                this.convertdocid(unitId, doc_id)

                if (bedData.is_working == 0) {
                    item.status = Working;
                } else if (bedData.is_working == 1) {
                    item.status = Stopped;
                } else if (bedData.is_working == 2) {
                    item.status = Offline;
                } else {
                    item.status = OfflineStopped;
                }
                //debugger
                if (bedData.pregnancy) {
                    item.pregnancy = JSON.parse(bedData.pregnancy);
                }
                if (bedData.fetalposition) {
                    item.fetalposition = JSON.parse(bedData.fetalposition);
                }
                item.fetal_num = bedData.fetal_num;
                if (bedData.is_include_mother)
                    item.ismulti = true;
            }
        }
    }
    this.isReady && this.refresh()
    this.connectResolve(datacache)
    this.emit('read', datacache)
    this.isReady = true
}