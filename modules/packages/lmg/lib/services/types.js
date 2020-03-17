"use strict";
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
})(BedStatus = exports.BedStatus || (exports.BedStatus = {}));
var EWsEvents;
(function (EWsEvents) {
    EWsEvents["pong"] = "pong";
    EWsEvents["explode"] = "explode";
    EWsEvents["updateSubscriptionIfNecessary"] = "updateSubscriptionIfNecessary";
})(EWsEvents = exports.EWsEvents || (exports.EWsEvents = {}));
//# sourceMappingURL=types.js.map