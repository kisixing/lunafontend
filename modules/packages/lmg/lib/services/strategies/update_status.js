"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function update_status(received_msg) {
    var datacache = this.datacache;
    var _a = received_msg.data, pregnancy = _a.pregnancy, fetalposition = _a.fetalposition, status = _a.status, device_no = _a.device_no, bed_no = _a.bed_no, is_include_mother = _a.is_include_mother, is_include_tocozero = _a.is_include_tocozero, is_include_toco = _a.is_include_toco, is_include_volume = _a.is_include_volume, fetal_num = _a.fetal_num, disableStartWork = _a.disableStartWork;
    var unitId = this.getUnitId(device_no, bed_no);
    if (!datacache.has(unitId)) {
        datacache.set(unitId, utils_1.getEmptyCacheItem({ id: unitId }));
    }
    var target = datacache.get(unitId);
    target.fetal_num = fetal_num;
    target.is_include_tocozero = is_include_tocozero;
    target.is_include_toco = is_include_toco;
    target.ismulti = is_include_mother;
    target.is_include_volume = is_include_volume;
    target.disableStartWork = disableStartWork;
    target.fhr = Array(fetal_num || 1).fill(0).map(function (_, i) {
        return target.fhr[i] || utils_1.getMaxArray();
    });
    target.status = status + 1;
    console.log('update_status', target);
    target.pregnancy = pregnancy ? JSON.parse(pregnancy) : null;
    target.fetalposition = fetalposition ? JSON.parse(fetalposition) : null;
    this.refresh('update_status');
}
exports.update_status = update_status;
//# sourceMappingURL=update_status.js.map