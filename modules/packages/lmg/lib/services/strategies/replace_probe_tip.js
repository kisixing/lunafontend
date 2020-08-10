"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@lianmed/utils");
function replace_probe_tip(received_msg) {
    var device_no = received_msg.device_no, bed_no = received_msg.bed_no, data = received_msg.data;
    var item = this.getCacheItem({ device_no: device_no, bed_no: bed_no });
    item.replaceProbeTipData = data;
    utils_1.event.emit("item_probetip", item.id, item && item.docid, data);
}
exports.replace_probe_tip = replace_probe_tip;
//# sourceMappingURL=replace_probe_tip.js.map