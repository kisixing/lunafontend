"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WsService_1 = require("../WsService");
function push_notification(received_msg) {
    var _a = received_msg.data, content = _a.content, type = _a.type;
    if (type === 'update_subscribe_device') {
        this.emit(WsService_1.WsService.EWsEvents.updateSubscriptionIfNecessary, content.map(function (_) { return _.wardId; }));
    }
}
exports.push_notification = push_notification;
