"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start_work_1 = require("./start_work");
var end_work_1 = require("./end_work");
var update_status_1 = require("./update_status");
var push_notification_1 = require("./push_notification");
var heard_1 = require("./heard");
var getVolume_1 = require("./getVolume");
var get_data_ctg_1 = require("./get_data_ctg");
var get_devices_1 = require("./get_devices");
var push_devices_1 = require("./push_devices");
var push_event_alarm_1 = require("./push_event_alarm");
var push_data_ctg_1 = require("./push_data_ctg");
var push_data_ecg_1 = require("./push_data_ecg");
var push_offline_data_ctg_1 = require("./push_offline_data_ctg");
var endpoint_user_confirm_msg_1 = require("./endpoint_user_confirm_msg");
var toast_1 = require("./toast");
var replace_probe_tip_1 = require("./replace_probe_tip");
var add_probe_tip_1 = require("./add_probe_tip");
var time_endwork_tip_1 = require("./time_endwork_tip");
var list_blood_pressure_1 = require("./list_blood_pressure");
var utils_1 = require("../utils");
exports.strategies = {
    start_work: start_work_1.start_work,
    end_work: end_work_1.end_work,
    heard: heard_1.heard,
    update_status: update_status_1.update_status,
    push_notification: push_notification_1.push_notification,
    getVolume: getVolume_1.getVolume,
    get_data_ctg: get_data_ctg_1.get_data_ctg,
    get_devices: get_devices_1.get_devices,
    push_devices: push_devices_1.push_devices,
    push_event_alarm: push_event_alarm_1.push_event_alarm,
    push_data_ctg: push_data_ctg_1.push_data_ctg,
    push_data_ecg: push_data_ecg_1.push_data_ecg,
    push_offline_data_ctg: push_offline_data_ctg_1.push_offline_data_ctg,
    endpoint_user_confirm_msg: endpoint_user_confirm_msg_1.endpoint_user_confirm_msg,
    toast: toast_1.toast,
    list_blood_pressure: list_blood_pressure_1.list_blood_pressure,
    replace_probe_tip: replace_probe_tip_1.replace_probe_tip,
    add_probe_tip: add_probe_tip_1.add_probe_tip,
    time_endwork_tip: time_endwork_tip_1.time_endwork_tip,
};
var exp = /(.*)_res$/;
function getStrategies(context) {
    var entries = Object.entries(exports.strategies);
    return entries.reduce(function (r, _a) {
        var k = _a[0], v = _a[1];
        r[k] = v.bind(context);
        return r;
    }, {});
}
exports.getStrategies = getStrategies;
function requestInterceptror(mesName, mes) {
    var obj = mesName.match(exp);
    if (obj) {
        var k = obj[1];
        var res = this.requests[k];
        if (res) {
            (mes.data && mes.data.res === 0) ? res(mes.data) : utils_1.handleF0ProErr(k, mes.data.res);
            this.requests[k] = null;
        }
        return true;
    }
}
function handleMessage(mesName, mes) {
    this.strategies = this.strategies || getStrategies(this);
    if (!requestInterceptror.call(this, mesName, mes)) {
        var strategy = this.strategies[mesName];
        strategy && strategy(mes);
    }
}
exports.handleMessage = handleMessage;
//# sourceMappingURL=index.js.map