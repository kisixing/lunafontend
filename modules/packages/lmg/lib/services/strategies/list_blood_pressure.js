"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function list_blood_pressure(received_msg) {
    var target = this.getCacheItem(received_msg);
    if (target) {
        var list = (received_msg.data || []).map(function (_) { return (__assign(__assign({}, _), { time: utils_1.convertstarttime(_.time) })); });
        target.bloodList = list;
    }
}
exports.list_blood_pressure = list_blood_pressure;
//# sourceMappingURL=list_blood_pressure.js.map