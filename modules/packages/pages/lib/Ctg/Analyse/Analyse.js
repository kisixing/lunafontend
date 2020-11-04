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
require("antd/lib/input-number/style/index.css");
require("antd/lib/form/style/index.css");
require("antd/lib/input/style/index.css");
require("antd/lib/Radio/style/index.css");
var Setting = react_1.forwardRef(function (props, ref) {
    var isRemote = props.isRemote, _a = props.disabled, disabled = _a === void 0 ? true : _a, showHistory = props.showHistory;
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
    return (react_1.default.createElement("div", { style: { height: '100%', overflowY: 'auto' }, className: "bordered" },
        react_1.default.createElement(antd_1.Form, { ref: ref, size: "small", style: { padding: '0px 6px' }, form: form, labelCol: { xs: 9 }, wrapperCol: { xs: 15 }, labelAlign: "left", initialValues: {
                diagnosistxt: null,
                wave: null,
                NST: null,
                'CST_OCT': null,
                edtimes: null,
                ldtimes: null,
                ucStrong: null,
                ucdurationtime: null,
                uckeeptime: null,
                uctimes: null,
                vdtimes: null,
            }, onValuesChange: function (a, b) {
                var keys = ['NST', 'CST_OCT'];
                var _a = Object.entries(a)[0], k = _a[0], v = _a[1];
                var index = keys.indexOf(k);
                var old = b.diagnosistxt || '';
                var nstReg = /【NST：.*】/;
                var cstoctReg = /【CST\/OCT：.*】/;
                if (index === 0) {
                    var text_1 = "\u3010NST\uFF1A" + v + "\u3011";
                    old = old.replace(cstoctReg, '');
                    var diagnosistxt = nstReg.test(old) ? old.replace(nstReg, function () { return text_1; }) : old.concat(text_1);
                    form.setFieldsValue({ CST_OCT: undefined, diagnosistxt: diagnosistxt });
                }
                else if (index === 1) {
                    var text_2 = "\u3010CST/OCT\uFF1A" + v + "\u3011";
                    old = old.replace(nstReg, '');
                    var diagnosistxt = cstoctReg.test(old) ? old.replace(cstoctReg, function () { return text_2; }) : old.concat(text_2);
                    form.setFieldsValue({ NST: undefined, diagnosistxt: diagnosistxt });
                }
            } },
            showHistory && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: "divider" }, "\u80CE\u5FC3 "),
                react_1.default.createElement(antd_1.Row, { style: { marginBottom: 4 } },
                    react_1.default.createElement(antd_1.Col, { span: 12 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u5E73\u5747\u57FA\u7EBF", style: { marginBottom: 0 }, name: "_baseline_avg" },
                            react_1.default.createElement(antd_1.InputNumber, { disabled: disabled }))),
                    react_1.default.createElement(antd_1.Col, { span: 12 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u57FA\u7EBF\u53D8\u5F02", style: { marginBottom: 0 }, name: "bhr" },
                            react_1.default.createElement(antd_1.InputNumber, { disabled: disabled })))),
                react_1.default.createElement(antd_1.Row, { style: { marginBottom: 4 } },
                    react_1.default.createElement(antd_1.Col, { span: 12 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u52A0\u901F\u6570", style: { marginBottom: 0 }, name: "_acc_num" },
                            react_1.default.createElement(antd_1.InputNumber, { disabled: disabled }))),
                    react_1.default.createElement(antd_1.Col, { span: 12 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u51CF\u901F\u6570", style: { marginBottom: 0 }, name: "_dec_num" },
                            react_1.default.createElement(antd_1.InputNumber, { disabled: disabled })))),
                react_1.default.createElement(antd_1.Row, { style: { marginBottom: 4 } },
                    react_1.default.createElement(antd_1.Col, { span: 15 },
                        react_1.default.createElement(antd_1.Form.Item, { label: "\u52A0\u901F\u4E0A\u5347\u65F6\u95F4", style: { marginBottom: 0 }, name: "_fhr_uptime" },
                            react_1.default.createElement(antd_1.InputNumber, { disabled: disabled })))))),
            react_1.default.createElement("div", { className: "divider" }, "\u5BAB\u7F29 "),
            react_1.default.createElement(antd_1.Row, { style: { marginBottom: 4 } },
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u5BAB\u7F29\u6B21\u6570", style: { marginBottom: 0 }, name: "uctimes" },
                        react_1.default.createElement(antd_1.InputNumber, { disabled: disabled }))),
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u5BAB\u7F29\u5F3A\u5EA6", style: { marginBottom: 0 }, name: "ucStrong" },
                        react_1.default.createElement(antd_1.InputNumber, { disabled: disabled })))),
            react_1.default.createElement(antd_1.Row, null,
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u95F4\u9694\u65F6\u95F4", style: { marginBottom: 0 }, name: "ucdurationtime" },
                        react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('min'), { disabled: disabled })))),
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u6301\u7EED\u65F6\u95F4", style: { marginBottom: 0 }, name: "uckeeptime" },
                        react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('s'), { disabled: disabled }))))),
            react_1.default.createElement("div", { className: "divider" }, "\u51CF\u901F"),
            react_1.default.createElement(antd_1.Row, { style: { marginBottom: 4 } },
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u65E9\u51CF", style: { marginBottom: 0 }, name: "edtimes" },
                        react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('次'), { disabled: disabled })))),
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u665A\u51CF", style: { marginBottom: 0 }, name: "ldtimes" },
                        react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('次'), { disabled: disabled }))))),
            react_1.default.createElement(antd_1.Row, null,
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u53D8\u5F02\u51CF\u901F", style: { marginBottom: 0 }, name: "vdtimes" },
                        react_1.default.createElement(antd_1.InputNumber, __assign({}, cFn('次'), { disabled: disabled }))))),
            react_1.default.createElement("div", { className: "divider" },
                isRemote && react_1.default.createElement("span", { style: { color: 'red' } }, "*"),
                react_1.default.createElement("span", null, "\u7C7B\u578B")),
            react_1.default.createElement(antd_1.Form.Item, { label: "NST", labelCol: { xs: 4 }, wrapperCol: { xs: 20 }, style: { marginBottom: 0 }, name: 'NST' },
                react_1.default.createElement(antd_1.Radio.Group, null,
                    react_1.default.createElement(antd_1.Radio, { value: '有反应' }, "\u6709\u53CD\u5E94"),
                    react_1.default.createElement(antd_1.Radio, { value: '无反应' }, "\u65E0\u53CD\u5E94"),
                    react_1.default.createElement(antd_1.Radio, { value: '可疑' }, "\u53EF\u7591"),
                    react_1.default.createElement(antd_1.Radio, { value: '不满意' }, "\u4E0D\u6EE1\u610F"))),
            react_1.default.createElement(antd_1.Form.Item, { label: "CST/OCT", style: { marginBottom: 0 }, labelCol: { xs: 4 }, wrapperCol: { xs: 20 }, name: 'CST_OCT' },
                react_1.default.createElement(antd_1.Radio.Group, { disabled: isRemote },
                    react_1.default.createElement(antd_1.Radio, { value: '阴性' }, "\u9634\u6027"),
                    react_1.default.createElement(antd_1.Radio, { value: '阳性' }, "\u9633\u6027"),
                    react_1.default.createElement(antd_1.Radio, { value: '可疑' }, "\u53EF\u7591"),
                    react_1.default.createElement(antd_1.Radio, { value: '不满意' }, "\u4E0D\u6EE1\u610F"))),
            react_1.default.createElement("div", { className: "divider" }, "\u6CE2\u5F62"),
            react_1.default.createElement(antd_1.Form.Item, { label: "", style: { marginBottom: 0 }, wrapperCol: { xs: 24 }, name: "wave" },
                react_1.default.createElement(antd_1.Radio.Group, null,
                    react_1.default.createElement(antd_1.Radio, { value: '平滑' }, "\u5E73\u6ED1"),
                    react_1.default.createElement(antd_1.Radio, { value: '小波浪' }, "\u5C0F\u6CE2\u6D6A"),
                    react_1.default.createElement(antd_1.Radio, { value: '中波浪' }, "\u4E2D\u6CE2\u6D6A"),
                    react_1.default.createElement(antd_1.Radio, { value: '大波浪' }, "\u5927\u6CE2\u6D6A"),
                    react_1.default.createElement(antd_1.Radio, { value: '正弦型' }, "\u6B63\u5F26\u578B"))),
            react_1.default.createElement("div", { className: "divider" },
                isRemote && react_1.default.createElement("span", { style: { color: 'red' } }, "*"),
                react_1.default.createElement("span", null, "\u8BCA\u65AD\u610F\u89C1")),
            react_1.default.createElement(antd_1.Form.Item, { wrapperCol: { xs: 24 }, style: { marginBottom: 0 }, name: "diagnosistxt" },
                react_1.default.createElement(antd_1.Input.TextArea, { maxLength: 120, placeholder: "\u6700\u591A\u8F93\u5165120\u4E2A\u5B57" })))));
});
exports.default = react_1.memo(Setting);
//# sourceMappingURL=Analyse.js.map