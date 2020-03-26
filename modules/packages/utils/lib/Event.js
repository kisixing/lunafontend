"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.addListener = function (event, listener) {
        var existing = this.events[event];
        if (!existing) {
            this.events[event] = existing = [];
        }
        existing.includes(listener) || existing.push(listener);
        return this;
    };
    EventEmitter.prototype.on = function (event, listener) {
        return this.addListener(event, listener);
    };
    EventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var existing = this.events[event];
        if (!existing) {
            return false;
        }
        existing.forEach(function (fn) {
            fn.apply(void 0, args);
        });
        return true;
    };
    EventEmitter.prototype.removeAllListeners = function (event) {
        this.events[event] = [];
        return this;
    };
    EventEmitter.prototype.off = function (event, listener) {
        var existing = this.events[event];
        if (!existing) {
            return this;
        }
        var index = existing.findIndex(function (_) { return _ === listener; });
        if (index < 0) {
            return this;
        }
        existing.splice(index, 1);
        return this;
    };
    EventEmitter.prototype.once = function (event, listener) {
        var _this = this;
        var fn = function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            listener.apply(void 0, a);
            _this.off(event, fn);
        };
        this.on(event, fn);
        return this;
    };
    EventEmitter.prototype.prependListener = function (event, listener) {
        return this;
    };
    EventEmitter.prototype.prependOnceListener = function (event, listener) {
        return this;
    };
    EventEmitter.prototype.removeListener = function (event, listener) {
        return this;
    };
    EventEmitter.prototype.setMaxListeners = function (n) {
        return this;
    };
    EventEmitter.prototype.getMaxListeners = function () {
        return 0;
    };
    EventEmitter.prototype.listeners = function (event) {
        return [];
    };
    EventEmitter.prototype.rawListeners = function (event) {
        return [];
    };
    EventEmitter.prototype.eventNames = function () {
        return [];
    };
    EventEmitter.prototype.listenerCount = function (type) {
        return 0;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
exports.event = new EventEmitter();
//# sourceMappingURL=Event.js.map