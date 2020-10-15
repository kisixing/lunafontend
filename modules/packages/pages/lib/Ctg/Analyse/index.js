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
var useCtgData_1 = require("./useCtgData");
exports.useCtgData = useCtgData_1.useCtgData;
var utils_1 = require("@lianmed/utils");
var react_pdf_1 = require("react-pdf");
require("react-pdf/dist/Page/AnnotationLayer.css");
exports.ANALYSE_SUCCESS_TYPE = "(●'◡'●)";
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height:100%;\n  .divider {\n    border-radius:2px;\n    background:linear-gradient(45deg, #e0e0e0, #fff) !important;\n    padding-left:20px;\n    margin: 8px 0;\n  }\n  button {\n    margin:0 6px 6px 0\n  }\n  .bordered {\n    border: 1px solid #ddd;\n  }\n"], ["\n  height:100%;\n  .divider {\n    border-radius:2px;\n    background:linear-gradient(45deg, #e0e0e0, #fff) !important;\n    padding-left:20px;\n    margin: 8px 0;\n  }\n  button {\n    margin:0 6px 6px 0\n  }\n  .bordered {\n    border: 1px solid #ddd;\n  }\n"])));
exports.Ctg_Analyse = function (_a) {
    var docid = _a.docid, _b = _a.type, type = _b === void 0 ? "default" : _b, id = _a.id, note = _a.note, _c = _a.onDownload, onDownload = _c === void 0 ? function (url) { } : _c, _d = _a.age, age = _d === void 0 ? 0 : _d, _e = _a.fetalcount, fetalcount = _e === void 0 ? 0 : _e, _f = _a.gestationalWeek, gestationalWeek = _f === void 0 ? '' : _f, _g = _a.inpatientNO, inpatientNO = _g === void 0 ? '' : _g, _h = _a.name, name = _h === void 0 ? '' : _h, _j = _a.startdate, startdate = _j === void 0 ? '' : _j;
    note = note ? note : docid;
    if (!note)
        return null;
    var _k = useCtgData_1.useCtgData(note, true), ctgData = _k.ctgData, loading = _k.loading, fetal = _k.fetal, setFetal = _k.setFetal, fetchData = _k.fetchData;
    var _l = react_1.useState(true), disabled = _l[0], setDisabled = _l[1];
    var _m = react_1.useState(false), visible = _m[0], setVisible = _m[1];
    var _o = react_1.useState(''), pdfBase64 = _o[0], setPdfBase64 = _o[1];
    var _p = react_1.useState(false), padBase64Loading = _p[0], setPadBase64Loading = _p[1];
    var isRemote = type === 'remote';
    var ref = react_1.useRef(null);
    var wrap = react_1.useRef(null);
    var _q = useAnalyse_1.default(ref, note, fetal, ctgData), MARKS = _q.MARKS, reAnalyse = _q.reAnalyse, startTime = _q.startTime, endTime = _q.endTime, mark = _q.mark, setMark = _q.setMark, interval = _q.interval, setInterval = _q.setInterval, mapFormToMark = _q.mapFormToMark, analysis_ref = _q.analysis_ref, old_ref = _q.old_ref, analyseLoading = _q.analyseLoading, autoFm = _q.autoFm, setAutoFm = _q.setAutoFm, autoAnalyse = _q.autoAnalyse, setAutoAnalyse = _q.setAutoAnalyse, showBase = _q.showBase, setShowBase = _q.setShowBase, initData = _q.initData;
    var others = {
        MARKS: MARKS,
        startTime: startTime,
        mark: mark,
        setMark: setMark,
        interval: interval,
        setInterval: setInterval,
        mapFormToMark: mapFormToMark,
        old_ref: old_ref
    };
    function checkInput() {
        var rightData = analysis_ref.current.getFieldsValue();
        if (isRemote && rightData) {
            var diagnosistxt = rightData.diagnosistxt, NST = rightData.NST;
            if (!NST) {
                antd_1.message.warn({ content: '请选择NST类型' });
                return false;
            }
            if (!diagnosistxt) {
                antd_1.message.warn({ content: '请填写诊断意见' });
                return false;
            }
        }
        return true;
    }
    var getrRequestData = function () {
        var rightData = analysis_ref.current.getFieldsValue();
        var wave = rightData.wave, diagnosistxt = rightData.diagnosistxt, NST = rightData.NST, CST_OCT = rightData.CST_OCT, analyseData = __rest(rightData, ["wave", "diagnosistxt", "NST", "CST_OCT"]);
        var curData = others.mapFormToMark[mark + "_ref"].current.getFieldsValue();
        var oldData = old_ref.current[mark] || {};
        var isedit = Object.entries(curData).find(function (_a) {
            var k = _a[0], v = _a[1];
            return oldData[k] !== v;
        }) ? true : false;
        var identify = type === 'default' ? { note: note } : { id: id, note: note };
        var requestData = __assign(__assign({}, identify), { diagnosis: JSON.stringify({ wave: wave, diagnosistxt: diagnosistxt, NST: NST, CST_OCT: CST_OCT }), result: JSON.stringify(__assign(__assign(__assign({}, analyseData), curData), { isedit: isedit, type: mark, startTime: startTime, endTime: endTime })), fetalnum: fetal, show_fetalmovement: window['obvue'] ? !!window['obvue'].setting.show_fetalmovement : true });
        return requestData;
    };
    var getPrintUrl = function (path) {
        var url = path + "?query=" + encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(getrRequestData())))));
        console.log('url', url);
        return url;
    };
    var submit = function () {
        var ok = checkInput();
        ok && request_1.default.put(type === "default" ? '/ctg-exams-note' : '/serviceorders', { data: getrRequestData() }).then(function (r) {
            antd_1.message.success('保存成功！', 3);
            utils_1.event.emit(exports.ANALYSE_SUCCESS_TYPE, note);
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
                    var data_1 = JSON.parse(diagnosis) || {};
                    t = (react_1.default.createElement("div", null, Array.isArray(data_1) && (data_1.map(function (d) {
                        return react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(antd_1.Divider, null),
                            d.NST && react_1.default.createElement("div", null,
                                "NST\uFF1A",
                                react_1.default.createElement("span", null, d.NST)),
                            d.CST_OCT && react_1.default.createElement("div", null,
                                "CST/OCT\uFF1A",
                                react_1.default.createElement("span", null, d.CST_OCT)),
                            react_1.default.createElement("div", null,
                                "\u8BCA\u65AD\uFF1A",
                                react_1.default.createElement("span", null, d.diagnosistxt)),
                            react_1.default.createElement("div", null,
                                "\u65F6\u95F4\uFF1A",
                                react_1.default.createElement("span", null, d.timestamp)));
                    }))));
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
    return (react_1.default.createElement(Wrapper, { ref: wrap },
        react_1.default.createElement("div", { style: { height: "calc(100% - 460px - 12px)", minHeight: 200, marginBottom: 12, boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' } },
            react_1.default.createElement(lmg_1.Ctg, { suitType: 1, ref: ref, loading: loading, data: ctgData })),
        react_1.default.createElement(antd_1.Row, { style: { height: 460 } },
            react_1.default.createElement(antd_1.Col, { span: 17 },
                react_1.default.createElement(Score_1.default, __assign({ disabled: disabled, endTime: endTime, initData: initData }, others, { fetal: fetal, setFetal: setFetal, ctgData: ctgData, docid: note, v: ref.current, className: "bordered" })),
                react_1.default.createElement("div", { style: { position: 'absolute', right: 12, bottom: 0 } },
                    false && react_1.default.createElement(antd_1.Alert, { message: "\u9009\u6BB5\u65F6\u95F4\u8FC7\u77ED", style: { background: 'red', color: '#fff', display: 'inline-block', border: 0, padding: '1px 4px', marginRight: 10 } }),
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, onClick: history, disabled: btnDisabled }, "\u5386\u53F2\u5206\u6790"),
                    react_1.default.createElement(antd_1.Button, { size: "small", style: { marginBottom: 10 }, disabled: !note, onClick: function () { return setDisabled(!disabled); } }, disabled ? '修改评分' : '确认')),
                react_1.default.createElement(antd_1.Checkbox, { checked: autoFm, onChange: function (e) { return setAutoFm(e.target.checked); }, style: { position: 'absolute', left: 18, bottom: 8 } }, "\u81EA\u52A8\u80CE\u52A8"),
                react_1.default.createElement(antd_1.Checkbox, { checked: autoAnalyse, onChange: function (e) { return setAutoAnalyse(e.target.checked); }, style: { position: 'absolute', left: 100, bottom: 8 } }, "\u5F39\u7A97\u65F6\u81EA\u52A8\u5206\u6790"),
                react_1.default.createElement(antd_1.Checkbox, { checked: showBase, onChange: function (e) { return setShowBase(e.target.checked); }, style: { position: 'absolute', left: 228, bottom: 8 } }, "\u663E\u793A\u57FA\u7EBF"),
                react_1.default.createElement("div", { style: { position: 'absolute', right: 20, top: 12 } },
                    react_1.default.createElement(antd_1.Button, { size: "small", type: "primary", onClick: function () { return fetchData(); }, loading: loading }, "\u5237\u65B0\u6570\u636E"),
                    react_1.default.createElement(antd_1.Button, { size: "small", type: "primary", onClick: reAnalyse, loading: analyseLoading, disabled: !note }, "\u91CD\u65B0\u5206\u6790"))),
            react_1.default.createElement(antd_1.Col, { span: 7 },
                react_1.default.createElement(Analyse_1.default, { ref: analysis_ref, isRemote: isRemote }),
                react_1.default.createElement("div", { style: { position: 'absolute', right: 12, bottom: 0 } },
                    react_1.default.createElement(antd_1.Button, { size: "small", onClick: function () {
                            request_1.default.get(getPrintUrl('/ctg-exams-analysis-pdf-preview')).then(function (r) {
                                setVisible(true);
                                setPdfBase64(r.pdfdata);
                            }).finally(function () { return setPadBase64Loading(false); });
                            setPadBase64Loading(true);
                        }, style: { marginBottom: 10 }, type: "primary", disabled: btnDisabled || !initData, loading: padBase64Loading }, "\u6253\u5370\u9884\u89C8"),
                    react_1.default.createElement(antd_1.Button, { size: "small", type: "primary", onClick: submit, disabled: btnDisabled || !initData }, "\u4FDD\u5B58")))),
        react_1.default.createElement(antd_1.Modal, { getContainer: false, centered: true, visible: visible, closable: false, okText: "\u6253\u5370", cancelText: "\u53D6\u6D88", onCancel: function () { return setVisible(false); }, onOk: function () {
                onDownload(getPrintUrl('/ctg-exams-analysis-pdf'));
                setVisible(false);
            } },
            react_1.default.createElement(react_pdf_1.Document, { file: pdfBase64 ? "data:application/pdf;base64," + pdfBase64 : null, renderMode: "canvas" },
                react_1.default.createElement(react_pdf_1.Page, { pageNumber: 1, scale: 0.8 })))));
};
exports.default = exports.Ctg_Analyse;
var templateObject_1;
//# sourceMappingURL=index.js.map