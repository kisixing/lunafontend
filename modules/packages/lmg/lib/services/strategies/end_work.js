"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("@lianmed/request"));
var utils_1 = require("../utils");
function end_work(received_msg) {
    var datacache = this.datacache;
    var _a = received_msg.data, is_working = _a.is_working, device_no = _a.device_no, bed_no = _a.bed_no;
    var curid = this.getUnitId(device_no, bed_no);
    var target = datacache.get(curid);
    var docid = target.docid, pregnancy = target.pregnancy;
    if (pregnancy)
        return;
    request_1.default.get("/bedinfos?documentno.equals=" + docid).then(function (responseData) {
        if (responseData && target) {
            if (responseData['pregnancy'] == null) {
                utils_1.cleardata(datacache, curid, target.fetal_num);
            }
            target.status = is_working;
        }
    });
}
exports.end_work = end_work;
//# sourceMappingURL=end_work.js.map