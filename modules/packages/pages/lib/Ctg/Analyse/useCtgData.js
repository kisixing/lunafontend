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
var CTGChart = function (docid) {
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState({ fetalnum: '1', docid: docid }), ctgData = _b[0], setCtgData = _b[1];
    react_1.useEffect(function () {
        setLoading(true);
        request_1.default.get("/ctg-exams-data/" + docid).then(function (res) {
            setCtgData(__assign({ docid: docid }, res));
        }).finally(function () { return setLoading(false); });
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
    return { ctgData: ctgData, loading: loading };
};
exports.default = CTGChart;
