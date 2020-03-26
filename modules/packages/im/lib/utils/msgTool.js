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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var msg_1 = require("../types/msg");
var baseTpl = {
    error: false,
    errorCode: '',
    errorText: '',
    status: 'sending',
    id: '',
    from: '',
    to: '',
    toJid: '',
    time: null,
    type: null,
    body: { type: null },
    ext: {},
    bySelf: false,
    isUnread: 1,
    chatId: null,
};
exports.msgTpl = (_a = {},
    _a[msg_1.EMsgBodyType.txt] = {
        type: msg_1.EMsgBodyType.txt,
        msg: '',
    },
    _a[msg_1.EMsgBodyType.img] = {
        type: msg_1.EMsgBodyType.img,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: '',
    },
    _a[msg_1.EMsgBodyType.file] = {
        type: msg_1.EMsgBodyType.file,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: '',
    },
    _a[msg_1.EMsgBodyType.video] = {
        type: msg_1.EMsgBodyType.video,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: '',
    },
    _a[msg_1.EMsgBodyType.audio] = {
        type: msg_1.EMsgBodyType.audio,
        file_length: 0,
        filename: '',
        filetype: '',
        length: 0,
        secret: '',
        width: 0,
        height: 0,
        url: '',
        thumb: '',
        thumb_secret: '',
    },
    _a);
baseTpl;
function copy(source, target) {
    var obj = {};
    Object.keys(target).forEach(function (v) {
        obj[v] = source[v] || target[v];
    });
    return obj;
}
function msgCopy(message, tplKey) {
    var tpl = exports.msgTpl[tplKey];
    var obj = {};
    Object.keys(tpl).forEach(function (v) {
        obj[v] = message[v] || tpl[v];
    });
    return obj;
}
exports.msgCopy = msgCopy;
function msgClone(message) {
    var bodyType = message.bodyType;
    var ext = message.ext || {};
    var base = copy(message, baseTpl);
    var body = copy(message, exports.msgTpl[bodyType]);
    var data = __assign(__assign({}, base), { body: __assign(__assign(__assign({}, body), ext), { type: bodyType }) });
    if (message.bodyType === msg_1.EMsgBodyType.txt) {
        data.body.msg = message.data;
    }
    return data;
}
exports.msgClone = msgClone;
function parseFromLocal(message) {
    var data = msgClone(message);
    var to = data.to;
    return __assign({ chatId: to }, data);
}
exports.parseFromLocal = parseFromLocal;
exports.sendTxtMessage = function (_to, chatType, data) {
    return new Promise(function (res, rej) {
        var webIM = window.WebIM;
        var conn = webIM.conn;
        if (!conn) {
            rej(null);
        }
        var pMessage = parseFromLocal({
            id: conn.getUniqueId().toString(),
            bodyType: msg_1.EMsgBodyType.txt,
            type: chatType,
            data: data,
            to: _to,
            from: conn.user,
        });
        var body = pMessage.body, id = pMessage.id, to = pMessage.to;
        var type = body.type, msg = body.msg;
        var msgObj = webIM.message(type, +id);
        var chatroom = chatType === 'chatroom';
        msgObj.set({
            msg: msg,
            to: to,
            roomType: chatroom,
            chatType: 'singleChat',
            success: function () {
                pMessage.status = 'sent';
                pMessage.time = new Date().valueOf();
                res(pMessage);
            },
            fail: function () {
                pMessage.status = 'fail';
                rej(pMessage);
            },
        });
        if (chatType == 'groupchat' || chatType == 'chatroom') {
            msgObj.setGroup('groupchat');
        }
        conn.send(msgObj.body);
    });
};
//# sourceMappingURL=msgTool.js.map