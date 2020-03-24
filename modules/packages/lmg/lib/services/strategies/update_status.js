"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function update_status(received_msg) {
    console.log('----update_status---- \n', received_msg);
    var _a = this, datacache = _a.datacache, BedStatus = _a.BedStatus;
    var Working = BedStatus.Working, Stopped = BedStatus.Stopped, Offline = BedStatus.Offline, OfflineStopped = BedStatus.OfflineStopped;
    var _b = received_msg.data, pregnancy = _b.pregnancy, fetalposition = _b.fetalposition, status = _b.status, device_no = _b.device_no, bed_no = _b.bed_no;
    var unitId = this.getUnitId(device_no, bed_no);
    if (!datacache.has(unitId)) {
        datacache.set(unitId, utils_1.getEmptyCacheItem());
    }
    var target = datacache.get(unitId);
    if (status == 0) {
        target.status = Working;
    }
    else if (status == 1) {
        target.status = Stopped;
    }
    else if (status == 2) {
        target.status = Offline;
    }
    else {
        target.status = OfflineStopped;
    }
    console.log('update_status', target);
    target.pregnancy = pregnancy ? JSON.parse(pregnancy) : null;
    target.fetalposition = fetalposition ? JSON.parse(fetalposition) : null;
    this.refresh('update_status');
}
exports.update_status = update_status;
//# sourceMappingURL=update_status.js.map