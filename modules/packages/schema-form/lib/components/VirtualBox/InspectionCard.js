"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("@uform/antd");
exports.default = antd_1.createVirtualBox('inspection_card', function (props) {
    return (react_1.default.createElement("fieldset", { className: "code-box-meta markdown", style: {
            position: 'relative',
            fontSize: '14px',
            lineHeight: '2',
            border: '1px solid #ccc',
            margin: '10px',
            borderRadius: '2px',
        } },
        react_1.default.createElement("legend", { style: { width: 'auto', margin: '0', marginLeft: '16px', border: '0' } }, props.title),
        react_1.default.createElement("div", { className: "code-box-description", style: { padding: '18px' } }, props.children)));
});
