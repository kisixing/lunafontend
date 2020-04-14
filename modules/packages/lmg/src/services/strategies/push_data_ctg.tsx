import { WsService } from "../WsService";
import { ICacheItem } from "../types";

interface ICtgData {
    fhr: number
    fhr2: number
    fhr3: number
    toco: number
    fm: number
    index: number
}
interface IData {
    bed_no: number
    data: ICtgData[]
    device_no: number
    name: "push_data_ctg"
}
export const LIMIT_LENGTH = 4 * 60 * 60 * 1.5
export function pushData(target: ICacheItem, data: ICtgData) {
    for (let fetal = 0; fetal < target.fetal_num; fetal++) {
        if (!target.fhr[fetal]) {
            continue;
        }
        const fhrKey = `fhr${fetal > 0 ? fetal + 1 : ''}`
        if (data[fhrKey] == 0) continue;
        if (target.fhr[fetal]) target.fhr[fetal][data.index] = data[fhrKey];
    }
    target.toco[data.index] = data.toco;
    target.fm[data.index] = data.fm;
}

export function push_data_ctg(this: WsService, received_msg: IData) {
    const { datacache } = this

    //TODO 解析应用层数据包
    var data = received_msg.data;
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;

    var target = datacache.get(cachbi);

    if (!target) return

    //kisi 2019-10-17 根据实时数据更新工作状态
    //kisi 2019-10-17 
    // if (tmpcache.status != Working) {
    //     if (tmpcache.status == Stopped) {
    //         cleardata(cachbi);
    //     }
    //     tmpcache.status = Working;
    //     this.refresh('push_data_ctg)
    // }
    if (isNaN(target.csspan)) {
        target.csspan = this.span;
    }
    for (let key in data) {
        for (let fetal = 0; fetal < target.fetal_num; fetal++) {
            if (!target.fhr[fetal]) {
                continue;
            }
            if (fetal == 0) {
                if (data[key].fhr == 0) {
                    continue;
                }
                if (target.fhr[fetal])
                    target.fhr[fetal][data[key].index] = data[key].fhr;
            } else if (fetal == 1) {
                if (data[key].fhr2 == 0) {
                    continue;
                }
                if (target.fhr[fetal])
                    target.fhr[fetal][data[key].index] = data[key].fhr2;
            } else if (fetal == 2) {
                if (data[key].fhr3 == 0) {
                    continue;
                }
                if (target.fhr[fetal])
                    target.fhr[fetal][data[key].index] = data[key].fhr3;
            }
        }
        //console.log(tmpcache.fetal_num,ctgdata[key].index,ctgdata[key].fhr,ctgdata[key].fhr2,tmpcache.fhr[0][ctgdata[key].index]);
        target.toco[data[key].index] = data[key].toco;
        target.fm[data[key].index] = data[key].fm;
        if (target.start == -1) {
            target.start = data[key].index;
            target.past = data[key].index - 4800 > 0 ? data[key].index - 4800 : 0;
            // if (tmpcache.past > 0) {
            //     this.offQueue.EnQueue({"docid":datacache.get(cachbi).docid,"length":tmpcache.past})
            //     //this.getoffline(datacache.get(cachbi).docid, tmpcache.past);
            //     if(!this.offstart){
            //         starttask(this.offQueue,this.offstart);
            //     }
            // }
            target.last = target.start;
        }
        this.setcur(cachbi, data[key].index);
        for (let i = datacache.get(cachbi).start; i > datacache.get(cachbi).past; i--) {
            if (target.fhr[0] && !target.fhr[0][i]) {
                var curstamp = new Date().getTime();
                if (this.offrequest < 8 && (target.orflag || curstamp - target.timestamp > this.interval)) {
                    target.orflag = false;
                    this.offrequest += 1;
                    var dis = target.start - target.past;
                    var length = dis > 800 ? 800 : dis;
                    var startpoint = target.start - length;
                    var endpoint = target.start;
                    //反向取值
                    this.send(JSON.stringify(
                        {
                            name: "get_data_ctg",
                            data: {
                                start_index: startpoint,
                                end_index: endpoint,
                                device_no: id,
                                bed_no: bi
                            }
                        }
                    ))


                    target.timestamp = new Date().getTime();
                    break;
                }
            }
        }
        // 更新last index
        if (data[key].index - target.last < 2) {
            target.last = data[key].index;
        } else {
            //判断 是否有缺失
            //kisi 2019-10-19 不再请求离线
            //kisi 2019-12-02 静默重连后数据恢复处理启用                                   
            console.log('reconnect request last:', target.last, target.index, data[key].index);
            var flag = 0;
            var sflag = 0;
            var eflag = 0;
            for (let il = target.last; il < target.index; il++) {
                if (target.fhr[0] && !target.fhr[0][il] && flag == 0) {
                    if (flag == 0) {
                        sflag = il;
                        flag = 1;
                    }
                } else {
                    if (flag > 0) {
                        eflag = target.index;
                        var curstamp = new Date().getTime();
                        if (this.offrequest < 8 && (target.orflag || curstamp - target.timestamp > this.interval)) {
                            target.orflag = false;
                            this.offrequest += 1;
                            this.send(
                                JSON.stringify({
                                    "name": "get_data_ctg",
                                    data: {
                                        start_index: sflag,
                                        end_index: eflag,
                                        device_no: id,
                                        bed_no: bi
                                    }
                                })
                            );


                            console.log('reconnect request', sflag, eflag);
                            target.timestamp = new Date().getTime();
                        }
                        break;
                    } else {
                        target.last = il;
                    }
                }
            }
            target.last = data[key].index;
        }
    }
}

