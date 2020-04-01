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
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var usePrintConfig_1 = __importDefault(require("./hooks/usePrintConfig"));
var useSign_1 = __importDefault(require("./hooks/useSign"));
var useSave_1 = __importDefault(require("./hooks/useSave"));
var useArchive_1 = __importDefault(require("./hooks/useArchive"));
var index_1 = require("../index");
var styled_components_1 = __importDefault(require("styled-components"));
var services_1 = require("../../services");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    .bottomBtns button {\n        margin-right: 10px \n    }\n    .bottomBtns button:last-child {\n        margin-right: 0px \n    }\n"], ["\n    .bottomBtns button {\n        margin-right: 10px \n    }\n    .bottomBtns button:last-child {\n        margin-right: 0px \n    }\n"])));
var COEFFICIENT = 240;
var Preview = function (props) {
    var onDownload = props.onDownload, docid = props.docid, print_interval = props.print_interval, diagnosis = props.diagnosis, onTotalChange = props.onTotalChange, pdfBase64 = props.pdfBase64, setPdfBase64 = props.setPdfBase64, _a = props.empId, empId = _a === void 0 ? null : _a, args = __rest(props, ["onDownload", "docid", "print_interval", "diagnosis", "onTotalChange", "pdfBase64", "setPdfBase64", "empId"]);
    var _b = react_1.useState(false), pdfBase64Loading = _b[0], setPdfBase64Loading = _b[1];
    var handlePreview = function () {
        setPdfBase64Loading(true);
        services_1.fetchCtgExamsPdf(__assign({ docid: docid,
            diagnosis: diagnosis, start: startingTime, end: endingTime, outputType: outputType }, args)).then(function (r) {
            setPdfBase64Loading(false);
            setPdfBase64(r);
        });
    };
    var _c = react_1.useState({ suit: null }), value = _c[0], setValue = _c[1];
    var _d = usePrintConfig_1.default(value, print_interval), startingTime = _d.startingTime, endingTime = _d.endingTime, locking = _d.locking, total = _d.total, backward = _d.backward, forward = _d.forward, toggleLocking = _d.toggleLocking, selectAll = _d.selectAll, editable = _d.editable, outputType = _d.outputType, setOutputType = _d.setOutputType;
    var _e = useArchive_1.default(docid), setBizSn = _e.setBizSn, bizSn = _e.bizSn, archive = _e.archive, archiveLoading = _e.archiveLoading, archived = _e.archived;
    var _f = useSign_1.default(bizSn, setPdfBase64, setBizSn, empId), fetchQrCode = _f.fetchQrCode, qrCodeBase64 = _f.qrCodeBase64, modalVisible = _f.modalVisible, qrCodeBase64Loading = _f.qrCodeBase64Loading, setModalVisible = _f.setModalVisible, signed = _f.signed;
    var _g = useSave_1.default(bizSn, setBizSn), caEnable = _g.caEnable, save = _g.save, saveLoading = _g.saveLoading, saved = _g.saved;
    react_1.useEffect(function () {
        onTotalChange(total);
    }, [total]);
    return (react_1.default.createElement(index_1.Context.Consumer, null, function (v) {
        setValue(v);
        return (react_1.default.createElement("div", { id: "modal_id", style: { display: 'flex', height: '100%' } },
            react_1.default.createElement(Wrapper, { style: { width: 400, padding: 24, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', border: '1px solid #d9d9d9' } },
                react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } },
                    react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1.default.createElement(antd_1.Button, { disabled: locking, onClick: forward }, "\u5411\u540E\u9009\u62E9")),
                    react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1.default.createElement(antd_1.Button, { disabled: locking, onClick: backward }, "\u5411\u524D\u9009\u62E9")),
                    react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1.default.createElement(antd_1.Button, { disabled: locking, onClick: selectAll }, "\u5168\u9009")),
                    react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1.default.createElement(antd_1.Button, { disabled: !editable, onClick: toggleLocking }, locking ? '确定' : '自定义'))),
                react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("span", null, "\u5F00\u59CB\u65F6\u95F4\uFF1A"),
                        (startingTime / COEFFICIENT).toFixed(1),
                        react_1.default.createElement("span", null, "\u5206")),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("span", null, "\u7ED3\u675F\u65F6\u95F4\uFF1A"),
                        (endingTime / COEFFICIENT).toFixed(1),
                        react_1.default.createElement("span", null, "\u5206")),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("span", null, "\u65F6\u957F\uFF1A"),
                        total,
                        react_1.default.createElement("span", null, "\u5206"))),
                react_1.default.createElement("div", { style: { textAlign: 'left' } },
                    react_1.default.createElement("label", null, "\u80CE\u5FC3\u7387\u8303\u56F4\uFF1A"),
                    react_1.default.createElement(antd_1.Radio.Group, { value: outputType, onChange: setOutputType },
                        react_1.default.createElement(antd_1.Radio, { value: "180" }, "90~180"),
                        react_1.default.createElement(antd_1.Radio, { value: "210" }, "50~210"))),
                react_1.default.createElement("div", { style: { display: 'flex' }, className: "bottomBtns" },
                    react_1.default.createElement(antd_1.Button, { disabled: locking || !editable, block: true, type: "primary", loading: pdfBase64Loading, onClick: handlePreview },
                        react_1.default.createElement("span", null, "\u751F\u6210")),
                    caEnable ? (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(antd_1.Button, { block: true, disabled: !pdfBase64, type: "primary", loading: qrCodeBase64Loading, onClick: fetchQrCode },
                            react_1.default.createElement("span", null, " \u7B7E\u540D")))) : (react_1.default.createElement(antd_1.Button, { block: true, disabled: !pdfBase64, type: "primary", loading: saveLoading, onClick: save },
                        react_1.default.createElement("span", null, "\u4FDD\u5B58"))),
                    react_1.default.createElement(antd_1.Button, { block: true, disabled: !(signed || saved), type: "primary", loading: archiveLoading, onClick: archive },
                        react_1.default.createElement("span", null, archived ? '取消归档' : '归档')),
                    react_1.default.createElement(antd_1.Button, { block: true, disabled: !pdfBase64, type: "primary", onClick: onDownload },
                        react_1.default.createElement("span", null, "\u6253\u5370")))),
            react_1.default.createElement(antd_1.Modal, { getContainer: function () { return document.querySelector("#modal_id"); }, visible: modalVisible, footer: null, centered: true, onCancel: function () { return setModalVisible(false); }, bodyStyle: { textAlign: 'center' } },
                react_1.default.createElement("img", { alt: "qrcode", src: qrCodeBase64 }))));
    }));
};
exports.default = Preview;
var templateObject_1;
//# sourceMappingURL=TimeSelect.js.map