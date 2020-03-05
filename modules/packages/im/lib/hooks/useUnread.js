"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ImDb_1 = require("../utils/ImDb");
exports.useUnread = function (conn) {
    var _a = react_1.useState({}), chatUnread = _a[0], setChatUnread = _a[1];
    react_1.useEffect(function () {
        if (conn) {
            ImDb_1.imDb.getUnreadList().then(function (res) {
                console.log('unread', res);
                var _chatUnread = {};
                res
                    .filter(function (r) { return !r.error; })
                    .forEach(function (r) {
                    switch (r.type) {
                        case 'chat':
                            _chatUnread[r.chatId] = r;
                            break;
                    }
                });
                setChatUnread(_chatUnread);
            });
        }
    }, [conn]);
    return { chatUnread: chatUnread };
};
