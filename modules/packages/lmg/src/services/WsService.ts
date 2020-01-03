import { EventEmitter, event } from "@lianmed/utils";
import request from "@lianmed/request"
import Queue from "../Ecg/Queue";
import { throttle } from "lodash";
import { EWsStatus, BedStatus, ICache, EWsEvents } from './types'
import { getEmptyCacheItem, cleardata, convertstarttime } from "./utils";
export * from './types'
export * from './utils'
export * from './useCheckNetwork'
import { getStrategies } from "./strategies";
// import pingpong from "./pingpong";

const ANNOUNCE_INTERVAL = 1000

const { Working, Stopped, OfflineStopped } = BedStatus

export class WsService extends EventEmitter {
    static wsStatus: typeof EWsStatus = EWsStatus
    static _this: WsService
    static EWsEvents = EWsEvents
    eventNamespace = "ws"
    isReady = false
    dirty = false
    interval: number = 10000
    RECONNECT_INTERVAL: number = 3000
    span: number = NaN
    offQueue: Queue = new Queue()
    offstart: boolean = false
    pongTimeoutId: NodeJS.Timeout = null
    log = console.log.bind(console, 'websocket')
    datacache: ICache = new Map()
    settingData: { [x: string]: string }
    socket: WebSocket
    offrequest: number
    strategies = getStrategies(this)
    BedStatus = BedStatus
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
    getUnitId(device_no, bed_no) {
        return `${device_no}-${bed_no}`
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
    refresh(name = 'default') {

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
    setTocozero(device_no: number, bed_no: number) {
        const msg = JSON.stringify({
            name: "toco_zero",
            device_no,
            bed_no
        })
        this.send(msg)
    }
    getVolume(device_no: number, bed_no: number) {
        const msg = JSON.stringify({
            name: "getVolume",
            device_no,
            bed_no
        })
        this.send(msg)
    }
    change_volume(device_no: number, bed_no: number, vol: number) {
        const msg = JSON.stringify({
            name: "change_volume",
            device_no,
            bed_no,
            data: {
                vol,
            }
        })
        this.send(msg)
    }
    mute_volume(device_no: number, bed_no: number, fetel_no: number, isMute: number) {
        const msg = JSON.stringify({
            name: "mute_volume",
            device_no,
            bed_no,
            data: {
                fetel_no,
                isMute,
            }

        })
        this.send(msg)
    }
    connectResolve: (value: any) => void
    convertdocid(id: string, doc_id: string) {
        this.datacache.get(id).docid = doc_id;
        if (doc_id != '') {
            let vt = doc_id.split('_');
            if (vt.length > 2) {
                this.datacache.get(id).starttime = convertstarttime(vt[2]);
            }
        }
    }
    setcur(id: string, value: number) {
        const { datacache } = this

        if (value < datacache.get(id).start) {
            datacache.get(id).start = value;
        } else if (value >= datacache.get(id).index) {

            datacache.get(id).index = value;
            if (value > 20 * 240) {
                announce(id)
            }
        }
        if (value > datacache.get(id).last) {
            //datacache.get(id).last = value;
        }
    }
    getoffline(queue: Queue, doc_id: string, offlineend: number, offstart: boolean) {
        const { datacache } = this

        request.get(`/ctg-exams-data/${doc_id}`).then(responseData => {
            let vt = doc_id.split('_');
            let dbid = vt[0] + '-' + vt[1];
            console.log(doc_id, offlineend, responseData, datacache.get(dbid).past);
            if (responseData) {
                this.initfhrdata(responseData, datacache.get(dbid), offlineend, queue, offstart);
            }
            // datacache.get(dbid).start = 0;
        })
    }

    clearbyrest(doc_id: string, is_working: number) {
        const { datacache } = this

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

    initfhrdata(data, datacache, offindex, queue, offstart) {
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
        this.starttask(queue, offstart);
    }

    starttask(queue, offstart) {
        if (!queue.IsEmpty()) {
            offstart = true;
            let obj = queue.DeQueue();
            this.getoffline(queue, obj.docid, obj.length, offstart);
        }
        else {
            offstart = false;
        }
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
            this.connectResolve = res
            socket.onerror = () => {
                this.log('错误')
            };

            socket.onopen = (event) => {
                this.offrequest = 0;
                // this.dirty && location.reload()
                this.pong()

                // this.settingData.area_devices && this.send(JSON.stringify({
                //     name: "area_devices",
                //     data: this.settingData.area_devices
                // }))
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
                    const mesName = received_msg.name
                    const strategy = this.strategies[mesName]
                    strategy && strategy(received_msg)
                }
            };
            return [datacache];
        });
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

