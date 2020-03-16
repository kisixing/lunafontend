"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter() {
        this.events = {};
        this.caches = {};
    }
    EventEmitter.prototype.addListener = function (event, listener) {
        var existing = this.events[event];
        var caches = this.caches[event];
        if (!existing) {
            this.events[event] = existing = [];
        }
        existing.push(listener);
        if (caches) {
            listener.apply(null, caches);
        }
        return this;
    };
    EventEmitter.prototype.cache = function (event, args) {
        this.caches[event] = args;
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
        if (!existing || existing.length === 0) {
            this.cache(event, args);
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
        var events = this.events[event];
        var index = events.findIndex(function (_) { return _ === listener; });
        events.splice(index, 1);
        return this;
    };
    EventEmitter.prototype.cleanCaches = function (event) {
        this.caches[event] = null;
        return this;
    };
    EventEmitter.prototype.once = function (event, listener) {
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
//# sourceMappingURL=Event copy.js.map