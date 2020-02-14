"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
var react_1 = __importDefault(require("react"));
exports.default = {
    string: function (_a) {
        var value = _a.value, onChange = _a.onChange;
        return react_1.default.createElement(antd_1.Input, { value: value, onChange: function (e) { return onChange(e.target.value); } });
    },
    select: function (_a) {
        var dataset = _a.dataset, o = __rest(_a, ["dataset"]);
        return (react_1.default.createElement(antd_1.Select, __assign({}, o), dataset.map(function (_) {
            return (react_1.default.createElement(Option, { value: _.value, key: _.value }, _.label));
        })));
    },
    date: function (o) {
        return react_1.default.createElement(antd_1.DatePicker, __assign({}, o, { format: "YYYY-MM-DD hh:mm" }));
    },
    number: function (o) {
        return react_1.default.createElement(antd_1.InputNumber, __assign({}, o));
    },
};
