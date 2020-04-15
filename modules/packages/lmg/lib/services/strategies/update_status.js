"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function update_status(received_msg) {
    var _a = this, datacache = _a.datacache, BedStatus = _a.BedStatus;
    var Working = BedStatus.Working, Stopped = BedStatus.Stopped, Offline = BedStatus.Offline, OfflineStopped = BedStatus.OfflineStopped;
    var _b = received_msg.data, pregnancy = _b.pregnancy, fetalposition = _b.fetalposition, status = _b.status, device_no = _b.device_no, bed_no = _b.bed_no, is_include_mother = _b.is_include_mother, is_include_tocozero = _b.is_include_tocozero, is_include_volume = _b.is_include_volume, fetal_num = _b.fetal_num, disableStartWork = _b.disableStartWork;
    var unitId = this.getUnitId(device_no, bed_no);
    if (!datacache.has(unitId)) {
        datacache.set(unitId, utils_1.getEmptyCacheItem());
    }
    var target = datacache.get(unitId);
    target.fetal_num = fetal_num;
    target.is_include_tocozero = is_include_tocozero;
    target.ismulti = is_include_mother;
    target.is_include_volume = is_include_volume;
    target.disableStartWork = disableStartWork;
    target.fhr = Array(fetal_num || 1).fill(0).map(function (_, i) {
        return target.fhr[i] || utils_1.getMaxArray();
    });
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