import { EventEmitter, event } from "@lianmed/utils";
import request from "@lianmed/request"
import Queue from "../Ecg/Queue";
import { throttle } from "lodash";
import { EWsStatus, BedStatus, ICache, IDevice, EWsEvents } from './types'
import { getEmptyCacheItem, cleardata, convertstarttime } from "./utils";
export * from './types'
export * from './utils'
// import pingpong from "./pingpong";

const ANNOUNCE_INTERVAL = 100

const { Working, Stopped, Offline, OfflineStopped } = BedStatus

export class WsService extends EventEmitter {
    static wsStatus: typeof EWsStatus = EWsStatus
    static _this: WsService;
    eventNamespace = "ws"
    isReady = false;
    dirty = false;
    interval: number = 10000;
    RECONNECT_INTERVAL: number = 3000;
    span: number = NaN;
    offQueue: Queue = new Queue();
    offstart: boolean = false;
    pongTimeoutId: NodeJS.Timeout = null
    log = console.log.bind(console, 'websocket')
    datacache: ICache = new Map();
    settingData: { [x: string]: string };
    socket: WebSocket;
    offrequest: number;
    // store = (window as any).g_app._store
    constructor(settingData?) {
        super();
        const { datacache } = this
        datacache.clean = function (key: string) {
            const target = datacache.get(key)
            datacache.set(key, Object.assign(target, getEmptyCacheItem()))
        }
        settingData = settingData || {
            ws_url: "192.168.0.227:8084",
            area_devices: ''
        }
        if (WsService._this) {
            return WsService._this;
        }
        WsService._this = this;
        this.settingData = settingData
    }
    pongIndex = 0
    sendHeard() {
        this.send(JSON.stringify({
            data: { index: this.pongIndex, time: +new Date() },
            name: "heard"
        }))
        this.pongIndex++
    }
    pong() {
        let count = 0
        const MS = 3000
        this.pongTimeoutId ? clearInterval(this.pongTimeoutId) : this.sendHeard()
        this.emit(EWsEvents.pong, true)
        this.pongTimeoutId = setInterval(() => {
            (count > 2) && this.pongFailed()
            this.sendHeard()
            count++
        }, MS)
    }
    pongFailed() {
        this.emit(EWsEvents.pong, false)
        this.socket.close()
    }
    refreshInterval = 2000
    refreshTimeout = null
    refresh(name) {

        if (this.refreshTimeout) {
            this.log(name, 'explode', 'discarded')
            return
        }
        this.refreshTimeout = setTimeout(() => {
            this.log(name, 'explode')
            this.emit('explode', new Map(this.datacache))
            this.refreshTimeout = null
        }, this.refreshInterval);
    }
    getDatacache(): Promise<ICache> {
        if (this.isReady) {
            return Promise.resolve(this.datacache)
        } else {
            return new Promise((resolve) => {
                this.once('read', data => {
                    resolve(data)
                })
            })
        }
    }
    send(message: string) {
        const { log, socket } = this
        if (socket.readyState == WebSocket.OPEN) {
            socket.send(message);
        } else {
            log('The socket is not open.');
        }
    }
    startwork(device_no: string, bed_no: string) {
        const message = `{"name":"start_work","data":{"device_no":${device_no},"bed_no":${bed_no}}}`;
        this.send(message);
    }
    endwork(device_no: string, bed_no: string) {
        const message = `{"name":"end_work","data":{"device_no":${device_no},"bed_no":${bed_no}}}`;
        this.send(message);
    }
    _emit(name: string, ...value: any[]) {
        event.emit(`WsService:${name}`, ...value)
    }

    tip = (text: string, status: EWsStatus) => {
        this.log(text, status);

    }
    connect = (): Promise<ICache> => {
        const { datacache, settingData } = this
        const { ws_url } = settingData
        this.tip('连接中', EWsStatus.Pendding)
        if (!ws_url) return Promise.reject('错误的ws_url')
        this.socket = new WebSocket(

            `ws://${ws_url}/?clientType=ctg-suit&token=eyJ1c2VybmFtZSI6ICJhZG1pbiIsInBhc3N3b3JkIjogImFkbWluIn0=`,
        );
        const socket = this.socket;

        return new Promise(res => {

            socket.onerror = () => {
                this.log('错误')
            };

            socket.onopen = (event) => {
                this.offrequest = 0;
                // this.dirty && location.reload()
                this.pong()

                this.settingData.area_devices && this.send(JSON.stringify({
                    name: "area_devices",
                    data: this.settingData.area_devices
                }))
            };
            socket.onclose = (event) => {
                // this.tip('关闭', EWsStatus.Error)
                setTimeout(() => {
                    this.dirty = true
                    this.connect()
                }, this.RECONNECT_INTERVAL);
            };
            // 接收服务端数据时触发事件
            socket.onmessage = (msg) => {
                this.pong()
                let received_msg
                try {
                    received_msg = JSON.parse(msg.data);
                } catch (error) {
                    console.log('json parse error', error)
                }
                if (received_msg) {
                    //showMessage(received_msg);
                    if (received_msg.name == 'push_devices') {
                        console.log('dev', received_msg.data)
                        var devlist: IDevice[] = received_msg.data;
                        for (var i in devlist) {
                            var devdata = devlist[i];
                            if (!devdata) continue;
                            for (let bi in devdata.beds) {
                                var cachebi = devdata['device_no'] + '-' + devdata.beds[bi].bed_no;
                                if (!datacache.has(cachebi)) {
                                    datacache.set(cachebi, getEmptyCacheItem());
                                    convertdocid(cachebi, devdata.beds[bi].doc_id);
                                    if (devdata.beds[bi].is_working == 0) {
                                        datacache.get(cachebi).status = Working;
                                    } else if (devdata.beds[bi].is_working == 1) {
                                        datacache.get(cachebi).status = Stopped;
                                    } else if (devdata.beds[bi].is_working == 1) {
                                        datacache.get(cachebi).status = Offline;
                                    } else {
                                        datacache.get(cachebi).status = OfflineStopped;

                                    }
                                    //debugger
                                    if (devdata.beds[bi].pregnancy) {
                                        datacache.get(cachebi).pregnancy = JSON.parse(devdata.beds[bi].pregnancy);
                                    }
                                    if (devdata.beds[bi].fetalposition) {
                                        datacache.get(cachebi).fetalposition = JSON.parse(devdata.beds[bi].fetalposition);
                                    }
                                    datacache.get(cachebi).fetal_num = devdata.beds[bi].fetal_num;
                                    for (let fetal = 0; fetal < devdata.beds[bi].fetal_num; fetal++) {
                                        datacache.get(cachebi).fhr[fetal] = [];
                                    }
                                    if (devdata.beds[bi].is_include_mother)
                                        datacache.get(cachebi).ismulti = true;
                                }
                            }
                        }
                        this.tip('成功', EWsStatus.Success)
                        res(datacache)
                        this.emit('read', datacache)
                        this.isReady = true
                    } else if (received_msg.name == 'push_data_ctg') {
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
                                    if (fetal == 0) {
                                        if (ctgdata[key].fhr == 0) {
                                            continue;
                                        }
                                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr;
                                    } else if (fetal == 1) {
                                        if (ctgdata[key].fhr2 == 0) {
                                            continue;
                                        }
                                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr2;
                                    } else if (fetal == 2) {
                                        if (ctgdata[key].fhr3 == 0) {
                                            continue;
                                        }
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
                                    //     //getoffline(datacache.get(cachbi).docid, tmpcache.past);
                                    //     if(!this.offstart){
                                    //         starttask(this.offQueue,this.offstart);
                                    //     }
                                    // }
                                    tmpcache.last = tmpcache.start;
                                }
                                setcur(cachbi, ctgdata[key].index);
                                for (let i = datacache.get(cachbi).start; i > datacache.get(cachbi).past; i--) {
                                    if (!tmpcache.fhr[0][i]) {
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
                                        if (!tmpcache.fhr[0][il] && flag == 0) {
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
                    } else if (received_msg.name == 'push_offline_data_ctg') {
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
                                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr;
                                    } else {
                                        tmpcache.fhr[fetal][ctgdata[key].index] = ctgdata[key].fhr2;
                                    }
                                }
                                tmpcache.toco[ctgdata[key].index] = ctgdata[key].toco;
                                tmpcache.fm[ctgdata[key].index] = ctgdata[key].fm;
                                setcur(cachbi, ctgdata[key].index);
                            }
                        }
                    }
                    else if (received_msg.name == 'get_data_ctg') {
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
                                setcur(cachbi, ctgdata[key].index);
                            }
                            tmpcache.orflag = true;
                            if (this.offrequest > 0) {
                                this.offrequest -= 1;
                            }
                        }
                    } else if (received_msg.name == 'get_devices') {
                        // this.log('get_devices', received_msg.data);
                        // var devlist = received_msg.data;
                        // for (var i in devlist) {
                        //     var devdata = devlist[i];
                        //     if (!devdata) continue;
                        // }
                    } else if (received_msg.name == 'update_status') {
                        console.log('update_status 11111', received_msg.data)
                        // 状态机处理
                        var statusdata = received_msg.data;
                        var id = statusdata.device_no;
                        var bi = statusdata.bed_no;
                        var cachbi = id + '-' + bi;
                        if (!datacache.has(cachbi)) {
                            datacache.set(cachbi, getEmptyCacheItem());
                        }
                        if (statusdata.status == 0) {
                            datacache.get(cachbi).status = Working;
                        } else if (statusdata.status == 1) {
                            datacache.get(cachbi).status = Stopped;
                        } else if (statusdata.status == 2) {
                            datacache.get(cachbi).status = Offline;
                        } else {
                            datacache.get(cachbi).status = OfflineStopped;
                        }
                        console.log('update_status', datacache.get(cachbi))
                        datacache.get(cachbi).pregnancy = statusdata.pregnancy ? JSON.parse(statusdata.pregnancy) : null;
                        datacache.get(cachbi).fetalposition = statusdata.fetalposition ? JSON.parse(statusdata.fetalposition) : null;
                        this.refresh('update_status')
                    } else if (received_msg.name == 'push_data_ecg') {
                        //TODO 解析母亲应用层数据包
                        var ecgdata = received_msg.data;
                        var id = received_msg.device_no;
                        var bi = received_msg.bed_no;
                        var cachbi = id + '-' + bi;
                        if (datacache.has(cachbi)) {
                            for (let eindex = 0; eindex < ecgdata.length; eindex++) {
                                for (let elop = 0; elop < ecgdata[eindex].ecg_arr.length; elop++) {
                                    datacache.get(cachbi).ecg.EnQueue(ecgdata[eindex].ecg_arr[elop] & 0xff);
                                }
                                let pulse_rate = ecgdata[eindex].pulse_rate;
                                if (pulse_rate == 0) {
                                    pulse_rate = '--';
                                }
                                let sys_bp = ecgdata[eindex].sys_bp;
                                if (sys_bp == 1) {
                                    sys_bp = '--';
                                }
                                let dia_bp = ecgdata[eindex].dia_bp;
                                if (dia_bp == 1) {
                                    dia_bp = '--';
                                }
                                let mean_bp = ecgdata[eindex].mean_bp;
                                if (mean_bp == 1) {
                                    mean_bp = '--';
                                }
                                datacache.get(cachbi).ecgdata = [pulse_rate, ecgdata[eindex].blood_oxygen, ecgdata[eindex].temperature, ecgdata[eindex].temperature1, pulse_rate, ecgdata[eindex].resp_rate, sys_bp + '/' + dia_bp + '/' + mean_bp];
                            }
                        } else {
                            console.log('cache error', datacache);
                        }
                    } else if (received_msg.name == 'start_work') {
                        //开启监护页
                        let devdata = received_msg.data;
                        const { bed_no, device_no } = devdata;
                        let curid = `${device_no}-${bed_no}`;
                        //TODO : 更新设备状态
                        cleardata(datacache, curid, devdata.fetal_num);
                        convertdocid(curid, devdata.doc_id);
                        this.log('start_work', devdata, devdata.is_working);
                        const target = datacache.get(curid);
                        if (typeof (devdata.ismulti) != 'undefined') {
                            target.ismulti = devdata.ismulti;
                            this.log('start_work_ismulit', devdata, devdata.ismulti);
                        }
                        if (devdata.is_working == 0) {
                            target.status = Working
                        } else {
                            target.status = Stopped
                        }
                        this.refresh('start_work')
                    } else if (received_msg.name == 'end_work') {
                        //结束监护页
                        let devdata = received_msg.data;
                        let curid = Number(devdata['device_no']) + '-' + Number(devdata['bed_no']);
                        if (datacache.get(curid).pregnancy == null) {
                            console.log('end_work', datacache.get(curid), devdata['doc_id']);
                            //cleardata(datacache, curid, datacache.get(curid).fetal_num);
                            clearbyrest(datacache.get(curid).docid, devdata.is_working);
                        }
                    } else if (received_msg.name == 'heard') {
                        //heard
                        let devdata = received_msg.data;
                        console.log(devdata);
                        let servertime = convertstarttime(devdata.time);
                        this.span = Math.floor(new Date(servertime).getTime() / 1000 - new Date().getTime() / 1000) * 4 - 12;
                        // console.log(2222, new Date(servertime.replace(/-/g,'/')), +new Date());
                    } else if(received_msg.name == 'push_event_alarm'){
                        //kisi 2019-12-08 增加 事件推送
                        let devdata = received_msg.data;
                        
                    }
                }
            };
            return [datacache];
        });

        function convertdocid(id: string, doc_id: string) {
            datacache.get(id).docid = doc_id;
            if (doc_id != '') {
                let vt = doc_id.split('_');
                if (vt.length > 2) {
                    datacache.get(id).starttime = convertstarttime(vt[2]);
                }
            }
        }

        function setcur(id: string, value: number) {
            if (value < datacache.get(id).start) {
                datacache.get(id).start = value;
            } else if (value >= datacache.get(id).index) {

                datacache.get(id).index = value;
                const arr = id.split('-')
                let text = id
                arr[0] && arr[1] && arr[0] === arr[1] && (text = arr[0])
                if (value > 20 * 240) {

                    announce(text)
                    // event.emit('bed:announcer', `${text}号子机监护时间到`)
                }
            }
            if (value > datacache.get(id).last) {
                //datacache.get(id).last = value;
            }
        }

        function starttask(queue, offstart) {
            if (!queue.IsEmpty()) {
                offstart = true;
                let obj = queue.DeQueue();
                getoffline(queue, obj.docid, obj.length, offstart);
            }
            else {
                offstart = false;
            }
        }

        function clearbyrest(doc_id: string, is_working: number) {
            request.get(`/bedinfos?documentno.equals=${doc_id}`).then(responseData => {
                let vt = doc_id.split('_');
                let curid = vt[0] + '-' + vt[1];
                console.log(doc_id, curid, responseData);
                if (responseData) {
                    if (responseData['pregnancy'] == null) {
                        cleardata(datacache, curid, datacache.get(curid).fetal_num);
                    }
                    if (is_working == 0) {
                        datacache.get(curid).status = Working;
                    } else if (is_working === 3) {
                        datacache.get(curid).status = OfflineStopped;

                    } else {
                        datacache.get(curid).status = Stopped;

                    }
                    //this.refresh('end_work');
                }
            })

        }

        function getoffline(queue: Queue, doc_id: string, offlineend: number, offstart: boolean) {
            request.get(`/ctg-exams-data/${doc_id}`).then(responseData => {
                let vt = doc_id.split('_');
                let dbid = vt[0] + '-' + vt[1];
                console.log(doc_id, offlineend, responseData, datacache.get(dbid).past);
                if (responseData) {
                    initfhrdata(responseData, datacache.get(dbid), offlineend, queue, offstart);
                }
                // datacache.get(dbid).start = 0;
            })
        }

        function initfhrdata(data, datacache, offindex, queue, offstart) {
            Object.keys(data).forEach(key => {
                let oridata = data[key] as string;
                if (!oridata) {
                    return;
                }
                for (let i = 0; i < offindex; i++) {
                    let hexBits = oridata.substring(0, 2);
                    let data_to_push = parseInt(hexBits, 16);
                    if (key === 'fhr1') {
                        datacache.fhr[0][i] = data_to_push;
                    } else if (key === 'fhr2') {
                        if (datacache.fhr[1])
                            datacache.fhr[1][i] = data_to_push;
                    } else if (key === 'fhr3') {
                        if (datacache.fhr[2])
                            datacache.fhr[2][i] = data_to_push;
                    } else if (key === 'toco') {
                        datacache.toco[i] = data_to_push;
                    } else if (key === "fm") {
                        datacache.fm[i] = data_to_push;
                    }
                    oridata = oridata.substring(2, oridata.length);
                }
            });
            starttask(queue, offstart);
        }

    };
}
const announce = throttle((text) => {
    if (sp(text)) {
        event.emit('bed:announcer', `${text}`)
    }
}, ANNOUNCE_INTERVAL)

let timeoutKey = null
let spObj = {}
function sp(key: string) {
    if (!timeoutKey) {
        timeoutKey = setTimeout(() => {
            spObj = {}
            timeoutKey = null
        }, 1000 * 60 * 20);
    }
    const old = spObj[key]
    return old ? false : (spObj[key] = true)
}

