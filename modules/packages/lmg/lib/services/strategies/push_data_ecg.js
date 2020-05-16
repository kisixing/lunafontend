"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function push_data_ecg(received_msg) {
    var datacache = this.datacache;
    var ecgdata = received_msg.data;
    var id = received_msg.device_no;
    var bi = received_msg.bed_no;
    var cachbi = id + '-' + bi;
    var target = datacache.get(cachbi);
    if (target) {
        ecgdata.forEach(function (item) {
            item.ecg_arr = Array.isArray(item.ecg_arr) ? item.ecg_arr : [];
            item.ple_arr = Array.isArray(item.ple_arr) ? item.ple_arr : [];
            for (var i = 0; i < item.ecg_arr.length; i++) {
                target.ecg.EnQueue(item.ecg_arr[i] & 0xff);
            }
            for (var i = 0; i < item.ple_arr.length; i++) {
                target.ple.EnQueue(item.ple_arr[i] & 0xff);
                target.ismulti = true;
            }
            var pulse_rate = item.pulse_rate;
            if (pulse_rate == 0) {
                pulse_rate = '--';
            }
            var sys_bp = item.sys_bp;
            if (sys_bp == 1) {
                sys_bp = '--';
            }
            var dia_bp = item.dia_bp;
            if (dia_bp == 1) {
                dia_bp = '--';
            }
            var mean_bp = item.mean_bp;
            if (mean_bp == 1) {
                mean_bp = '--';
            }
            target.ecgdata = [pulse_rate, item.blood_oxygen, item.temperature, item.temperature1, pulse_rate, item.resp_rate, sys_bp + '/' + dia_bp + '/' + mean_bp];
        });
    }
    else {
        console.log('cache error', datacache);
    }
}
exports.push_data_ecg = push_data_ecg;
//# sourceMappingURL=push_data_ecg.js.map