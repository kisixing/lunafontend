"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@lianmed/utils");
function time_endwork_tip(received_msg) {
    var device_no = received_msg.device_no, bed_no = received_msg.bed_no, data = received_msg.data;
    var item = this.getCacheItem({ device_no: device_no, bed_no: bed_no });
    if (!item)
        return;
    item.timeEndworkTipData = data;
    utils_1.event.emit('bed:announcer', "" + item.id);
    utils_1.event.once("item_probetip_to_call:" + item.id, function (cb) {
        cb(data);
    });
    utils_1.event.emit("item_probetip_wait_to_call", item.id);
}
exports.time_endwork_tip = time_endwork_tip;
//# sourceMappingURL=time_endwork_tip.js.map