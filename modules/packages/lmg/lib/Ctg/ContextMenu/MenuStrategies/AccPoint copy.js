"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
exports.default = (function (props) {
    console.log('acc props', props);
    return (react_1.default.createElement(antd_1.Menu, null,
        react_1.default.createElement(antd_1.Menu.Item, { key: "1" }, "\u6807\u8BB0\u52A0\u901F11"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "2" }, "\u53D6\u6D88\u6807\u8BB0")));
});
//# sourceMappingURL=AccPoint copy.js.map