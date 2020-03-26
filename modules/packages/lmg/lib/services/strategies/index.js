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
};
function getStrategies(context) {
    var entries = Object.entries(exports.strategies);
    return entries.reduce(function (r, _a) {
        var k = _a[0], v = _a[1];
        r[k] = v.bind(context);
        return r;
    }, {});
}
exports.getStrategies = getStrategies;
//# sourceMappingURL=index.js.map