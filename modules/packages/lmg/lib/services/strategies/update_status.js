"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function update_status(received_msg) {
    var _a = this, datacache = _a.datacache, BedStatus = _a.BedStatus;
    var Working = BedStatus.Working, Stopped = BedStatus.Stopped, Offline = BedStatus.Offline, OfflineStopped = BedStatus.OfflineStopped;
    var statusdata = received_msg.data;
    var device_no = statusdata.device_no, bed_no = statusdata.bed_no, doc_id = statusdata.doc_id;
    var unitId = this.getUnitId(device_no, bed_no);
    if (!datacache.has(unitId)) {
        datacache.set(unitId, utils_1.getEmptyCacheItem());
    }
    if (statusdata.status == 0) {
        datacache.get(unitId).status = Working;
    }
    else if (statusdata.status == 1) {
        datacache.get(unitId).status = Stopped;
    }
    else if (statusdata.status == 2) {
        datacache.get(unitId).status = Offline;
    }
    else {
        datacache.get(unitId).status = OfflineStopped;
    }
    console.log('update_status', datacache.get(unitId));
    datacache.get(unitId).pregnancy = statusdata.pregnancy ? JSON.parse(statusdata.pregnancy) : null;
    datacache.get(unitId).fetalposition = statusdata.fetalposition ? JSON.parse(statusdata.fetalposition) : null;
    this.refresh('update_status');
}
exports.update_status = update_status;
