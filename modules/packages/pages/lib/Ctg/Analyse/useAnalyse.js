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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var request_1 = __importDefault(require("@lianmed/request"));
var tableData_1 = require("./methods/tableData");
var MARKS = Object.keys(tableData_1.tableData);
exports.default = (function (v, docid, fetal, setFhr) {
    var _a = react_1.useState(MARKS[0]), mark = _a[0], setMark = _a[1];
    var _b = react_1.useState(20), interval = _b[0], setInterval = _b[1];
    var _c = react_1.useState(0), startTime = _c[0], setStartTime = _c[1];
    var _d = react_1.useState(0), endTime = _d[0], setEndTime = _d[1];
    var _e = react_1.useState(false), analyseLoading = _e[0], setAnalyseLoading = _e[1];
    var Fischer_ref = react_1.useRef();
    var Krebs_ref = react_1.useRef();
    var Nst_ref = react_1.useRef();
    var analysis_ref = react_1.useRef();
    var old_ref = react_1.useRef({});
    var mapFormToMark = {
        Fischer_ref: Fischer_ref,
        Krebs_ref: Krebs_ref,
        Nst_ref: Nst_ref,
        analysis_ref: analysis_ref
    };
    var remoteAnalyse = function () {
        setAnalyseLoading(true);
        v && request_1.default.post("/ctg-exams-analyse", {
            data: { docid: docid, mark: mark, start: startTime, end: endTime, fetal: fetal },
        }).then(function (r) {
            var analysis = r.analysis, score = r.score;
            analysis.start = startTime;
            analysis.end = endTime;
            var f = score[mark.toLowerCase() + "data"];
            var cur = mapFormToMark[mark + "_ref"];
            cur.current.setFieldsValue(f);
            old_ref.current[mark] = f;
            var stv = analysis.stv, ucdata = analysis.ucdata, acc = analysis.acc, dec = analysis.dec, fhrbaselineMinute = analysis.fhrbaselineMinute, others = __rest(analysis, ["stv", "ucdata", "acc", "dec", "fhrbaselineMinute"]);
            analysis_ref.current.setFieldsValue(__assign(__assign({ stv: stv }, ucdata), others));
            v.analyse(r);
        }).finally(function () { return setAnalyseLoading(false); });
    };
    var analyse = function () {
        setAnalyseLoading(true);
        v && v.ctgscore(mark, startTime, endTime);
        setAnalyseLoading(false);
    };
    react_1.useEffect(function () {
        var s = function (time) {
            time = time + 4800 <= v.data.index ? time : ((v.data.index - 4800) > 0 ? (v.data.index - 4800) : 0);
            docid && setStartTime(time);
        };
        v && v.on('change:selectPoint', s).on('afterInit', remoteAnalyse);
        return function () {
            v && v.off('change:selectPoint', s).off('afterInit', remoteAnalyse);
        };
    }, [interval, v, docid, remoteAnalyse]);
    react_1.useEffect(function () {
        Object.values(mapFormToMark).forEach(function (f) { return f.current && f.current.resetFields(); });
        setStartTime(0);
    }, [docid]);
    react_1.useEffect(function () { setMarkAndItems(MARKS[0]); }, []);
    react_1.useEffect(function () {
        setFhr(fetal);
    }, [fetal]);
    react_1.useEffect(function () {
        setEndTime(startTime + interval * 240);
    }, [startTime, interval]);
    var setMarkAndItems = function (mark) {
        setMark(mark);
    };
    return {
        setMark: setMarkAndItems, mark: mark,
        MARKS: MARKS,
        analyse: analyse,
        startTime: startTime, endTime: endTime, setStartTime: setStartTime, interval: interval, setInterval: setInterval,
        Fischer_ref: Fischer_ref,
        Nst_ref: Nst_ref,
        Krebs_ref: Krebs_ref,
        analysis_ref: analysis_ref,
        old_ref: old_ref,
        analyseLoading: analyseLoading,
    };
});
//# sourceMappingURL=useAnalyse.js.map