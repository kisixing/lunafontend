"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sockjs_client_1 = __importDefault(require("sockjs-client"));
var webstomp_client_1 = __importDefault(require("webstomp-client"));
var rxjs_1 = require("rxjs");
var store_1 = __importDefault(require("store"));
var StompService_1 = require("./StompService");
exports.StompService = StompService_1.StompService;
var constant_1 = require("../constant");
exports.makeStompService = (function () {
    var stompClient = null;
    var s = [];
    var stompSubscriber = null;
    var connection;
    var connectedPromise = null;
    var rxObservable;
    var rxSubscriber;
    var stompService = null;
    var createConnection = function () { return new Promise(function (resolve, reject) { return (connectedPromise = resolve); }); };
    var createListener = function () {
        return new rxjs_1.Observable(function (_subscriber) {
            rxSubscriber = _subscriber;
        });
    };
    var t = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTg2MTYyNTM0fQ.QasLwM0f0rJvHuSZrNVuVIFK4NRNC8eHTDDy8ZcIdHRxAKtS_qoOOrezV8d0lvevOYtZLct9oZ485OkIE-q1vg';
    var connect = function (url) {
        if (url === void 0) { url = "http://transfer.lian-med.com:9987/ws/stomp"; }
        if (connectedPromise !== null || stompService) {
            return;
        }
        connection = createConnection();
        rxObservable = createListener();
        var headers = {};
        var authToken = t || store_1.default.get(constant_1.TOKEN_KEY);
        if (authToken) {
            url += '?access_token=' + authToken;
        }
        var socket = new sockjs_client_1.default(url);
        stompClient = webstomp_client_1.default.over(socket);
        stompClient.connect(headers, function () {
            connectedPromise('success');
            connectedPromise = null;
            if (!stompService) {
                stompService = new StompService_1.StompService();
            }
        });
    };
    var disconnect = function () {
        if (stompClient !== null) {
            stompClient.disconnect();
            stompClient = null;
        }
        window.onhashchange = function () { };
        stompService = null;
    };
    var unsubscribe = function () {
        s.forEach(function (_) { return _.unsubscribe(); });
        s = [];
        rxObservable = createListener();
    };
    return function (url) {
        if (!stompService) {
            connect();
        }
        return {
            subscribe: function (type) {
                return connection.then(function () {
                    stompSubscriber = stompClient.subscribe("" + type, function (res) {
                        var data;
                        try {
                            data = JSON.parse(res.body);
                        }
                        catch (error) {
                            data = {};
                        }
                        rxSubscriber.next({ data: data, type: type });
                    });
                    s.push(stompSubscriber);
                });
            },
            send: function (path, body, head) {
                if (body === void 0) { body = {}; }
                if (head === void 0) { head = {}; }
                connection.then(function () {
                    stompClient.send("" + path, JSON.stringify(body), head);
                });
            },
            receive: function (fn) {
                connection.then(function () {
                    rxObservable.subscribe(fn);
                });
            },
            unsubscribe: unsubscribe,
            disconnect: disconnect
        };
    };
})();
//# sourceMappingURL=index.js.map