import { EventEmitter, event } from "@lianmed/utils";
import request from "@lianmed/request"
import Queue from "../Ecg/Queue";
export enum EWsStatus {
    Pendding, Success, Error
}

export enum BedStatus {
    Working = 1,
    Stopped,
    Offline,
}
const { Working, Stopped, Offline } = BedStatus

const getBlankCacheItem = () => {
    return {
        fhr: [],
        toco: [],
        fm: [],
        index: 0,
        length: 0,
        start: -1,
        last: 0,
        past: 0,
        timestamp: 0,
        docid: '',
        status: Offline,
        orflag: true,
        starttime: '',
        pregnancy: '',
        fetal_num: 1,
        csspan: NaN,
        ecg: new Queue()
    }
}
export class WsService extends EventEmitter {
    static wsStatus: typeof EWsStatus = EWsStatus
    isReady = false;
    interval: number = 10000;
    RECONNECT_INTERVAL: number = 10000;
    span: number = NaN;
    offQueue: Queue = new Queue();
    offstart: boolean = false;

    static _this: WsService;
    log = console.log.bind(console, 'websocket')
    datacache: ICache = new Map();
    settingData: {
        ws_url: "192.168.0.227:8084",
        xhr_url: "192.168.2.152:9986",
        alarm_high: "160",
        alarm_low: "110",
        alarm_on_window: "1",
        alarm_on_sound: "1"
    };
    socket: WebSocket;
    offrequest: number;
    // store = (window as any).g_app._store
    constructor(settingData?) {
        super();
        const { datacache } = this
        datacache.clean = function (key: string) {
            const target = datacache.get(key)
            datacache.set(key, Object.assign(target, getBlankCacheItem()))
        }
        settingData = settingData || {
            ws_url: "192.168.0.227:8084",
            xhr_url: "192.168.2.152:9986",
            alarm_high: "160",
            alarm_low: "110",
            alarm_on_window: "1",
            alarm_on_sound: "1"
        }
        if (WsService._this) {
            return WsService._this;
        }
        WsService._this = this;
        this.settingData = settingData
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
    startwork(device_no: number, bed_no: number) {
        const message = `{"name":"start_work","data":{"device_no":${device_no},"bed_no":${bed_no}}}`;
        this.send(message);
    }
    endwork(device_no: number, bed_no: number) {
        const message = `{"name":"end_work","data":{"device_no":${device_no},"bed_no":${bed_no}}}`;
        this.send(message);
    }
    dispatch(action: any) {
        (window as any).g_app._store.dispatch(action);
    }
    _emit(name: string, ...value: any[]) {
        event.emit(`WsService:${name}`, ...value)
    }

    tip = (text: string, status: EWsStatus) => {
        this.log(text);
        this.dispatch({
            type: 'ws/setState',
            payload: { status }
        })
    }
    connect = (): Promise<ICache> => {
        const { datacache, settingData } = this
        const { ws_url } = settingData
        this.tip('连接中', EWsStatus.Pendding)

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
                this.send(
                    '{"name":"heard","data":{"time":' +
                    191001180000 +
                    ',"index":0}}',
                );
            };
            socket.onclose = (event) => {
                this.tip('关闭', EWsStatus.Error)
                setTimeout(() => {
                    this.connect()
                }, this.RECONNECT_INTERVAL);
            };
            // 接收服务端数据时触发事件
            socket.onmessage = (msg) => {
                let received_msg
                try {
                    received_msg = JSON.parse(msg.data);
                } catch (error) {
                    console.log('json parse error', error)
                }
                if (received_msg) {
                    //showMessage(received_msg);
                    if (received_msg.name == 'push_devices') {
                        var devlist: IDevice[] = received_msg.data;
                        for (var i in devlist) {
                            var devdata = devlist[i];
                            if (!devdata) continue;
                            for (let bi in devdata.beds) {
                                var cachebi = devdata['device_no'] + '-' + devdata.beds[bi].bed_no;
                                if (!datacache.has(cachebi)) {
                                    datacache.set(cachebi, getBlankCacheItem());
                                    convertdocid(cachebi, devdata.beds[bi].doc_id);
                                    if (devdata.beds[bi].is_working) {
                                        datacache.get(cachebi).status = Working;
                                    } else {
                                        datacache.get(cachebi).status = Stopped;
                                    }
                                    datacache.get(cachbi).pregnancy = devdata.beds[bi].pregnancy;
                                    datacache.get(cachebi).fetal_num = devdata.beds[bi].fetal_num;
                                    for (let fetal = 0; fetal < devdata.beds[bi].fetal_num; fetal++) {
                                        datacache.get(cachebi).fhr[fetal] = [];
                                    }
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
                            if (tmpcache.status != Working) {
                                if (tmpcache.status == Stopped) {
                                    cleardata(cachbi);
                                }
                                tmpcache.status = Working;
                            }
                            if (isNaN(tmpcache.csspan)) {
                                tmpcache.csspan = this.span;
                            }
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
                                if (ctgdata[key].index - tmpcache.last < 3) {
                                    tmpcache.last = ctgdata[key].index;
                                } else {
                                    //判断 是否有缺失
                                    var flag = 0;
                                    var sflag = 0;
                                    var eflag = 0;
                                    for (let il = tmpcache.last; il < tmpcache.index; il++) {
                                        if (!tmpcache.fhr[0][il]) {
                                            if (flag == 0) {
                                                sflag = il;
                                                flag = 1;
                                            }
                                        } else {
                                            if (flag > 0) {
                                                eflag = il;
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
                                                    tmpcache.timestamp = new Date().getTime();
                                                }
                                                break;
                                            } else {
                                                tmpcache.last = il;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (received_msg.name == 'get_data_ctg') {
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
                        console.log('update_status')
                        // 状态机处理
                        var statusdata = received_msg.data;
                        var id = statusdata.device_no;
                        var bi = statusdata.bed_no;
                        var cachbi = id + '-' + bi;
                        if (statusdata.status == 1) {
                            datacache.get(cachbi).status = Offline;
                        }
                        datacache.get(cachbi).pregnancy = statusdata.pregnancy;
                        this.dispatch({
                            type: 'ws/updateData', payload: { data: new Map(datacache) }
                        })
                    } else if (received_msg.name == 'push_data_ecg') {
                        //TODO 解析母亲应用层数据包
                        var ecgdata = received_msg.data;
                        var id = received_msg.device_no;
                        var bi = received_msg.bed_no;
                        var cachbi = id + '-' + bi;
                        for (let elop = 0; elop < ecgdata[0].ecg_arr.length; elop++) {
                            datacache.get(cachbi).ecg.EnQueue(ecgdata[0].ecg_arr[elop] & 0x7f);
                        }
                        //console.log(datacache.get(cachbi).ecg);
                    } else if (received_msg.name == 'start_work') {
                        //开启监护页
                        let devdata = received_msg.data;
                        const { bed_no, device_no } = devdata;
                        let curid = `${device_no}-${bed_no}`;
                        let count = datacache.get(curid).fetal_num;
                        //TODO : 更新设备状态
                        cleardata(curid);
                        convertdocid(curid, devdata.doc_id);
                        if (devdata.is_working) {
                            datacache.get(curid).status = Working;
                        } else {
                            datacache.get(curid).status = Stopped;
                        }
                        datacache.get(curid).fetal_num = count;
                        for (let fetal = 0; fetal < count; fetal++) {
                            datacache.get(curid).fhr[fetal] = [];
                        }
                        //TODO : 更新设备状态
                        convertdocid(curid, devdata.doc_id);
                        this.log('start_work', devdata.is_working);
                        const target = datacache.get(curid)
                        if (devdata.is_working) {
                            target.status = Working
                        } else {
                            target.status = Stopped
                        }

                        this.dispatch({
                            type: 'ws/updateData', payload: { data: new Map(datacache) }
                        })
                    } else if (received_msg.name == 'end_work') {
                        //结束监护页

                        let devdata = received_msg.data;
                        let curid = Number(devdata['device_no']) + '-' + Number(devdata['bed_no']);
                        if (devdata.is_working) {
                            datacache.get(curid).status = Working;
                        } else {
                            datacache.get(curid).status = Stopped;
                        }
                        this.dispatch({
                            type: 'ws/updateData', payload: { data: new Map(datacache) }
                        })
                    } else if (received_msg.name == 'heard') {
                        //heard
                        let devdata = received_msg.data;
                        console.log(devdata);
                        let servertime = convertstarttime(devdata.time);
                        this.span = Math.floor(new Date(servertime).getTime() / 1000 - new Date().getTime() / 1000) * 4 - 12;
                        console.log(this.span);
                    }
                }
            };
            return [datacache];
        });

        function cleardata(curid) {
            datacache.get(curid).fhr = [];
            datacache.get(curid).toco = [];
            datacache.get(curid).fm = [];
            datacache.get(curid).index = 0;
            datacache.get(curid).length = 0;
            datacache.get(curid).start = -1;
            datacache.get(curid).last = 0;
            datacache.get(curid).past = 0;
            datacache.get(curid).timestamp = 0;
            datacache.get(curid).docid = '';
            datacache.get(curid).status = Offline;
            datacache.get(curid).starttime = '';
            datacache.get(curid).pregnancy = '';
            datacache.get(curid).ecg = new Queue();
        }
        function convertdocid(id: string, doc_id: string) {
            datacache.get(id).docid = doc_id;
            if (doc_id != '') {
                let vt = doc_id.split('_');
                if (vt.length > 2) {
                    datacache.get(id).starttime = convertstarttime(vt[2]);
                }
            }
        }

        function convertstarttime(pureid: string) {
            return '20' +
                pureid.substring(0, 2) +
                '-' +
                pureid.substring(2, 4) +
                '-' +
                pureid.substring(4, 6) +
                ' ' +
                pureid.substring(6, 8) +
                ':' +
                pureid.substring(8, 10) +
                ':' +
                pureid.substring(10, 12);
        }

        function setcur(id: string, value: number) {
            if (value < datacache.get(id).start) {
                datacache.get(id).start = value;
            } else if (value >= datacache.get(id).index) {
                datacache.get(id).index = value;
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

export interface ICacheItem {
    fhr: number[][];
    toco: number[];
    fm: number[];
    index: number;
    length: number;
    start: number;
    last: number;
    past: number;
    timestamp: number;
    docid: string;
    pregnancy: string;
    status: BedStatus;
    orflag: boolean;
    starttime: string;
    fetal_num: number;
    csspan: number;
    ecg: Queue;
}
export type ICache = Map<string, ICacheItem> & { clean?: (key: string) => void }
export interface IDevice {
    ERP: string;
    bed_num: number;
    beds: IBed[];
    device_no: number;
    device_type: string;
    ecg_sampling_rate: number;
    is_handshake_finish: boolean;
    wifi_conn_state: boolean;
}
export interface IBed {
    bed_no: number;
    doc_id: string;
    fetal_num: number;
    is_include_mother: boolean;
    is_working: boolean;
    pregnancy:string;
}