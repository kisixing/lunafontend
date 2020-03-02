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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var useAnalyse_1 = __importDefault(require("./useAnalyse"));
var Fisher_1 = __importDefault(require("./methods/Fisher"));
var Kerbs_1 = __importDefault(require("./methods/Kerbs"));
var Nst_1 = __importDefault(require("./methods/Nst"));
var utils_1 = require("@lianmed/utils");
var intervals = [20, 40];
var ScoringMethod = function (props) {
    var docid = props.docid, v = props.v, ctgData = props.ctgData, fetal = props.fetal, setFetal = props.setFetal, others = __rest(props, ["docid", "v", "ctgData", "fetal", "setFetal"]);
    var form = antd_1.Form.useForm()[0];
    var _a = react_1.useState(true), disabled = _a[0], setDisabled = _a[1];
    var _b = useAnalyse_1.default(v, docid, fetal, form, function (_result) {
        form.setFieldsValue(_result);
    }), responseData = _b.responseData, MARKS = _b.MARKS, analyse = _b.analyse, startTime = _b.startTime, mark = _b.mark, setMark = _b.setMark, interval = _b.interval, setInterval = _b.setInterval, modifyData = _b.modifyData, Fisher_ref = _b.Fisher_ref, Nst_ref = _b.Nst_ref, Kerbs_ref = _b.Kerbs_ref;
    var onChange = function (e) {
        var mark = e.target.value;
        modifyData();
        setDisabled(true);
        form.resetFields();
        setMark(mark);
    };
    var formScores = form.getFieldsValue();
    react_1.useEffect(function () {
        var cb = function (fn) {
            fn(JSON.stringify(responseData));
        };
        utils_1.event.on('analysis:result', cb);
        return function () {
            utils_1.event.off('analysis:result', cb);
        };
    }, [responseData, formScores]);
    var IntervalRadio = function () {
        return (react_1.default.createElement("span", { style: { marginRight: 10 } },
            " \u65F6\u957F\uFF1A",
            react_1.default.createElement(antd_1.Select, { onChange: function (e) {
                    var i = Number(e) || 20;
                    setInterval(i);
                }, value: interval }, intervals.map(function (value) { return (react_1.default.createElement(antd_1.Select.Option, { value: value, key: value }, value + '分钟')); }))));
    };
    var FetalSelect = function () {
        return (react_1.default.createElement("span", { style: { marginRight: 10 } },
            " \u80CE\u5FC3\u7387\uFF1A",
            react_1.default.createElement(antd_1.Select, { onChange: setFetal, value: fetal }, Array(+ctgData.fetalnum).fill(0).map(function (_, i) { return (react_1.default.createElement(antd_1.Select.Option, { value: i + 1, key: i + 1 }, "FHR" + (i + 1))); }))));
    };
    var StartTime = function () {
        return react_1.default.createElement("span", { style: { marginRight: 10 } },
            "\u5F00\u59CB\u65F6\u95F4\uFF1A",
            (startTime / 240).toFixed(1),
            "\u5206");
    };
    var EndTime = function () {
        return react_1.default.createElement("span", null,
            "\u7ED3\u675F\u65F6\u95F4\uFF1A",
            (startTime / 240 + interval).toFixed(1),
            "\u5206");
    };
    return (react_1.default.createElement("div", __assign({}, others),
        react_1.default.createElement("div", { style: { padding: '12px 24px', background: '#ddd' } },
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(IntervalRadio, null),
                react_1.default.createElement(FetalSelect, null),
                react_1.default.createElement(StartTime, null),
                react_1.default.createElement(EndTime, null))),
        react_1.default.createElement("div", { style: { padding: '10px 24px 0' } },
            react_1.default.createElement(antd_1.Radio.Group, { onChange: onChange, value: mark, style: { marginBottom: 5 } }, MARKS.map(function (_) { return (react_1.default.createElement(antd_1.Radio, { value: _, key: _ },
                _,
                "\u5206\u6790\u6CD5")); })),
            react_1.default.createElement(Fisher_1.default, { name: mark, ref: Fisher_ref }),
            react_1.default.createElement(Kerbs_1.default, { name: mark, ref: Kerbs_ref }),
            react_1.default.createElement(Nst_1.default, { name: mark, ref: Nst_ref }),
            react_1.default.createElement("div", { style: { marginTop: 5 } },
                react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, type: "primary", onClick: analyse }, "\u5206\u6790"),
                react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, onClick: function () {
                        var next = !disabled;
                        if (next) {
                            modifyData();
                        }
                        setDisabled(next);
                    } }, disabled ? '修改' : '确认'),
                react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 } }, "\u6253\u5370")))));
};
exports.default = ScoringMethod;
