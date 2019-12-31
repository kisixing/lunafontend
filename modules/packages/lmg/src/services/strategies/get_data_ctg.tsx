import { WsService } from "../WsService";

interface II {
    fhr: number
    fhr2: number
    fhr3: number
    toco: number
    fm: number
    index: number
}
interface IData {
    bed_no: number
    data: II[]
    device_no: number
    name: "get_data_ctg"
}

export function get_data_ctg(this: WsService, received_msg: IData) {
    const { datacache } = this

    //TODO 解析应用层数据包
    var ctgdata = received_msg.data;
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;
    if (datacache.has(cachbi)) {
        var tmpcache = datacache.get(cachbi);
        for (let key in ctgdata) {
            for (let fetal = 0; fetal < tmpcache.fetal_num; fetal++) {
                if (fetal == 0) {
                    tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr;
                } else {
                    tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr2;
                }
            }
            tmpcache.toco[ctgdata[key].index] = ctgdata[key].toco;
            tmpcache.fm[ctgdata[key].index] = ctgdata[key].fm;
            this.setcur(cachbi, ctgdata[key].index);
        }
        tmpcache.orflag = true;
        if (this.offrequest > 0) {
            this.offrequest -= 1;
        }
    }
}

