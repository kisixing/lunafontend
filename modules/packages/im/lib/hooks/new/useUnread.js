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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var types_1 = require("./types");
var request_1 = require("@lianmed/request");
exports.useUnread = function () {
    var _a = react_1.useState({}), chatUnread = _a[0], setChatUnread = _a[1];
    react_1.useEffect(function () {
        request_1.post('/pullUnreadMessage').then(function (r) {
            var result = r.result || [
                {
                    id: 2,
                    receiver: 'admin',
                    sender: 'admin',
                    timestamp: '2019-01-01',
                    msg: '你好:D',
                    type: types_1.MessageType.text
                },
                {
                    id: 3,
                    receiver: 'admin',
                    sender: 'admin',
                    timestamp: '2019-01-01',
                    msg: '你好:D',
                    type: types_1.MessageType.text,
                    bySelf: true
                },
            ];
            var data = result
                .map(function (_) { return (__assign(__assign({}, _), { unread: true })); })
                .reduce(function (res, a) {
                var _a;
                var sender = a.sender;
                var old = res[sender] || [];
                old.push(__assign({}, a));
                return Object.assign(res, (_a = {}, _a[sender] = old, _a));
            }, {});
            setChatUnread(data);
        });
    }, []);
    return { chatUnread: chatUnread, setChatUnread: setChatUnread };
};
//# sourceMappingURL=useUnread.js.map