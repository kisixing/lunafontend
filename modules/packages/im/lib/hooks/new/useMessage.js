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
exports.useMessage = function (s, chatUnread) {
    var _a = react_1.useState({}), chatMessage = _a[0], setChatMessage = _a[1];
    var _b = react_1.useState({}), chatReceived = _b[0], setChatReceived = _b[1];
    react_1.useEffect(function () {
        var event = s.getSessionId().then(function (s) { return "/user/" + s + "/chat"; });
        var cb = function (data) {
            var _a;
            var sender = data.sender;
            var old = chatReceived[sender] || [];
            old = __spreadArrays(old, [data]);
            setChatReceived(__assign(__assign({}, chatReceived), (_a = {}, _a[sender] = old, _a)));
        };
        s.on(event, cb);
        return function () {
            s.off(event, cb);
        };
    }, [chatReceived]);
    react_1.useEffect(function () {
        var data = Object.entries(chatUnread).reduce(function (res, _a) {
            var _b;
            var k = _a[0], v = _a[1];
            var old = res[k] || [];
            var oldIds = old.map(function (_) { return _.id; });
            v = v.filter(function (_) { return !oldIds.includes(_.id); });
            old = __spreadArrays(v, old);
            return Object.assign({}, res, (_b = {}, _b[k] = old, _b));
        }, chatReceived);
        setChatMessage(data);
        console.log('dd', data);
    }, [chatReceived, chatUnread]);
    return { chatMessage: chatMessage };
};
//# sourceMappingURL=useMessage.js.map