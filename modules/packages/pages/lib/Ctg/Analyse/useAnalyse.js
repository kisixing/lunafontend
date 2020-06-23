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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var MARKS = Object.keys(tableData_1.tableData);
var AUTOFM_KEY = 'autofm';
var AUTOANALYSE_KEY = 'auto_analuse';
var limitMap = {
    Krebs: 30,
    Nst: 20,
    Fischer: 20,
    Sogc: 20,
    Cst: 20,
    Cstoct: 20
};
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
exports.default = (function (v, docid, fetal, setFhr, ctgData) {
    var _a = react_1.useState(), initData = _a[0], setInitData = _a[1];
    var _b = react_1.useState(false), isToShort = _b[0], setIsToShort = _b[1];
    var _c = react_1.useState(MARKS[0]), mark = _c[0], setMark = _c[1];
    var _d = react_1.useState(20), interval = _d[0], setInterval = _d[1];
    var _e = react_1.useState(0), startTime = _e[0], setStartTime = _e[1];
    var _f = react_1.useState(0), endTime = _f[0], setEndTime = _f[1];
    var _g = react_1.useState(false), analyseLoading = _g[0], setAnalyseLoading = _g[1];
    var _h = react_1.useState(store_1.default.get(AUTOFM_KEY) || false), autoFm = _h[0], setAutoFm = _h[1];
    var _j = react_1.useState(store_1.default.get(AUTOANALYSE_KEY) || false), autoAnalyse = _j[0], setAutoAnalyse = _j[1];
    var Fischer_ref = react_1.useRef();
    var Krebs_ref = react_1.useRef();
    var Nst_ref = react_1.useRef();
    var Cst_ref = react_1.useRef();
    var Cstoct_ref = react_1.useRef();
    var Sogc_ref = react_1.useRef();
    var analysis_ref = react_1.useRef();
    var old_ref = react_1.useRef({});
    var hasInitAnalysed = react_1.useRef(false);
    var mapFormToMark = {
        Fischer_ref: Fischer_ref,
        Krebs_ref: Krebs_ref,
        Nst_ref: Nst_ref,
        Cst_ref: Cst_ref,
        Cstoct_ref: Cstoct_ref,
        Sogc_ref: Sogc_ref,
        analysis_ref: analysis_ref
    };
    function setFm(flag) {
        if (flag === void 0) { flag = true; }
        if (v.current && initData) {
            if (autoFm) {
                var fmIndex = initData.analysis.fm || [];
                var fm_1 = v.current.data.fm;
                fmIndex.forEach(function (_) {
                    fm_1[_] = 1;
                    fm_1[_ - 1] = 1;
                });
                flag && hardAnalyse();
            }
        }
    }
    var fetchData = function () {
        setAnalyseLoading(true);
        return request_1.default.post("/ctg-exams-analyse", {
            data: { docid: docid, mark: mark, start: startTime, end: endTime, fetal: fetal, autoFm: autoFm },
        })
            .then(function (r) { return r; })
            .finally(function () {
            setAnalyseLoading(false);
        });
    };
    var reAnalyse = function () { return __awaiter(void 0, void 0, void 0, function () {
        var r, analysisData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetchData()];
                case 1:
                    r = _a.sent();
                    analysisData = v.current.drawAnalyse.analysisData;
                    if (analysisData) {
                        r.analysis.acc = analysisData.analysis.acc;
                        r.analysis.dec = analysisData.analysis.dec;
                    }
                    r.score = getEmptyScore();
                    setInitData(r);
                    setFormData(v.current.drawAnalyse.analyse(mark, startTime, endTime, r));
                    return [2];
            }
        });
    }); };
    var remoteAnalyse = function () {
        return new Promise(function (res) {
            if ((isToShort || initData || endTime === 0 || analyseLoading)) {
                res();
            }
            else {
                fetchData()
                    .then(function (r) {
                    r.score = getEmptyScore();
                    setInitData(r);
                })
                    .finally(function () {
                    res();
                });
            }
        });
    };
    var setFormData = function (r) {
        if (!r)
            return;
        var analysis = r.analysis, score = r.score;
        console.log('form', analysis, score);
        var f = score[mark.toLowerCase() + "data"];
        var cur = mapFormToMark[mark + "_ref"];
        cur.current && cur.current.setFieldsValue(f);
        old_ref.current[mark] = f;
        var stv = analysis.stv, ucdata = analysis.ucdata, acc = analysis.acc, dec = analysis.dec, fhrbaselineMinute = analysis.fhrbaselineMinute, others = __rest(analysis, ["stv", "ucdata", "acc", "dec", "fhrbaselineMinute"]);
        analysis_ref.current && analysis_ref.current.setFieldsValue(__assign(__assign({ stv: stv }, ucdata), others));
    };
    react_1.useEffect(function () {
        autoAnalyse && remoteAnalyse();
    }, [endTime, isToShort, autoAnalyse]);
    react_1.useEffect(function () {
        var id = (hasInitAnalysed.current) ? 0 : window.setInterval(function () {
            if (initData && v.current) {
                clearInterval(id);
                var r = v.current.drawAnalyse.analyse(mark, startTime, endTime, initData);
                hasInitAnalysed.current = true;
                setFormData(r);
            }
        }, 1000);
        return function () {
            clearInterval(id);
        };
    }, [initData, v.current, mark, startTime, endTime, setFormData, autoAnalyse]);
    var hardAnalyse = function () {
        setFormData(v.current.drawAnalyse.analyse(mark));
    };
    react_1.useEffect(function () {
        var s = function (time) {
            time = time + 4800 <= v.current.data.index ? time : ((v.current.data.index - 4800) > 0 ? (v.current.data.index - 4800) : 0);
            docid && setStartTime(time);
        };
        v.current && v.current.on('change:selectPoint', s).on('suit:analyseMark', hardAnalyse);
        return function () {
            v.current && v.current.off('change:selectPoint', s).off('suit:analyseMark', hardAnalyse);
        };
    }, [interval, v.current, docid, hardAnalyse]);
    react_1.useEffect(function () {
        Object.values(mapFormToMark).forEach(function (f) { return f.current && f.current.resetFields(); });
        hasInitAnalysed.current = false;
        setInitData(null);
        setStartTime(0);
    }, [docid]);
    react_1.useEffect(function () {
        setFhr(fetal);
        setInitData(null);
        hasInitAnalysed.current = false;
    }, [fetal]);
    react_1.useEffect(function () {
        if (ctgData && ctgData.fhr1) {
            var value = startTime + interval * 240 > ctgData.fhr1.length / 2 ? ctgData.fhr1.length / 2 : startTime + interval * 240;
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
    react_1.useEffect(function () {
        v.current && hardAnalyse();
    }, [mark, v]);
    react_1.useEffect(function () {
        setFm();
    }, [autoFm, initData]);
    return {
        setMark: function (m) {
            setMark(m);
        },
        mark: mark,
        MARKS: MARKS,
        reAnalyse: reAnalyse,
        startTime: startTime, endTime: endTime, setStartTime: setStartTime, interval: interval, setInterval: setInterval,
        mapFormToMark: mapFormToMark,
        analysis_ref: analysis_ref,
        old_ref: old_ref,
        analyseLoading: analyseLoading,
        isToShort: isToShort,
        setAutoFm: function (s) {
            setAutoFm(s);
            store_1.default.set(AUTOFM_KEY, s);
        },
        autoFm: autoFm,
        initData: initData,
        autoAnalyse: autoAnalyse,
        setAutoAnalyse: function (s) {
            setAutoAnalyse(s);
            store_1.default.set(AUTOANALYSE_KEY, s);
        },
    };
});
//# sourceMappingURL=useAnalyse.js.map