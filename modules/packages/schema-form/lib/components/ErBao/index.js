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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("@uform/antd");
var components_1 = require("@lianmed/components");
var react_1 = __importDefault(require("react"));
var antd_2 = require("antd");
exports.Liangci = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (react_1.default.createElement(components_1.RemarkCheckbox, { dataset: {
            ART: 'ART',
            肺炎: '肺炎',
            腹泻: '腹泻',
            other: '其他',
        }, value: value, onChange: onChange }));
};
var L = function (_a) {
    var left = _a.left, right = _a.right, k = _a.k, onChange = _a.onChange, value = _a.value, _b = _a.C, C = _b === void 0 ? antd_3.Input : _b;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { style: { width: '50px', textAlign: 'left', display: 'inline-block' } }, left),
        react_1.default.createElement("span", { style: { textAlign: 'right', width: '90px', marginRight: '10px' } },
            react_1.default.createElement(antd_3.Input, { style: { width: '100px', margin: '0 5px' }, onChange: function (e) {
                    var _a;
                    onChange(__assign(__assign({}, value), (_a = {}, _a[k] = e.target.value, _a)));
                }, value: value[k] })),
        right));
};
exports.Hayan = function (_a) {
    var _b = _a.value, value = _b === void 0 ? {} : _b, onChange = _a.onChange;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement(L, { left: "Hb", right: "g/L", k: "Hb", onChange: onChange, value: value }),
            react_1.default.createElement(L, { left: "\u8840\u9499", right: "mmol/L", k: "xuegai", onChange: onChange, value: value })),
        react_1.default.createElement("div", { style: { display: 'flex', marginTop: '10px' } },
            react_1.default.createElement("span", { style: { width: '50px', textAlign: 'left' } }, "\u5176\u4ED6"),
            react_1.default.createElement(antd_3.Input.TextArea, { style: { margin: '0 5px', flex: 1 }, onChange: function (e) {
                    onChange(__assign(__assign({}, value), { qita: e.target.value }));
                }, value: value['qita'] }))));
};
exports.Zhuanzhen = function (_a) {
    var _b = _a.value, value = _b === void 0 ? {} : _b, onChange = _a.onChange;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_3.Checkbox, null, "\u95E8\u8BCA\u968F\u8BBF"),
        react_1.default.createElement(antd_3.Checkbox, { checked: value['zhuanzhen'], onChange: function (v) { return onChange(__assign(__assign({}, value), { zhuanzhen: v.target.checked })); } }, "\u8F6C\u8BCA"),
        value['zhuanzhen'] && (react_1.default.createElement(react_1.default.Fragment, null,
            "\u8F6C\u8BCA\u79D1\u5BA4\uFF1A",
            react_1.default.createElement(antd_2.Select, { value: value['keshi'], onChange: function (v) { return onChange(__assign(__assign({}, value), { keshi: v })); }, style: { width: '120px', marginRight: '5px' } },
                react_1.default.createElement(antd_2.Select.Option, { value: '1' }, "\u9009\u98791")),
            "\u8F6C\u8BCA\u8BCA\u65AD\uFF1A",
            react_1.default.createElement(antd_3.Input, { value: value['zhenduan'], onChange: function (v) { return onChange(__assign(__assign({}, value), { zhenduan: v.target.value })); }, style: { width: '120px' } }))),
        react_1.default.createElement("div", { style: { display: 'flex', marginTop: '10px' } },
            react_1.default.createElement(antd_3.Input.TextArea, { style: { margin: '0 5px', flex: 1 }, onChange: function (e) {
                    onChange(__assign(__assign({}, value), { zhidao: e.target.value }));
                }, value: value['zhidao'] }))));
};
antd_1.registerFormField('liangci', antd_1.connect({})(exports.Liangci));
antd_1.registerFormField('huayan', antd_1.connect({})(exports.Hayan));
antd_1.registerFormField('zhuanzhen', antd_1.connect({})(exports.Zhuanzhen));
require("./BodyGrowthCheck/index");
var antd_3 = require("antd");
