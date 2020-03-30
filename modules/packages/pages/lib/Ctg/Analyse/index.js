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
var utils_1 = require("@lianmed/utils");
var services_1 = require("../services");
exports.ANALYSE_SUCCESS_TYPE = "(●'◡'●)";
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height:100%;\n  .divider {\n    border-radius:2px;\n    background:linear-gradient(45deg, #e0e0e0, transparent) !important;\n    padding-left:20px;\n    margin: 8px 0;\n  }\n  button {\n    margin:0 6px 6px 0\n  }\n  .bordered {\n    border: 1px solid #ddd;\n  }\n"], ["\n  height:100%;\n  .divider {\n    border-radius:2px;\n    background:linear-gradient(45deg, #e0e0e0, transparent) !important;\n    padding-left:20px;\n    margin: 8px 0;\n  }\n  button {\n    margin:0 6px 6px 0\n  }\n  .bordered {\n    border: 1px solid #ddd;\n  }\n"])));
exports.Ctg_Analyse = function (_a) {
    var docid = _a.docid, _b = _a.type, type = _b === void 0 ? "default" : _b, id = _a.id, note = _a.note, _c = _a.onDownload, onDownload = _c === void 0 ? function () { } : _c, _d = _a.age, age = _d === void 0 ? 0 : _d, _e = _a.fetalcount, fetalcount = _e === void 0 ? 0 : _e, _f = _a.gestationalWeek, gestationalWeek = _f === void 0 ? '' : _f, _g = _a.inpatientNO, inpatientNO = _g === void 0 ? '' : _g, _h = _a.name, name = _h === void 0 ? '' : _h, _j = _a.startdate, startdate = _j === void 0 ? '' : _j;
    note = note ? note : docid;
    var _k = useCtgData_1.default(note), ctgData = _k.ctgData, loading = _k.loading, setFhr = _k.setFhr, fetal = _k.fetal, setFetal = _k.setFetal;
    var _l = react_1.useState(true), disabled = _l[0], setDisabled = _l[1];
    var ref = react_1.useRef(null);
    var _m = useAnalyse_1.default(ref.current, note, fetal, setFhr), responseData = _m.responseData, MARKS = _m.MARKS, analyse = _m.analyse, startTime = _m.startTime, endTime = _m.endTime, mark = _m.mark, setMark = _m.setMark, interval = _m.interval, setInterval = _m.setInterval, Fischer_ref = _m.Fischer_ref, Nst_ref = _m.Nst_ref, Krebs_ref = _m.Krebs_ref, analysis_ref = _m.analysis_ref, old_ref = _m.old_ref;
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
        var rightData = analysis_ref.current.getFieldsValue();
        var wave = rightData.wave, diagnosistxt = rightData.diagnosistxt, NST = rightData.NST, CST_OCT = rightData.CST_OCT, analyseData = __rest(rightData, ["wave", "diagnosistxt", "NST", "CST_OCT"]);
        var curData = d[mark + "_ref"].current.getFieldsValue();
        var oldData = old_ref.current[mark] || {};
        var isedit = Object.entries(curData).find(function (_a) {
            var k = _a[0], v = _a[1];
            return oldData[k] !== v;
        }) ? true : false;
        var identify = type === 'default' ? { note: note } : { id: id };
        var data = __assign(__assign({}, identify), { diagnosis: JSON.stringify({ wave: wave, diagnosistxt: diagnosistxt, NST: NST, CST_OCT: CST_OCT }), result: JSON.stringify(__assign(__assign(__assign({}, analyseData), curData), { isedit: isedit })) });
        request_1.default.put(type === "default" ? '/ctg-exams-note' : '/serviceorders', { data: data }).then(function (r) {
            antd_1.message.success('保存成功！', 3);
            utils_1.event.emit(exports.ANALYSE_SUCCESS_TYPE, type == "default" ? note : id);
        });
    };
    var history = function () {
        var data = {
            'note.equals': note
        };
        request_1.default.get("/ctg-exams-criteria", { params: data }).then(function (r) {
            if (r.length > 0) {
                var diagnosis = r[0].diagnosis;
                var t = void 0;
                try {
                    var d_1 = JSON.parse(diagnosis) || {};
                    t = (react_1.default.createElement("div", null,
                        react_1.default.createElement("div", null,
                            "NST\uFF1A",
                            react_1.default.createElement("span", null, d_1.NST)),
                        react_1.default.createElement("div", null,
                            "CST/OCT\uFF1A",
                            react_1.default.createElement("span", null, d_1.CST_OCT)),
                        react_1.default.createElement("div", null,
                            "\u8BCA\u65AD\uFF1A",
                            react_1.default.createElement("span", null, d_1.diagnosistxt))));
                }
                catch (error) {
                }
                info(t || '暂无记录');
            }
        });
    };
    var info = function (message) {
        antd_1.Modal.info({
            title: '历史记录',
            content: message,
            onOk: function () { }
        });
    };
    var btnDisabled = !note || !disabled;
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement("div", { style: { height: "calc(100% - 420px - 12px)", marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' } },
            react_1.default.createElement(lmg_1.Ctg, { suitType: 1, ref: ref, loading: loading, data: ctgData })),
        react_1.default.createElement(antd_1.Row, { gutter: 12, style: { height: 420 } },
            react_1.default.createElement(antd_1.Col, { span: 12 },
                react_1.default.createElement(Score_1.default, __assign({ disabled: disabled }, d, { fetal: fetal, setFetal: setFetal, ctgData: ctgData, docid: note, v: ref.current, className: "bordered" })),
                react_1.default.createElement("div", { style: { position: 'absolute', right: 12, bottom: 0 } },
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, onClick: history, disabled: btnDisabled }, "\u5386\u53F2\u5206\u6790"),
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, disabled: !note, onClick: function () { return setDisabled(!disabled); } }, disabled ? '修改' : '确认'),
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, type: "primary", onClick: analyse, disabled: !note }, "\u8BC4\u5206"))),
            react_1.default.createElement(antd_1.Col, { span: 12 },
                react_1.default.createElement(Analyse_1.default, { ref: analysis_ref }),
                react_1.default.createElement("div", { style: { position: 'absolute', right: 12, bottom: 0 } },
                    react_1.default.createElement(antd_1.Button, { size: "small", onClick: function () {
                            var rightData = analysis_ref.current.getFieldsValue();
                            var diagnosistxt = rightData.diagnosistxt;
                            services_1.fetchCtgExamsPdf({
                                diagnosis: diagnosistxt,
                                docid: docid,
                                end: endTime,
                                start: startTime,
                                age: age,
                                fetalcount: fetalcount,
                                gestationalWeek: gestationalWeek,
                                inpatientNO: inpatientNO,
                                name: name,
                                startdate: startdate,
                            }).then(onDownload);
                        }, style: { marginBottom: 10 }, disabled: btnDisabled }, "\u6253\u5370"),
                    react_1.default.createElement(antd_1.Button, { size: "small", type: "primary", onClick: submit, disabled: btnDisabled }, "\u4FDD\u5B58"))))));
};
exports.default = exports.Ctg_Analyse;
var templateObject_1;
//# sourceMappingURL=index.js.map