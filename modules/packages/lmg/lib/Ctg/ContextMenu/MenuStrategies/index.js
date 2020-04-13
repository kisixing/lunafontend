"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var AccPoint_1 = __importDefault(require("./AccPoint"));
var DecPoint_1 = __importDefault(require("./DecPoint"));
var m = {
    AccPoint: AccPoint_1.default,
    DecPoint: DecPoint_1.default
};
exports.default = (function (props) {
    var pType = props.pType;
    var T = m[pType];
    return (T && T(props)) || (react_1.default.createElement(antd_1.Menu, null));
});
//# sourceMappingURL=index.js.map