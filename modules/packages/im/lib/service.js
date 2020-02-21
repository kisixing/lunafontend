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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var easemob_websdk_1 = __importDefault(require("easemob-websdk"));
var config_1 = require("./config");
var emoji_1 = __importDefault(require("./emoji"));
exports.default = (function (userConfig) {
    var WebIM = window.WebIM || (window.WebIM = {});
    var config = __assign(__assign({}, config_1.defaultConfig), userConfig);
    WebIM.config = config;
    var conn = WebIM.conn = new easemob_websdk_1.default.connection({
        isHttpDNS: config.isHttpDNS,
        isMultiLoginSessions: config.isMultiLoginSessions,
        https: config.https,
        url: config.xmppURL,
        isAutoLogin: false,
        heartBeatWait: config.heartBeatWait,
        autoReconnectNumMax: config.autoReconnectNumMax,
        autoReconnectInterval: config.autoReconnectInterval,
        isStropheLog: config.isStropheLog,
        delivery: config.delivery,
        appKey: config.appkey
    });
    if (!conn.apiUrl) {
        conn.apiUrl = config.apiURL;
    }
    easemob_websdk_1.default.debug(true);
    WebIM.emoji = emoji_1.default;
    return new Promise(function (res) {
        var user = userConfig.user, token = userConfig.token;
        conn.open({
            user: user,
            pwd: token,
            accessToken: token,
            apiUrl: config.apiURL,
            appKey: config.appkey
        });
        res(WebIM);
    });
});
