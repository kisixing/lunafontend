"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.default = (function (value, print_interval) {
    var _a = react_1.useState(0), startingTime = _a[0], setStartingTime = _a[1];
    var _b = react_1.useState(0), endingTime = _b[0], setEndingTime = _b[1];
    var _c = react_1.useState(false), locking = _c[0], setLocking = _c[1];
    var _d = react_1.useState(false), customizable = _d[0], setCustomizable = _d[1];
    var _e = react_1.useState(false), editable = _e[0], setEditable = _e[1];
    var _f = react_1.useState("180"), outputType = _f[0], _setOutputType = _f[1];
    var setOutputType = function (e) {
        _setOutputType(e.target.value);
    };
    react_1.useEffect(function () {
        var current = value.current || {};
        var cb = function (startingTime) {
            setStartingTime(startingTime);
        };
        var cbe = function (endingTime) {
            console.log('cb');
            setEndingTime(endingTime);
        };
        current.on && current.on('startTime', cb).on('endTime', cbe);
        return function () {
            current.off && current.off('startTime', cb).off('endTime', cb);
        };
    }, [value]);
    var toggleLocking = function () {
        var nextV = !locking;
        setLocking(nextV);
        value.current.emit('locking', nextV);
    };
    var toggleCustomiz = function () {
        var nextV = !customizable;
        setCustomizable(nextV);
        value.current.emit('customizing', nextV);
    };
    var remoteSetStartingTime = react_1.useCallback(function (v) {
        setStartingTime(v);
        value.current.emit('setStartingTime', v);
    }, [value]);
    var remoteSetEndingTime = react_1.useCallback(function (v) {
        setEndingTime(v);
        value.current.emit('setEndingTime', v);
    }, [value]);
    var backward = react_1.useCallback(function () { return value.current.emit('selectBackward') && setEditable(true); }, [value, setEditable]);
    var forward = react_1.useCallback(function () { return value.current.emit('selectForward') && setEditable(true); }, [value, setEditable]);
    var selectAll = react_1.useCallback(function () { return value.current.emit('selectAll') && setEditable(true); }, [value, setEditable]);
    return {
        editable: editable,
        selectAll: selectAll,
        startingTime: startingTime,
        endingTime: endingTime,
        locking: locking,
        customizable: customizable,
        remoteSetStartingTime: remoteSetStartingTime,
        remoteSetEndingTime: remoteSetEndingTime,
        toggleLocking: toggleLocking,
        toggleCustomiz: toggleCustomiz,
        backward: backward,
        forward: forward,
        outputType: outputType,
        setOutputType: setOutputType
    };
});
//# sourceMappingURL=usePrintConfig.js.map