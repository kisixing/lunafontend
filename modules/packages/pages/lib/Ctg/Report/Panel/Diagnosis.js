"use strict";
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
var request_1 = __importDefault(require("@lianmed/request"));
var Preview = function (props) {
    var _a = react_1.useState([]), tpls = _a[0], setTpls = _a[1];
    var _b = react_1.useState(null), selectV = _b[0], setSelectV = _b[1];
    react_1.useEffect(function () {
        request_1.default.get('/diagnosis-tpls').then(function (r) {
            if (r === void 0) { r = []; }
            setTpls(r);
            r.length && setSelectV(r[0].id);
        });
    }, []);
    react_1.useEffect(function () {
        var target = tpls.find(function (_) { return _.id === selectV; }) || { content: '' };
        onChange(target.content);
    }, [selectV]);
    var value = props.value, onChange = props.onChange;
    return (react_1.default.createElement("div", { style: { width: 400, marginRight: 10, display: 'flex', flexDirection: 'column', position: 'relative' } },
        react_1.default.createElement(antd_1.Input.TextArea, { value: value, onChange: function (e) { return onChange(e.target.value); }, style: { height: 240, lineHeight: 2 } }),
        react_1.default.createElement(antd_1.Select, { value: selectV, size: "small", style: { width: 120, position: 'absolute', right: 10, bottom: 10 }, onChange: setSelectV }, tpls.map(function (_a) {
            var title = _a.title, content = _a.content, id = _a.id;
            return react_1.default.createElement(antd_1.Select.Option, { key: id, value: id }, title);
        }))));
};
exports.default = Preview;
//# sourceMappingURL=Diagnosis.js.map