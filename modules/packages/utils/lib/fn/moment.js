"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
function formatDate(s) {
    if (s === void 0) { s = null; }
    var d;
    if (s && s._isAMomentObject) {
        d = s;
    }
    else {
        d = s ? new Date(s) : new Date();
    }
    return moment_1.default(d).format('YYYY-MM-DD');
}
exports.formatDate = formatDate;
function formatTime(s) {
    if (s === void 0) { s = null; }
    var d;
    if (s && s._isAMomentObject) {
        d = s;
    }
    else {
        d = s ? new Date(s) : new Date();
    }
    return moment_1.default(d).format('YYYY-MM-DD HH:mm:ss');
}
exports.formatTime = formatTime;
//# sourceMappingURL=moment.js.map