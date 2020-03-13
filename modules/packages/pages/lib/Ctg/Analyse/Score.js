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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var methods_1 = __importDefault(require("./methods"));
var utils_1 = require("@lianmed/utils");
var intervals = [20, 40];
var ScoringMethod = function (props) {
    var docid = props.docid, ctgData = props.ctgData, fetal = props.fetal, setFetal = props.setFetal, disabled = props.disabled;
    var responseData = props.responseData, MARKS = props.MARKS, startTime = props.startTime, mark = props.mark, setMark = props.setMark, interval = props.interval, setInterval = props.setInterval;
    var onChange = function (e) {
        var mark = e.target.value;
        setMark(mark);
    };
    react_1.useEffect(function () {
        var cb = function (fn) {
            fn(JSON.stringify(responseData));
        };
        utils_1.event.on('analysis:result', cb);
        return function () {
            utils_1.event.off('analysis:result', cb);
        };
    }, [responseData]);
    var IntervalRadio = react_1.useMemo(function () {
        return (react_1.default.createElement("span", { style: { marginRight: 10 } },
            " \u65F6\u957F\uFF1A",
            react_1.default.createElement(antd_1.Select, { disabled: !docid, onChange: function (e) {
                    var i = Number(e) || 20;
                    setInterval(i);
                }, value: interval }, intervals.map(function (value) { return (react_1.default.createElement(antd_1.Select.Option, { value: value, key: value }, value + '分钟')); }))));
    }, [interval, docid]);
    var FetalSelect = react_1.useMemo(function () {
        return (react_1.default.createElement("span", { style: { marginRight: 10 } },
            " \u80CE\u5FC3\u7387\uFF1A",
            react_1.default.createElement(antd_1.Select, { disabled: !docid, onChange: setFetal, value: fetal }, Array(+ctgData.fetalnum).fill(0).map(function (_, i) { return (react_1.default.createElement(antd_1.Select.Option, { value: i + 1, key: i + 1 }, "FHR" + (i + 1))); }))));
    }, [ctgData, fetal, setFetal, docid]);
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
    var R = react_1.useMemo(function () {
        return (react_1.default.createElement(antd_1.Radio.Group, { disabled: !docid, onChange: onChange, value: mark, style: { marginBottom: 5 } }, MARKS.map(function (_) { return (react_1.default.createElement(antd_1.Radio, { value: _, key: _ },
            _,
            "\u5206\u6790\u6CD5")); })));
    }, [mark, docid]);
    return (react_1.default.createElement("div", { style: { height: '100%', background: '#fff' }, className: "bordered" },
        react_1.default.createElement("div", { className: "divider", style: { padding: '12px 24px', margin: 0 } },
            react_1.default.createElement(react_1.default.Fragment, null,
                IntervalRadio,
                FetalSelect,
                react_1.default.createElement(StartTime, null),
                react_1.default.createElement(EndTime, null))),
        react_1.default.createElement("div", { style: { padding: '10px 24px 0' } },
            R,
            react_1.default.createElement(methods_1.default, __assign({}, props, { disabled: disabled })))));
};
exports.default = ScoringMethod;
