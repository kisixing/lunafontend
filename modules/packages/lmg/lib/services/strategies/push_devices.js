"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function push_devices(received_msg) {
    var _a = this.BedStatus, Working = _a.Working, Stopped = _a.Stopped, Offline = _a.Offline, OfflineStopped = _a.OfflineStopped, Uncreated = _a.Uncreated;
    var datacache = this.datacache;
    var devlist = received_msg.data;
    for (var i in devlist) {
        var devdata = devlist[i];
        if (!devdata)
            continue;
        for (var bi in devdata.beds) {
            var bedData = devdata.beds[bi];
            var is_include_tocozero = bedData.is_include_tocozero, is_include_volume = bedData.is_include_volume, doc_id = bedData.doc_id, fetal_num = bedData.fetal_num;
            var unitId = this.getUnitId(devdata.device_no, bedData.bed_no);
            var old = datacache.get(unitId);
            if (!old || (old.docid !== doc_id)) {
                var item = utils_1.getEmptyCacheItem({ is_include_tocozero: is_include_tocozero, is_include_volume: is_include_volume, fetal_num: fetal_num, id: unitId, docid: doc_id });
                item.deviceType = devdata.device_type;
                datacache.set(unitId, item);
                this.convertdocid(unitId, doc_id);
                if (bedData.is_working == 0) {
                    item.status = Working;
                }
                else if (bedData.is_working == 1) {
                    item.status = Stopped;
                }
                else if (bedData.is_working == 2) {
                    item.status = Offline;
                }
                else if (bedData.is_working == 3) {
                    item.status = OfflineStopped;
                }
                else {
                    item.status = Uncreated;
                }
                if (bedData.pregnancy) {
                    item.pregnancy = JSON.parse(bedData.pregnancy);
                }
                if (bedData.fetalposition) {
                    item.fetalposition = JSON.parse(bedData.fetalposition);
                }
                item.fetal_num = bedData.fetal_num;
                if (bedData.is_include_mother)
                    item.ismulti = true;
            }
        }
    }
    this.isReady && this.refresh();
    this.connectResolve(datacache);
    this.emit('read', datacache);
    this.isReady = true;
}
exports.push_devices = push_devices;
//# sourceMappingURL=push_devices.js.map