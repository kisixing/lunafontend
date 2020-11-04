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
var store_1 = __importDefault(require("store"));
var utils_1 = require("@lianmed/utils");
var service_1 = require("./service");
exports.MARKS = Object.keys(tableData_1.tableData);
var AUTOFM_KEY = 'autofm';
var AUTOANALYSE_KEY = 'auto_analuse';
var SHOW_BASE = 'show_base';
var MARK_KEY = 'analyse_mark';
var INTERVAL_KEY = 'analyse_interval';
var getEmptyScore = function () {
    return {
        sogcdata: {
            bhrscore: 0,
            ltvvalue: 0,
            ltvscore: 0,
            accscore: 0,
            accvalue: 0,
            bhrvalue: 0,
            decscore: 0,
            decvalue: 0,
            total: 0,
            result: ''
        },
        ret: 0,
        msg: '',
        nstdata: {
            bhrscore: 0,
            ltvscore: 0,
            accdurationscore: 0,
            accamplscore: 0,
            fmscore: 0,
            total: 0,
            bhrvalue: 0,
            ltvvalue: 0,
            accdurationvalue: 0,
            accamplvalue: 0,
            fmvalue: 0,
        },
        krebsdata: {
            ltvvalue: 0,
            total: 0,
            bhrscore: 0,
            ltvscore: 0,
            stvscore: 0,
            accscore: 0,
            decscore: 0,
            fmscore: 0,
            bhrvalue: 0,
            ltvalue: 0,
            stvvalue: 0,
            accvalue: 0,
            decvalue: '',
            fmvalue: 0,
        },
        fischerdata: {
            ltvvalue: 0,
            bhrscore: 0,
            ltvscore: 0,
            stvscore: 0,
            accscore: 0,
            decscore: 0,
            total: 0,
            bhrvalue: 0,
            ltvalue: 0,
            stvvalue: 0,
            accvalue: 0,
            decvalue: '',
        },
        cstoctdata: {
            ldvalue: 0,
            ldscore: 0,
            vdscore: 0,
            vdvalue: 0,
            edscore: 0,
            edvalue: 0,
            bhrscore: 0,
            ltvvalue: 0,
            ltvscore: 0,
            accscore: 0,
            accvalue: 0,
            bhrvalue: 0,
            decscore: 0,
            decvalue: 0,
            sinusoidscore: 0,
            sinusoidvalue: 0,
            total: 0,
            result: ''
        },
        cstdata: {
            bhrscore: 0,
            ltvvalue: 0,
            ltvscore: 0,
            stvscore: 0,
            stvvalue: 0,
            accscore: 0,
            accvalue: 0,
            bhrvalue: 0,
            decscore: 0,
            decvalue: 0,
            total: 0,
        }
    };
};
exports.default = (function (suit, docid, fetal, ctgData) {
    var _a = react_1.useState(), initData = _a[0], setInitData = _a[1];
    var _b = react_1.useState(store_1.default.get(MARK_KEY) || exports.MARKS[0]), mark = _b[0], setMark = _b[1];
    var _c = react_1.useState(store_1.default.get(INTERVAL_KEY) || 20), interval = _c[0], setInterval = _c[1];
    var _d = react_1.useState(0), startTime = _d[0], setStartTime = _d[1];
    var _e = react_1.useState(false), analyseLoading = _e[0], setAnalyseLoading = _e[1];
    var _f = react_1.useState(store_1.default.get(AUTOFM_KEY) || false), autoFm = _f[0], setAutoFm = _f[1];
    var _g = react_1.useState(store_1.default.get(SHOW_BASE)), showBase = _g[0], setShowBase = _g[1];
    var _h = react_1.useState(store_1.default.get(AUTOANALYSE_KEY) || false), autoAnalyse = _h[0], setAutoAnalyse = _h[1];
    var _j = react_1.useState({}), currentHistory = _j[0], setCurrentHistory = _j[1];
    var _k = react_1.useState(false), isEditBase = _k[0], setIsEditBase = _k[1];
    var _l = react_1.useState([]), historyList = _l[0], setHistoryList = _l[1];
    var _m = react_1.useState(false), fakeHistoryLoading = _m[0], setFakeHistoryLoading = _m[1];
    var Fischer_ref = react_1.useRef();
    var Krebs_ref = react_1.useRef();
    var Nst_ref = react_1.useRef();
    var Cst_ref = react_1.useRef();
    var Cstoct_ref = react_1.useRef();
    var Sogc_ref = react_1.useRef();
    var analysis_ref = react_1.useRef();
    var old_ref = react_1.useRef({});
    var endTime = (ctgData && ctgData.fhr1) ? (startTime + interval * 240 > ctgData.fhr1.length / 2 ? ctgData.fhr1.length / 2 : startTime + interval * 240) : 0;
    function fetchHistoryList() {
        service_1.queryHistory({ note: docid }).then(function (data) {
            setHistoryList(data);
        });
    }
    var hardAnalyse = react_1.useCallback(function hardAnalyse() {
        suit.current.then(function (s) {
            s.drawAnalyse.analyse();
        });
    }, []);
    var mapFormToMark = {
        Fischer_ref: Fischer_ref,
        Krebs_ref: Krebs_ref,
        Nst_ref: Nst_ref,
        Cst_ref: Cst_ref,
        Cstoct_ref: Cstoct_ref,
        Sogc_ref: Sogc_ref,
        analysis_ref: analysis_ref
    };
    function fetchData(e) {
        return suit.current.then(function (s) {
            e = e ? e : s.getAnalyseEndTime(interval);
            if ((e - startTime) <= 10) {
                return Promise.reject();
            }
            setAnalyseLoading(true);
            return request_1.default.post("/ctg-exams-analyse", {
                data: { docid: docid, mark: mark, start: startTime, end: e, fetal: fetal, autoFm: autoFm },
            })
                .then(function (r) {
                return r;
            })
                .finally(function () {
                setAnalyseLoading(false);
            });
        });
    }
    var reAnalyse = function () {
        fetchData()
            .then(function (r) {
            suit.current.then(function (s) {
                var analysisData = s.drawAnalyse.analysisData;
                if (analysisData) {
                    r.analysis.acc = analysisData.analysis.acc;
                    r.analysis.dec = analysisData.analysis.dec;
                }
                r.score = getEmptyScore();
                setInitData(r);
                setCurrentHistory(null);
                s.drawAnalyse.showBase = showBase;
                s.drawAnalyse.autoFm = autoFm;
                s.drawAnalyse.analyse(mark, startTime, s.getAnalyseEndTime(interval), r);
            });
        })
            .catch(function () { });
    };
    function setFormData(r) {
        if (!r)
            return;
        var analysis = r.analysis, score = r.score;
        setInitData(r);
        var f = score[mark.toLowerCase() + "data"];
        var cur = mapFormToMark[mark + "_ref"];
        cur.current && cur.current.setFieldsValue(f);
        old_ref.current[mark] = f;
        console.log('setFormData', analysis, score);
        var stv = analysis.stv, ucdata = analysis.ucdata, acc = analysis.acc, dec = analysis.dec, fhrbaselineMinute = analysis.fhrbaselineMinute, others = __rest(analysis, ["stv", "ucdata", "acc", "dec", "fhrbaselineMinute"]);
        analysis_ref.current && analysis_ref.current.setFieldsValue(__assign(__assign({ stv: stv }, ucdata), others));
    }
    react_1.useEffect(function () {
        function initCb() {
            autoAnalyse && reAnalyse();
        }
        utils_1.event
            .on('suit:afterInit', initCb)
            .on('suit:afterAnalyse', setFormData);
        return function () {
            utils_1.event
                .off('suit:afterInit', initCb)
                .off('suit:afterAnalyse', setFormData);
        };
    }, [autoAnalyse, initData, setFormData]);
    react_1.useEffect(function () {
        var s = function (time) {
            suit.current.then(function (ins) {
                time = time + 4800 <= ins.data.index ? time : ((ins.data.index - 4800) > 0 ? (ins.data.index - 4800) : 0);
                docid && setStartTime(time);
            });
        };
        suit.current.then(function (ins) {
            ins.on('change:selectPoint', s);
        });
        return function () {
            suit.current.then(function (ins) {
                ins.off('change:selectPoint', s);
            });
        };
    }, [interval, docid]);
    react_1.useEffect(function () {
        reset();
        setStartTime(0);
        fetchHistoryList();
        autoAnalyse && reAnalyse();
        console.log('docid', autoAnalyse);
    }, [docid, autoAnalyse]);
    function reset() {
        Object.values(mapFormToMark).forEach(function (f) { return f.current && f.current.resetFields(); });
        setInitData(null);
    }
    return {
        setMark: function (m) {
            setMark(m);
            store_1.default.set(MARK_KEY, m);
            suit.current.then(function (ins) {
                ins.drawAnalyse.type = m;
                hardAnalyse();
            });
        },
        mark: mark,
        reAnalyse: reAnalyse,
        startTime: startTime, endTime: endTime, setStartTime: setStartTime, interval: interval,
        setInterval: function (i) {
            store_1.default.set(INTERVAL_KEY, i);
            setInterval(i);
            reAnalyse();
        },
        mapFormToMark: mapFormToMark,
        analysis_ref: analysis_ref,
        old_ref: old_ref,
        analyseLoading: analyseLoading,
        setAutoFm: function (flag) {
            setAutoFm(flag);
            store_1.default.set(AUTOFM_KEY, flag);
            suit.current.then(function (s) {
                s.drawAnalyse.autoFm = flag;
                s.drawAnalyse.analyse(mark, startTime, endTime, initData);
            });
        },
        autoFm: autoFm,
        initData: initData,
        autoAnalyse: autoAnalyse,
        setAutoAnalyse: function (s) {
            setAutoAnalyse(s);
            store_1.default.set(AUTOANALYSE_KEY, s);
        },
        showBase: showBase,
        setShowBase: function (s) {
            setShowBase(s);
            suit.current.then(function (ins) { return ins.drawAnalyse.showBase = s; });
            store_1.default.set(SHOW_BASE, s);
            hardAnalyse();
        },
        setFetalCb: function () {
            reset();
            if (autoAnalyse) {
                reAnalyse();
            }
        },
        fakeHistoryLoading: fakeHistoryLoading,
        setCurrentHistory: function (i) {
            var _a;
            setCurrentHistory(i);
            setFakeHistoryLoading(true);
            setTimeout(function () {
                setFakeHistoryLoading(false);
            }, 700);
            var diagnosis = i.diagnosis, analysis = i.analysis, result = i.result;
            if (analysis) {
                (_a = suit.current) === null || _a === void 0 ? void 0 : _a.then(function (s) {
                    var _a;
                    (_a = analysis_ref.current) === null || _a === void 0 ? void 0 : _a.setFieldsValue(diagnosis);
                    s.drawAnalyse.analyse(result === null || result === void 0 ? void 0 : result.type, result === null || result === void 0 ? void 0 : result.startTime, result === null || result === void 0 ? void 0 : result.endTime, analysis);
                });
            }
        },
        historyList: historyList,
        currentHistory: currentHistory,
        isEditBase: isEditBase,
        setIsEditBase: function (flag) {
            suit.current.then(function (s) {
                setIsEditBase(flag);
                s.isCheckBaelinePoint = flag;
                if (flag && !showBase) {
                    setShowBase(true);
                    s.drawAnalyse.showBase = true;
                    store_1.default.set(SHOW_BASE, true);
                    hardAnalyse();
                }
            });
        },
        fetchHistoryList: fetchHistoryList
    };
});
//# sourceMappingURL=useAnalyse.js.map