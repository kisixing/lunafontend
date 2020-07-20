"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Sogc(_data) {
    var sogcdata = JSON.parse(JSON.stringify(_data));
    var bhrscore = sogcdata.bhrscore, accscore = sogcdata.accscore, decscore = sogcdata.decscore, ltvscore = sogcdata.ltvscore;
    var all = [bhrscore, accscore, decscore, ltvscore];
    sogcdata.result = '可疑';
    if (all.every(function (_) { return _ === 2; })) {
        sogcdata.result = '异常';
    }
    else if (all.some(function (_) { return _ === 0; })) {
        sogcdata.result = '正常';
    }
    return sogcdata;
}
exports.Sogc = Sogc;
//# sourceMappingURL=Sogc.js.map