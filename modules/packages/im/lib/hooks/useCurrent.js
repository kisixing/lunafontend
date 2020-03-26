"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useCurrent(chatMessage) {
    var _a = react_1.useState(null), current = _a[0], setCurrent = _a[1];
    var _b = react_1.useState([]), currentMessage = _b[0], setCurrentMessage = _b[1];
    react_1.useEffect(function () {
        console.log('current change', current, currentMessage);
        var mesgArr = chatMessage[current] || [];
        setCurrentMessage(__spreadArrays(currentMessage, mesgArr));
    }, [chatMessage, current, setCurrentMessage]);
    return { currentMessage: currentMessage, setCurrent: setCurrent, current: current };
}
exports.useCurrent = useCurrent;
//# sourceMappingURL=useCurrent.js.map