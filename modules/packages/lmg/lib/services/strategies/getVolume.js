"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getVolume(received_msg) {
    var device_no = received_msg.device_no, bed_no = received_msg.bed_no;
    var unitId = this.getUnitId(device_no, bed_no);
    var target = this.datacache.get(unitId);
    if (!target)
        return;
    target.volumeData = received_msg.data;
    this.refresh('getVolume');
}
exports.getVolume = getVolume;
