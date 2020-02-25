"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useInit_1 = require("./useInit");
var useRoster_1 = require("./useRoster");
var useUnread_1 = require("./useUnread");
var useMessage_1 = require("./useMessage");
function useIm() {
    var conn = useInit_1.useInit().conn;
    var _a = react_1.useState([]), contacts = _a[0], setContacts = _a[1];
    var _b = react_1.useState(null), currentContact = _b[0], setCurrentContact = _b[1];
    var friends = useRoster_1.useRoster(conn).friends;
    var chatMessage = useMessage_1.useMessage(conn).chatMessage;
    var chatUnread = useUnread_1.useUnread(conn).chatUnread;
    react_1.useEffect(function () {
        var data = friends.map(function (chatId) {
            var msgArr = chatMessage[chatId];
            var c = { name: chatId };
            if (msgArr) {
                var latestMsg = msgArr[msgArr.length - 1];
                c.latestMessage = latestMsg.body.type === 'txt' ? latestMsg.body.msg : '[media]';
                c.unread = latestMsg.isUnread;
                c.latestTime = new Date(latestMsg.time).toLocaleDateString();
            }
            return c;
        });
        setContacts(data);
    }, [friends, chatUnread, setContacts]);
    react_1.useEffect(function () {
    }, [conn]);
    return { friends: friends, chatMessage: chatMessage, currentContact: currentContact, setCurrentContact: setCurrentContact, contacts: contacts };
}
exports.useIm = useIm;
