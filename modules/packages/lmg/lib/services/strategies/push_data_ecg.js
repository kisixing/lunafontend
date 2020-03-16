"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function push_data_ecg(received_msg) {
    var datacache = this.datacache;
    var ecgdata = received_msg.data;
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;
    if (datacache.has(cachbi)) {
        for (var eindex = 0; eindex < ecgdata.length; eindex++) {
            for (var elop = 0; elop < ecgdata[eindex].ecg_arr.length; elop++) {
                datacache.get(cachbi).ecg.EnQueue(ecgdata[eindex].ecg_arr[elop] & 0xff);
            }
            var pulse_rate = ecgdata[eindex].pulse_rate;
            if (pulse_rate == 0) {
                pulse_rate = '--';
            }
            var sys_bp = ecgdata[eindex].sys_bp;
            if (sys_bp == 1) {
                sys_bp = '--';
            }
            var dia_bp = ecgdata[eindex].dia_bp;
            if (dia_bp == 1) {
                dia_bp = '--';
            }
            var mean_bp = ecgdata[eindex].mean_bp;
            if (mean_bp == 1) {
                mean_bp = '--';
            }
            datacache.get(cachbi).ecgdata = [pulse_rate, ecgdata[eindex].blood_oxygen, ecgdata[eindex].temperature, ecgdata[eindex].temperature1, pulse_rate, ecgdata[eindex].resp_rate, sys_bp + '/' + dia_bp + '/' + mean_bp];
        }
    }
    else {
        console.log('cache error', datacache);
    }
}
exports.push_data_ecg = push_data_ecg;
//# sourceMappingURL=push_data_ecg.js.map