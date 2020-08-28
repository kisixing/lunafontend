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
    const { datacache } = this
    //开启监护页
    let devdata = received_msg.data;
    const { bed_no, device_no } = devdata;
    let unitId = this.getUnitId(device_no, bed_no);
    //TODO : 更新设备状态
    cleardata(datacache, unitId, devdata.fetal_num);
    console.log('cleardata startwork', unitId)

    this.convertdocid(unitId, devdata.doc_id)
    const target = datacache.get(unitId);
    if (typeof (devdata.ismulti) != 'undefined') {
        target.ismulti = devdata.ismulti;
    }
    target.status = devdata.is_working

    this.refresh('start_work')
}