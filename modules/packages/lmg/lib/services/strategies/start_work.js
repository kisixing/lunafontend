"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function start_work(received_msg) {
    var datacache = this.datacache;
    var devdata = received_msg.data;
    var bed_no = devdata.bed_no, device_no = devdata.device_no;
    var unitId = this.getUnitId(device_no, bed_no);
    utils_1.cleardata(datacache, unitId, devdata.fetal_num);
    console.log('cleardata startwork', unitId);
    this.convertdocid(unitId, devdata.doc_id);
    var target = datacache.get(unitId);
    if (typeof (devdata.ismulti) != 'undefined') {
        target.ismulti = devdata.ismulti;
    }
    target.status = devdata.is_working;
    this.refresh('start_work');
}
exports.start_work = start_work;
//# sourceMappingURL=start_work.js.map