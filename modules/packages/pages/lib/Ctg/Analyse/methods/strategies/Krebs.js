"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function Krebs(_data) {
    var krebsdata = JSON.parse(JSON.stringify(_data));
    var bhrvalue = krebsdata.bhrvalue, ltvvalue = krebsdata.ltvvalue, stvvalue = krebsdata.stvvalue, accvalue = krebsdata.accvalue, decvalue = krebsdata.decvalue, fmvalue = krebsdata.fmvalue;
    var bhr = Number(bhrvalue) || 0;
    var zhenfu_tv = Number(ltvvalue) || 0;
    var zhouqi_tv = Number(stvvalue) || 0;
    var accnum = Number(accvalue) || 0;
    var decnum = Number(decvalue) || 0;
    var fmnum = Number(fmvalue) || 0;
    krebsdata.bhrvalue = bhr;
    if (bhr < 100 || bhr > 180) {
        krebsdata.bhrscore = 0;
    }
    else if (utils_1.inRange(bhr, 100, 109) || utils_1.inRange(bhr, 161, 180)) {
        krebsdata.bhrscore = 1;
    }
    else if (utils_1.inRange(bhr, 110, 160)) {
        krebsdata.bhrscore = 2;
    }
    krebsdata.ltvvalue = zhenfu_tv;
    if (zhenfu_tv < 5) {
        krebsdata.ltvscore = 0;
    }
    else if (utils_1.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 25) {
        krebsdata.ltvscore = 1;
    }
    else if (utils_1.inRange(zhenfu_tv, 10, 25)) {
        krebsdata.ltvscore = 2;
    }
    krebsdata.stvvalue = zhouqi_tv;
    if (zhouqi_tv < 3) {
        krebsdata.stvscore = 0;
    }
    else if (utils_1.inRange(zhouqi_tv, 3, 6)) {
        krebsdata.stvscore = 1;
    }
    else if (zhouqi_tv > 6) {
        krebsdata.stvscore = 2;
    }
    krebsdata.accvalue = accnum;
    if (accnum == 0) {
        krebsdata.accscore = 0;
    }
    else if (utils_1.inRange(accnum, 1, 4)) {
        krebsdata.accscore = 1;
    }
    else if (accnum > 4) {
        krebsdata.accscore = 2;
    }
    if (decnum >= 2) {
        krebsdata.decscore = 0;
    }
    else if (decnum == 1) {
        krebsdata.decscore = 1;
    }
    else {
        krebsdata.decscore = 2;
    }
    if (fmnum == 0) {
        krebsdata.fmscore = 0;
    }
    else if (utils_1.inRange(fmnum, 1, 4)) {
        krebsdata.fmscore = 1;
    }
    else if (fmnum > 4) {
        krebsdata.fmscore = 2;
    }
    krebsdata.total = krebsdata.bhrscore + krebsdata.accscore + krebsdata.decscore + krebsdata.ltvscore + krebsdata.stvscore + krebsdata.fmscore;
    return krebsdata;
}
exports.Krebs = Krebs;
//# sourceMappingURL=Krebs.js.map