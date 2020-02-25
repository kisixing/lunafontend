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
var msgTpl = (_a = {
        base: {
            error: false,
            errorCode: '',
            errorText: '',
            status: 'sending',
            id: '',
            from: '',
            to: '',
            toJid: '',
            time: '',
            type: '',
            body: {},
            ext: {},
            bySelf: false
        }
    },
    _a[msg_1.EMsgBodyType.txt] = {
        type: msg_1.EMsgBodyType.txt,
        msg: ''
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
        thumb_secret: ''
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
        thumb_secret: ''
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
        thumb_secret: ''
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
        thumb_secret: ''
    },
    _a);
function copy(message, tpl) {
    var obj = {};
    Object.keys(tpl).forEach(function (v) {
        obj[v] = message[v] || tpl[v];
    });
    return obj;
}
exports.parseFromServer = function (message) {
    var ext = message.ext || {};
    var obj = copy(message, msgTpl.base);
    var body = copy(message, msgTpl[message.bodyType]);
    switch (message.bodyType) {
        case msg_1.EMsgBodyType.txt:
            return __assign(__assign({}, obj), { status: 'sent', body: __assign(__assign(__assign({}, body), ext), { msg: message.data, type: msg_1.EMsgBodyType.txt }) });
        case msg_1.EMsgBodyType.img:
            return __assign(__assign({}, obj), { status: 'sent', body: __assign(__assign(__assign({}, body), ext), { type: msg_1.EMsgBodyType.img }) });
        case msg_1.EMsgBodyType.file:
            return __assign(__assign({}, obj), { status: 'sent', body: __assign(__assign(__assign({}, body), ext), { type: msg_1.EMsgBodyType.file }) });
        case msg_1.EMsgBodyType.audio:
            return __assign(__assign({}, obj), { status: 'sent', body: __assign(__assign(__assign({}, body), ext), { type: msg_1.EMsgBodyType.audio }) });
        case msg_1.EMsgBodyType.video:
            return __assign(__assign({}, obj), { status: 'sent', body: __assign(__assign(__assign({}, body), ext), { type: msg_1.EMsgBodyType.video }) });
    }
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
