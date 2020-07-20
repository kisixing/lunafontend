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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
function getDeformedOptions() {
    return {
        S: function (props) {
            return (react_1.default.createElement(antd_1.Select, __assign({ style: { width: 80 } }, props),
                react_1.default.createElement(antd_1.Select.Option, { value: 0 }, "\u6B63\u5E38"),
                react_1.default.createElement(antd_1.Select.Option, { value: 1 }, "\u53EF\u7591"),
                react_1.default.createElement(antd_1.Select.Option, { value: 2 }, "\u5F02\u5E38")));
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
                return (react_1.default.createElement(antd_1.Select, __assign({ style: { width: 100 } }, props),
                    react_1.default.createElement(antd_1.Select.Option, { value: 0 }, "LD"),
                    react_1.default.createElement(antd_1.Select.Option, { value: 1 }, "VD"),
                    react_1.default.createElement(antd_1.Select.Option, { value: 2 }, "\u65E0\uFF0C\u5176\u5B83")));
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
            2: '≥115s',
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
            2: '≥13',
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
            2: '无或早减',
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
            name: '心率基线(bpm)',
            0: '<100,>180',
            1: '100~109,161~180',
            2: '110~160',
            key: 'bhr',
        },
        {
            name: '摆动振幅(bpm)',
            0: '<5',
            1: '5~9,>30',
            2: '10~30',
            key: 'ltv',
        },
        {
            name: '摆动频率',
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
                return (react_1.default.createElement(antd_1.Select, __assign({ style: { width: 100 } }, props),
                    react_1.default.createElement(antd_1.Select.Option, { value: 0 }, "\u65E0"),
                    react_1.default.createElement(antd_1.Select.Option, { value: 1 }, "\u5468\u671F\u6027"),
                    react_1.default.createElement(antd_1.Select.Option, { value: 2 }, "\u6563\u5728\u6027")));
            }
        },
        {
            name: '减速',
            0: '晚期+其他',
            1: '变异',
            2: '无',
            key: 'dec',
            R: function (props) {
                return (react_1.default.createElement(antd_1.Select, __assign({ style: { width: 100 } }, props),
                    react_1.default.createElement(antd_1.Select.Option, { value: 0.1 }, "\u665A\u671F"),
                    react_1.default.createElement(antd_1.Select.Option, { value: 0.2 }, "\u5176\u4ED6"),
                    react_1.default.createElement(antd_1.Select.Option, { value: 1 }, "\u53D8\u5F02"),
                    react_1.default.createElement(antd_1.Select.Option, { value: 2 }, "\u65E0")));
            }
        },
    ],
    Sogc: [
        {
            name: '基线',
            0: '110~160bpm',
            1: '100~109bpm、>160bpm、基线上升',
            2: '极限过缓<100bpm、基线过速>160bpm、基线不确定',
            key: 'bhr',
        },
        {
            name: '变异',
            0: '6~25次/分、≤5次/分<40分钟',
            1: '≤5次/分40~80分钟',
            2: '≤5次/分>80分钟、≥26次/分>10分钟、正弦型',
            key: 'ltv',
        },
        {
            name: '减速',
            0: '无减速或偶发变异减速<30秒',
            1: '变异减速30~60秒',
            2: '变异减速>60秒、晚期减速',
            key: 'dec',
        },
        {
            name: '加速',
            0: '≥2次40分钟内',
            1: '<2次40~80分钟',
            2: '<2次>80分钟',
            key: 'acc',
        },
    ].map(function (_) { return (__assign(__assign({}, _), getDeformedOptions())); }),
    Cstoct: [
        {
            name: '基线',
            0: '110~160bpm',
            1: '<110bpm不伴基线变异缺失、>160bpm',
            2: '<100bpm伴基线变异缺失',
            key: 'bhr',
        },
        {
            name: '变异',
            0: '6~25次/分(中变异)',
            1: '0次/分不伴反复出现的晚期减速、≤5次/分(小变异)、≥26次/分',
            2: '0次/分伴胎心过缓反复出现的变异减速或晚期减速',
            key: 'ltv',
        },
        {
            name: '加速',
            0: '有、无',
            1: '刺激胎儿后仍缺失',
            2: '无',
            key: 'acc',
        },
        {
            name: '早减',
            0: '有、无',
            1: '无',
            2: '无',
            key: 'ed',
        },
        {
            name: '变减',
            0: '无',
            1: '反复出现伴小变异或中变异、延迟减速(>2分但<10分)、非特异性的变异减速',
            2: '反复出现伴基线变异缺失',
            key: 'vd',
        },
        {
            name: '晚减',
            0: '无',
            1: '反复出现伴中变异',
            2: '反复出现伴基线变异缺失',
            key: 'ld',
        },
        {
            name: '正弦曲线',
            0: '无',
            1: '无',
            2: '有',
            key: 'sinusoid',
        },
    ].map(function (_) { return (__assign(__assign({}, _), getDeformedOptions())); }),
};
exports.tableData = tableData;
tableData.Sogc.deformed = true;
tableData.Cstoct.deformed = true;
//# sourceMappingURL=tableData.js.map