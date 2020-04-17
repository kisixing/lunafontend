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
var limitMap = {
    Krebs: 30,
    Nst: 20,
    Fischer: 20,
    Sogc: 20,
    Cst: 20
};
exports.default = (function (v, docid, fetal, setFhr, ctgData) {
    var _a = react_1.useState(), initData = _a[0], setInitData = _a[1];
    var _b = react_1.useState(false), isToShort = _b[0], setIsToShort = _b[1];
    var _c = react_1.useState(false), hasInited = _c[0], setHasInited = _c[1];
    var _d = react_1.useState(MARKS[0]), mark = _d[0], setMark = _d[1];
    var _e = react_1.useState(20), interval = _e[0], setInterval = _e[1];
    var _f = react_1.useState(0), startTime = _f[0], setStartTime = _f[1];
    var _g = react_1.useState(0), endTime = _g[0], setEndTime = _g[1];
    var _h = react_1.useState(false), analyseLoading = _h[0], setAnalyseLoading = _h[1];
    var Fischer_ref = react_1.useRef();
    var Krebs_ref = react_1.useRef();
    var Nst_ref = react_1.useRef();
    var analysis_ref = react_1.useRef();
    var old_ref = react_1.useRef({});
    var hasFetchedInitData = react_1.useRef(false);
    var mapFormToMark = {
        Fischer_ref: Fischer_ref,
        Krebs_ref: Krebs_ref,
        Nst_ref: Nst_ref,
        analysis_ref: analysis_ref
    };
    var remoteAnalyse = function () {
        return new Promise(function (res) {
            if (isToShort || initData || endTime === 0) {
                res();
            }
            else {
                setAnalyseLoading(true);
                hasFetchedInitData.current = true;
                request_1.default.post("/ctg-exams-analyse", {
                    data: { docid: docid, mark: mark, start: startTime, end: endTime, fetal: fetal },
                }).then(function (r) {
                    setInitData(r);
                }).finally(function () {
                    setAnalyseLoading(false);
                    res();
                });
            }
        });
    };
    var setFormData = function (r) {
        if (!r)
            return;
        var analysis = r.analysis, score = r.score;
        var f = score[mark.toLowerCase() + "data"];
        var cur = mapFormToMark[mark + "_ref"];
        cur.current && cur.current.setFieldsValue(f);
        old_ref.current[mark] = f;
        var stv = analysis.stv, ucdata = analysis.ucdata, acc = analysis.acc, dec = analysis.dec, fhrbaselineMinute = analysis.fhrbaselineMinute, others = __rest(analysis, ["stv", "ucdata", "acc", "dec", "fhrbaselineMinute"]);
        analysis_ref.current && analysis_ref.current.setFieldsValue(__assign(__assign({ stv: stv }, ucdata), others));
    };
    react_1.useEffect(function () {
        if (!hasFetchedInitData.current) {
            remoteAnalyse();
        }
    }, [remoteAnalyse]);
    react_1.useEffect(function () {
        var id = hasInited ? 0 : window.setInterval(function () {
            if (initData && v) {
                clearInterval(id);
                var r = v.drawAnalyse.analyse(mark, startTime, endTime, initData);
                setHasInited(true);
                setFormData(r);
            }
        }, 1000);
        return function () {
            clearInterval(id);
        };
    }, [initData, v, mark, startTime, endTime, setFormData]);
    var analyse = function () {
        setAnalyseLoading(true);
        remoteAnalyse().then(function () {
            v && setFormData(v.drawAnalyse.analyse(mark, startTime, endTime));
            setAnalyseLoading(false);
        });
    };
    react_1.useEffect(function () {
        var s = function (time) {
            time = time + 4800 <= v.data.index ? time : ((v.data.index - 4800) > 0 ? (v.data.index - 4800) : 0);
            docid && setStartTime(time);
        };
        v && v.on('change:selectPoint', s);
        return function () {
            v && v.off('change:selectPoint', s);
        };
    }, [interval, v, docid]);
    react_1.useEffect(function () {
        Object.values(mapFormToMark).forEach(function (f) { return f.current && f.current.resetFields(); });
        setStartTime(0);
    }, [docid]);
    react_1.useEffect(function () { setMarkAndItems(MARKS[0]); }, []);
    react_1.useEffect(function () {
        setFhr(fetal);
    }, [fetal]);
    react_1.useEffect(function () {
        if (ctgData && ctgData.fhr1) {
            var value = startTime + interval * 240 > ctgData.fhr1.length ? ctgData.fhr1.length : startTime + interval * 240;
            setEndTime(value);
        }
    }, [startTime, interval, ctgData]);
    react_1.useEffect(function () {
        var diff = Math.round((endTime - startTime) / 240);
        if (diff < limitMap[mark] && endTime !== 0) {
            setIsToShort(true);
        }
        else {
            setIsToShort(false);
        }
    }, [startTime, endTime, mark]);
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
        isToShort: isToShort
    };
});
//# sourceMappingURL=useAnalyse.js.map