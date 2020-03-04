import { WsService } from "../WsService";
import { getEmptyCacheItem } from "../utils";

interface II {
    bed_no: number
    device_no: number
    doc_id: string
    fetalposition: string
    pregnancy: string
    status: number
}

interface IData {
    name: "update_status"
    data: II
}

export function update_status(this: WsService, received_msg: IData) {
    const { datacache, BedStatus } = this
    const { Working, Stopped, Offline, OfflineStopped } = BedStatus
    // 状态机处理
    var statusdata = received_msg.data;
    const { device_no, bed_no } = statusdata
    var unitId = this.getUnitId(device_no, bed_no);


    if (!datacache.has(unitId)) {
        datacache.set(unitId, getEmptyCacheItem());
    }
    // this.convertdocid(unitId, doc_id)

    if (statusdata.status == 0) {
        datacache.get(unitId).status = Working;
    } else if (statusdata.status == 1) {
        datacache.get(unitId).status = Stopped;
    } else if (statusdata.status == 2) {
        datacache.get(unitId).status = Offline;
    } else {
        datacache.get(unitId).status = OfflineStopped;
    }
    console.log('update_status', datacache.get(unitId))
    datacache.get(unitId).pregnancy = statusdata.pregnancy ? JSON.parse(statusdata.pregnancy) : null;
    datacache.get(unitId).fetalposition = statusdata.fetalposition ? JSON.parse(statusdata.fetalposition) : null;
    this.refresh('update_status')
}