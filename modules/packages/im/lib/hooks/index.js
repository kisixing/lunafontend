"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var useInit_1 = require("./useInit");
var useRoster_1 = require("./useRoster");
var useUnread_1 = require("./useUnread");
var useMessage_1 = require("./useMessage");
var useContact_1 = require("./useContact");
var useCurrent_1 = require("./useCurrent");
var msgTool_1 = require("../utils/msgTool");
exports.sendTxtMessage = msgTool_1.sendTxtMessage;
function useIm() {
    var conn = useInit_1.useInit().conn;
    var friends = useRoster_1.useRoster(conn).friends;
    var chatMessage = useMessage_1.useMessage(conn).chatMessage;
    var chatUnread = useUnread_1.useUnread(conn).chatUnread;
    var contacts = useContact_1.useContact(friends, chatMessage, chatUnread).contacts;
    var _a = useCurrent_1.useCurrent(chatMessage), currentMessage = _a.currentMessage, setCurrent = _a.setCurrent, current = _a.current;
    return { contacts: contacts, currentMessage: currentMessage, setCurrent: setCurrent, current: current };
}
exports.useIm = useIm;
__export(require("./new"));
//# sourceMappingURL=index.js.map