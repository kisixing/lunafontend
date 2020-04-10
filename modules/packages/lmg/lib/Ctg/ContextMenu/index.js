"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var menu = (react_1.default.createElement(antd_1.Menu, { onClick: function (e) { return console.log(111, e.domEvent.target); } },
    react_1.default.createElement(antd_1.Menu.Item, { key: "1" }, "11st menu item"),
    react_1.default.createElement(antd_1.Menu.Item, { key: "2" }, "22nd menu item"),
    react_1.default.createElement(antd_1.Menu.Item, { key: "3" }, "33rd menu item")));
exports.default = (function (props) {
    var s = props.s;
    return (react_1.default.createElement(antd_1.Dropdown, { overlay: menu, trigger: ['contextMenu'] },
        react_1.default.createElement("div", { style: { width: '100%', height: '100%', position: 'absolute', top: 0 }, onContextMenu: function (e) {
                var target = e.currentTarget;
                var clientX = e.clientX, clientY = e.clientY;
                var _a = target.getBoundingClientRect(), x = _a.x, y = _a.y;
                var offsetX = clientX - x;
                var offsetY = clientY - y;
                s.current.reviceAnalyse(offsetX, offsetY);
            } }, props.children)));
});
//# sourceMappingURL=index.js.map