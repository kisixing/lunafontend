"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var utils_1 = require("@lianmed/utils");
exports.default = (function (props) {
    var fn = function (n) {
        if (n === void 0) { n = 0; }
        props.s.current.drawAnalyse.editBaselinePoint(n);
        utils_1.event.emit("editBaseline:" + props.s.current.data.docid);
    };
    return (react_1.default.createElement(antd_1.Menu, null,
        react_1.default.createElement(antd_1.Menu.Item, { key: "1", onClick: function (e) { return fn(10); } }, "+10"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "2", onClick: function (e) { return fn(5); } }, "+5"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "3", onClick: function (e) { return fn(1); } }, "+1"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "4", onClick: function (e) { return fn(-1); } }, "-1"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "5", onClick: function (e) { return fn(-5); } }, "-5"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "6", onClick: function (e) { return fn(-10); } }, "-10")));
});
//# sourceMappingURL=BaselinePoint.js.map