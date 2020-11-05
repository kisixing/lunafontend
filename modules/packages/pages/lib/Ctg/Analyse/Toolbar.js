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
var request_1 = __importDefault(require("@lianmed/request"));
var utils_1 = require("@lianmed/utils");
var antd_1 = require("antd");
require("antd/dist/antd.css");
var react_1 = __importStar(require("react"));
var react_pdf_1 = require("react-pdf");
require("react-pdf/dist/Page/AnnotationLayer.css");
var useCtgData_1 = require("./useCtgData");
exports.useCtgData = useCtgData_1.useCtgData;
exports.ANALYSE_SUCCESS_TYPE = "(●'◡'●)";
exports.Ctg_Analyse = function (props) {
    var type = props.type, id = props.id, note = props.note, _a = props.onDownload, onDownload = _a === void 0 ? function (url) { } : _a, _b = props.showHistory, showHistory = _b === void 0 ? false : _b, mapFormToMark = props.mapFormToMark, startTime = props.startTime, endTime = props.endTime, mark = props.mark, analysis_ref = props.analysis_ref, old_ref = props.old_ref, autoFm = props.autoFm, setAutoFm = props.setAutoFm, autoAnalyse = props.autoAnalyse, setAutoAnalyse = props.setAutoAnalyse, showBase = props.showBase, setShowBase = props.setShowBase, initData = props.initData, currentHistory = props.currentHistory, isEditBase = props.isEditBase, setIsEditBase = props.setIsEditBase, fetchHistoryList = props.fetchHistoryList, fetal = props.fetal, setDisabled = props.setDisabled, disabled = props.disabled;
    var _c = react_1.useState(false), visible = _c[0], setVisible = _c[1];
    var _d = react_1.useState(''), pdfBase64 = _d[0], setPdfBase64 = _d[1];
    var _e = react_1.useState(false), padBase64Loading = _e[0], setPadBase64Loading = _e[1];
    var isRemote = type === 'remote';
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
        var curData = mapFormToMark[mark + "_ref"].current.getFieldsValue();
        var oldData = old_ref.current[mark] || {};
        var isedit = Object.entries(curData).find(function (_a) {
            var k = _a[0], v = _a[1];
            return oldData[k] !== v;
        }) ? true : false;
        var identify = type === 'default' ? { note: note } : { id: id, note: note };
        var requestData = __assign(__assign({}, identify), { diagnosis: JSON.stringify(rightData), analysis: JSON.stringify(initData), result: JSON.stringify(__assign(__assign(__assign({}, analyseData), curData), { isedit: isedit, type: mark, startTime: startTime, endTime: endTime })), fetalnum: fetal, show_fetalmovement: window['obvue'] ? !!window['obvue'].setting.show_fetalmovement : true, prenatalVisitStatus: 1, prenatalVisitRsuit: 1, prenatalVisitException: 1, id: currentHistory === null || currentHistory === void 0 ? void 0 : currentHistory.id });
        return requestData;
    };
    var getPrintUrl = function (path) {
        var url = path + "?query=" + encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(getrRequestData())))));
        console.log('url', url);
        return url;
    };
    var submit = function () {
        var ok = checkInput();
        var flag = type === "default";
        ok && request_1.default[(flag && !(currentHistory === null || currentHistory === void 0 ? void 0 : currentHistory.id)) ? 'post' : 'put'](flag ? '/diagnosis-histories' : '/serviceorders', { data: getrRequestData(), successText: '保存成功！' })
            .then(function (r) {
            fetchHistoryList();
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: { height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', justifyItems: 'center', margin: 6 } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(antd_1.Checkbox, { checked: autoFm, onChange: function (e) { return setAutoFm(e.target.checked); }, style: {} }, "\u81EA\u52A8\u80CE\u52A8"),
                    react_1.default.createElement(antd_1.Checkbox, { checked: autoAnalyse, onChange: function (e) { return setAutoAnalyse(e.target.checked); }, style: {} }, "\u5F39\u7A97\u65F6\u81EA\u52A8\u5206\u6790"),
                    react_1.default.createElement(antd_1.Checkbox, { checked: showBase, onChange: function (e) { return setShowBase(e.target.checked); }, style: {} }, "\u663E\u793A\u57FA\u7EBF"),
                    showHistory && react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(antd_1.Checkbox, { checked: !isEditBase, onChange: function (e) { return setIsEditBase(!e.target.checked); }, style: {} }, "\u4FEE\u6539\u52A0\u51CF\u901F"),
                        react_1.default.createElement(antd_1.Checkbox, { checked: isEditBase, onChange: function (e) { return setIsEditBase(e.target.checked); }, style: {} }, "\u4FEE\u6539\u57FA\u7EBF")))),
            react_1.default.createElement("div", { style: {} },
                false && react_1.default.createElement(antd_1.Alert, { message: "\u9009\u6BB5\u65F6\u95F4\u8FC7\u77ED", style: { background: 'red', color: '#fff', display: 'inline-block', border: 0, padding: '1px 4px', marginRight: 10 } }),
                !!showHistory || react_1.default.createElement(antd_1.Button, { size: "small", style: {}, onClick: history, disabled: btnDisabled }, "\u5386\u53F2\u5206\u6790"),
                react_1.default.createElement(antd_1.Button, { size: "small", style: {}, disabled: !note, onClick: function () { return setDisabled(!disabled); } }, disabled ? '修改评分' : '确认'),
                react_1.default.createElement(antd_1.Button, { size: "small", onClick: function () {
                        request_1.default.get(getPrintUrl('/ctg-exams-analysis-pdf-preview')).then(function (r) {
                            setVisible(true);
                            setPdfBase64(r.pdfdata);
                        }).finally(function () { return setPadBase64Loading(false); });
                        setPadBase64Loading(true);
                    }, style: {}, type: "primary", disabled: btnDisabled || !initData, loading: padBase64Loading }, "\u6253\u5370\u9884\u89C8"),
                react_1.default.createElement(antd_1.Button, { size: "small", type: "primary", onClick: submit, disabled: btnDisabled || !initData || currentHistory }, currentHistory ? '保存修改' : '保存'))),
        react_1.default.createElement(antd_1.Modal, { getContainer: false, centered: true, visible: visible, closable: false, okText: "\u6253\u5370", cancelText: "\u53D6\u6D88", onCancel: function () { return setVisible(false); }, onOk: function () {
                onDownload(getPrintUrl('/ctg-exams-analysis-pdf'));
                setVisible(false);
            } },
            react_1.default.createElement(react_pdf_1.Document, { file: pdfBase64 ? "data:application/pdf;base64," + pdfBase64 : null, renderMode: "canvas" },
                react_1.default.createElement(react_pdf_1.Page, { pageNumber: 1, scale: 0.8 })))));
};
exports.default = exports.Ctg_Analyse;
//# sourceMappingURL=Toolbar.js.map