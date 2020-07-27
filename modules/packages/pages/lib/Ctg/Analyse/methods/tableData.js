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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var id = 0;
function Opts(_a) {
    var m = _a.m, o = __rest(_a, ["m"]);
    return (react_1.default.createElement(antd_1.Select, __assign({ style: { width: 280 } }, o), m.map(function (_a) {
        var n = _a[0], label = _a[1];
        return (react_1.default.createElement(antd_1.Select.Option, { value: "00" + n + "," + label, key: "00" + n + "," + label + "," + ++id }, label));
    })));
}
function getDeformedOptions(timeChecked) {
    if (timeChecked === void 0) { timeChecked = false; }
    return {
        S: function (props) {
            return (react_1.default.createElement(antd_1.Select, __assign({ style: { width: 120 } }, props),
                react_1.default.createElement(antd_1.Select.Option, { value: 0 }, "\u6B63\u5E38"),
                react_1.default.createElement(antd_1.Select.Option, { value: 1 }, "\u53EF\u7591"),
                react_1.default.createElement(antd_1.Select.Option, { value: 2 }, "\u5F02\u5E38"),
                timeChecked ? react_1.default.createElement(antd_1.Select.Option, { value: 3 }, "\u65F6\u957F\u4E0D\u8DB3") : null));
        }
    };
}
var tableData = {
    Fischer: [
        {
            name: '心率基线(bpm)',
            0: '<100,>180',
            1: '100~109,161~180',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '振幅变异(bpm)',
            0: '<5',
            1: '5~9,>30',
            2: '10~30',
            key: 'ltv',
        },
        {
            name: '周期变异(次)',
            0: '<2',
            1: '2~6',
            2: '>6',
            key: 'stv',
        },
        {
            name: '加速(次)',
            0: '无',
            1: '1～4',
            2: '>4',
            key: 'acc',
        },
        {
            name: '减速(次)',
            0: 'LD',
            1: 'VD',
            2: '无，其它',
            key: 'dec',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0, 'LD'],
                        [1, 'VD'],
                        [2.1, '无'],
                        [2.2, '其它'],
                    ] }, props)));
            }
        },
    ],
    Nst: [
        {
            name: '心率基线(bpm)',
            0: '<100',
            1: '100~109,>160',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '振幅变异(bpm)',
            0: '<5',
            1: '5~9,>30',
            2: '10~30',
            key: 'ltv',
        },
        {
            name: '胎动FHR上升时间(s)',
            0: '<10s',
            1: '10~14s',
            2: '≥15s',
            key: 'accduration',
        },
        {
            name: '胎动FHR变化(bpm)',
            0: '<10',
            1: '10~14',
            2: '≥15',
            key: 'accampl',
        },
        {
            name: '胎动次数(次)',
            0: '无',
            1: '1~2',
            2: '≥3',
            key: 'fm',
        },
    ],
    Krebs: [
        {
            name: '心率基线(bpm)',
            0: '<100,>180',
            1: '100~109,161~180',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '振幅变异(bpm)',
            0: '<5',
            1: '5~9,>25',
            2: '10~25',
            key: 'ltv',
        },
        {
            name: '周期变异(次)',
            0: '<3',
            1: '3~6',
            2: '>6',
            key: 'stv',
        },
        {
            name: '加速(次)',
            0: '0',
            1: '1~4',
            2: '>4',
            key: 'acc',
        },
        {
            name: '减速(次)',
            0: '≥2',
            1: '1',
            2: '无或早期减速',
            key: 'dec',
        },
        {
            name: '胎动(次)',
            0: '0',
            1: '1～4',
            2: '>4',
            key: 'fm',
        },
    ],
    Cst: [
        {
            name: '心率基线',
            0: '<100,>180',
            1: '100~109,161~180',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '振幅变异',
            0: '<5',
            1: '5~9,>30',
            2: '10~30',
            key: 'ltv',
        },
        {
            name: '周期变异',
            0: '<2',
            1: '2～6',
            2: '>6',
            key: 'stv',
        },
        {
            name: '加速',
            0: '无',
            1: '周期性',
            2: '散在性',
            key: 'acc',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0, '无'],
                        [1, '周期性'],
                        [2, '散在性'],
                    ] }, props)));
            }
        },
        {
            name: '减速',
            0: '晚期+其他',
            1: '变异减速',
            2: '无',
            key: 'dec',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0.1, '晚期'],
                        [0.2, '其他'],
                        [1, '基线变异'],
                        [2, '无'],
                    ] }, props)));
            }
        },
    ],
    Sogc: [
        {
            name: '胎心基线',
            0: '110~160bpm',
            1: '100~109bpm、>160bpm、基线上升',
            2: '基线过缓<100bpm、基线过速>160bpm、基线不确定',
            key: 'bhr',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0.0, '110~160bpm'],
                        [1.1, '100~109bpm'],
                        [1.2, '大于160bpm'],
                        [1.3, '基线上升'],
                        [2.1, '基线过缓小于00bpm'],
                        [2.2, '基线过速大于160bpm'],
                        [2.3, '基线不确定'],
                    ] }, props)));
            }
        },
        {
            name: '基线变异',
            0: '6~25次/分、≤5次/分<40分钟',
            1: '≤5次/分40~80分钟',
            2: '≤5次/分>80分钟、≥26次/分>10分钟、正弦型',
            key: 'ltv',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0.1, '6~25次/分'],
                        [0.2, '≤5次/分小于40分钟'],
                        [1.0, '≤5次/分40~80分钟'],
                        [2.1, '≤5次/分大于80分钟'],
                        [2.2, '≥26次/分大于10分钟'],
                        [2.3, '正弦型'],
                    ] }, props)));
            }
        },
        {
            name: '减速',
            0: '无减速或偶发变异减速<30秒',
            1: '变异减速30~60秒',
            2: '变异减速>60秒、晚期减速',
            key: 'dec',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0.1, '无减速'],
                        [0.2, '偶发变异减速小于30秒'],
                        [1.0, '变异减速30~60秒'],
                        [2.1, '变异减速大于60秒'],
                        [2.2, '晚期减速'],
                    ] }, props)));
            }
        },
        {
            name: '加速',
            0: '≥2次40分钟内',
            1: '<2次40~80分钟',
            2: '<2次>80分钟',
            key: 'acc',
            timeChecked: true,
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0, '≥2次40分钟内'],
                        [1, '小于2次40~80分钟'],
                        [2, '小于2次大于80分钟'],
                    ] }, props)));
            }
        },
    ].map(function (_) { return (__assign(__assign({}, _), getDeformedOptions(_.timeChecked))); }),
    Cstoct: [
        {
            name: '胎心基线',
            0: '110~160bpm',
            1: '<110bpm不伴基线变异缺失、>160bpm',
            2: '<100bpm伴基线变异缺失',
            key: 'bhr',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0.0, '110~160bpm'],
                        [1.1, '小于110bpm不伴基线变异缺失'],
                        [1.2, '大于160bpm'],
                        [2.0, '小于100bpm伴基线变异缺失'],
                    ] }, props)));
            }
        },
        {
            name: '基线变异',
            0: '6~25次/分(中变异)',
            1: '0次/分不伴反复出现的晚期减速、≤5次/分(小变异)、≥26次/分',
            2: '0次/分伴胎心过缓反复出现的变异减速或晚期减速',
            key: 'ltv',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0.0, '6~25次/分(中变异)'],
                        [1.1, '0次/分不伴反复出现的晚期减速'],
                        [1.2, '≤5次/分(小变异)'],
                        [1.3, '≥26次/分'],
                        [2.1, '0次/分伴胎心过缓反复出现的变异减速'],
                        [2.2, '晚期减速'],
                    ] }, props)));
            }
        },
        {
            name: '加速',
            0: '有',
            1: '刺激胎儿后仍缺失',
            2: '无',
            key: 'acc',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0, '有'],
                        [1, '刺激胎儿后仍缺失'],
                        [2, '无'],
                    ] }, props)));
            }
        },
        {
            name: '早期减速',
            0: '有',
            1: '',
            2: '',
            key: 'ed',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0.0, '有'],
                        [0.0, '无'],
                    ] }, props)));
            }
        },
        {
            name: '变异减速',
            0: '无',
            1: '反复出现伴小变异或中变异、延迟减速(>2分但<10分)、非特异性的变异减速',
            2: '反复出现伴基线变异缺失',
            key: 'vd',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0.0, '无'],
                        [1.1, '反复出现伴小变异或中变异'],
                        [1.2, '延迟减速(大于2分但小于10分)'],
                        [1.3, '非特异性的变异减速'],
                        [2.0, '反复出现伴基线变异缺失'],
                    ] }, props)));
            }
        },
        {
            name: '晚期减速',
            0: '无',
            1: '反复出现伴中变异',
            2: '反复出现伴基线变异缺失',
            key: 'ld',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0, '无'],
                        [1, '反复出现伴中变异'],
                        [2, '反复出现伴基线变异缺失'],
                    ] }, props)));
            }
        },
        {
            name: '正弦曲线',
            0: '无',
            1: '',
            2: '有',
            key: 'sinusoid',
            R: function (props) {
                return (react_1.default.createElement(Opts, __assign({ m: [
                        [0, '无'],
                        [2, '有'],
                    ] }, props)));
            }
        },
    ].map(function (_) { return (__assign(__assign({}, _), getDeformedOptions())); }),
};
exports.tableData = tableData;
tableData.Sogc.deformed = true;
tableData.Cstoct.deformed = true;
//# sourceMappingURL=tableData.js.map