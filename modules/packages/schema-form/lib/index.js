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
var react_1 = __importDefault(require("react"));
var antd_1 = require("@uform/antd");
require("antd/dist/antd.css");
require("@lianmed/schema-form-components");
exports.default = (function (_a) {
    var schema = _a.schema, initialValues = _a.initialValues, _b = _a.saveActions, saveActions = _b === void 0 ? function (actions) {
        return actions;
    } : _b, props = __rest(_a, ["schema", "initialValues", "saveActions"]);
    var actions = antd_1.createFormActions();
    return (react_1.default.createElement(antd_1.SchemaForm, __assign({ labelAlign: "left", schema: schema, initialValues: initialValues, onChange: function (a, b) {
            console.log(a, b);
        }, onSubmit: function (v) { return console.log(v); }, actions: actions, labelCol: { style: { width: '90px', float: 'left' } }, wrapperCol: {
            xs: 10,
            sm: 10,
            md: 10,
            lg: 16,
        }, effects: function ($) {
            $('onFormInit').subscribe(function () {
                saveActions(actions);
            });
        } }, props), props.children));
});
