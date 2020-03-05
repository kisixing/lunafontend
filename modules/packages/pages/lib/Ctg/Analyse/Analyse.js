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
var Setting = react_1.forwardRef(function (props, ref) {
    var analysis_ref = props.analysis_ref;
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
    var cFn = function (t) { return ({
        formatter: function (v) { return v && "" + v + t; },
        parser: function (v) { return v.replace(t, ''); }
    }); };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement(antd_1.Form, { ref: ref, size: "small", style: { padding: '6px 12px' }, form: form, labelCol: { xs: 9 }, wrapperCol: { xs: 15 }, labelAlign: "left" },
                react_1.default.createElement(antd_1.Divider, { orientation: "left", style: { background: '#f0f0f0' } }, "\u5BAB\u7F29 "),
                react_1.default.createElement(antd_1.Row, null,
                    react_1.default.createElement(antd_1.Col, { span: 6 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u5BAB\u7F29\u6B21\u6570", style: { marginBottom: 0 }, name: "uctimes" },
                            react_1.default.createElement(antd_1.InputNumber, null))),
                    react_1.default.createElement(antd_1.Col, { span: 6 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u5BAB\u7F29\u5F3A\u5EA6", style: { marginBottom: 0 }, name: "ucStrong" },
                            react_1.default.createElement(antd_1.InputNumber, null))),
                    react_1.default.createElement(antd_1.Col, { span: 6 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u95F4\u9694\u65F6\u95F4", style: { marginBottom: 0 }, name: "ucdurationtime" },
                            react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('min'))))),
                    react_1.default.createElement(antd_1.Col, { span: 6 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u6301\u7EED\u65F6\u95F4", style: { marginBottom: 0 }, name: "uckeeptime" },
                            react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('s')))))),
                react_1.default.createElement(antd_1.Divider, { orientation: "left", style: { background: '#f0f0f0' } }, "\u51CF\u901F"),
                react_1.default.createElement(antd_1.Row, null,
                    react_1.default.createElement(antd_1.Col, { span: 6 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u65E9\u51CF", style: { marginBottom: 0 }, name: "edtimes" },
                            react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('次'))))),
                    react_1.default.createElement(antd_1.Col, { span: 6 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u665A\u51CF", style: { marginBottom: 0 }, name: "ldtimes" },
                            react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('次'))))),
                    react_1.default.createElement(antd_1.Col, { span: 6 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u53D8\u5F02\u51CF\u901F", style: { marginBottom: 0 }, name: "vdtimes" },
                            react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('次')))))),
                react_1.default.createElement(antd_1.Divider, { orientation: "left", style: { background: '#f0f0f0' } }, "\u7C7B\u578B"),
                react_1.default.createElement(antd_1.Form.Item, { label: "NST", labelCol: { xs: 4 }, wrapperCol: { xs: 18 }, style: { marginBottom: 0 }, required: true, name: 'nst' },
                    react_1.default.createElement(antd_1.Radio.Group, null,
                        react_1.default.createElement(antd_1.Radio, { value: 1 }, "\u6709\u53CD\u5E94"),
                        react_1.default.createElement(antd_1.Radio, { value: 2 }, "\u65E0\u53CD\u5E94"),
                        react_1.default.createElement(antd_1.Radio, { value: 3 }, "\u53EF\u7591"),
                        react_1.default.createElement(antd_1.Radio, { value: 4 }, "\u4E0D\u6EE1\u610F"))),
                react_1.default.createElement(antd_1.Form.Item, { label: "CST/OCT", style: { marginBottom: 0 }, labelCol: { xs: 4 }, wrapperCol: { xs: 18 }, required: true, name: 'cst' },
                    react_1.default.createElement(antd_1.Radio.Group, null,
                        react_1.default.createElement(antd_1.Radio, { value: 1 }, "\u9634\u6027"),
                        react_1.default.createElement(antd_1.Radio, { value: 2 }, "\u9633\u6027"),
                        react_1.default.createElement(antd_1.Radio, { value: 3 }, "\u53EF\u7591"),
                        react_1.default.createElement(antd_1.Radio, { value: 4 }, "\u4E0D\u6EE1\u610F"))),
                react_1.default.createElement(antd_1.Divider, { orientation: "left", style: { background: '#f0f0f0' } }, "\u6CE2\u5F62"),
                react_1.default.createElement(antd_1.Form.Item, { label: "", style: { marginBottom: 0 }, name: "wave", required: true },
                    react_1.default.createElement(antd_1.Radio.Group, null,
                        react_1.default.createElement(antd_1.Radio, { value: 1 }, "\u5E73\u6ED1"),
                        react_1.default.createElement(antd_1.Radio, { value: 2 }, "\u5C0F\u6CE2\u6D6A"),
                        react_1.default.createElement(antd_1.Radio, { value: 3 }, "\u4E2D\u6CE2\u6D6A"),
                        react_1.default.createElement(antd_1.Radio, { value: 4 }, "\u5927\u6CE2\u6D6A"),
                        react_1.default.createElement(antd_1.Radio, { value: 5 }, "\u6B63\u5F26\u578B"))),
                react_1.default.createElement(antd_1.Divider, { orientation: "left", style: { background: '#f0f0f0' } }, "\u8BCA\u65AD"),
                react_1.default.createElement(antd_1.Form.Item, { wrapperCol: { xs: 24 }, style: { marginBottom: 0 }, name: "diagnosis" },
                    react_1.default.createElement(antd_1.Input.TextArea, null))))));
});
exports.default = react_1.memo(Setting);
