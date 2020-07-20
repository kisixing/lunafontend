"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function Fischer(_data) {
    var fischerdata = JSON.parse(JSON.stringify(_data));
    var bhrvalue = fischerdata.bhrvalue, ltvvalue = fischerdata.ltvvalue, stvvalue = fischerdata.stvvalue, accvalue = fischerdata.accvalue, decvalue = fischerdata.decvalue;
    var bhr = Number(bhrvalue) || 0;
    var zhenfu_tv = Number(ltvvalue) || 0;
    var zhouqi_tv = Number(stvvalue) || 0;
    var accnum = Number(accvalue) || 0;
    var decnum = decvalue;
    if (bhr < 100 || bhr > 180) {
        fischerdata.bhrscore = 0;
    }
    else if (utils_1.inRange(bhr, 100, 109) || utils_1.inRange(bhr, 161, 180)) {
        fischerdata.bhrscore = 1;
    }
    else if (utils_1.inRange(bhr, 110, 160)) {
        fischerdata.bhrscore = 2;
    }
    if (zhenfu_tv < 5) {
        fischerdata.ltvscore = 0;
    }
    else if (utils_1.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 30) {
        fischerdata.ltvscore = 1;
    }
    else if (utils_1.inRange(zhenfu_tv, 10, 30)) {
        fischerdata.ltvscore = 2;
    }
    fischerdata.stvvalue = zhouqi_tv;
    if (zhouqi_tv < 3) {
        fischerdata.stvscore = 0;
    }
    else if (utils_1.inRange(zhouqi_tv, 3, 6)) {
        fischerdata.stvscore = 1;
    }
    else if (zhouqi_tv > 6) {
        fischerdata.stvscore = 2;
    }
    if (accnum == 0) {
        fischerdata.accscore = 0;
    }
    else if (utils_1.inRange(accnum, 1, 4)) {
        fischerdata.accscore = 1;
    }
    else if (accnum > 4) {
        fischerdata.accscore = 2;
    }
    fischerdata.decscore = decnum;
    fischerdata.total = fischerdata.bhrscore + fischerdata.accscore + fischerdata.decscore + fischerdata.ltvscore + fischerdata.stvscore;
    return fischerdata;
}
exports.Fischer = Fischer;
//# sourceMappingURL=Fischer.js.map