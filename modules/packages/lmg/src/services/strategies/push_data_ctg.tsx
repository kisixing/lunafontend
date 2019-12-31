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
    name: "push_data_ctg"
}

export function push_data_ctg(this: WsService, received_msg: IData) {
    const { datacache } = this

    //TODO 解析应用层数据包
    var ctgdata = received_msg.data;
    //console.this.log(ctgdata);
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;
    if (datacache.has(cachbi)) {
        var tmpcache = datacache.get(cachbi);
        //kisi 2019-10-17 根据实时数据更新工作状态
        //kisi 2019-10-17 
        // if (tmpcache.status != Working) {
        //     if (tmpcache.status == Stopped) {
        //         cleardata(cachbi);
        //     }
        //     tmpcache.status = Working;
        //     this.refresh('push_data_ctg)
        // }
        if (isNaN(tmpcache.csspan)) {
            tmpcache.csspan = this.span;
        }
        for (let key in ctgdata) {
            for (let fetal = 0; fetal < tmpcache.fetal_num; fetal++) {
                if (!tmpcache.fhr[fetal]) {
                    continue;
                }
                if (fetal == 0) {
                    if (ctgdata[key].fhr == 0) {
                        continue;
                    }
                    if (tmpcache.fhr[fetal])
                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr;
                } else if (fetal == 1) {
                    if (ctgdata[key].fhr2 == 0) {
                        continue;
                    }
                    if (tmpcache.fhr[fetal])
                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr2;
                } else if (fetal == 2) {
                    if (ctgdata[key].fhr3 == 0) {
                        continue;
                    }
                    if (tmpcache.fhr[fetal])
                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr3;
                }
            }
            //console.log(tmpcache.fetal_num,ctgdata[key].index,ctgdata[key].fhr,ctgdata[key].fhr2,tmpcache.fhr[0][ctgdata[key].index]);
            tmpcache.toco[ctgdata[key].index] = ctgdata[key].toco;
            tmpcache.fm[ctgdata[key].index] = ctgdata[key].fm;
            if (tmpcache.start == -1) {
                tmpcache.start = ctgdata[key].index;
                tmpcache.past = ctgdata[key].index - 4800 > 0 ? ctgdata[key].index - 4800 : 0;
                // if (tmpcache.past > 0) {
                //     this.log(datacache.get(cachbi).docid, tmpcache.past);
                //     this.offQueue.EnQueue({"docid":datacache.get(cachbi).docid,"length":tmpcache.past})
                //     //this.getoffline(datacache.get(cachbi).docid, tmpcache.past);
                //     if(!this.offstart){
                //         starttask(this.offQueue,this.offstart);
                //     }
                // }
                tmpcache.last = tmpcache.start;
            }
            this.setcur(cachbi, ctgdata[key].index);
            for (let i = datacache.get(cachbi).start; i > datacache.get(cachbi).past; i--) {
                if (tmpcache.fhr[0] && !tmpcache.fhr[0][i]) {
                    var curstamp = new Date().getTime();
                    if (this.offrequest < 8 && (tmpcache.orflag || curstamp - tmpcache.timestamp > this.interval)) {
                        tmpcache.orflag = false;
                        this.offrequest += 1;
                        var dis = tmpcache.start - tmpcache.past;
                        var length = dis > 800 ? 800 : dis;
                        var startpoint = tmpcache.start - length;
                        var endpoint = tmpcache.start;
                        //反向取值
                        this.send(
                            '{"name":"get_data_ctg","data":{"start_index":' +
                            startpoint +
                            ',"end_index":' +
                            endpoint +
                            ',"device_no":' +
                            id +
                            ',"bed_no":' +
                            bi +
                            '}}',
                        );
                        tmpcache.timestamp = new Date().getTime();
                        break;
                    }
                }
            }
            // 更新last index
            if (ctgdata[key].index - tmpcache.last < 2) {
                tmpcache.last = ctgdata[key].index;
            } else {
                //判断 是否有缺失
                //kisi 2019-10-19 不再请求离线
                //kisi 2019-12-02 静默重连后数据恢复处理启用                                   
                console.log('reconnect request last:', tmpcache.last, tmpcache.index, ctgdata[key].index);
                var flag = 0;
                var sflag = 0;
                var eflag = 0;
                for (let il = tmpcache.last; il < tmpcache.index; il++) {
                    if (tmpcache.fhr[0] && !tmpcache.fhr[0][il] && flag == 0) {
                        if (flag == 0) {
                            sflag = il;
                            flag = 1;
                        }
                    } else {
                        if (flag > 0) {
                            eflag = tmpcache.index;
                            var curstamp = new Date().getTime();
                            if (this.offrequest < 8 && (tmpcache.orflag || curstamp - tmpcache.timestamp > this.interval)) {
                                tmpcache.orflag = false;
                                this.offrequest += 1;
                                this.send(
                                    '{"name":"get_data_ctg","data":{"start_index":' +
                                    sflag +
                                    ',"end_index":' +
                                    eflag +
                                    ',"device_no":' +
                                    id +
                                    ',"bed_no":' +
                                    bi +
                                    '}}',
                                );
                                console.log('reconnect request', sflag, eflag);
                                tmpcache.timestamp = new Date().getTime();
                            }
                            break;
                        } else {
                            tmpcache.last = il;
                        }
                    }
                }
                tmpcache.last = ctgdata[key].index;
            }
        }
    }
}

