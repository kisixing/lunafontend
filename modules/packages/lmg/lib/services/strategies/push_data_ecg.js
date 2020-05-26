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
var utils_1 = require("@lianmed/utils");
var mapAlarmToText = {
    alarm_sys_bp: '收缩压',
    alarm_mean_bp: '平均压',
    alarm_dia_bp: '舒张压',
    alarm_pulse_rate: '脉率',
    alarm_blood_oxygen: '血氧',
    alarm_temperature: '体温',
};
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
            var ecg_arr = item.ecg_arr, ple_arr = item.ple_arr, pulse_rate = item.pulse_rate, sys_bp = item.sys_bp, dia_bp = item.dia_bp, mean_bp = item.mean_bp, temperature = item.temperature, temperature1 = item.temperature1, blood_oxygen = item.blood_oxygen, resp_rate = item.resp_rate, index = item.index, ecg = item.ecg, power = item.power, cuff_bp = item.cuff_bp, o = __rest(item, ["ecg_arr", "ple_arr", "pulse_rate", "sys_bp", "dia_bp", "mean_bp", "temperature", "temperature1", "blood_oxygen", "resp_rate", "index", "ecg", "power", "cuff_bp"]);
            o.alarm_blood_oxygen = 2;
            o.alarm_dia_bp = 1;
            target.alarms = Object.assign(Object.create(null), target.alarms, o);
            Object.keys(o).forEach(function (k) {
                var value = o[k];
                if (!value)
                    return;
                var text = mapAlarmToText[k];
                var valueText = value === 1 ? '过低' : '过高';
                if (text) {
                    utils_1.event.emit('item:alarm', cachbi, 2, text + valueText);
                    utils_1.event.emit('audio:alarm', 2);
                }
            });
            for (var i = 0; i < ecg_arr.length; i++) {
                target.ecg.EnQueue(ecg_arr[i] & 0xff);
            }
            for (var i = 0; i < ple_arr.length; i++) {
                target.ple.EnQueue(ple_arr[i]);
                target.ismulti = true;
            }
            target.ecgdata = [
                checkPulseRate(pulse_rate),
                blood_oxygen,
                "" + checkTemperature(temperature) + (temperature1 ? ('~' + checkTemperature(item.temperature1)) : ''),
                checkPulseRate(pulse_rate),
                resp_rate,
                checkBlood(cuff_bp)
            ];
        });
    }
    else {
        console.log('cache error', datacache);
    }
}
exports.push_data_ecg = push_data_ecg;
function checkTemperature(n) {
    var t = Number(n) || 0;
    return t > 50 ? t / 10 : t;
}
function checkBlood(n) {
    return n === 1 ? '--' : n.toString();
}
function checkPulseRate(n) {
    return n === 0 ? '--' : n.toString();
}
//# sourceMappingURL=push_data_ecg.js.map