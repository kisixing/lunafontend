import { WsService } from "../WsService";
import request from "@lianmed/request";
import { cleardata } from "../utils";

interface IData {
    name: "end_work"
    data: { is_working: number, bed_no: number, device_no: number, doc_id: string }
}

export function end_work(this: WsService, received_msg: IData) {
    const { datacache } = this

    //结束监护页
    let { is_working, device_no, bed_no } = received_msg.data;
    let curid = this.getUnitId(device_no, bed_no)

    const target = datacache.get(curid)
    const { docid, pregnancy } = target
    if (pregnancy) return
    request.get(`/bedinfos?documentno.equals=${docid}`).then(responseData => {

        if (responseData && target) {
            if (responseData['pregnancy'] == null) {

                cleardata(datacache, curid, target.fetal_num);
            }

            target.status = is_working;

            // if (is_working == 0) {
            //     target.status = Working;
            // } else if (is_working === 3) {
            //     target.status = OfflineStopped;

            // } else {
            //     target.status = Stopped;
            // }
            //this.refresh('end_work');
        }
    })

}