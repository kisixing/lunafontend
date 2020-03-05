"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var antd_2 = require("@uform/antd");
exports.default = antd_2.registerFormField('Abnormal', antd_2.connect({})(function (props) {
    var onChange = props.onChange, value = props.value;
    var safeValue = value || { value: '0', text: '' };
    var keyValue = safeValue.value, text = safeValue.text;
    return (react_1.default.createElement(antd_1.Radio.Group, { value: keyValue, onChange: function (e) {
            onChange({ value: e.target.value, text: '' });
        } },
        react_1.default.createElement(antd_1.Radio, { value: "0" }, "\u672A\u89C1\u5F02\u5E38"),
        react_1.default.createElement(antd_1.Radio, { value: "1" }, "\u5F02\u5E38"),
        keyValue === '1' && (react_1.default.createElement(antd_1.Input, { style: { width: '50%' }, value: text, onChange: function (e) { return onChange({ value: keyValue, text: e.target.value }); } }))));
}));
