"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function push_devices(received_msg) {
    var datacache = this.datacache;
    var devlist = received_msg.data;
    for (var i in devlist) {
        var devdata = devlist[i];
        if (!devdata)
            continue;
        var device_no = devdata.device_no, beds = devdata.beds, device_type = devdata.device_type;
        for (var bi in beds) {
            var bedData = beds[bi];
            var is_include_tocozero = bedData.is_include_tocozero, is_include_volume = bedData.is_include_volume, is_include_toco = bedData.is_include_toco, is_include_mother = bedData.is_include_mother, doc_id = bedData.doc_id, fetal_num = bedData.fetal_num, bed_no = bedData.bed_no;
            var unitId = this.getUnitId(device_no, bed_no);
            var old = datacache.get(unitId);
            if (!old || (old.docid !== doc_id)) {
                var item = utils_1.getEmptyCacheItem({ deviceType: device_type, device_no: device_no, bed_no: bed_no, is_include_tocozero: is_include_tocozero, is_include_toco: is_include_toco, is_include_volume: is_include_volume, fetal_num: fetal_num, id: unitId, docid: doc_id, ismulti: is_include_mother });
                datacache.set(unitId, item);
                this.convertdocid(unitId, doc_id);
                item.status = bedData.is_working + 1;
                if (bedData.pregnancy) {
                    item.pregnancy = JSON.parse(bedData.pregnancy);
                }
                if (bedData.fetalposition) {
                    item.fetalposition = JSON.parse(bedData.fetalposition);
                }
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