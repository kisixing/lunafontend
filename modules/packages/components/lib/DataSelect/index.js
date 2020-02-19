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
var request_1 = __importDefault(require("@lianmed/request"));
exports.default = (function (props) {
    var _a = props.valueKey, valueKey = _a === void 0 ? 'id' : _a, _b = props.labelKey, labelKey = _b === void 0 ? 'name' : _b, url = props.url, _c = props.method, method = _c === void 0 ? 'get' : _c;
    var Option = antd_1.Select.Option;
    var _d = react_1.useState(null), options = _d[0], setOptions = _d[1];
    react_1.useEffect(function () {
        request_1.default[method](url).then(function (r) {
            setOptions(r);
        });
    }, []);
    return (react_1.default.createElement(antd_1.Select, __assign({}, props), options && options.map(function (_) { return (react_1.default.createElement(Option, { value: _[valueKey] }, _[labelKey])); })));
});
