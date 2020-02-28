"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var lmg_1 = require("@lianmed/lmg");
var index_1 = require("./index");
var useCtgData_1 = __importDefault(require("../Analyse/useCtgData"));
var Setting = function (props) {
    var _a = useCtgData_1.default(props.docid), ctgData = _a.ctgData, loading = _a.loading;
    return (react_1.default.createElement(index_1.Context.Consumer, null, function (value) { return (react_1.default.createElement(lmg_1.Ctg, { suitType: 2, loading: loading, data: ctgData, ref: value })); }));
};
exports.default = Setting;
