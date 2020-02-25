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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@lianmed/utils");
var msgParse_1 = require("./msgParse");
var msg_1 = require("../types/msg");
var types_1 = require("../types");
var CHAT_MSG = types_1.EEvents.chatMessage;
function listenerIntercept(conn) {
    var event = conn._event = new utils_1.EventEmitter();
    conn.on = event.on.bind(event);
    conn.emit = event.on.bind(event);
    conn.off = event.on.bind(event);
    conn.emit = function emit(event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this._event).emit.apply(_a, __spreadArrays([event], args));
        return true;
    };
    var oldListen = conn.listen.bind(conn);
    var user = conn.user;
    conn.listen = function name(cbs) {
        var onTextMessage = cbs.onTextMessage, onAudioMessage = cbs.onAudioMessage, onVideoMessage = cbs.onVideoMessage, onFileMessage = cbs.onFileMessage, onPictureMessage = cbs.onPictureMessage, others = __rest(cbs, ["onTextMessage", "onAudioMessage", "onVideoMessage", "onFileMessage", "onPictureMessage"]);
        oldListen(__assign(__assign({}, others), { onTextMessage: function (msg) {
                var _msg = msgParse_1.parse(__assign(__assign({}, msg), { bodyType: msg_1.EMsgBodyType.txt }), user);
                this._event.emit(CHAT_MSG, _msg);
                onTextMessage && onTextMessage.call(msg, this);
            },
            onAudioMessage: function (msg) {
                var _msg = msgParse_1.parse(__assign(__assign({}, msg), { bodyType: msg_1.EMsgBodyType.audio }), user);
                this._event.emit(CHAT_MSG, _msg);
                onAudioMessage && onAudioMessage.call(msg, this);
            },
            onVideoMessage: function (msg) {
                var _msg = msgParse_1.parse(__assign(__assign({}, msg), { bodyType: msg_1.EMsgBodyType.video }), user);
                this._event.emit(CHAT_MSG, _msg);
                onVideoMessage && onVideoMessage.call(msg, this);
            },
            onFileMessage: function (msg) {
                var _msg = msgParse_1.parse(__assign(__assign({}, msg), { bodyType: msg_1.EMsgBodyType.file }), user);
                this._event.emit(CHAT_MSG, _msg);
                onFileMessage && onFileMessage.call(msg, this);
            },
            onPictureMessage: function (msg) {
                var _msg = msgParse_1.parse(__assign(__assign({}, msg), { bodyType: msg_1.EMsgBodyType.img }), user);
                this._event.emit(CHAT_MSG, _msg);
                onPictureMessage && onPictureMessage.call(msg, this);
            } }));
    };
    return conn;
}
exports.listenerIntercept = listenerIntercept;
