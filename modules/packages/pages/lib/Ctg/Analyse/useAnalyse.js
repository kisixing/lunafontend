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
var request_1 = __importDefault(require("@lianmed/request"));
var utils_1 = require("@lianmed/utils");
exports.default = (function (v, docid, fetal, form, cb) {
    var resultData = react_1.useMemo(function () { return {}; }, []);
    var _a = react_1.useState(MARKS[0]), mark = _a[0], setMark = _a[1];
    var _b = react_1.useState([]), activeItem = _b[0], setActiveItem = _b[1];
    var _c = react_1.useState(20), interval = _c[0], setInterval = _c[1];
    var _d = react_1.useState(0), startTime = _d[0], setStartTime = _d[1];
    var Fisher_ref = react_1.useRef(null);
    var Kerbs_ref = react_1.useRef(null);
    var Nst_ref = react_1.useRef(null);
    var fetalKey = "fhr" + fetal;
    var mapFormToMark = {
        Fisher_ref: Fisher_ref,
        Kerbs_ref: Kerbs_ref,
        Nst_ref: Nst_ref
    };
    react_1.useEffect(function () {
        var s = function (time) {
            setStartTime(time);
        };
        v.suit && v.suit
            .on('startTime', s);
        return function () {
            v.suit && v.suit
                .off('startTime', s);
        };
    }, [interval, v]);
    react_1.useEffect(function () { setMarkAndItems(MARKS[0]); }, []);
    react_1.useEffect(function () {
        var keys = mapItemsToMarks[mark];
        setActiveItem(allItems.filter(function (_) { return keys.includes(_.key); }));
        console.log('mark', mark);
    }, [mark]);
    react_1.useEffect(function () {
        var defaultMark = MARKS[0];
        var keys = mapItemsToMarks[defaultMark];
        var value = resultData[fetalKey] = resultData[fetalKey] || { result: JSON.stringify(utils_1._R.zipObj(keys, keys.map(function () { return null; }))), mark: defaultMark };
        setMark(value.mark);
        setTimeout(function () {
            form.setFieldsValue(JSON.parse(value.result));
        }, 400);
    }, [fetalKey]);
    var analyse = function () {
        v.suit && v.suit.data && request_1.default.post("/ctg-exams-analyse", {
            data: { docid: docid, mark: mark, start: startTime, end: startTime + interval * 240, fetal: fetal }
        }).then(function (r) {
            var f = r.score.fischerdata;
            var cur = mapFormToMark[mark + "_ref"];
            cur.current.setFieldsValue(f);
        });
    };
    var setMarkAndItems = function (mark) {
        setMark(mark);
    };
    var modifyData = function () {
        resultData[fetalKey] = __assign(__assign({}, resultData[fetalKey]), { result: JSON.stringify(form.getFieldsValue()) });
    };
    return {
        setMark: setMarkAndItems, mark: mark,
        activeItem: activeItem, responseData: resultData,
        MARKS: MARKS, analyse: analyse, startTime: startTime, setStartTime: setStartTime, interval: interval, setInterval: setInterval, modifyData: modifyData,
        Fisher_ref: Fisher_ref,
        Nst_ref: Nst_ref,
        Kerbs_ref: Kerbs_ref
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
var allItems = [
    { key: 'fhrbaseline_score', label: '基线' },
    { key: 'zhenfu_lv_score', label: '振幅' },
    { key: 'fhr_uptime_score', label: '胎动FHR上升时间' },
    { key: 'fm_fhrv_score', label: '胎动FHR变化' },
    { key: 'fm_score', label: '胎动次数' },
    { key: 'Fischer', label: '分析法' },
    { key: 'zhouqi_lv_score', label: '周期变异' },
    { key: 'acc_score', label: '加速' },
    { key: 'dec_score', label: '减速' },
    { key: 'Krebs', label: '分析法' },
    { key: 'movement_score', label: '胎动' },
].map(function (_) { return (__assign(__assign({}, _), { rules: [{ required: true, message: '请输入分数' }] })); });
