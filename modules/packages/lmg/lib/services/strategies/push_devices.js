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
            var pregnancy = bedData.pregnancy, fetalposition = bedData.fetalposition, bed_no = bedData.bed_no, doc_id = bedData.doc_id, others = __rest(bedData, ["pregnancy", "fetalposition", "bed_no", "doc_id"]);
            var unitId = this.getUnitId(device_no, bed_no);
            var old = datacache.get(unitId);
            if (!old || (old.doc_id !== doc_id)) {
                var target = utils_1.getEmptyCacheItem({ id: unitId, doc_id: doc_id, device_type: device_type });
                datacache.set(unitId, target);
                this.convertdocid(unitId, doc_id);
                var extendObj = others;
                Object.assign(target, extendObj);
                target.pregnancy = pregnancy ? JSON.parse(pregnancy) : null;
                target.fetalposition = fetalposition ? JSON.parse(fetalposition) : null;
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