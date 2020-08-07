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
var EWsStatus;
(function (EWsStatus) {
    EWsStatus[EWsStatus["Pendding"] = 0] = "Pendding";
    EWsStatus[EWsStatus["Success"] = 1] = "Success";
    EWsStatus[EWsStatus["Error"] = 2] = "Error";
})(EWsStatus = exports.EWsStatus || (exports.EWsStatus = {}));
var BedStatus;
(function (BedStatus) {
    BedStatus[BedStatus["Working"] = 1] = "Working";
    BedStatus[BedStatus["Stopped"] = 2] = "Stopped";
    BedStatus[BedStatus["Offline"] = 3] = "Offline";
    BedStatus[BedStatus["OfflineStopped"] = 4] = "OfflineStopped";
    BedStatus[BedStatus["Uncreated"] = 5] = "Uncreated";
})(BedStatus = exports.BedStatus || (exports.BedStatus = {}));
var EWsEvents;
(function (EWsEvents) {
    EWsEvents["pong"] = "pong";
    EWsEvents["explode"] = "explode";
    EWsEvents["updateSubscriptionIfNecessary"] = "updateSubscriptionIfNecessary";
})(EWsEvents = exports.EWsEvents || (exports.EWsEvents = {}));
var _ICacheItem = (function () {
    function _ICacheItem() {
    }
    return _ICacheItem;
}());
var ICacheItem = (function (_super) {
    __extends(ICacheItem, _super);
    function ICacheItem(args) {
        var _this = _super.call(this) || this;
        Object.assign(_this, args);
        return _this;
    }
    Object.defineProperty(ICacheItem.prototype, "isF0Pro", {
        get: function () {
            return this.deviceType === 'LM_F0_PRO';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "hasToco", {
        get: function () {
            return this.toco && this.toco.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "hasPregnancy", {
        get: function () {
            return this.pregnancy && typeof this.pregnancy.id === 'number';
        },
        enumerable: true,
        configurable: true
    });
    return ICacheItem;
}(_ICacheItem));
exports.ICacheItem = ICacheItem;
//# sourceMappingURL=types.js.map