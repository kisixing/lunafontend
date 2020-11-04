"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var lmg_1 = require("@lianmed/lmg");
var antd_1 = require("antd");
require("antd/dist/antd.css");
var react_1 = __importStar(require("react"));
require("react-pdf/dist/Page/AnnotationLayer.css");
var styled_components_1 = __importDefault(require("styled-components"));
var Analyse_1 = __importDefault(require("./Analyse"));
var HistoryList_1 = __importDefault(require("./HistoryList"));
var Score_1 = __importDefault(require("./Score"));
var Toolbar_1 = __importDefault(require("./Toolbar"));
var useAnalyse_1 = __importStar(require("./useAnalyse"));
var useCtgData_1 = require("./useCtgData");
exports.useCtgData = useCtgData_1.useCtgData;
exports.ANALYSE_SUCCESS_TYPE = "(●'◡'●)";
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height:100%;\n  .divider {\n    // border-radius:2px;\n    background:#aaa !important;\n    color:#444 !important;\n    padding-left:6px;\n    margin: 2px 0;\n  }\n  .divider:not(:first-child){\n    margin-top:16px;\n  }\n  button {\n    // margin:0 6px 6px 0\n    margin-right:6px;\n  }\n  .bordered {\n    border: 1px solid #ddd;\n  }\n"], ["\n  height:100%;\n  .divider {\n    // border-radius:2px;\n    background:#aaa !important;\n    color:#444 !important;\n    padding-left:6px;\n    margin: 2px 0;\n  }\n  .divider:not(:first-child){\n    margin-top:16px;\n  }\n  button {\n    // margin:0 6px 6px 0\n    margin-right:6px;\n  }\n  .bordered {\n    border: 1px solid #ddd;\n  }\n"])));
exports.Ctg_Analyse = function (_a) {
    var docid = _a.docid, _b = _a.type, type = _b === void 0 ? "default" : _b, id = _a.id, note = _a.note, _c = _a.onDownload, onDownload = _c === void 0 ? function (url) { } : _c, _d = _a.showHistory, showHistory = _d === void 0 ? false : _d;
    note = note ? note : docid;
    if (!note)
        return null;
    var _e = useCtgData_1.useCtgData(note, true), ctgData = _e.ctgData, loading = _e.loading, fetal = _e.fetal, setFetal = _e.setFetal, fetchData = _e.fetchData;
    var _f = react_1.useState(true), disabled = _f[0], setDisabled = _f[1];
    var isRemote = type === 'remote';
    var ref = react_1.useRef();
    var wrap = react_1.useRef(null);
    var _g = useAnalyse_1.default(ref, note, fetal, ctgData), reAnalyse = _g.reAnalyse, startTime = _g.startTime, endTime = _g.endTime, mark = _g.mark, setMark = _g.setMark, interval = _g.interval, setInterval = _g.setInterval, mapFormToMark = _g.mapFormToMark, analysis_ref = _g.analysis_ref, old_ref = _g.old_ref, analyseLoading = _g.analyseLoading, initData = _g.initData, setFetalCb = _g.setFetalCb, currentHistory = _g.currentHistory, setCurrentHistory = _g.setCurrentHistory, historyList = _g.historyList, fakeHistoryLoading = _g.fakeHistoryLoading, o = __rest(_g, ["reAnalyse", "startTime", "endTime", "mark", "setMark", "interval", "setInterval", "mapFormToMark", "analysis_ref", "old_ref", "analyseLoading", "initData", "setFetalCb", "currentHistory", "setCurrentHistory", "historyList", "fakeHistoryLoading"]);
    var others = {
        historyList: historyList,
        MARKS: useAnalyse_1.MARKS,
        loading: loading,
        analyseLoading: analyseLoading,
        startTime: startTime,
        reAnalyse: reAnalyse,
        fetchData: fetchData,
        mark: mark,
        setMark: setMark,
        interval: interval,
        setInterval: setInterval,
        mapFormToMark: mapFormToMark,
        old_ref: old_ref,
        showHistory: showHistory,
    };
    var toolbarProps = __assign(__assign({}, o), { setDisabled: setDisabled,
        type: type,
        id: id,
        onDownload: onDownload,
        note: note,
        showHistory: showHistory,
        mapFormToMark: mapFormToMark,
        startTime: startTime,
        endTime: endTime,
        mark: mark,
        analysis_ref: analysis_ref,
        old_ref: old_ref,
        initData: initData,
        currentHistory: currentHistory,
        fetal: fetal,
        disabled: disabled });
    return (react_1.default.createElement(Wrapper, { ref: wrap },
        react_1.default.createElement("div", { style: { height: "calc(100% - 420px - 6px - 40px)", marginBottom: 6, boxShadow: '#ddd 0px 0px 2px 2px', width: '100%', display: 'flex' } },
            showHistory && (react_1.default.createElement("div", { style: { borderLeft: '1px solid #ddd', padding: 2, display: 'flex', flexDirection: 'column' } },
                react_1.default.createElement(HistoryList_1.default, { historyList: historyList, currentHistory: currentHistory, setCurrentHistory: setCurrentHistory }))),
            react_1.default.createElement(lmg_1.Ctg, { style: { minHeight: 200, overflow: 'hidden', flex: 1 }, suitType: 1, ref: ref, loading: loading || fakeHistoryLoading, data: ctgData })),
        react_1.default.createElement(antd_1.Row, { style: { flexDirection: "row" + (showHistory ? '-reverse' : ''), height: 420, } },
            react_1.default.createElement(antd_1.Col, { className: "bordered", span: 17, style: { height: '100%', } },
                react_1.default.createElement(Score_1.default, __assign({ disabled: disabled, endTime: endTime, initData: initData }, others, { fetal: fetal, setFetal: function (n) {
                        setFetal(n);
                        setFetalCb();
                    }, ctgData: ctgData, docid: note }))),
            react_1.default.createElement(antd_1.Col, { span: 7, style: { height: '100%' } },
                react_1.default.createElement(Analyse_1.default, { ref: analysis_ref, isRemote: isRemote, showHistory: showHistory }))),
        react_1.default.createElement(Toolbar_1.default, __assign({}, toolbarProps))));
};
exports.default = exports.Ctg_Analyse;
var templateObject_1;
//# sourceMappingURL=index.js.map