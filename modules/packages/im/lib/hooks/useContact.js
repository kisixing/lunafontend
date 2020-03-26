"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useContact(friends, chatMessage, chatUnread) {
    var _a = react_1.useState([]), contacts = _a[0], setContacts = _a[1];
    react_1.useEffect(function () {
        var data = friends.map(function (chatId) {
            var msgArr = chatMessage[chatId];
            var unreadArr = chatUnread[chatId] || [];
            var c = { name: chatId };
            if (msgArr) {
                var latestMsg = msgArr[msgArr.length - 1];
                c.latestMessage = latestMsg.body.type === 'txt' ? latestMsg.body.msg : '[media]';
                c.unread = unreadArr.length;
                c.latestTime = new Date(latestMsg.time).toLocaleDateString();
            }
            return c;
        });
        setContacts(data);
    }, [friends, setContacts, chatMessage]);
    return { contacts: contacts };
}
exports.useContact = useContact;
//# sourceMappingURL=useContact.js.map