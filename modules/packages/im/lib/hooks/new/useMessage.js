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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.useMessage = function (s) {
    var _a = react_1.useState({}), chatMessage = _a[0], setChatMessage = _a[1];
    react_1.useEffect(function () {
        var event = s.getSessionId().then(function (s) { return "/user/" + s + "/chat"; });
        var cb = function (data) {
            var _a;
            var sender = data.sender;
            var old = chatMessage[sender] || [];
            old = __spreadArrays(old, [data]);
            setChatMessage(__assign(__assign({}, chatMessage), (_a = {}, _a[sender] = old, _a)));
        };
        s.on(event, cb);
        return function () {
            s.off(event, cb);
        };
    }, [chatMessage]);
    return { chatMessage: chatMessage };
};
//# sourceMappingURL=useMessage.js.map