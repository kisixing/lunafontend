"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function end_work(received_msg) {
    var datacache = this.datacache;
    var devdata = received_msg.data;
    var curid = Number(devdata['device_no']) + '-' + Number(devdata['bed_no']);
    if (datacache.get(curid).pregnancy == null) {
        console.log('end_work', datacache.get(curid), devdata['doc_id']);
        this.clearbyrest(datacache.get(curid).docid, devdata.is_working);
    }
}
exports.end_work = end_work;
//# sourceMappingURL=allot_probe_res copy 4.js.map