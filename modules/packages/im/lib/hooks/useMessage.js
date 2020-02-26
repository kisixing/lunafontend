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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ImDb_1 = require("../utils/ImDb");
var types_1 = require("../types");
exports.useMessage = function (conn) {
    var _a = react_1.useState({}), chatMessage = _a[0], setChatMessage = _a[1];
    react_1.useEffect(function () {
        var cb = function (mes) {
            var _a;
            console.log('parsed message', mes);
            var type = mes.type, chatId = mes.chatId;
            if (type === 'chat') {
                var oldArr = chatMessage[chatId] || [];
                var newArr = __spreadArrays(oldArr, [mes]);
                setChatMessage(__assign(__assign({}, chatMessage), (_a = {}, _a[chatId] = newArr, _a)));
                ImDb_1.imDb.addMessage(mes, 1);
            }
        };
        conn && conn.on(types_1.EEvents.chatMessage, cb);
        return function () {
            conn && conn.off(types_1.EEvents.chatMessage, cb);
        };
    }, [conn]);
    return { chatMessage: chatMessage };
};
