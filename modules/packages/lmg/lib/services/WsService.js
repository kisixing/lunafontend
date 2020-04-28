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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("@lianmed/request"));
var utils_1 = require("@lianmed/utils");
var lodash_1 = require("lodash");
var Queue_1 = __importDefault(require("../Ecg/Queue"));
var strategies_1 = require("./strategies");
var types_1 = require("./types");
var utils_2 = require("./utils");
__export(require("./types"));
__export(require("./useCheckNetwork"));
__export(require("./utils"));
var ANNOUNCE_INTERVAL = 1000;
var SECOND = 1000;
var Working = types_1.BedStatus.Working, Stopped = types_1.BedStatus.Stopped, OfflineStopped = types_1.BedStatus.OfflineStopped;
exports.LIMIT_LENGTH = 4 * 3600 * 2;
var WsService = (function (_super) {
    __extends(WsService, _super);
    function WsService(settingData) {
        var _this_1 = _super.call(this) || this;
        _this_1.eventNamespace = "ws";
        _this_1.isReady = false;
        _this_1.dirty = false;
        _this_1.interval = 10000;
        _this_1.RECONNECT_INTERVAL = 3000;
        _this_1.span = NaN;
        _this_1.offQueue = new Queue_1.default();
        _this_1.offstart = false;
        _this_1.pongTimeoutId = null;
        _this_1.log = console.log.bind(console, 'websocket');
        _this_1.datacache = new Map();
        _this_1.strategies = strategies_1.getStrategies(_this_1);
        _this_1.BedStatus = types_1.BedStatus;
        _this_1.PENDDING_INTERVAL = SECOND * 30;
        _this_1.pongIndex = 0;
        _this_1.t = +new Date();
        _this_1.refreshInterval = 2000;
        _this_1.refreshTimeout = null;
        _this_1.connect = function () {
            var _a = _this_1, datacache = _a.datacache, settingData = _a.settingData;
            var ws_url = settingData.ws_url;
            if (!ws_url)
                return Promise.reject('错误的ws_url');
            _this_1.socket = new WebSocket("ws://" + ws_url + "/?clientType=ctg-suit&token=eyJ1c2VybmFtZSI6ICJhZG1pbiIsInBhc3N3b3JkIjogImFkbWluIn0=");
            var socket = _this_1.socket;
            return new Promise(function (res) {
                _this_1.connectResolve = res;
                socket.onerror = function () {
                    console.log('错误');
                };
                socket.onopen = function (event) {
                    _this_1.offrequest = 0;
                    _this_1.pong();
                };
                socket.onclose = function (event) {
                    setTimeout(function () {
                        _this_1.dirty = true;
                        _this_1.connect();
                    }, _this_1.RECONNECT_INTERVAL);
                };
                socket.onmessage = function (msg) {
                    _this_1.pong();
                    var received_msg;
                    try {
                        received_msg = JSON.parse(msg.data);
                    }
                    catch (error) {
                        console.log('json parse error', error);
                    }
                    if (received_msg) {
                        var mesName = received_msg.name;
                        var strategy = _this_1.strategies[mesName];
                        strategy && strategy(received_msg);
                    }
                };
                return [datacache];
            });
        };
        console.log('wsService', _this_1);
        var datacache = _this_1.datacache;
        datacache.clean = function (key) {
            var target = datacache.get(key);
            datacache.set(key, Object.assign(target, utils_2.getEmptyCacheItem()));
        };
        settingData = settingData || {
            ws_url: "192.168.0.227:8084",
            area_devices: ''
        };
        if (WsService._this) {
            return WsService._this;
        }
        WsService._this = _this_1;
        _this_1.settingData = settingData;
        _this_1.dataLimit();
        utils_1.event.on('suit:keepData', _this_1.dataLimit.bind(_this_1));
        return _this_1;
    }
    WsService.prototype.getUnitId = function (device_no, bed_no) {
        return device_no + "-" + bed_no;
    };
    WsService.prototype.sendHeard = function () {
        this.send(JSON.stringify({
            data: { index: this.pongIndex, time: +new Date() },
            name: "heard"
        }));
        this.pongIndex++;
    };
    WsService.prototype.pong = function () {
        var _this_1 = this;
        var t = +new Date();
        t - this.t > this.PENDDING_INTERVAL && this.pongFailed();
        this.t = t;
        var count = 0;
        var MS = 3000;
        this.pongTimeoutId ? clearInterval(this.pongTimeoutId) : this.sendHeard();
        this.emit(types_1.EWsEvents.pong, true);
        this.pongTimeoutId = setInterval(function () {
            (count > 2) && _this_1.pongFailed();
            _this_1.sendHeard();
            count++;
        }, MS);
    };
    WsService.prototype.pongFailed = function () {
        this.emit(types_1.EWsEvents.pong, false);
        this.socket.close();
    };
    WsService.prototype.refresh = function (name) {
        var _this_1 = this;
        if (name === void 0) { name = 'default'; }
        if (this.refreshTimeout) {
            return;
        }
        this.refreshTimeout = setTimeout(function () {
            _this_1.emit('explode', new Map(_this_1.datacache));
            _this_1.refreshTimeout = null;
        }, this.refreshInterval);
    };
    WsService.prototype.getDatacache = function () {
        var _this_1 = this;
        if (this.isReady) {
            return Promise.resolve(this.datacache);
        }
        else {
            return new Promise(function (resolve) {
                _this_1.once('read', function (data) {
                    resolve(data);
                });
            });
        }
    };
    WsService.prototype.send = function (message) {
        var _a = this, log = _a.log, socket = _a.socket;
        if (socket.readyState == WebSocket.OPEN) {
            socket.send(message);
        }
        else {
            log('The socket is not open.');
        }
    };
    WsService.prototype.startwork = function (device_no, bed_no) {
        var message = "{\"name\":\"start_work\",\"data\":{\"device_no\":" + device_no + ",\"bed_no\":" + bed_no + "}}";
        this.send(message);
    };
    WsService.prototype.endwork = function (device_no, bed_no) {
        var message = "{\"name\":\"end_work\",\"data\":{\"device_no\":" + device_no + ",\"bed_no\":" + bed_no + "}}";
        this.send(message);
    };
    WsService.prototype._emit = function (name) {
        var value = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            value[_i - 1] = arguments[_i];
        }
        utils_1.event.emit.apply(utils_1.event, __spreadArrays(["WsService:" + name], value));
    };
    WsService.prototype.setTocozero = function (device_no, bed_no) {
        var msg = JSON.stringify({
            name: "toco_zero",
            device_no: device_no,
            bed_no: bed_no
        });
        this.send(msg);
    };
    WsService.prototype.getVolume = function (device_no, bed_no) {
        var msg = JSON.stringify({
            name: "getVolume",
            device_no: device_no,
            bed_no: bed_no
        });
        this.send(msg);
    };
    WsService.prototype.change_volume = function (device_no, bed_no, vol) {
        var msg = JSON.stringify({
            name: "change_volume",
            device_no: device_no,
            bed_no: bed_no,
            data: {
                vol: vol,
            }
        });
        this.send(msg);
    };
    WsService.prototype.mute_volume = function (device_no, bed_no, fetel_no, isMute) {
        var msg = JSON.stringify({
            name: "mute_volume",
            device_no: device_no,
            bed_no: bed_no,
            data: {
                fetel_no: fetel_no,
                isMute: isMute,
            }
        });
        this.send(msg);
    };
    WsService.prototype.convertdocid = function (unitId, doc_id) {
        var target = this.datacache.get(unitId);
        target.docid = doc_id;
        if (doc_id != '') {
            var vt = doc_id.split('_');
            if (vt.length > 2) {
                target.starttime = utils_2.convertstarttime(vt[2]);
            }
        }
    };
    WsService.prototype.setcur = function (id, value) {
        var datacache = this.datacache;
        if (value < datacache.get(id).start) {
            datacache.get(id).start = value;
        }
        else if (value >= datacache.get(id).index) {
            datacache.get(id).index = value;
            if (value > 20 * 240) {
                announce(id);
            }
        }
        if (value > datacache.get(id).last) {
        }
    };
    WsService.prototype.getoffline = function (queue, doc_id, offlineend, offstart) {
        var _this_1 = this;
        var datacache = this.datacache;
        request_1.default.get("/ctg-exams-data/" + doc_id).then(function (responseData) {
            var vt = doc_id.split('_');
            var dbid = vt[0] + '-' + vt[1];
            console.log(doc_id, offlineend, responseData, datacache.get(dbid).past);
            if (responseData) {
                _this_1.initfhrdata(responseData, datacache.get(dbid), offlineend, queue, offstart);
            }
        });
    };
    WsService.prototype.clearbyrest = function (doc_id, is_working) {
        var datacache = this.datacache;
        request_1.default.get("/bedinfos?documentno.equals=" + doc_id).then(function (responseData) {
            var vt = doc_id.split('_');
            var curid = vt[0] + '-' + vt[1];
            var target = datacache.get(curid);
            if (responseData && target) {
                if (responseData['pregnancy'] == null) {
                    utils_2.cleardata(datacache, curid, target.fetal_num);
                }
                if (is_working == 0) {
                    target.status = Working;
                }
                else if (is_working === 3) {
                    target.status = OfflineStopped;
                }
                else {
                    target.status = Stopped;
                }
            }
        });
    };
    WsService.prototype.initfhrdata = function (data, datacache, offindex, queue, offstart) {
        Object.keys(data).forEach(function (key) {
            var oridata = data[key];
            if (!oridata) {
                return;
            }
            for (var i = 0; i < offindex; i++) {
                var hexBits = oridata.substring(0, 2);
                var data_to_push = parseInt(hexBits, 16);
                if (key === 'fhr1') {
                    datacache.fhr[0][i] = data_to_push;
                }
                else if (key === 'fhr2') {
                    if (datacache.fhr[1])
                        datacache.fhr[1][i] = data_to_push;
                }
                else if (key === 'fhr3') {
                    if (datacache.fhr[2])
                        datacache.fhr[2][i] = data_to_push;
                }
                else if (key === 'toco') {
                    datacache.toco[i] = data_to_push;
                }
                else if (key === "fm") {
                    datacache.fm[i] = data_to_push;
                }
                oridata = oridata.substring(2, oridata.length);
            }
        });
        this.starttask(queue, offstart);
    };
    WsService.prototype.starttask = function (queue, offstart) {
        if (!queue.IsEmpty()) {
            offstart = true;
            var obj = queue.DeQueue();
            this.getoffline(queue, obj.docid, obj.length, offstart);
        }
        else {
            offstart = false;
        }
    };
    WsService.prototype.dataLimit = function () {
        var _this_1 = this;
        if (this.dataLimitTimeoutId) {
            clearTimeout(this.dataLimitTimeoutId);
        }
        this.dataLimitTimeoutId = setTimeout(function () {
            Array.from(_this_1.datacache.values()).forEach(function (target) {
                var len = target.index - target.past;
                var diff = len - exports.LIMIT_LENGTH;
                if (diff > 0) {
                    for (var fetal = 0; fetal < target.fetal_num; fetal++) {
                        if (target.fhr[fetal]) {
                            for (var i = 0; i < diff; i++) {
                                delete target.fhr[fetal][i];
                            }
                        }
                        ;
                    }
                    for (var i = 0; i < diff; i++) {
                        delete target.toco[i];
                        delete target.fm[i];
                    }
                    target.past = target.index - exports.LIMIT_LENGTH;
                }
            });
            _this_1.dataLimit();
        }, 60 * 1000 * 5);
    };
    WsService.wsStatus = types_1.EWsStatus;
    WsService.EWsEvents = types_1.EWsEvents;
    return WsService;
}(utils_1.EventEmitter));
exports.WsService = WsService;
var announce = lodash_1.throttle(function (text) {
    if (sp(text)) {
        utils_1.event.emit('bed:announcer', "" + text);
    }
}, ANNOUNCE_INTERVAL);
var timeoutKey = null;
var spObj = {};
function sp(key) {
    if (!timeoutKey) {
        timeoutKey = setTimeout(function () {
            spObj = {};
            timeoutKey = null;
        }, SECOND * 60 * 20);
    }
    var old = spObj[key];
    return old ? false : (spObj[key] = true);
}
//# sourceMappingURL=WsService.js.map