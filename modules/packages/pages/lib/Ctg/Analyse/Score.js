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
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var methods_1 = __importDefault(require("./methods"));
var intervals = [20, 40, 80];
var ScoringMethod = function (props) {
    var docid = props.docid, ctgData = props.ctgData, fetal = props.fetal, setFetal = props.setFetal, disabled = props.disabled, loading = props.loading, analyseLoading = props.analyseLoading, fetchData = props.fetchData, reAnalyse = props.reAnalyse, showHistory = props.showHistory, MARKS = props.MARKS, startTime = props.startTime, mark = props.mark, setMark = props.setMark, interval = props.interval, setInterval = props.setInterval, endTime = props.endTime;
    var onChange = function (e) {
        setMark(e.target.value);
    };
    var StartTime = function () {
        return react_1.default.createElement("span", { style: { marginRight: 10 } },
            "\u5F00\u59CB\u65F6\u95F4\uFF1A",
            (startTime / 240).toFixed(1),
            "\u5206");
    };
    var EndTime = function () {
        return react_1.default.createElement("span", { style: { marginRight: 10 } },
            "\u7ED3\u675F\u65F6\u95F4\uFF1A",
            (endTime / 240).toFixed(1),
            "\u5206");
    };
    return (react_1.default.createElement("div", { style: { borderRight: 0 }, className: "bordered" },
        react_1.default.createElement("div", { className: "divider", style: { padding: '8px 20px', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement("div", null,
                react_1.default.createElement(StartTime, null),
                react_1.default.createElement(EndTime, null),
                react_1.default.createElement("span", null,
                    react_1.default.createElement("span", null, "\u65B9\u6CD5\uFF1A"),
                    react_1.default.createElement("select", { disabled: !docid, onChange: onChange, value: mark, style: { width: 90 } }, MARKS.map(function (_) { return (react_1.default.createElement("option", { value: _, key: _ }, _)); }))),
                react_1.default.createElement("span", { style: { marginRight: 10 } },
                    react_1.default.createElement("span", null, "\u65F6\u957F\uFF1A"),
                    react_1.default.createElement("select", { disabled: !docid, onChange: function (e) {
                            var i = Number(e.target.value) || 20;
                            setInterval(i);
                        }, value: interval }, intervals.map(function (value) { return (react_1.default.createElement("option", { value: value, key: value }, value + '分钟')); }))),
                react_1.default.createElement("span", { style: { marginRight: 10 } },
                    react_1.default.createElement("span", null, "\u80CE\u5FC3\u7387\uFF1A"),
                    react_1.default.createElement("select", { disabled: !docid, onChange: function (e) { return setFetal(e.target.value); }, value: fetal }, Array(+ctgData.fetalnum).fill(0).map(function (_, i) { return (react_1.default.createElement("option", { value: i + 1, key: i + 1 }, "FHR" + (i + 1))); }))),
                showHistory && react_1.default.createElement("span", null,
                    "\u5206\u6790\u7248\u672C\uFF1A",
                    react_1.default.createElement("select", null,
                        react_1.default.createElement("option", { value: "1" }, "v1"),
                        react_1.default.createElement("option", { value: "2" }, "v2")))),
            react_1.default.createElement("div", null,
                react_1.default.createElement(antd_1.Button, { size: "small", type: "primary", onClick: function () { return fetchData(); }, loading: loading }, "\u5237\u65B0\u6570\u636E"),
                react_1.default.createElement(antd_1.Button, { size: "small", type: "primary", onClick: reAnalyse, loading: analyseLoading }, "\u91CD\u65B0\u5206\u6790"))),
        react_1.default.createElement("div", { style: { padding: 0, border: 0 } },
            react_1.default.createElement(methods_1.default, __assign({}, props, { disabled: disabled })))));
};
exports.default = ScoringMethod;
//# sourceMappingURL=Score.js.map