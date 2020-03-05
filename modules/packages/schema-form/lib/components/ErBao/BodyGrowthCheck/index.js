"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("@uform/antd");
var EditableTable_1 = __importDefault(require("./EditableTable"));
exports.default = antd_1.registerFormField('body_growth_check', antd_1.connect({})(function (props) {
    var _a = props.dataset, dataset = _a === void 0 ? [] : _a, _b = props.value, value = _b === void 0 ? [] : _b, onChange = props.onChange, readOnly = props.readOnly, title = props.title;
    return (react_1.default.createElement("div", { style: { display: 'flex' } },
        react_1.default.createElement("span", { style: { width: '90px', textAlign: 'right' } },
            title,
            "\uFF1A"),
        react_1.default.createElement(EditableTable_1.default, { value: value, onChange: onChange, readOnly: readOnly, dataset: dataset, title: title })));
}));
