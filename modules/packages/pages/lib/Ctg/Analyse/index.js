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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lmg_1 = require("@lianmed/lmg");
var request_1 = __importDefault(require("@lianmed/request"));
var antd_1 = require("antd");
require("antd/dist/antd.css");
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var Analyse_1 = __importDefault(require("./Analyse"));
var Score_1 = __importDefault(require("./Score"));
var useAnalyse_1 = __importDefault(require("./useAnalyse"));
var useCtgData_1 = __importDefault(require("./useCtgData"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height:100%;\n  .ant-divider {\n    margin:10px 0 2px !important;\n    border-radius:2px;\n  }\n  button {\n    margin:0 6px 6px 0\n  }\n  .bordered {\n    border: 1px solid #ddd;\n  }\n"], ["\n  height:100%;\n  .ant-divider {\n    margin:10px 0 2px !important;\n    border-radius:2px;\n  }\n  button {\n    margin:0 6px 6px 0\n  }\n  .bordered {\n    border: 1px solid #ddd;\n  }\n"])));
function Analysis(_a) {
    var _b = _a.docid, docid = _b === void 0 ? '' : _b;
    var _c = useCtgData_1.default(docid), ctgData = _c.ctgData, loading = _c.loading;
    var _d = react_1.useState(true), disabled = _d[0], setDisabled = _d[1];
    var _e = react_1.useState(1), fetal = _e[0], setFetal = _e[1];
    var ref = react_1.useRef(null);
    var _f = useAnalyse_1.default(ref.current, docid, fetal), responseData = _f.responseData, MARKS = _f.MARKS, analyse = _f.analyse, startTime = _f.startTime, mark = _f.mark, setMark = _f.setMark, interval = _f.interval, setInterval = _f.setInterval, Fischer_ref = _f.Fischer_ref, Nst_ref = _f.Nst_ref, Krebs_ref = _f.Krebs_ref, analysis_ref = _f.analysis_ref, old_ref = _f.old_ref;
    var d = {
        responseData: responseData,
        MARKS: MARKS,
        analyse: analyse,
        startTime: startTime,
        mark: mark, setMark: setMark,
        interval: interval, setInterval: setInterval,
        Fischer_ref: Fischer_ref,
        Nst_ref: Nst_ref,
        Krebs_ref: Krebs_ref,
        old_ref: old_ref
    };
    var submit = function () {
        var curData = d[mark + "_ref"].current.getFieldsValue();
        var oldData = old_ref.current[mark];
        var rightData = analysis_ref.current.getFieldsValue();
        var wave = rightData.wave, diagnosistxt = rightData.diagnosistxt, classification0 = rightData.classification0, classification1 = rightData.classification1, analyseData = __rest(rightData, ["wave", "diagnosistxt", "classification0", "classification1"]);
        var isedit = Object.entries(curData).find(function (_a) {
            var k = _a[0], v = _a[1];
            return oldData[k] !== v;
        }) ? true : false;
        var data = {
            note: docid,
            diagnosis: { wave: wave, diagnosistxt: diagnosistxt, classification0: classification0, classification1: classification1 },
            result: __assign(__assign(__assign({}, analyseData), curData), { isedit: isedit })
        };
        request_1.default.put("/ctg-exams-note", { data: data });
    };
    var btnDisabled = !docid || !disabled;
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement("div", { style: { height: "calc(100% - 420px - 12px)", marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' } },
            react_1.default.createElement(lmg_1.Ctg, { suitType: 1, ref: ref, loading: loading, data: ctgData })),
        react_1.default.createElement(antd_1.Row, { gutter: 12, style: { height: 420 } },
            react_1.default.createElement(antd_1.Col, { span: 12 },
                react_1.default.createElement(Score_1.default, __assign({ disabled: disabled }, d, { fetal: fetal, setFetal: setFetal, ctgData: ctgData, docid: docid, v: ref.current, className: "bordered" })),
                react_1.default.createElement("div", { style: { position: 'absolute', right: 12, bottom: 0 } },
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, onClick: analyse, disabled: btnDisabled }, "\u5386\u53F2\u5206\u6790"),
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, disabled: !docid, onClick: function () { return setDisabled(!disabled); } }, disabled ? '修改' : '确认'),
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, type: "primary", onClick: analyse, disabled: !docid }, "\u5206\u6790"))),
            react_1.default.createElement(antd_1.Col, { span: 12 },
                react_1.default.createElement(Analyse_1.default, { ref: analysis_ref }),
                react_1.default.createElement("div", { style: { position: 'absolute', right: 12, bottom: 0 } },
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, disabled: btnDisabled }, "\u6253\u5370"),
                    react_1.default.createElement(antd_1.Button, { size: "small", type: "primary", onClick: submit, disabled: btnDisabled }, "\u4FDD\u5B58"))))));
}
exports.default = Analysis;
var templateObject_1;
