import { WsService } from "../WsService";

interface IData {
    data: any
    bed_no: number
    name: "push_offline_data_ctg"
    device_no: number
}

export function push_offline_data_ctg(this: WsService, received_msg: IData) {
    const { datacache } = this

    //TODO 解析应用层数据包
    var ctgdata = received_msg.data;
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;
    console.log('push_offline_data_ctg', ctgdata);
    if (datacache.has(cachbi)) {
        var tmpcache = datacache.get(cachbi);
        for (let key in ctgdata) {
            for (let fetal = 0; fetal < tmpcache.fetal_num; fetal++) {
                if (fetal == 0) {
                    if (tmpcache.fhr[fetal])
                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr;
                } else {
                    if (tmpcache.fhr[fetal])
                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr2;
                }
            }
            tmpcache.toco[ctgdata[key].index] = ctgdata[key].toco;
            tmpcache.fm[ctgdata[key].index] = ctgdata[key].fm;
            this.setcur(cachbi, ctgdata[key].index);
        }
    }
}

