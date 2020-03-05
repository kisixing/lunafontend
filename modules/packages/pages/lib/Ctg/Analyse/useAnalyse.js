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
var utils_1 = require("@lianmed/utils");
exports.default = (function (v, docid, fetal) {
    var resultData = react_1.useMemo(function () { return {}; }, []);
    var _a = react_1.useState(MARKS[0]), mark = _a[0], setMark = _a[1];
    var _b = react_1.useState(20), interval = _b[0], setInterval = _b[1];
    var _c = react_1.useState(0), startTime = _c[0], setStartTime = _c[1];
    var Fischer_ref = react_1.useRef();
    var Krebs_ref = react_1.useRef();
    var Nst_ref = react_1.useRef();
    var analysis_ref = react_1.useRef();
    var old_ref = react_1.useRef({});
    var fetalKey = "fhr" + fetal;
    var mapFormToMark = {
        Fischer_ref: Fischer_ref,
        Krebs_ref: Krebs_ref,
        Nst_ref: Nst_ref,
        analysis_ref: analysis_ref
    };
    react_1.useEffect(function () {
        var s = function (time) {
            time = time + 4800 <= v.data.index ? time : v.data.index - 4800;
            docid && setStartTime(time);
        };
        v && v.on('change:selectPoint', s);
        return function () {
            v && v.off('change:selectPoint', s);
        };
    }, [interval, v]);
    react_1.useEffect(function () {
        Object.values(mapFormToMark).forEach(function (f) { return f.current && f.current.resetFields(); });
    }, [docid]);
    react_1.useEffect(function () { setMarkAndItems(MARKS[0]); }, []);
    react_1.useEffect(function () {
        console.log('mark', mark);
    }, [mark]);
    react_1.useEffect(function () {
        var defaultMark = MARKS[0];
        var keys = mapItemsToMarks[defaultMark];
        var value = resultData[fetalKey] = resultData[fetalKey] || { result: JSON.stringify(utils_1._R.zipObj(keys, keys.map(function () { return null; }))), mark: defaultMark };
        setMark(value.mark);
    }, [fetalKey]);
    var analyse = function () {
        v && request_1.default.post("/ctg-exams-analyse", {
            data: { docid: docid, mark: mark, start: startTime, end: startTime + interval * 240, fetal: fetal }
        }).then(function (r) {
            var analysis = r.analysis, score = r.score;
            var f = score[mark.toLowerCase() + "data"];
            var cur = mapFormToMark[mark + "_ref"];
            cur.current.setFieldsValue(f);
            old_ref.current[mark] = f;
            var stv = analysis.stv, ucdata = analysis.ucdata, acc = analysis.acc, dec = analysis.dec, fhrbaselineMinute = analysis.fhrbaselineMinute, others = __rest(analysis, ["stv", "ucdata", "acc", "dec", "fhrbaselineMinute"]);
            analysis_ref.current.setFieldsValue(__assign(__assign({ stv: stv }, ucdata), others));
            v.analyse({
                start: startTime,
                end: startTime + 240 * interval,
                acc: acc,
                dec: dec,
                baseline: fhrbaselineMinute
            });
        });
    };
    var setMarkAndItems = function (mark) {
        setMark(mark);
    };
    return {
        setMark: setMarkAndItems, mark: mark,
        responseData: resultData,
        MARKS: MARKS, analyse: analyse, startTime: startTime, setStartTime: setStartTime, interval: interval, setInterval: setInterval,
        Fischer_ref: Fischer_ref,
        Nst_ref: Nst_ref,
        Krebs_ref: Krebs_ref,
        analysis_ref: analysis_ref,
        old_ref: old_ref
    };
});
var mapItemsToMarks = {
    Nst: [
        'fhrbaseline_score',
        'zhenfu_lv_score',
        'fhr_uptime_score',
        'fm_fhrv_score',
        'fm_score',
    ],
    Fischer: [
        'fhrbaseline_score',
        'zhenfu_lv_score',
        'zhouqi_lv_score',
        'acc_score',
        'dec_score',
    ],
    Krebs: [
        'fhrbaseline_score',
        'zhenfu_lv_score',
        'zhouqi_lv_score',
        'acc_score',
        'dec_score',
        'movement_score',
    ]
};
var MARKS = Object.keys(mapItemsToMarks);
