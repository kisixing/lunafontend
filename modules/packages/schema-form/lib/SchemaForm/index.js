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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("@uform/antd");
require("../components");
var Manager_1 = require("../Manager");
var _SchemaForm = function (_a) {
    var schema = _a.schema, initialValues = _a.initialValues, formIndex = _a.formIndex, props = __rest(_a, ["schema", "initialValues", "formIndex"]);
    var actions = antd_1.createFormActions();
    console.log('action', actions);
    var collectActions = react_1.useContext(Manager_1.Context).collectActions;
    return (react_1.default.createElement(antd_1.SchemaForm, __assign({ labelAlign: "left", schema: schema, initialValues: initialValues, onChange: function (a) {
            console.log(a, formIndex);
        }, onSubmit: function (v) { return console.log(v); }, actions: actions, labelCol: { style: { width: '90px', float: 'left' } }, wrapperCol: {
            xs: 10,
            sm: 10,
            md: 10,
            lg: 16,
        }, effects: function ($) {
            $('onFormInit').subscribe(function () {
                collectActions(actions);
            });
        } }, props, { style: { overflow: 'hidden' } }), props.children));
};
exports.componentNameKey = 'componentName';
exports.componentName = 0x1234;
_SchemaForm[exports.componentNameKey] = exports.componentName;
exports.default = _SchemaForm;
