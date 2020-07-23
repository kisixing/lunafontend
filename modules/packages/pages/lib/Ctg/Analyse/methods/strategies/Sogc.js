"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function Sogc(_data, analysis) {
    var sogcdata = JSON.parse(JSON.stringify(_data));
    var bhrvalue = sogcdata.bhrvalue, accvalue = sogcdata.accvalue, decvalue = sogcdata.decvalue, ltvvalue = sogcdata.ltvvalue;
    var bhr = Number(bhrvalue) || 0;
    var acc = Number(accvalue) || 0;
    var dec = Number(decvalue) || 0;
    var ltv = Number(ltvvalue) || 0;
    var length = analysis.fhrbaselineMinute.length;
    if (utils_1.inRange(bhr, 110, 160))
        sogcdata.bhrscore = 0;
    else if (utils_1.inRange(bhr, 100, 109) || bhr > 160)
        sogcdata.bhrscore = 1;
    else if (bhr < 100) {
        sogcdata.bhrscore = 2;
    }
    if (ltv <= 5) {
        if (length < 40) {
            sogcdata.ltvscore = 0;
        }
        else if (utils_1.inRange(length, 40, 80)) {
            sogcdata.ltvscore = 1;
        }
        else {
            sogcdata.ltvscore = 2;
        }
    }
    else if (ltv >= 26 || analysis.isSinusoid) {
        sogcdata.ltvscore = 1;
    }
    else {
        sogcdata.ltvscore = 0;
    }
    if (analysis.isSinusoid) {
        sogcdata.ltvscore = 0;
    }
    if (acc >= 2) {
        sogcdata.accscore = 0;
    }
    else {
        if (length > 80) {
            sogcdata.accscore = 2;
        }
        else {
            sogcdata.accscore = 1;
        }
    }
    sogcdata.decscore = dec;
    sogcdata.total = 1;
    var bhrscore = sogcdata.bhrscore, accscore = sogcdata.accscore, decscore = sogcdata.decscore, ltvscore = sogcdata.ltvscore;
    var all = [bhrscore, accscore, decscore, ltvscore];
    sogcdata.result = '异常';
    if (all.every(function (_) { return _ === 2; })) {
        sogcdata.result = '异常';
    }
    else if (all.every(function (_) { return _ === 1; })) {
        sogcdata.result = '正常';
    }
    return sogcdata;
}
exports.Sogc = Sogc;
//# sourceMappingURL=Sogc.js.map