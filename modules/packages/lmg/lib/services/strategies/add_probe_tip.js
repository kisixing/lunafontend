"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@lianmed/utils");
function add_probe_tip(received_msg) {
    var device_no = received_msg.device_no, bed_no = received_msg.bed_no, data = received_msg.data;
    var item = this.getCacheItem({ device_no: device_no, bed_no: bed_no });
    if (!item)
        return;
    item.addProbeTipData = data;
    console.log('item_probetip_to_call');
    utils_1.event.once("item_probetip_to_call:" + item.id, function (cb) {
        console.log('item_probetip_to_call');
        cb(data);
    });
    utils_1.event.emit("item_probetip_wait_to_call", item.id);
}
exports.add_probe_tip = add_probe_tip;
//# sourceMappingURL=add_probe_tip.js.map