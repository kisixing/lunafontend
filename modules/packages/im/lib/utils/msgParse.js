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
var msgTool_1 = require("./msgTool");
exports.parseFromServer = function (message) {
    var obj = msgTool_1.msgClone(message);
    return obj;
};
function parse(message, username) {
    var m = exports.parseFromServer(message);
    var to = m.to, status = m.status;
    var type = m.type;
    var from = m.from || username;
    var bySelf = from == username;
    var chatId = bySelf || type !== 'chat' ? to : from;
    if (type === 'stranger') {
        chatId = from;
    }
    var _message = __assign(__assign({}, m), { bySelf: bySelf, time: +new Date(), status: status,
        chatId: chatId });
    return _message;
}
exports.parse = parse;
