"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var menu = (react_1.default.createElement(antd_1.Menu, { onClick: function (e) { return console.log(e); } },
    react_1.default.createElement(antd_1.Menu.Item, { key: "1" }, "1st menu item"),
    react_1.default.createElement(antd_1.Menu.Item, { key: "2" }, "2nd menu item"),
    react_1.default.createElement(antd_1.Menu.Item, { key: "3" }, "3rd menu item")));
exports.default = (function (props) {
    return (react_1.default.createElement(antd_1.Dropdown, { overlay: menu, trigger: ['contextMenu'] },
        react_1.default.createElement("div", { style: { width: '100%', height: '100%', position: 'absolute', top: 0 } }, props.children)));
});
//# sourceMappingURL=index.js.map