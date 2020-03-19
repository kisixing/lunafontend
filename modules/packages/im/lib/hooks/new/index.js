"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useInit_1 = require("./useInit");
var useUnread_1 = require("./useUnread");
var useMessage_1 = require("./useMessage");
var useContact_1 = require("./useContact");
var useCurrent_1 = require("./useCurrent");
var react_1 = require("react");
var types_1 = require("./types");
function useI() {
    var stompService = useInit_1.useInit().stompService;
    var _a = useUnread_1.useUnread(), chatUnread = _a.chatUnread, setChatUnread = _a.setChatUnread;
    var chatMessage = useMessage_1.useMessage(stompService, chatUnread, setChatUnread).chatMessage;
    var contacts = useContact_1.useContact(chatMessage).contacts;
    var _b = useCurrent_1.useCurrent(chatMessage, contacts), current = _b.current, currentMessage = _b.currentMessage, setCurrentId = _b.setCurrentId;
    var sendTextMessage = react_1.useCallback(function (receiver, msg) {
        var msgData = { type: types_1.MessageType.text, receiver: receiver, msg: msg };
        stompService.send('/app/sendPrivateMessage', msgData);
    }, []);
    return { chatMessage: chatMessage, contacts: contacts, current: current, currentMessage: currentMessage, setCurrentId: setCurrentId, sendTextMessage: sendTextMessage };
}
exports.useI = useI;
//# sourceMappingURL=index.js.map