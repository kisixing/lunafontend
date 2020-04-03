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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("@lianmed/request"));
exports.isElectron = navigator.userAgent.includes('electron') || navigator.userAgent.includes('Electron');
exports.onOpen = (function () {
    var wins = {};
    return function (_a) {
        var url = _a.url, name = _a.name, o = __rest(_a, ["url", "name"]);
        if (exports.isElectron) {
            var electron = window.require('electron');
            electron.ipcRenderer.send('open', __assign(__assign({}, o), { url: url, name: name }));
        }
        else {
            var old = wins[name];
            old && old.close();
            var target_1 = wins[name] = window.open(url);
            console.log('e', wins[name]);
            target_1.addEventListener('load', function (e) {
                target_1.postMessage(JSON.stringify({
                    type: 'config',
                    data: request_1.default.configure
                }), null);
            });
        }
    };
})();
//# sourceMappingURL=utils.js.map