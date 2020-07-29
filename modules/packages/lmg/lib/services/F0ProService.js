"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var utils_1 = require("@lianmed/utils");
var F0ProService = (function (_super) {
    __extends(F0ProService, _super);
    function F0ProService(ws) {
        var _this = _super.call(this) || this;
        _this._connectedResolve = null;
        _this.e = null;
        _this.createConnection = function () { return new Promise(function (resolve, reject) { return (_this.connectedResolve = resolve); }); };
        _this.createListener = function () { return new rxjs_1.Observable(function (_subscriber) {
            _this.rxSubscriber = _subscriber;
        }); };
        _this.connect = function () {
            var url = _this.url;
            if (_this.connectedResolve !== null || _this.e) {
                return;
            }
            _this.connection = _this.createConnection();
            _this.rxObservable = _this.createListener();
            try {
            }
            catch (e) {
                console.log(e, url);
            }
        };
        if (F0ProService.s) {
            return F0ProService.s;
        }
        _this.wsService = ws;
        F0ProService.s = _this;
        _this.config('');
        _this.connect();
        return _this;
    }
    Object.defineProperty(F0ProService.prototype, "connectedResolve", {
        get: function () {
            return this._connectedResolve || (function (v) { return v; });
        },
        set: function (value) {
            this._connectedResolve = value;
        },
        enumerable: true,
        configurable: true
    });
    F0ProService.prototype.config = function (url) {
    };
    F0ProService.prototype.fackData = function () {
        var data = new Map();
        this.connectedResolve(data);
    };
    F0ProService.prototype.setcur = function (id, value) {
    };
    F0ProService.prototype.getdata = function (id) {
    };
    F0ProService.prototype.init = function (size) {
        var _this = this;
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
            var bt = document.createElement("button");
            bt.id = "btn" + bed_no;
            bt.innerHTML = '新建监护';
            var cachdbi = device_no + '-' + bed_no;
            bt.onclick = function () {
                var bed_no = '';
                var device_no = '';
                var cache = device_no + "-" + bed_no;
                if (_this.datacache[cache].state == 0) {
                    _this.alloc(device_no, bed_no);
                }
            };
            div.appendChild(bt);
            var bt = document.createElement("button");
            bt.id = "startbtn" + bed_no;
            bt.innerHTML = '开始监护';
            var cachdbi = device_no + '-' + bed_no;
            bt.onclick = function () {
                var bed_no = '';
                var device_no = '';
                var cache = device_no + "-" + bed_no;
                if (_this.datacache[cache].state == 0) {
                    _this.start_work(device_no, bed_no);
                }
            };
            div.appendChild(bt);
            var bt = document.createElement("button");
            bt.id = "endbtn" + bed_no;
            bt.innerHTML = '停止监护';
            var cachdbi = device_no + '-' + bed_no;
            bt.onclick = function () {
                var bed_no = '';
                var device_no = '';
                var cache = device_no + "-" + bed_no;
                if (_this.datacache[cache].state == 0) {
                    _this.end_work(device_no, bed_no);
                }
            };
            div.appendChild(bt);
            this.datacache[cachdbi] = { 'fhr': [], 'toco': [], 'fm': [], 'curindex': 0, 'length': 0, 'start': -1, 'last': 0, 'past': 0, 'timestamp': 0, 'state': 0, 'status': 0 };
        }
        this.enableoperater(0, 1, false);
        this.batchupdate();
    };
    F0ProService.prototype.batchupdate = function () {
    };
    F0ProService.prototype.updatebuttonstatus = function (name, bed_no, status) {
    };
    F0ProService.prototype.updatedevstatus = function (bed_no, status) {
    };
    F0ProService.prototype.enableoperater = function (bed_no, fetal_num, enable) {
    };
    F0ProService.prototype.alloc = function (device_no, bed_no) {
        var command = '{"name": "allot_probe","device_no": {0},"bed_no": {1}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.cancelalloc = function (device_no, bed_no) {
        var command = '{"name":"release_probe","device_no":{0},"bed_no":{1}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.modify_volume = function (device_no, bed_no, volume) {
        var command = '{"name":"change_volume","device_no":{0},"bed_no":{1},"data":{"vol": {2}}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.mute_volume = function (device_no, bed_no, fetal, ismute) {
        var command = '{"name":"mute_volume","device_no":{0},"bed_no":{1},"data":{"fetel_no": {2},"isMute": {3}}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.subscribe = function (device_no) {
        var command = '{"name":"area_devices","data":{0}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.start_work = function (device_no, bed_no) {
        var command = '{"name":"start_work","data":{"device_no":{0},"bed_no":{1}}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.zeroing = function (device_no, bed_no) {
        var command = '{"name":"toco_zero","device_no":{0},"bed_no":{1}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.end_work = function (device_no, bed_no) {
        var command = '{"name":"end_work","data":{"device_no":{0},"bed_no":{1}}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.add_fhr = function (device_no, bed_no, count) {
        var command = '{"name":"add_more_fhr_probe","device_no":{0},"bed_no":{1},"data":{"fetal_num": {2}}}';
        this.wsService.send(command);
    };
    F0ProService.prototype.add_toco = function (device_no, bed_no) {
        var command = '{"name":"add_toco_probe","device_no":{0},"bed_no":{1}}';
        this.wsService.send(command);
    };
    return F0ProService;
}(utils_1.EventEmitter));
exports.F0ProService = F0ProService;
//# sourceMappingURL=F0ProService.js.map