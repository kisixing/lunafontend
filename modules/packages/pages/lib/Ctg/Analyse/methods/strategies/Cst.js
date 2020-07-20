"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function Cst(_data) {
    var cstdata = JSON.parse(JSON.stringify(_data));
    var bhrvalue = cstdata.bhrvalue, ltvvalue = cstdata.ltvvalue, stvvalue = cstdata.stvvalue, accvalue = cstdata.accvalue, decvalue = cstdata.decvalue;
    var bhr = Number(bhrvalue) || 0;
    var zhenfu_tv = Number(ltvvalue) || 0;
    var zhouqi_tv = Number(stvvalue) || 0;
    var accnum = Number(accvalue) || 0;
    var decnum = Number(decvalue) || 0;
    if (bhr < 100 || bhr > 180) {
        cstdata.bhrscore = 0;
    }
    else if (utils_1.inRange(bhr, 100, 109) || utils_1.inRange(bhr, 161, 180)) {
        cstdata.bhrscore = 1;
    }
    else if (utils_1.inRange(bhr, 110, 160)) {
        cstdata.bhrscore = 2;
    }
    if (zhenfu_tv < 5) {
        cstdata.ltvscore = 0;
    }
    else if (utils_1.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 30) {
        cstdata.ltvscore = 1;
    }
    else if (utils_1.inRange(zhenfu_tv, 10, 30)) {
        cstdata.ltvscore = 2;
    }
    if (zhouqi_tv < 3) {
        cstdata.stvscore = 0;
    }
    else if (utils_1.inRange(zhouqi_tv, 3, 6)) {
        cstdata.stvscore = 1;
    }
    else if (zhouqi_tv > 6) {
        cstdata.stvscore = 2;
    }
    cstdata.accscore = accnum;
    cstdata.decscore = ~~decnum;
    cstdata.total = cstdata.bhrscore + cstdata.accscore + cstdata.decscore + cstdata.ltvscore + cstdata.stvscore;
    return cstdata;
}
exports.Cst = Cst;
//# sourceMappingURL=Cst.js.map