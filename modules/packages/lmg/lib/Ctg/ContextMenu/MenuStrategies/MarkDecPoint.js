"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
exports.default = (function (props) {
    var fn = function (type) {
        props.s.current.drawAnalyse.markDecPoint(type);
    };
    return (react_1.default.createElement(antd_1.Menu, null,
        react_1.default.createElement(antd_1.Menu.Item, { key: "1", onClick: function (e) { return fn('ld'); } }, "LD"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "2", onClick: function (e) { return fn('ed'); } }, "ED"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "3", onClick: function (e) { return fn('vd'); } }, "VD")));
});
//# sourceMappingURL=MarkDecPoint.js.map