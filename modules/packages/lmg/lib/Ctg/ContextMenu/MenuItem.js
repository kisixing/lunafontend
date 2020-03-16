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
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var react_contextmenu_1 = require("react-contextmenu");
var styled_components_1 = __importDefault(require("styled-components"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n.ant-menu-submenu-title, .ant-menu-item{\n    line-height:24px !important;\n    height:24px !important;\n    color:black;\n    background:rgb(238,238,238);\n    margin:0 !important;\n}\n.ant-menu-submenu-title, .ant-menu-item:hover {\n    color:black;\n    background:#fff;\n    margin:0 !important;\n}\n"], ["\n.ant-menu-submenu-title, .ant-menu-item{\n    line-height:24px !important;\n    height:24px !important;\n    color:black;\n    background:rgb(238,238,238);\n    margin:0 !important;\n}\n.ant-menu-submenu-title, .ant-menu-item:hover {\n    color:black;\n    background:#fff;\n    margin:0 !important;\n}\n"])));
var M = (function (props) {
    var _a = props.onClick, onClick = _a === void 0 ? function () { console.log('default click'); } : _a, o = __rest(props, ["onClick"]);
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(react_contextmenu_1.MenuItem, null,
            react_1.default.createElement(antd_1.Menu.Item, __assign({ onClick: onClick }, o), props.children))));
});
exports.default = M;
var templateObject_1;
//# sourceMappingURL=MenuItem.js.map