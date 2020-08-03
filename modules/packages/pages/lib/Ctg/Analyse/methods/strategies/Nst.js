"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function Nst(_data) {
    var nstdata = JSON.parse(JSON.stringify(_data));
    var bhrvalue = nstdata.bhrvalue, ltvvalue = nstdata.ltvvalue, accdurationvalue = nstdata.accdurationvalue, accamplvalue = nstdata.accamplvalue, fmvalue = nstdata.fmvalue;
    var bhr = Number(bhrvalue) || 0;
    var ltv = Number(ltvvalue) || 0;
    var fhr_uptime = Number(accdurationvalue) || 0;
    var fhr_ampl = Number(accamplvalue) || 0;
    var fmnum = Number(fmvalue);
    if (bhr < 100)
        nstdata.bhrscore = 0;
    else if (utils_1.inRange(bhr, 100, 109) || bhr > 160)
        nstdata.bhrscore = 1;
    else if (utils_1.inRange(bhr, 110, 160)) {
        nstdata.bhrscore = 2;
    }
    if (ltv < 5) {
        nstdata.ltvscore = 0;
    }
    else if (utils_1.inRange(ltv, 5, 9) || ltv > 30) {
        nstdata.ltvscore = 1;
    }
    else if (utils_1.inRange(ltv, 10, 30)) {
        nstdata.ltvscore = 2;
    }
    if (fhr_uptime < 10) {
        nstdata.accdurationscore = 0;
    }
    else if (utils_1.inRange(fhr_uptime, 10, 14)) {
        nstdata.accdurationscore = 1;
    }
    else if (fhr_uptime >= 15) {
        nstdata.accdurationscore = 2;
    }
    if (fhr_ampl < 10) {
        nstdata.accamplscore = 0;
    }
    else if (utils_1.inRange(fhr_ampl, 10, 14)) {
        nstdata.accamplscore = 1;
    }
    else if (fhr_ampl >= 15) {
        nstdata.accamplscore = 2;
    }
    nstdata.fmvalue = fmnum;
    if (fmnum == 0) {
        nstdata.fmscore = 0;
    }
    else if (utils_1.inRange(fmnum, 1, 2)) {
        nstdata.fmscore = 1;
    }
    else if (fmnum >= 3) {
        nstdata.fmscore = 2;
    }
    nstdata.total = nstdata.accamplscore + nstdata.accdurationscore + nstdata.bhrscore + nstdata.fmscore + nstdata.ltvscore;
    return nstdata;
}
exports.Nst = Nst;
//# sourceMappingURL=Nst.js.map