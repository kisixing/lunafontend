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
var Score_1 = __importDefault(require("./Score"));
var Analyse_1 = __importDefault(require("./Analyse"));
var utils_1 = require("@lianmed/utils");
var request_1 = __importDefault(require("@lianmed/request"));
var useCtgData_1 = __importDefault(require("./useCtgData"));
var lmg_1 = require("@lianmed/lmg");
var useAnalyse_1 = __importDefault(require("./useAnalyse"));
require("antd/dist/antd.css");
exports.Context = react_1.default.createContext({});
var border = { border: '1px solid #ddd' };
function Analysis(_a) {
    var _b = _a.docid, docid = _b === void 0 ? '1_1112_160415144057' : _b;
    var _c = useCtgData_1.default(docid), ctgData = _c.ctgData, loading = _c.loading, setCtgData = _c.setCtgData;
    var _d = react_1.useState(1), fetal = _d[0], setFetal = _d[1];
    var submit = function () {
        var data = { note: docid };
        utils_1.event.emit('analysis:result', function (result) {
            Object.assign(data, { result: result });
        });
        utils_1.event.emit('analysis:diagnosis', function (diagnosis) {
            Object.assign(data, { diagnosis: diagnosis });
        });
        request_1.default.put("/ctg-exams-note", { data: data });
    };
    var ref = react_1.useRef(null);
    var _e = useAnalyse_1.default(ref.current, docid, fetal, setCtgData), responseData = _e.responseData, MARKS = _e.MARKS, analyse = _e.analyse, startTime = _e.startTime, mark = _e.mark, setMark = _e.setMark, interval = _e.interval, setInterval = _e.setInterval, modifyData = _e.modifyData, Fischer_ref = _e.Fischer_ref, Nst_ref = _e.Nst_ref, Krebs_ref = _e.Krebs_ref, analysis_ref = _e.analysis_ref;
    var d = {
        responseData: responseData,
        MARKS: MARKS,
        analyse: analyse,
        startTime: startTime,
        mark: mark, setMark: setMark,
        interval: interval, setInterval: setInterval,
        modifyData: modifyData,
        Fischer_ref: Fischer_ref,
        Nst_ref: Nst_ref,
        Krebs_ref: Krebs_ref
    };
    return (react_1.default.createElement("div", { style: { height: '100%' } },
        react_1.default.createElement("div", { style: { height: "calc(100% - 420px - 12px)", marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' } },
            react_1.default.createElement(lmg_1.Ctg, { ref: ref, loading: loading, data: ctgData })),
        react_1.default.createElement(antd_1.Row, { gutter: 12, style: { height: 420 } },
            react_1.default.createElement(antd_1.Col, { span: 12, style: { height: '100%' } },
                react_1.default.createElement(Score_1.default, __assign({}, d, { fetal: fetal, setFetal: setFetal, ctgData: ctgData, docid: docid, v: ref.current, style: __assign(__assign({}, border), { height: '100%', background: '#fff' }) }))),
            react_1.default.createElement(antd_1.Col, { span: 12, style: { height: '100%' } },
                react_1.default.createElement(Analyse_1.default, { ref: analysis_ref, fetal: fetal, style: __assign(__assign({}, border), { height: '100%', background: '#fff' }) }),
                react_1.default.createElement(antd_1.Button, { size: "small", style: { position: 'absolute', right: 24, bottom: 16 }, type: "primary", onClick: submit }, "\u4FDD\u5B58")))));
}
exports.default = Analysis;
