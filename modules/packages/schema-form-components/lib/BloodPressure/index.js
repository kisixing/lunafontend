"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var antd_2 = require("@uform/antd");
exports.default = antd_2.registerFormField('BP', antd_2.connect({})(function (props) {
    var onChange = props.onChange, _a = props.value, systolicBP = _a[0], diastolicBP = _a[1];
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(antd_1.InputNumber, { style: { width: '60px' }, value: systolicBP, onChange: function (value) { return onChange([value, diastolicBP]); } }),
        react_1.default.createElement("span", { style: { margin: '0 6px' } }, "/"),
        react_1.default.createElement(antd_1.InputNumber, { style: { width: '60px' }, value: diastolicBP, onChange: function (value) { return onChange([systolicBP, value]); } }),
        react_1.default.createElement("span", { style: { margin: '0 6px' } }, "mmhg")));
}));
