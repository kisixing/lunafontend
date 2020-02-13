"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function push_devices(received_msg) {
    var _a = this.BedStatus, Working = _a.Working, Stopped = _a.Stopped, Offline = _a.Offline, OfflineStopped = _a.OfflineStopped;
    var datacache = this.datacache;
    var devlist = received_msg.data;
    for (var i in devlist) {
        var devdata = devlist[i];
        if (!devdata)
            continue;
        for (var bi in devdata.beds) {
            var bedData = devdata.beds[bi];
            var is_include_tocozero = bedData.is_include_tocozero, is_include_volume = bedData.is_include_volume, doc_id = bedData.doc_id;
            var unitId = this.getUnitId(devdata.device_no, bedData.bed_no);
            var old = datacache.get(unitId);
            if (!old || (old.docid !== doc_id)) {
                var item = utils_1.getEmptyCacheItem({ is_include_tocozero: is_include_tocozero, is_include_volume: is_include_volume });
                item.deviceType = devdata.device_type;
                datacache.set(unitId, item);
                item.docid = doc_id;
                this.convertdocid(unitId, doc_id);
                if (devdata.beds[bi].is_working == 0) {
                    datacache.get(unitId).status = Working;
                }
                else if (devdata.beds[bi].is_working == 1) {
                    datacache.get(unitId).status = Stopped;
                }
                else if (devdata.beds[bi].is_working == 2) {
                    datacache.get(unitId).status = Offline;
                }
                else {
                    datacache.get(unitId).status = OfflineStopped;
                }
                if (devdata.beds[bi].pregnancy) {
                    datacache.get(unitId).pregnancy = JSON.parse(devdata.beds[bi].pregnancy);
                }
                if (devdata.beds[bi].fetalposition) {
                    datacache.get(unitId).fetalposition = JSON.parse(devdata.beds[bi].fetalposition);
                }
                datacache.get(unitId).fetal_num = devdata.beds[bi].fetal_num;
                for (var fetal = 0; fetal < devdata.beds[bi].fetal_num; fetal++) {
                    datacache.get(unitId).fhr[fetal] = [];
                }
                if (devdata.beds[bi].is_include_mother)
                    datacache.get(unitId).ismulti = true;
            }
        }
    }
    this.isReady && this.refresh();
    this.connectResolve(datacache);
    this.emit('read', datacache);
    this.isReady = true;
}
exports.push_devices = push_devices;
