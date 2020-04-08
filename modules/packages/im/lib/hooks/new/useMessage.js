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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var store_1 = __importDefault(require("store"));
var MESSAGE_KEY = 'message_storage';
var m1 = {};
exports.useMessage = function (s, chatUnread, setChatUnread, current) {
    var _a = react_1.useState(null), sessionId = _a[0], setSessionId = _a[1];
    var dirty = react_1.useRef(false);
    var _b = react_1.useState(store_1.default.get(MESSAGE_KEY) || m1), chatMessage = _b[0], _setChatMessage = _b[1];
    function setChatMessage(data) {
        _setChatMessage(data);
        store_1.default.set(MESSAGE_KEY, data);
    }
    react_1.useEffect(function () {
        s.getSessionId().then(function (s) {
            setSessionId("/user/" + s + "/chat");
        });
    }, []);
    react_1.useEffect(function () {
        var cb = function (data) {
            var _a;
            var sender = data.sender;
            var receiver = data.receiver;
            var bySelf = sender === '';
            var targetKey = bySelf ? receiver : sender;
            data.unread = (current && current.name) !== (targetKey);
            data.bySelf = bySelf;
            var old = chatMessage[targetKey] || [];
            old = __spreadArrays(old, [data]).sort(function (a, b) { return +new Date(a.timestamp) - +new Date(b.timestamp); })
                .reduce(function (res, _) {
                var preIndex = (res.length - 1) < 0 ? 0 : (res.length - 1);
                var pre = res[preIndex] || { timestamp: new Date(0).toUTCString() };
                var isHead = (+new Date(_.timestamp) - +new Date(pre.timestamp)) > 1000 * 10;
                _.isHead = isHead;
                return res.concat(_);
            }, []);
            setChatMessage(__assign(__assign({}, chatMessage), (_a = {}, _a[targetKey] = old, _a)));
            dirty.current = true;
        };
        sessionId && s.on(sessionId, cb);
        return function () {
            sessionId && s.off(sessionId, cb);
        };
    }, [chatMessage, sessionId]);
    react_1.useEffect(function () {
        if (dirty.current === true || Object.entries(chatUnread).length > 0) {
            var data = Object.entries(chatUnread).reduce(function (res, _a) {
                var _b;
                var k = _a[0], v = _a[1];
                var old = res[k] || [];
                var oldIds = old.map(function (_) { return _.id; });
                v = v.filter(function (_) { return !oldIds.includes(_.id); });
                old = __spreadArrays(v, old);
                return Object.assign({}, res, (_b = {}, _b[k] = old, _b));
            }, chatMessage);
            setChatMessage(data);
            setChatUnread({});
            dirty.current = false;
        }
    }, [chatMessage, chatUnread]);
    return { chatMessage: chatMessage, setChatMessage: setChatMessage };
};
//# sourceMappingURL=useMessage.js.map