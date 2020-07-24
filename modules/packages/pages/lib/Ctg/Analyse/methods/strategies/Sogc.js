"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function Sogc(_data, analysis) {
    var sogcdata = JSON.parse(JSON.stringify(_data));
    var bhrvalue = sogcdata.bhrvalue, accvalue = sogcdata.accvalue, decvalue = sogcdata.decvalue, ltvvalue = sogcdata.ltvvalue;
    var bhr = utils_1.getValue(bhrvalue);
    var acc = utils_1.getValue(accvalue);
    var dec = utils_1.getValue(decvalue);
    var ltv = utils_1.getValue(ltvvalue);
    var length = analysis.fhrbaselineMinute.length;
    if (utils_1.isModified(bhr)) {
        sogcdata.bhrscore = bhr;
    }
    if (utils_1.isModified(ltv)) {
        sogcdata.ltvscore = ltv;
    }
    if (utils_1.isModified(acc)) {
        sogcdata.accscore = acc;
    }
    if (utils_1.isModified(dec)) {
        sogcdata.decscore = dec;
    }
    var bhrscore = sogcdata.bhrscore, accscore = sogcdata.accscore, decscore = sogcdata.decscore, ltvscore = sogcdata.ltvscore;
    var all = [bhrscore, accscore, decscore, ltvscore];
    sogcdata.result = '正常';
    if (all.some(function (_) { return _ === 2; })) {
        sogcdata.result = '异常';
    }
    else if (all.some(function (_) { return _ === 1; })) {
        sogcdata.result = '可疑';
    }
    else if (all.some(function (_) { return _ === 3; })) {
        sogcdata.result = '时长不足';
    }
    return sogcdata;
}
exports.Sogc = Sogc;
//# sourceMappingURL=Sogc.js.map