"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var index_1 = require("./index");
var lmg_1 = require("@lianmed/lmg");
var CTGChart = function (props) {
    var ctgData = props.ctgData;
    return (react_1.default.createElement(index_1.Context.Consumer, null, function (value) {
        return (react_1.default.createElement(lmg_1.Ctg, { suitType: 2, loading: ctgData.fhr1 === undefined, data: ctgData, mutableSuitObject: value }));
    }));
};
exports.default = CTGChart;
