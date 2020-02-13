"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var getText = function () {
    var g = function (n) { return '【 】'; };
    return "\u89C2\u5BDF" + g(0) + "\u5206\u949F\uFF0C\u80CE\u5FC3\u57FA\u7EBF" + g(1) + "bpm\uFF0C\u80CE\u52A8" + g(2) + "\u6B21\uFF0C\n\u80CE\u52A8\u65F6\u80CE\u5FC3" + g(3) + "bpm, \u6301\u7EED\u65F6\u95F4" + g(4) + "s\uFF0C\u80CE\u5FC3\u632F\u5E45\u8303\u56F4" + g(5) + "bpm\uFF0CNST" + g(7) + "\u53CD\u5E94\u3002";
};
exports.default = (function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = react_1.useState(''), diagnosis = _a[0], setDiagnosis = _a[1];
    react_1.useEffect(function () {
        var a = diagnosis.replace(/【.*?】/, "\u3010" + args[0] + "\u3011");
        setDiagnosis(a);
    }, [args[0]]);
    var fn = function () {
    };
    react_1.useEffect(function () {
    }, [diagnosis]);
    return {
        diagnosis: diagnosis,
        setDiagnosis: function (v) {
            var a = v.replace(/【.*?】/, "\u3010" + args[0] + "\u3011");
            setDiagnosis(a);
        },
        fn: fn
    };
});
