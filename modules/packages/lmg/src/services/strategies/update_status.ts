import { WsService } from "../WsService";
import { getEmptyCacheItem } from "../utils";

interface IData {
    bed_no: number
    device_no: number
    doc_id: string
    fetalposition: string
    pregnancy: string
    status: number

    fetal_num: number
    is_include_mother: boolean
    is_include_tocozero: boolean
    is_include_volume: boolean
    disableStartWork: boolean
}

interface IData {
    name: "update_status"
    data: IData
}

export function update_status(this: WsService, received_msg: IData) {
    console.log('----update_status---- \n', received_msg)
    const { datacache, BedStatus } = this
    const { Working, Stopped, Offline, OfflineStopped } = BedStatus
    // 状态机处理
    const { pregnancy, fetalposition, status, device_no, bed_no,
        is_include_mother, is_include_tocozero, is_include_volume, fetal_num, disableStartWork
    } = received_msg.data

    var unitId = this.getUnitId(device_no, bed_no);


    if (!datacache.has(unitId)) {
        datacache.set(unitId, getEmptyCacheItem());
    }

    const target = datacache.get(unitId)

    target.fetal_num = fetal_num
    target.is_include_tocozero = is_include_tocozero
    target.ismulti = is_include_mother
    target.is_include_volume = is_include_volume
    target.disableStartWork = disableStartWork
    if (status == 0) {
        target.status = Working;
    } else if (status == 1) {
        target.status = Stopped;
    } else if (status == 2) {
        target.status = Offline;
    } else {
        target.status = OfflineStopped;
    }
    console.log('update_status', target)
    target.pregnancy = pregnancy ? JSON.parse(pregnancy) : null;
    target.fetalposition = fetalposition ? JSON.parse(fetalposition) : null;
    this.refresh('update_status')
}