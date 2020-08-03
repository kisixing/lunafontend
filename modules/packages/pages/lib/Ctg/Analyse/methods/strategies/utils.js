"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function inRange(value, min, max) {
    var v = typeof value === 'string' ? Number(value) : value;
    var result = false;
    if (v >= min && v <= max)
        result = true;
    return result;
}
exports.inRange = inRange;
function getValue(v) {
    var a = String(v);
    var modified = a.startsWith('00');
    return modified ? Number.parseInt(a) : false;
}
exports.getValue = getValue;
function isModified(v) {
    return typeof v === 'number';
}
exports.isModified = isModified;
//# sourceMappingURL=utils.js.map