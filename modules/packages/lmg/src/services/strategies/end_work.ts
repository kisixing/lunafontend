import { WsService } from "../WsService";

interface IData {
    name: "end_work"
    data: { is_working: number, bed_no: number, device_no: number, doc_id: string }
}

export function end_work(this: WsService, received_msg: IData) {
    const { datacache } = this
    //结束监护页
    let { is_working, device_no, bed_no } = received_msg.data;
    let curid = this.getUnitId(device_no, bed_no)

    if (datacache.get(curid).pregnancy == null) {

        this.clearbyrest(datacache.get(curid).docid, is_working);
    }
}