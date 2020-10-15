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
exports._ICacheItem = _ICacheItem;
var ICacheItem = (function (_super) {
    __extends(ICacheItem, _super);
    function ICacheItem(args) {
        var _this = _super.call(this) || this;
        _this.ecgdata = {};
        Object.assign(_this, args);
        return _this;
    }
    Object.defineProperty(ICacheItem.prototype, "pregnancy", {
        get: function () {
            return this._pregnancy;
        },
        set: function (value) {
            if (typeof value !== 'string')
                return;
            this._pregnancy = value ? JSON.parse(value) : null;
            ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "fetalposition", {
        get: function () {
            return this._fetalposition;
        },
        set: function (value) {
            if (typeof value !== 'string')
                return;
            this._fetalposition = value ? JSON.parse(value) : null;
            ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "isF0Pro", {
        get: function () {
            return this.deviceType === 'LM_F0_PRO';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "isV3", {
        get: function () {
            return this.deviceType === 'V3';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "batterylowArr", {
        get: function () {
            return [this.is_fhr_1_batterylow, this.is_fhr_2_batterylow, this.is_fhr_3_batterylow];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "MuteArr", {
        get: function () {
            return [this.isMute1, this.isMute2, this.isMute3].map(function (_) { return Boolean(_); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "isWorking", {
        get: function () {
            return this.status === BedStatus.Working;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "isStopped", {
        get: function () {
            return this.status === BedStatus.Stopped;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "isOffline", {
        get: function () {
            return this.status === BedStatus.Offline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "isOfflineStopped", {
        get: function () {
            return this.status === BedStatus.OfflineStopped;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "isUncreated", {
        get: function () {
            return this.status === BedStatus.Uncreated;
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
    Object.defineProperty(ICacheItem.prototype, "status", {
        get: function () {
            return this._status + 1;
        },
        set: function (remoteStatus) {
            this._status = remoteStatus;
            if (!this.isWorking) {
                this.timeEndworkTipData = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "ismulti", {
        get: function () {
            return this.is_include_mother;
        },
        set: function (value) {
            this.is_include_mother = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "deviceType", {
        get: function () {
            return this.device_type;
        },
        set: function (type) {
            this.device_type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "fetal_num", {
        get: function () {
            return this._fetal_num;
        },
        set: function (value) {
            var _this = this;
            setTimeout(function () {
                if (_this.isF0Pro ? _this.isUncreated : _this.isStopped)
                    return;
                _this._fetal_num = value;
                _this.fhr = Array(value || 1).fill(0).map(function (_, i) {
                    return (_this.fhr && _this.fhr[i]) || [];
                });
            }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ICacheItem.prototype, "docid", {
        get: function () {
            return this.doc_id;
        },
        set: function (value) {
            this.doc_id = value;
        },
        enumerable: true,
        configurable: true
    });
    return ICacheItem;
}(_ICacheItem));
exports.ICacheItem = ICacheItem;
//# sourceMappingURL=types.js.map