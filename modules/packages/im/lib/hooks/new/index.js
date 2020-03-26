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
var useInit_1 = require("./useInit");
var useUnread_1 = require("./useUnread");
var useMessage_1 = require("./useMessage");
var useContact_1 = require("./useContact");
var useCurrentMessage_1 = require("./useCurrentMessage");
var react_1 = require("react");
var types_1 = require("./types");
function useI(url) {
    var _a = react_1.useState(null), current = _a[0], setCurrent = _a[1];
    var stompService = useInit_1.useInit(url).stompService;
    var _b = useUnread_1.useUnread(), chatUnread = _b.chatUnread, setChatUnread = _b.setChatUnread;
    var _c = useMessage_1.useMessage(stompService, chatUnread, setChatUnread, current), chatMessage = _c.chatMessage, setChatMessage = _c.setChatMessage;
    var contacts = useContact_1.useContact(chatMessage).contacts;
    var currentMessage = useCurrentMessage_1.useCurrentMessage(chatMessage, current).currentMessage;
    var sendTextMessage = react_1.useCallback(function (receiver, msg) {
        var msgData = { type: types_1.MessageType.text, receiver: receiver, msg: msg };
        stompService.send('/app/sendPrivateMessage', msgData);
    }, []);
    var setCurrentId = react_1.useCallback(function (id) {
        var _a;
        var target = contacts.find(function (_) { return _.name === id; });
        setCurrent(target);
        var old = chatMessage[id] || [];
        old = old.map(function (_) { return (__assign(__assign({}, _), { unread: false })); });
        setChatMessage(__assign(__assign({}, chatMessage), (_a = {}, _a[id] = old, _a)));
    }, [contacts]);
    return { chatMessage: chatMessage, contacts: contacts, current: current, currentMessage: currentMessage, setCurrentId: setCurrentId, sendTextMessage: sendTextMessage };
}
exports.useI = useI;
//# sourceMappingURL=index.js.map