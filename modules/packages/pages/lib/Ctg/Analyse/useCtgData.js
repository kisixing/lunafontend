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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
var request_1 = __importDefault(require("@lianmed/request"));
var regex = /./g;
function copyFhr(origin) {
    var fhr1 = origin.fhr1, fhr2 = origin.fhr2, fhr3 = origin.fhr3;
    return __assign(__assign({}, origin), { fhr2: fhr2 && fhr2.replace(regex, '0'), fhr3: fhr3 && fhr3.replace(regex, '0'), _fhr1: fhr1, _fhr2: fhr2, _fhr3: fhr3 });
}
var CTGChart = function (docid, single) {
    if (single === void 0) { single = false; }
    var _a = react_1.useState(1), fetal = _a[0], setFetal = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState({ fetalnum: '1', docid: docid }), ctgData = _c[0], setCtgData = _c[1];
    react_1.useEffect(function () {
        if (docid) {
            setLoading(true);
            request_1.default.get("/ctg-exams-data/" + docid).then(function (res) {
                res && setCtgData(__assign(__assign({ docid: docid }, res), (single ? copyFhr(res) : {})));
            }).finally(function () { return setLoading(false); });
            setFetal(1);
        }
    }, [docid]);
    react_1.useEffect(function () {
        var fn = function (data) {
            setCtgData(__assign(__assign({}, ctgData), data));
        };
        utils_1.event.on('analysis:setCtgData', fn);
        return function () {
            utils_1.event.off('analysis:setCtgData', fn);
        };
    }, [ctgData]);
    function setFhr(index) {
        var _a;
        var fhr1 = ctgData.fhr1, fhr2 = ctgData.fhr2, fhr3 = ctgData.fhr3;
        var key = "fhr" + index;
        var value = ctgData["_" + key];
        var data = __assign(__assign({}, ctgData), (_a = { fhr1: fhr1 && fhr1.replace(regex, '0'), fhr2: fhr2 && fhr2.replace(regex, '0'), fhr3: fhr3 && fhr3.replace(regex, '0') }, _a[key] = value, _a));
        console.log('setFhr', JSON.parse(JSON.stringify(data)), JSON.parse(JSON.stringify(ctgData)));
        setCtgData(data);
    }
    return { ctgData: ctgData, loading: loading, setFhr: setFhr, fetal: fetal, setFetal: setFetal };
};
exports.default = CTGChart;
//# sourceMappingURL=useCtgData.js.map