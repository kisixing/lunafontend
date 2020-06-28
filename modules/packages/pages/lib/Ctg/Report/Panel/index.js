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
var PreviewContent_1 = __importDefault(require("./PreviewContent"));
var useDiagnosis_1 = __importDefault(require("./hooks/useDiagnosis"));
var Diagnosis_1 = __importDefault(require("./Diagnosis"));
var TimeSelect_1 = __importDefault(require("./TimeSelect"));
var Preview = function (props) {
    var wh = props.wh, _a = props.empId, empId = _a === void 0 ? null : _a, onDownload = props.onDownload, others = __rest(props, ["wh", "empId", "onDownload"]);
    var _b = react_1.useState(''), pdfBase64 = _b[0], setPdfBase64 = _b[1];
    var _c = react_1.useState(''), t = _c[0], setT = _c[1];
    var _d = useDiagnosis_1.default(t), diagnosis = _d.diagnosis, setDiagnosis = _d.setDiagnosis;
    return (react_1.default.createElement("div", { style: { display: 'flex', height: '100%' } },
        react_1.default.createElement(PreviewContent_1.default, { pdfBase64: pdfBase64, wh: wh, onDownload: onDownload }),
        react_1.default.createElement(Diagnosis_1.default, { value: diagnosis, onChange: setDiagnosis }),
        react_1.default.createElement(TimeSelect_1.default, __assign({ empId: empId, diagnosis: diagnosis, onTotalChange: setT, onDownload: onDownload, pdfBase64: pdfBase64, setPdfBase64: setPdfBase64 }, others))));
};
exports.default = Preview;
//# sourceMappingURL=index.js.map