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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("@lianmed/request"));
var react_1 = __importStar(require("react"));
var Panel_1 = __importDefault(require("./Panel"));
var useStomp_1 = require("./useStomp");
var utils_1 = require("./utils");
var _data = [
    {
        url: '/remote/index.html',
        name: 'remote',
        reload: true
    },
    {
        url: '/im/index.html',
        name: 'im'
    }
];
var electron = (utils_1.isElectron && window.require('electron')) || {};
var ipcRenderer = electron.ipcRenderer, remote = electron.remote;
exports.default = (function (props) {
    var _url = location.protocol + "//" + location.host;
    var _a = props.remote_url, remote_url = _a === void 0 ? _url : _a, _b = props.public_url, public_url = _b === void 0 ? remote_url + "/obvue" : _b, _c = props.data, data = _c === void 0 ? _data : _c;
    var _d = react_1.useState([]), visitedData = _d[0], setVisitedData = _d[1];
    useStomp_1.useStomp(visitedData, remote_url);
    react_1.useEffect(function () {
        var fn = function (e) {
            var r = remote && remote.getGlobal('windows').remote;
            r && r.send('message', __assign(__assign({}, request_1.default.configure), { prefix: "/api" }));
        };
        ipcRenderer && ipcRenderer.on('load', fn);
        return function () {
            utils_1.isElectron && ipcRenderer.removeListener('load', fn);
        };
    }, []);
    react_1.useEffect(function () {
        Promise.all(data.map(function (_) {
            var url = _.url;
            var isAbs = url.startsWith('http');
            var absUrl = isAbs ? url : "" + (public_url.includes('://') ? '' : 'http://') + public_url + url;
            if (!isAbs) {
                url = request_1.default.configToLocation(absUrl, { prefix: remote_url + "/api" });
            }
            return request_1.default.get('', { prefix: absUrl, hideErr: true, headers: { Origin: url, Accept: 'text/html' } }).then(function (raw) {
                if (raw) {
                    var iconUrl = '';
                    var origin_1 = new URL(absUrl).origin;
                    var el = document.createElement('html');
                    el.innerHTML = raw;
                    var l = el.querySelector('link[rel*=icon]');
                    if (l) {
                        var href = l.getAttribute('href');
                        if (href.includes('//')) {
                            iconUrl = href;
                        }
                        else {
                            iconUrl = "" + origin_1 + l.getAttribute('href');
                        }
                    }
                    var t = el.querySelector('title');
                    var title = t && t.innerText;
                    return (__assign(__assign({}, _), { url: url, title: title, iconUrl: iconUrl }));
                }
                else {
                    return _;
                }
            }).catch(function () { return null; });
        })).then(function (d) {
            setVisitedData(d.filter(function (_) { return !!_; }));
        });
    }, [data]);
    return (react_1.default.createElement(Panel_1.default, { visitedData: visitedData }));
});
//# sourceMappingURL=index.js.map