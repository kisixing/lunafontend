"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var Queue_1 = __importDefault(require("../Ecg/Queue"));
var index_1 = __importDefault(require("antd/lib/message/index"));
exports.mapStatusToColor = (_a = {},
    _a[types_1.BedStatus.Offline] = '#bdbdbd',
    _a[types_1.BedStatus.Stopped] = '#bdbdbd ',
    _a[types_1.BedStatus.OfflineStopped] = '#bdbdbd ',
    _a[types_1.BedStatus.Working] = '#43a047',
    _a[types_1.BedStatus.Uncreated] = '#bdbdbd',
    _a);
exports.mapStatusToText = (_b = {},
    _b[types_1.BedStatus.Offline] = '离线',
    _b[types_1.BedStatus.Stopped] = '停止',
    _b[types_1.BedStatus.OfflineStopped] = '停止',
    _b[types_1.BedStatus.Working] = '监护中',
    _b[types_1.BedStatus.Uncreated] = '未创建',
    _b);
exports.f0Pro_errText = {
    allot_probe: {
        1: '创建监护失败，胎心探头不足',
        2: '创建监护失败，宫缩探头不足'
    },
    release_probe: {
        1: '添加失败，缺少可用宫缩探头'
    },
    add_more_fhr_probe: {
        1: '添加失败，缺少可用宫缩探头'
    },
    add_toco_probe: {
        1: '添加失败，缺少可用宫缩探头',
        2: '添加失败，已存在宫缩探头'
    },
    replace_probe: {
        1: '添加失败，缺少可用宫缩探头'
    }
};
exports.handleF0ProErr = function (k, status) {
    if (exports.f0Pro_errText[k] && exports.f0Pro_errText[k][status]) {
        index_1.default.info(exports.f0Pro_errText[k][status]);
    }
};
function getMaxArray() {
    return [];
}
exports.getMaxArray = getMaxArray;
function getEmptyCacheItem(base) {
    base.fetal_num = base.fetal_num ? base.fetal_num : 1;
    var fetal_num = base.fetal_num;
    var item = new types_1.ICacheItem(__assign({ batterylowArr: [], id: '0', fhr: Array(fetal_num).fill(0).map(function () { return getMaxArray(); }), toco: getMaxArray(), fm: getMaxArray(), fmp: getMaxArray(), index: 0, length: 0, start: -1, last: 0, past: 0, timestamp: 0, docid: 'INIT', status: types_1.BedStatus.Offline, orflag: true, starttime: '', pregnancy: null, fetalposition: { fhr1: '', fhr2: '', fhr3: '' }, fetal_num: 1, csspan: NaN, ismulti: false, ecg: new Queue_1.default(), ple: new Queue_1.default(240), ecgdata: null, is_include_volume: false, is_include_tocozero: false, is_include_toco: false, realTime: true, alarms: Object.create(null) }, base));
    return item;
}
exports.getEmptyCacheItem = getEmptyCacheItem;
function cleardata(datacache, curid, fetal_num) {
    console.log('cleardata', curid);
    var target = datacache.get(curid);
    var empty = getEmptyCacheItem({ fetal_num: fetal_num, fhr: Array(fetal_num).fill(0).map(function () { return getMaxArray(); }), id: curid });
    if (target) {
        Object.assign(target, empty);
    }
    else {
        datacache.set(curid, empty);
    }
}
exports.cleardata = cleardata;
function convertstarttime(pureid) {
    if (!pureid)
        return new Date().toLocaleDateString();
    var t = ["/", "/", " ", ":", ":", ""];
    return '20' + pureid.split('').reduce(function (a, b, i) {
        return "" + a + b + (i & 1 ? t[~~(i / 2)] : '');
    }, '');
}
exports.convertstarttime = convertstarttime;
//# sourceMappingURL=utils.js.map