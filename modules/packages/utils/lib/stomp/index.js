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
exports.makeStompService = (function () {
    var stompClient = null;
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
    var sendActivity = function () {
        connection.then(function () {
            stompClient.send('/topic/activity', JSON.stringify({ page: window.location.hash }), {});
        });
    };
    var subscribe = function () {
        connection.then(function () {
            stompSubscriber = stompClient.subscribe('/topic/tracker', function (data) {
                rxSubscriber.next(JSON.parse(data.body));
            });
        });
    };
    var connect = function () {
        if (connectedPromise !== null || stompService) {
            return;
        }
        connection = createConnection();
        rxObservable = createListener();
        var headers = {};
        var url = "http://transfer.lian-med.com:9987/ws/stomp?access_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNTg2MTYyNTM0fQ.QasLwM0f0rJvHuSZrNVuVIFK4NRNC8eHTDDy8ZcIdHRxAKtS_qoOOrezV8d0lvevOYtZLct9oZ485OkIE-q1vg";
        var authToken = store_1.default.get('jhi-authenticationToken');
        if (authToken) {
            url += '?access_token=' + authToken;
        }
        var socket = new sockjs_client_1.default(url);
        stompClient = webstomp_client_1.default.over(socket);
        stompClient.connect(headers, function () {
            connectedPromise('success');
            connectedPromise = null;
            subscribe();
            sendActivity();
            if (!stompService) {
                window.onhashchange = function () {
                    sendActivity();
                };
                stompService = new StompService_1.StompService(stompClient, connection, rxSubscriber);
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
    var receive = function () { return rxObservable; };
    var unsubscribe = function () {
        if (stompSubscriber !== null) {
            stompSubscriber.unsubscribe();
        }
        rxObservable = createListener();
    };
    return function () {
        if (true) {
            connect();
            if (!stompService) {
                receive().subscribe(function (activity) {
                    console.log('stomp receive', activity);
                });
            }
        }
        else {
            unsubscribe();
            disconnect();
        }
        return {
            subscribe: function (path) {
                connection.then(function () {
                    console.log('sssssssssss');
                    stompSubscriber = stompClient.subscribe("" + path, function (data) {
                        rxSubscriber.next(JSON.parse(data.body));
                    });
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
            }
        };
    };
})();
//# sourceMappingURL=index.js.map