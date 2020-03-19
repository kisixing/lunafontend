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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sockjs_client_1 = __importDefault(require("sockjs-client"));
var webstomp_client_1 = __importDefault(require("webstomp-client"));
var rxjs_1 = require("rxjs");
var store_1 = __importDefault(require("store"));
var Event_1 = require("../Event");
var constant_1 = require("../constant");
var antd_1 = require("antd");
var t_key = 'access_token';
var t = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTg2MTYyNTM0fQ.QasLwM0f0rJvHuSZrNVuVIFK4NRNC8eHTDDy8ZcIdHRxAKtS_qoOOrezV8d0lvevOYtZLct9oZ485OkIE-q1vg';
var StompService = (function (_super) {
    __extends(StompService, _super);
    function StompService(url) {
        if (url === void 0) { url = "http://transfer.lian-med.com:9987/ws/stomp?access_token=" + t; }
        var _this = _super.call(this) || this;
        _this.stompClient = null;
        _this.stompSubscribers = {};
        _this.connectedPromise = null;
        _this.stompService = null;
        _this.createConnection = function () { return new Promise(function (resolve, reject) { return (_this.connectedPromise = resolve); }); };
        _this.createListener = function () { return new rxjs_1.Observable(function (_subscriber) {
            _this.rxSubscriber = _subscriber;
        }); };
        _this.connect = function () {
            var url = _this.url;
            if (_this.connectedPromise !== null || _this.stompService) {
                return;
            }
            _this.connection = _this.createConnection();
            _this.rxObservable = _this.createListener();
            var headers = {};
            if (!url)
                return antd_1.message.warning('未设置stomp url');
            var socket = new sockjs_client_1.default(url);
            _this.stompClient = webstomp_client_1.default.over(socket);
            _this.stompClient.connect(headers, function () {
                _this.connectedPromise('success');
                _this.connectedPromise = null;
                _this.rxObservable.subscribe(function (_a) {
                    var data = _a.data, event = _a.event;
                    _this.emit(event, data);
                });
            });
        };
        _this.disconnect = function () {
            if (_this.stompClient !== null) {
                _this.stompClient.disconnect();
                _this.stompClient = null;
            }
            window.onhashchange = function () { };
            _this.stompService = null;
        };
        _this.unsubscribe = function (event) {
            var old = _this.stompSubscribers[event] || [];
            old.forEach(function (_) { return _.unsubscribe(); });
            _this.rxObservable = _this.createListener();
        };
        if (StompService.s) {
            return StompService.s;
        }
        console.log('new stomservice', url, _this);
        StompService.s = _this;
        _this.config(url);
        _this.connect();
        return _this;
    }
    Object.defineProperty(StompService.prototype, "_sessionId", {
        get: function () {
            var _transport = this.stompClient.ws._transport;
            var url = _transport && _transport.url;
            return url && /\/([^\/]+)\/websocket/.exec(url)[1];
        },
        enumerable: true,
        configurable: true
    });
    StompService.prototype.getSessionId = function () {
        var _this = this;
        return this.connection.then(function () { return _this._sessionId; });
    };
    StompService.prototype.config = function (url) {
        if (!url)
            return;
        if (!url.includes('http://')) {
            url = "http://" + url;
        }
        var u = new URL(url);
        u.pathname = '/ws/stomp';
        var t = u.searchParams.get(t_key);
        if (!t) {
            u.searchParams.append(t_key, store_1.default.get(constant_1.TOKEN_KEY));
        }
        this.url = u.href;
    };
    StompService.prototype.on = function (event, listener) {
        var _this = this;
        console.log('stomservice on');
        if (typeof event === 'string') {
            this._on(event, listener);
        }
        else {
            event.then(function (str) {
                _this._on(str, listener);
            });
        }
        return this;
    };
    StompService.prototype._on = function (event, listener) {
        var _this = this;
        _super.prototype.on.call(this, event, listener);
        this.connection.then(function () {
            var stompSubscriber = _this.stompClient.subscribe(event, function (res) {
                var data;
                try {
                    data = JSON.parse(res.body);
                }
                catch (error) {
                    data = {};
                }
                _this.rxSubscriber.next({ data: data, event: event });
            });
            listener.id = stompSubscriber.id;
            console.log('stomservice _on', event, stompSubscriber.id);
            var old = _this.stompSubscribers[event] || (_this.stompSubscribers[event] = []);
            old.includes(stompSubscriber) || old.push(stompSubscriber);
        });
        return this;
    };
    StompService.prototype.off = function (event, listener) {
        var _this = this;
        console.log('stomservice off', event);
        if (typeof event === 'string') {
            this._off(event, listener);
        }
        else {
            event.then(function (str) {
                _this._off(str, listener);
            });
        }
        return this;
    };
    StompService.prototype._off = function (event, listener) {
        _super.prototype.off.call(this, event, listener);
        var old = this.stompSubscribers[event] || [];
        var index = old.findIndex(function (_) { return _.id === listener.id; });
        console.log('stomservice off__', event, listener.id, index > -1);
        if (index > -1) {
            var t_1 = old.splice(index, 1)[0];
            t_1.unsubscribe();
        }
        return this;
    };
    StompService.prototype.send = function (event, body, head) {
        if (body === void 0) { body = {}; }
        if (head === void 0) { head = {}; }
        this.stompClient.send(event, JSON.stringify(body), head);
        return true;
    };
    ;
    StompService.prototype.removeAllListeners = function (event) {
        var old = this.stompSubscribers[event] || [];
        old.forEach(function (_) { return _.unsubscribe; });
        this.stompSubscribers[event] = [];
        return this;
    };
    ;
    return StompService;
}(Event_1.EventEmitter));
exports.StompService = StompService;
//# sourceMappingURL=StompService.js.map