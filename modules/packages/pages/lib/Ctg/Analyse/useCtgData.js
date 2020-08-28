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
function copyFhr(origin, single) {
    var fhr1 = origin.fhr1, fhr2 = origin.fhr2, fhr3 = origin.fhr3;
    var data = __assign(__assign({}, origin), { _fhr1: fhr1, _fhr2: fhr2, _fhr3: fhr3 });
    if (single) {
        data.fhr2 = null;
        data.fhr3 = null;
    }
    return data;
}
var CTGChart = function (docid, single) {
    if (single === void 0) { single = false; }
    var _a = react_1.useState(0), fetal = _a[0], setFetal = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState({ fetalnum: '1', docid: docid }), ctgData = _c[0], setCtgData = _c[1];
    function fetchData() {
        if (docid) {
            setLoading(true);
            return request_1.default.get("/ctg-exams-data/" + docid).then(function (res) {
                res && setCtgData(__assign(__assign({ docid: docid }, res), (copyFhr(res, single))));
                single && setFetal(1);
            }).finally(function () { return setLoading(false); });
        }
        else {
            return Promise.resolve();
        }
    }
    react_1.useEffect(function () {
        fetchData();
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
        var data = {};
        if (index) {
            var fhr1 = ctgData.fhr1;
            var key = "fhr" + index;
            var value = ctgData["_" + key];
            var emptyData = Array(fhr1 ? fhr1.length : 0).fill(0).join('');
            data = (_a = { fhr1: emptyData, fhr2: emptyData, fhr3: emptyData }, _a[key] = value, _a);
        }
        else {
            Array(Number(ctgData.fetalnum)).fill(0).forEach(function (_, i) {
                i = i + 1;
                data["fhr" + i] = ctgData["_fhr" + i];
            });
        }
        setCtgData(__assign(__assign(__assign({}, ctgData), data), { noOffset: !!index }));
    }
    react_1.useEffect(function () {
        setFhr(fetal);
    }, [fetal]);
    return { ctgData: ctgData, loading: loading, setFhr: setFhr, fetal: fetal, setFetal: setFetal, fetchData: fetchData };
};
exports.default = CTGChart;
//# sourceMappingURL=useCtgData.js.map