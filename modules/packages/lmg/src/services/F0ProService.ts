

import { Observable } from 'rxjs'; // tslint:disable-line
import { Observer } from 'rxjs/Observer'; // tslint:disable-line
// import Storage from 'store';
import { EventEmitter } from "@lianmed/utils";

import { BedStatus, EWsEvents, EWsStatus, ICache, IDeviceType } from './types';
import { WsService } from "./WsService";
// import { message } from "antd";
// const t_key = 'access_token'


export class F0ProService extends EventEmitter {
    static s: F0ProService
    datacache: ICache
    wsService: WsService
    private connection: Promise<any>;
    private rxSubscriber: Observer<any>;
    private _connectedResolve: (value: ICache) => any = null;
    public get connectedResolve(): (value: ICache) => any {
        return this._connectedResolve || (v => v);
    }
    public set connectedResolve(value: (value: ICache) => any) {
        this._connectedResolve = value;
    }
    private rxObservable: Observable<any>;
    private e: EventEmitter = null
    private url: string






    config(url: string) {

    }






    constructor(ws: WsService) {
        super()


        if (F0ProService.s) {
            return F0ProService.s
        }
        this.wsService = ws

        // this.stompClient = stompClient
        // this.connection = connection
        // this.rxSubscriber = rxSubscriber
        F0ProService.s = this
        this.config('')
        this.connect()
    }
    fackData() {
        const data = new Map()

        this.connectedResolve(data)

    }

    createConnection = (): Promise<any> => new Promise((resolve, reject) => (this.connectedResolve = resolve));

    createListener = () => new Observable(_subscriber => {
        this.rxSubscriber = _subscriber;
    });

    connect = () => {
        const { url } = this

        if (this.connectedResolve !== null || this.e) {
            return;
        }
        this.connection = this.createConnection();
        this.rxObservable = this.createListener();


        try {

        } catch (e) {
            console.log(e, url)
        }


    };
    setcur(id, value) {

    }

    getdata(id) {


    }

    init(size) {
        var device_no = '';
        this.datacache = new Map();
        for (var i = 0; i < size; i++) {
            var div = document.createElement("div");
            var bed_no = i + 1;
            var label1 = document.createElement("label");
            label1.innerText = '床号';
            div.appendChild(label1);
            var dev = document.createElement("input");
            dev.type = "text";
            dev.id = "bed" + bed_no;
            dev.value = String(bed_no);
            dev.setAttribute('ReadOnly', 'True');
            dev.size = 5;
            div.appendChild(dev);
            var label2 = document.createElement("label");
            label2.innerText = '类型';
            div.appendChild(label2);
            var dev2 = document.createElement("input");
            dev2.type = "text";
            dev2.setAttribute('ReadOnly', 'True');
            dev2.size = 5;
            dev2.id = "type" + device_no;
            dev2.value = "F0PRO";
            div.appendChild(dev2);
            var label6 = document.createElement("label");
            label6.innerText = '状态';
            div.appendChild(label6);
            var dev6 = document.createElement("input");
            dev6.type = "text";
            dev6.setAttribute('ReadOnly', 'True');
            dev6.size = 5;
            dev6.id = "state" + bed_no;
            /*
            if(devdata.beds[0].isWorking){
                dev6.value = '运行';
            }else{
                dev6.value = '停止';
            }
            */
            div.appendChild(dev6);
            var label3 = document.createElement("label");
            label3.innerText = '最新index';
            div.appendChild(label3);
            var dev3 = document.createElement("input");
            dev3.type = "text";
            dev3.setAttribute('ReadOnly', 'True');
            dev3.size = 5;
            dev3.id = "curindex" + bed_no;
            div.appendChild(dev3);
            var label4 = document.createElement("label");
            label4.innerText = '缓存index';
            div.appendChild(label4);
            var dev4 = document.createElement("input");
            dev4.type = "text";
            dev4.setAttribute('ReadOnly', 'True');
            dev4.size = 5;
            dev4.id = "cacheindex" + bed_no;
            div.appendChild(dev4);
            //createElement生成button对象
            var bt = document.createElement("button");
            bt.id = "btn" + bed_no;
            bt.innerHTML = '新建监护';
            //绑定点击事件
            var cachdbi = device_no + '-' + bed_no;
            bt.onclick = () => {
                var bed_no = '';
                var device_no = '';
                var cache = device_no + "-" + bed_no
                if (this.datacache[cache].state == 0) {
                    this.alloc(device_no, bed_no);
                }
            };
            div.appendChild(bt);
            //createElement生成 开始监护按钮
            var bt = document.createElement("button");
            bt.id = "startbtn" + bed_no;
            bt.innerHTML = '开始监护';
            //绑定点击事件
            var cachdbi = device_no + '-' + bed_no;
            bt.onclick = () => {
                var bed_no = '';
                var device_no = '';
                var cache = device_no + "-" + bed_no
                if (this.datacache[cache].state == 0) {
                    this.start_work(device_no, bed_no);
                }
            };
            div.appendChild(bt);
            //createElement生成 停止监护按钮
            var bt = document.createElement("button");
            bt.id = "endbtn" + bed_no;
            bt.innerHTML = '停止监护';
            //绑定点击事件
            var cachdbi = device_no + '-' + bed_no;
            bt.onclick = () => {
                var bed_no = '';
                var device_no = '';
                var cache = device_no + "-" + bed_no
                if (this.datacache[cache].state == 0) {
                    this.end_work(device_no, bed_no);
                }
            };
            div.appendChild(bt);
            this.datacache[cachdbi] = { 'fhr': [], 'toco': [], 'fm': [], 'curindex': 0, 'length': 0, 'start': -1, 'last': 0, 'past': 0, 'timestamp': 0, 'state': 0, 'status': 0 };
        }
        this.enableoperater(0, 1, false);
        this.batchupdate();
    }

    batchupdate() {

    }

    updatebuttonstatus(name, bed_no, status) {
    }

    updatedevstatus(bed_no, status) {

    }

    enableoperater(bed_no, fetal_num, enable) {

    }
    /*
    * FO-PRO WS 交互
    */


    /**分配探头**/
    alloc(device_no, bed_no) {
        const command = '{"name": "allot_probe","device_no": {0},"bed_no": {1}}'
        this.wsService.send(command);
    }
    /**取消探头分配**/
    cancelalloc(device_no, bed_no) {
        const command = '{"name":"release_probe","device_no":{0},"bed_no":{1}}'
        this.wsService.send(command);
    }
    /**调节音量**/
    modify_volume(device_no, bed_no, volume) {
        const command = '{"name":"change_volume","device_no":{0},"bed_no":{1},"data":{"vol": {2}}}'
        this.wsService.send(command);
    }
    /**静音**/
    mute_volume(device_no, bed_no, fetal, ismute) {
        const command = '{"name":"mute_volume","device_no":{0},"bed_no":{1},"data":{"fetel_no": {2},"isMute": {3}}}'
        this.wsService.send(command);
    }
    subscribe(device_no) {
        const command = '{"name":"area_devices","data":{0}}'
        this.wsService.send(command);
    }
    start_work(device_no, bed_no) {
        const command = '{"name":"start_work","data":{"device_no":{0},"bed_no":{1}}}'
        this.wsService.send(command);
    }
    zeroing(device_no, bed_no) {
        const command = '{"name":"toco_zero","device_no":{0},"bed_no":{1}}'
        this.wsService.send(command);
    }
    end_work(device_no, bed_no) {
        const command = '{"name":"end_work","data":{"device_no":{0},"bed_no":{1}}}'
        this.wsService.send(command);
    }
    add_fhr(device_no, bed_no, count) {
        const command = '{"name":"add_more_fhr_probe","device_no":{0},"bed_no":{1},"data":{"fetal_num": {2}}}'
        this.wsService.send(command);
    }
    add_toco(device_no, bed_no) {
        const command = '{"name":"add_toco_probe","device_no":{0},"bed_no":{1}}'
        this.wsService.send(command);
    }
}