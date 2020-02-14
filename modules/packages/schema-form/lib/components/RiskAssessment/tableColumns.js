"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var ColorDot_1 = __importDefault(require("./ColorDot"));
var columns = [
    {
        title: '高危类型',
        dataIndex: 'type',
        align: 'center',
        width: '25%',
        render: function (text, record) {
            var type = record.type, factor = record.factor;
            return (react_1.default.createElement("div", { style: { color: '#f44336' } },
                react_1.default.createElement(ColorDot_1.default, null),
                type,
                ": ",
                factor));
        },
    },
    {
        title: '治愈',
        dataIndex: 'cure',
        align: 'center',
        width: '25%',
        render: function (text, record) {
            var cure = record.cure;
            return cure ? (react_1.default.createElement(antd_1.Icon, { type: "check", style: { color: '#29b6f6' } })) : (react_1.default.createElement(antd_1.Icon, { type: "close", style: { color: '#f44336' } }));
        },
    },
    {
        title: '高危因素',
        dataIndex: 'factor',
        align: 'center',
        width: '25%',
        render: function (text, record) {
            return react_1.default.createElement("div", { style: { color: '#f44336' } }, text);
        },
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        align: 'center',
        width: '25%',
        render: function (text, record) {
            return react_1.default.createElement("div", { style: { color: '#f44336' } }, text);
        },
    },
];
exports.default = columns;
