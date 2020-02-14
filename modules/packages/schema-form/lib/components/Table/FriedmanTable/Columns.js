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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __importDefault(require("antd/es/button/button"));
var react_1 = __importDefault(require("react"));
var Strategies_1 = __importDefault(require("./Strategies"));
var moment_1 = __importDefault(require("moment"));
var items = [
    {
        title: '检查时间',
        key: 'checkTime',
        type: 'date',
        width: '200px',
    },
    {
        title: '产程时间',
        key: 'duringTime',
        type: 'string',
    },
    {
        title: '宫口开张',
        key: 'gongkouStatus',
        type: 'number',
    },
    {
        title: '抬头下降',
        key: 'taitouStatus',
        type: 'select',
        dataset: [
            { value: '0', label: '+5' },
            { value: '1', label: '+4' },
            { value: '2', label: '+3' },
            { value: '3', label: '+2' },
            { value: '4', label: '+1' },
            { value: '5', label: '0' },
            { value: '6', label: '-1' },
            { value: '7', label: '-2' },
            { value: '8', label: '-3' },
            { value: '9', label: '-4' },
            { value: '10', label: '-5' },
        ],
    },
    {
        title: '血压',
        key: 'bp',
        type: 'string',
    },
    {
        title: '宫缩',
        key: 'gongsuo',
        type: 'string',
    },
    {
        title: '羊水性状',
        key: 'yangshuiStatus',
        type: 'select',
        dataset: [
            { value: '0', label: '清' },
            { value: '1', label: '1度' },
            { value: '2', label: '2度' },
            { value: '3', label: '3度' },
        ],
    },
    {
        title: '事件',
        key: 'event',
        type: 'select',
        dataset: [
            { value: '0', label: '阴检' },
            { value: '1', label: '人工破膜' },
            { value: '2', label: '吸氧' },
            { value: '3', label: '滴催' },
            { value: '4', label: '宫颈封闭' },
            { value: '5', label: '肛查' },
            { value: '6', label: '剖宫产' },
        ],
    },
    {
        title: '记录人',
        key: 'recorder',
        type: 'string',
    },
];
exports.default = (function (_a) {
    var value = _a.value, onChange = _a.onChange;
    var changeField = function (targetKey, key, _value) {
        var data = value.map(function (_) {
            var _a;
            if (_.key === targetKey) {
                return __assign(__assign({}, _), (_a = {}, _a[key] = _value, _a));
            }
            return _;
        });
        onChange(data);
    };
    var columns = [
        {
            dataIndex: Math.random().toString(),
            title: '序号',
            render: function (cured, record, index) {
                return index + 1;
            },
        },
    ]
        .concat(items.map(function (_a) {
        var title = _a.title, key = _a.key, dataset = _a.dataset, type = _a.type, width = _a.width;
        dataset = dataset;
        return {
            title: title,
            dataIndex: key,
            width: width || '140px',
            align: 'center',
            render: function (cured, record, rowIndex) {
                var C = Strategies_1.default[type];
                return (react_1.default.createElement(C, { dataset: dataset, value: cured, onChange: function (v) {
                        changeField(record.key, key, v);
                    } }));
            },
        };
    }))
        .concat({
        dataIndex: Math.random().toString(),
        title: (react_1.default.createElement(button_1.default, { size: "small", icon: "plus", onClick: function () {
                onChange(__spreadArrays(value, [
                    {
                        key: Math.random()
                            .toString()
                            .slice(2),
                        checkTime: moment_1.default(new Date()),
                        duringTime: (value[value.length - 1] && value[value.length - 1].duringTime) || 0,
                    },
                ]));
            } })),
        render: function (a, b, rowIndex) {
            return (react_1.default.createElement(button_1.default, { size: "small", icon: "minus", onClick: function () {
                    var _value = __spreadArrays(value);
                    _value.splice(rowIndex, 1);
                    onChange(_value);
                } }));
        },
    });
    return columns;
});
