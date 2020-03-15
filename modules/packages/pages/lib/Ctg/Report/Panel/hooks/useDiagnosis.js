"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
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
//# sourceMappingURL=useDiagnosis.js.map