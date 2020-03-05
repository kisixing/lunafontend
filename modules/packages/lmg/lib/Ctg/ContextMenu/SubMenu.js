"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n.ant-menu-submenu-title {\n    color:#000;\n    background:rgb(238,238,238);\n    margin:0 !important;\n}\n.ant-menu-submenu-title:hover {\n    color:#000;\n    background:#fff;\n    margin:0 !important;\n}\n.ant-menu-submenu-arrow::after {\n    transition:none !important;\n}\n.ant-menu-submenu-arrow::before {\n    transition:none !important;\n}\n.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after{\n    background:#000 !important;\n    \n}\n.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before{\n    background:#000 !important;\n    \n}\n"], ["\n.ant-menu-submenu-title {\n    color:#000;\n    background:rgb(238,238,238);\n    margin:0 !important;\n}\n.ant-menu-submenu-title:hover {\n    color:#000;\n    background:#fff;\n    margin:0 !important;\n}\n.ant-menu-submenu-arrow::after {\n    transition:none !important;\n}\n.ant-menu-submenu-arrow::before {\n    transition:none !important;\n}\n.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after{\n    background:#000 !important;\n    \n}\n.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before{\n    background:#000 !important;\n    \n}\n"])));
var M = (function (props) {
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(antd_1.Menu.SubMenu, __assign({}, props), props.children)));
});
exports.default = M;
var templateObject_1;
