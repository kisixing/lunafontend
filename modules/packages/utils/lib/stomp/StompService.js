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
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../Event");
var StompService = (function (_super) {
    __extends(StompService, _super);
    function StompService(stompClient, connection, rxSubscriber) {
        var _this = _super.call(this) || this;
        _this.stompClient = null;
        _this.stompSubscribers = {};
        _this.stompClient = stompClient;
        _this.connection = connection;
        _this.rxSubscriber = rxSubscriber;
        return _this;
    }
    StompService.prototype.on = function (event, listener) {
        var _this = this;
        this.connection.then(function () {
            var stompSubscriber = _this.stompClient.subscribe('/topic/tracker', function (data) {
                _this.rxSubscriber.next(JSON.parse(data.body));
            });
            var old = _this.stompSubscribers[event] || (_this.stompSubscribers[event] = []);
            old.push(stompSubscriber);
        });
        return this;
    };
    StompService.prototype.emit = function (event, body, head) {
        if (body === void 0) { body = {}; }
        if (head === void 0) { head = {}; }
        this.stompClient.send(event, JSON.stringify(head), {});
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
