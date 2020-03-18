"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useInit_1 = require("./useInit");
var useUnread_1 = require("./useUnread");
var useMessage_1 = require("./useMessage");
var useContact_1 = require("./useContact");
function useI() {
    var stompService = useInit_1.useInit().stompService;
    var s = stompService.current;
    var chatUnread = useUnread_1.useUnread().chatUnread;
    var chatMessage = useMessage_1.useMessage(s).chatMessage;
    var contacts = useContact_1.useContact(chatMessage, chatUnread).contacts;
    return { chatMessage: chatMessage, contacts: contacts };
}
exports.useI = useI;
//# sourceMappingURL=index.js.map