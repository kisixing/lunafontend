"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var lmg_1 = require("@lianmed/lmg");
var index_1 = require("./index");
var Setting = function (props) {
    return (react_1.default.createElement(index_1.Context.Consumer, null, function (value) { return (react_1.default.createElement(lmg_1.Ctg, { suitType: 2, loading: props.loading, data: props.ctgData, ref: value })); }));
};
exports.default = Setting;
//# sourceMappingURL=Ctg.js.map