"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var getErrData_1 = __importDefault(require("./getErrData"));
var Request_1 = __importDefault(require("./Request"));
var store_1 = __importDefault(require("store"));
var utils_1 = require("@lianmed/utils");
var reasons_1 = __importDefault(require("./reasons"));
var aes_1 = __importDefault(require("crypto-js/aes"));
var crypto_js_1 = require("crypto-js");
var notification = require('antd/lib/notification').default;
var message = require('antd/lib/message').default;
var encrypt = aes_1.default.encrypt, decrypt = aes_1.default.decrypt;
var SEARCH_KEY = 0x21ac.toString();
var R = (function (_super) {
    __extends(R, _super);
    function R() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TOKEN_KEY = utils_1.TOKEN_KEY;
        _this.hasConfiged = false;
        _this.configure = { Authorization: store_1.default.get(utils_1.TOKEN_KEY) };
        _this.responseInterceptrorUsed = false;
        _this.config = function (configs) {
            if (configs === void 0) { configs = {}; }
            var hasConfiged = _this.hasConfiged;
            if (hasConfiged) {
                console.warn("couldn't config twice");
            }
            _this.hasConfiged = true;
            var _a = configs.Authorization, Authorization = _a === void 0 ? store_1.default.get(utils_1.TOKEN_KEY) || '' : _a;
            Authorization && (Authorization = Authorization.includes('Bearer') ? Authorization : "Bearer " + Authorization) && (store_1.default.set(utils_1.TOKEN_KEY, Authorization));
            Object.assign(_this.configure, configs, { Authorization: Authorization });
            _this.init(_this.configure);
            _this._request.interceptors.request.use(function (url, options) {
                options.headers.Authorization = Authorization || store_1.default.get(utils_1.TOKEN_KEY);
                return { url: url, options: options };
            });
            if (!_this.responseInterceptrorUsed) {
                _this.responseInterceptrorUsed = true;
                _this._request.interceptors.response.use(function (response, options) {
                    var successText = options.successText, hideErr = options.hideErr;
                    var errorData = getErrData_1.default(response);
                    var status = errorData.status, errortext = errorData.errortext, url = errorData.url, data = errorData.data;
                    if ([200, 201, 204, 304].includes(status)) {
                        successText && message.success(successText);
                    }
                    else {
                        var r_1 = reasons_1.default[Math.floor(Math.random() * reasons_1.default.length)];
                        data.then(function (d) {
                            if (d === void 0) { d = { title: r_1 }; }
                            var _a = d.title, title = _a === void 0 ? r_1 : _a;
                            if (!hideErr) {
                                notification.error({
                                    message: "\u8BF7\u6C42\u9519\u8BEF " + errortext,
                                    description: "\u539F\u56E0\uFF1A" + title,
                                });
                            }
                            else {
                                console.error('Network Error', "\u8BF7\u6C42\u9519\u8BEF " + status + ": " + url + ": " + errortext);
                            }
                        });
                    }
                    return response;
                });
            }
            return _this;
        };
        _this.authenticate = function (params, c) {
            if (c === void 0) { c = {}; }
            var options = __assign({ data: params }, c);
            return _this._request.post("/authenticate", options).then(function (r) {
                if (r && r.id_token) {
                    var Authorization = r.id_token;
                    Authorization = Authorization.includes('Bearer') ? Authorization : "Bearer " + Authorization;
                    _this.config(__assign({ Authorization: Authorization }, c));
                    store_1.default.set(utils_1.TOKEN_KEY, Authorization);
                    return Authorization;
                }
                else {
                    throw '非标准登陆';
                }
            });
        };
        _this.unAuthenticate = function () { return new Promise(function (res) {
            store_1.default.remove(utils_1.TOKEN_KEY);
            res();
        }); };
        _this.configFromLocation = function (url) {
            if (url === void 0) { url = location.href; }
            var _ = new URL(url);
            var key = _.searchParams.get(SEARCH_KEY);
            var c;
            if (key) {
                var jsonStr = decrypt(key, SEARCH_KEY).toString(crypto_js_1.enc.Utf8);
                c = JSON.parse(jsonStr);
                _this.config(c);
            }
            return c;
        };
        _this.fetchPage = function (model, data, keyMap) {
            if (keyMap === void 0) { keyMap = {}; }
            var r = _this._request;
            var current = data.current, pageSize = data.pageSize, otherParams = __rest(data, ["current", "pageSize"]);
            var momentHandleKey = ['mtod_', 'mtot_'];
            var momentHandleFn = [utils_1.formatDate, utils_1.formatTime];
            var params = __assign(__assign({}, (Object.entries(otherParams).reduce(function (p, _a) {
                var k = _a[0], v = _a[1];
                var momentHandleIdx = 0;
                var isMonent = v && v._isAMomentObject && ((momentHandleIdx = momentHandleKey.findIndex(function (_) { return k.startsWith(_); })) > -1);
                k = isMonent ? k.slice(5) : k;
                k = keyMap[k] || k;
                v = (isMonent) ? momentHandleFn[momentHandleIdx](v) : v;
                v = v === null ? undefined : v;
                p["" + k] = v;
                return p;
            }, {}))), { page: (current - 1) || 0, size: pageSize });
            return Promise.all([
                r.get("/" + model + "page", {
                    params: params,
                }),
                r.get("/" + model + "/count", {
                    params: params,
                }).catch(function () { return 20; })
            ]).then(function (arr) {
                return {
                    data: arr[0],
                    pagination: {
                        total: arr[1],
                        current: current,
                        pageSize: pageSize
                    }
                };
            });
        };
        return _this;
    }
    R.prototype.configToLocation = function (url, attachment) {
        if (url === void 0) { url = location.href; }
        if (attachment === void 0) { attachment = {}; }
        var c = Object.assign({}, this.configure, attachment);
        var enc = encrypt(JSON.stringify(c), SEARCH_KEY).toString();
        var _ = new URL(url);
        _.searchParams.append(SEARCH_KEY, enc);
        return _.href;
    };
    return R;
}(Request_1.default));
var r = new R();
var get = r.get, post = r.post, put = r.put, config = r.config, fetchPage = r.fetchPage, del = r.delete;
exports.get = get;
exports.post = post;
exports.put = put;
exports.config = config;
exports.fetchPage = fetchPage;
exports.del = del;
exports.default = r;
//# sourceMappingURL=index.js.map