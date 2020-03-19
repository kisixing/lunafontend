"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var types_1 = require("./types");
function useContact(chatMessage) {
    var _a = react_1.useState([]), contacts = _a[0], setContacts = _a[1];
    react_1.useEffect(function () {
        var data = Object.keys(chatMessage).map(function (chatId) {
            var msgArr = chatMessage[chatId];
            var c = { name: chatId };
            if (msgArr) {
                var latestMsg = msgArr[msgArr.length - 1];
                c.latestMessage = latestMsg.type === types_1.MessageType.text ? latestMsg.msg : '[media]';
                c.unread = msgArr.filter(function (_) { return _.unread; }).length;
                c.latestTime = new Date(latestMsg.timestamp).toLocaleDateString();
            }
            return c;
        });
        setContacts(data);
        console.log('ssss________', chatMessage);
    }, [setContacts, chatMessage]);
    return { contacts: contacts };
}
exports.useContact = useContact;
//# sourceMappingURL=useContact.js.map