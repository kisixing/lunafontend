"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var antd_2 = require("@uform/antd");
exports.default = antd_2.registerFormField('input_number_with_text', antd_2.connect({})(function (props) {
    var onChange = props.onChange, value = props.value, suffix = props.suffix, prefix = props.prefix;
    return (react_1.default.createElement("div", null,
        prefix,
        react_1.default.createElement(antd_1.InputNumber, { value: value, onChange: function (number) { return onChange(number); }, style: { margin: '0 5px' } }),
        suffix));
}));
