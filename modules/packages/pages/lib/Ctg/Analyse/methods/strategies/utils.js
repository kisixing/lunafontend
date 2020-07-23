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
//# sourceMappingURL=utils.js.map