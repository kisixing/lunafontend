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
var antd_1 = require("antd");
var utils_1 = require("@lianmed/utils");
var Setting = function (props) {
    var others = __rest(props, []);
    var form = antd_1.Form.useForm()[0];
    react_1.useEffect(function () {
        var formData = form.getFieldsValue();
        var cb = function (fn) {
            fn(JSON.stringify(formData));
        };
        utils_1.event.on('analysis:diagnosis', cb);
        return function () {
            utils_1.event.off('analysis:diagnosis', cb);
        };
    }, [form]);
    return (react_1.default.createElement("div", __assign({}, others),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: { padding: '12px 24px', background: '#ddd' } }, "\u00A0"),
            react_1.default.createElement(antd_1.Form, { style: { padding: '12px 24px' }, form: form },
                react_1.default.createElement(antd_1.Form.Item, { label: "NST", style: { marginBottom: 0 }, required: true, key: "info" },
                    react_1.default.createElement(antd_1.Radio.Group, null,
                        react_1.default.createElement(antd_1.Radio, { value: 1 }, "\u6709\u53CD\u5E94"),
                        react_1.default.createElement(antd_1.Radio, { value: 2 }, "\u65E0\u53CD\u5E94"),
                        react_1.default.createElement(antd_1.Radio, { value: 3 }, "\u6B63\u5F26\u578B"),
                        react_1.default.createElement(antd_1.Radio, { value: 4 }, "\u4E0D\u6EE1\u610F"))),
                react_1.default.createElement(antd_1.Form.Item, { label: "CST/OCT", style: { marginBottom: 0 }, required: true, key: 'info' },
                    react_1.default.createElement(antd_1.Radio.Group, null,
                        react_1.default.createElement(antd_1.Radio, { value: 1 }, "\u9634\u6027"),
                        react_1.default.createElement(antd_1.Radio, { value: 2 }, "\u9633\u6027"),
                        react_1.default.createElement(antd_1.Radio, { value: 3 }, "\u53EF\u4EE5"),
                        react_1.default.createElement(antd_1.Radio, { value: 4 }, "\u4E0D\u6EE1\u610F"))),
                react_1.default.createElement(antd_1.Form.Item, { label: "\u77ED\u53D8\u5F02\uFF08\u6BEB\u79D2\uFF09", style: { marginBottom: 0 }, key: "info", required: true },
                    react_1.default.createElement(antd_1.Radio.Group, null,
                        react_1.default.createElement(antd_1.Radio, { value: 1 }, "\u5E73\u6ED1"),
                        react_1.default.createElement(antd_1.Radio, { value: 2 }, "\u5C0F\u6CE2\u6D6A"),
                        react_1.default.createElement(antd_1.Radio, { value: 3 }, "\u4E2D\u6CE2\u6D6A"),
                        react_1.default.createElement(antd_1.Radio, { value: 4 }, "\u5927\u6CE2\u6D6A"),
                        react_1.default.createElement(antd_1.Radio, { value: 5 }, "\u6B63\u5F26\u578B"))),
                react_1.default.createElement(antd_1.Form.Item, { label: '\u8BCA\u65AD', style: { marginBottom: 0 }, key: "diagnosis" },
                    react_1.default.createElement(antd_1.Input.TextArea, { style: { maxWidth: 400 } }))))));
};
exports.default = (Setting);
