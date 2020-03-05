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
var react_1 = __importDefault(require("react"));
var react_contextmenu_1 = require("react-contextmenu");
var antd_1 = require("antd");
var styled_components_1 = __importDefault(require("styled-components"));
var MenuItem_1 = __importDefault(require("./MenuItem"));
var SubMenu_1 = __importDefault(require("./SubMenu"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n.ant-menu-submenu-title {\n    line-height:24px !important;\n    height:24px !important;\n    margin:0 !important;\n}\n.ant-menu {\n    background:rgb(238,238,238)\n}\n"], ["\n.ant-menu-submenu-title {\n    line-height:24px !important;\n    height:24px !important;\n    margin:0 !important;\n}\n.ant-menu {\n    background:rgb(238,238,238)\n}\n"])));
exports.default = (function (props) {
    var rightClickXy = props.rightClickXy;
    function handleClick(a) {
        var current = rightClickXy.current;
        alert("\u53F3\u51FB" + current.x + ":" + current.y);
    }
    var a = { disableIfShiftIsPressed: true };
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(react_contextmenu_1.ContextMenuTrigger, __assign({ id: "some_unique_identifier" }, a), react_1.default.Children.map(props.children, function (_) {
            return react_1.default.cloneElement(_, {
                onContextMenu: function (e) {
                    console.log('menu', e);
                }
            });
        })),
        react_1.default.createElement(react_contextmenu_1.ContextMenu, { id: "some_unique_identifier" },
            react_1.default.createElement(antd_1.Menu, { selectable: false, onClick: handleClick, style: { boxShadow: '0 0 5px 0px black', minWidth: 160 }, mode: "vertical" },
                react_1.default.createElement(MenuItem_1.default, { key: "1" },
                    react_1.default.createElement("span", null, " \u83DC\u53551")),
                react_1.default.createElement(MenuItem_1.default, { key: "2" },
                    react_1.default.createElement("span", null, "  \u83DC\u53552")),
                react_1.default.createElement(SubMenu_1.default, { key: "33", title: react_1.default.createElement("span", null,
                        react_1.default.createElement("span", null, "\u83DC\u53553")) },
                    react_1.default.createElement(MenuItem_1.default, { key: "3" },
                        react_1.default.createElement("span", null, "\u83DC\u53553.1")),
                    react_1.default.createElement(MenuItem_1.default, { key: "4" }, "\u83DC\u53553.2"))))));
});
var templateObject_1;
