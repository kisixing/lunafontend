import { WsService } from "../WsService";
import { cleardata } from "../utils";

interface IData {
    name: "start_work"
    data: {
        bed_no: number
        device_no: number
        doc_id: string
        fetal_num: number
        is_working: number
        ismulti: boolean
    }
}

export function start_work(this: WsService, received_msg: IData) {
    const { Working, Stopped } = this.BedStatus
    const { datacache } = this
    //开启监护页
    let devdata = received_msg.data;
    const { bed_no, device_no } = devdata;
    let unitId = this.getUnitId(device_no, bed_no);
    //TODO : 更新设备状态
    cleardata(datacache, unitId, devdata.fetal_num);
    this.convertdocid(unitId, devdata.doc_id)
    const target = datacache.get(unitId);
    if (typeof (devdata.ismulti) != 'undefined') {
        target.ismulti = devdata.ismulti;
    }
    if (devdata.is_working == 0) {
        target.status = Working
    } else {
        target.status = Stopped
    }
    this.refresh('start_work')
}