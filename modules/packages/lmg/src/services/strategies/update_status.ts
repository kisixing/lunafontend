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
    const { Working, Stopped, Offline, OfflineStopped } = this.BedStatus

    const { datacache } = this
    console.log('update_status 11111', received_msg.data)
    // 状态机处理
    var statusdata = received_msg.data;
    var id = statusdata.device_no;
    var bi = statusdata.bed_no;
    var cachbi = id + '-' + bi;
    if (!datacache.has(cachbi)) {
        datacache.set(cachbi, getEmptyCacheItem());
    }
    if (statusdata.status == 0) {
        datacache.get(cachbi).status = Working;
    } else if (statusdata.status == 1) {
        datacache.get(cachbi).status = Stopped;
    } else if (statusdata.status == 2) {
        datacache.get(cachbi).status = Offline;
    } else {
        datacache.get(cachbi).status = OfflineStopped;
    }
    console.log('update_status', datacache.get(cachbi))
    datacache.get(cachbi).pregnancy = statusdata.pregnancy ? JSON.parse(statusdata.pregnancy) : null;
    datacache.get(cachbi).fetalposition = statusdata.fetalposition ? JSON.parse(statusdata.fetalposition) : null;
    this.refresh('update_status')
}