"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUrl() {
    var apiUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1-hsb.easemob.com';
    var xmppUrl = '//im-api.easemob.com/ws';
    if (window.location.href.indexOf('webim-h5.easemob.com') !== -1) {
        apiUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com';
        xmppUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//im-api-v2.easemob.com/ws';
    }
    else if (window.location.href.indexOf('webim-hsb-ly.easemob.com') !== -1) {
        apiUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1-hsb.easemob.com';
        xmppUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//im-api-v2-hsb.easemob.com/ws';
    }
    else if (window.location.href.indexOf('localhost') !== -1) {
        apiUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com';
        xmppUrl = (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//im-api-v2.easemob.com/ws';
    }
    return {
        apiUrl: apiUrl,
        xmppUrl: xmppUrl,
        sandBoxApiUrl: 'https://a1-hsb.easemob.com',
        sandboxXmppUrl: 'https://im-api-v2-hsb.easemob.com/ws'
    };
}
exports.defaultConfig = {
    heartBeatWait: 4500,
    xmppURL: getUrl().xmppUrl,
    apiURL: getUrl().apiUrl,
    appkey: 'easemob-demo#chatdemoui',
    Host: 'easemob.com',
    https: true,
    isHttpDNS: false,
    isMultiLoginSessions: true,
    isWindowSDK: false,
    isSandBox: false,
    isDebug: true,
    isStropheLog: false,
    autoReconnectNumMax: 5,
    autoReconnectInterval: 2,
    isWebRTC: window.RTCPeerConnection && /^https\:$/.test(window.location.protocol),
    i18n: 'cn',
    isAutoLogin: true,
    p2pMessageCacheSize: 500,
    delivery: true,
    groupMessageCacheSize: 200,
    loglevel: 'ERROR',
    enableLocalStorage: true
};
//# sourceMappingURL=config.js.map