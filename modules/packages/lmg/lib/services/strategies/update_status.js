"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function update_status(received_msg) {
    var datacache = this.datacache;
    var _a = received_msg.data, pregnancy = _a.pregnancy, fetalposition = _a.fetalposition, device_no = _a.device_no, bed_no = _a.bed_no, others = __rest(_a, ["pregnancy", "fetalposition", "device_no", "bed_no"]);
    var unitId = this.getUnitId(device_no, bed_no);
    if (!datacache.has(unitId)) {
        datacache.set(unitId, utils_1.getEmptyCacheItem({ id: unitId }));
    }
    var target = datacache.get(unitId);
    var extendObj = others;
    Object.assign(target, extendObj);
    target.pregnancy = pregnancy ? JSON.parse(pregnancy) : null;
    target.fetalposition = fetalposition ? JSON.parse(fetalposition) : null;
    this.refresh('update_status');
}
exports.update_status = update_status;
//# sourceMappingURL=update_status.js.map