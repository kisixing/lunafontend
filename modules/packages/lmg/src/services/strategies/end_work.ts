import { WsService } from "../WsService";

interface IData {
    name: "end_work"
    data: { is_working: number }
}

export function end_work(this: WsService, received_msg: IData) {
    const { datacache } = this
    //结束监护页
    let devdata = received_msg.data;
    let curid = Number(devdata['device_no']) + '-' + Number(devdata['bed_no']);

    if (datacache.get(curid).pregnancy == null) {
        console.log('end_work', datacache.get(curid), devdata['doc_id']);
        //cleardata(datacache, curid, datacache.get(curid).fetal_num);
        console.log('cleardata endwork clearbyrest', curid)

        this.clearbyrest(datacache.get(curid).docid, devdata.is_working);
    }
}