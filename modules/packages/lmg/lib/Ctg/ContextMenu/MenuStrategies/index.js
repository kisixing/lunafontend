"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var MarkAccPoint_1 = __importDefault(require("./MarkAccPoint"));
var MarkDecPoint_1 = __importDefault(require("./MarkDecPoint"));
var EditAccPoint_1 = __importDefault(require("./EditAccPoint"));
var EditDecPoint_1 = __importDefault(require("./EditDecPoint"));
var m = {
    MarkAccPoint: MarkAccPoint_1.default,
    MarkDecPoint: MarkDecPoint_1.default,
    EditAccPoint: EditAccPoint_1.default,
    EditDecPoint: EditDecPoint_1.default
};
exports.default = (function (props) {
    var pType = props.pType;
    var T = m[pType];
    return (T && T(props)) || (react_1.default.createElement("div", { style: { background: '#fff', } }, "\u65E0\u6548\u70B9\u51FB"));
});
//# sourceMappingURL=index.js.map