"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function end_work(received_msg) {
    var _a = received_msg.data, is_working = _a.is_working, device_no = _a.device_no, bed_no = _a.bed_no;
    var curid = this.getUnitId(device_no, bed_no);
    this.clearbyrest(curid, is_working);
}
exports.end_work = end_work;
//# sourceMappingURL=end_work.js.map