"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function Cstoct(_data, analysis) {
    var cstoctdata = JSON.parse(JSON.stringify(_data));
    var bhrvalue = cstoctdata.bhrvalue, accvalue = cstoctdata.accvalue, sinusoidvalue = cstoctdata.sinusoidvalue, ldvalue = cstoctdata.ldvalue, ltvvalue = cstoctdata.ltvvalue, edvalue = cstoctdata.edvalue, vdvalue = cstoctdata.vdvalue;
    cstoctdata.bhrscore = bhrvalue;
    cstoctdata.accscore = accvalue;
    cstoctdata.sinusoidscore = sinusoidvalue;
    cstoctdata.ltvscore = ldvalue;
    cstoctdata.ldscore = ltvvalue;
    cstoctdata.edscore = edvalue;
    cstoctdata.vdscore = vdvalue;
    var bhr = Number(bhrvalue) || 0;
    var acc = Number(accvalue) || 0;
    var ltv = Number(ltvvalue) || 0;
    var sinusoid = Number(sinusoidvalue) || 0;
    var ld = Number(ldvalue) || 0;
    var ed = Number(edvalue) || 0;
    var vd = Number(vdvalue) || 0;
    if (utils_1.inRange(bhr, 110, 160))
        cstoctdata.bhrscore = 0;
    else if (utils_1.inRange(bhr, 100, 109) || bhr > 160)
        cstoctdata.bhrscore = 1;
    else if (bhr < 100) {
        cstoctdata.bhrscore = 2;
    }
    if (ltv < 5) {
        if (length < 40) {
            cstoctdata.ltvscore = 2;
        }
        else if (utils_1.inRange(length, 40, 80)) {
            cstoctdata.ltvscore = 1;
        }
        else {
            cstoctdata.ltvscore = 0;
        }
    }
    else if (utils_1.inRange(ltv, 5, 9) || ltv > 30) {
        cstoctdata.ltvscore = 1;
    }
    else if (utils_1.inRange(ltv, 6, 25)) {
        cstoctdata.ltvscore = 2;
    }
    cstoctdata.sinusoidscore = sinusoid;
    cstoctdata.accvalue = acc;
    cstoctdata.edscore = ed;
    cstoctdata.ldscore = ld;
    cstoctdata.vdscore = vd;
    var bhrscore = cstoctdata.bhrscore, accscore = cstoctdata.accscore, sinusoidscore = cstoctdata.sinusoidscore, ltvscore = cstoctdata.ltvscore, ldscore = cstoctdata.ldscore, edscore = cstoctdata.edscore, vdscore = cstoctdata.vdscore;
    var all = [bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore];
    cstoctdata.result = '可疑';
    if (all.every(function (_) { return _ === 2; })) {
        cstoctdata.result = '异常';
    }
    else if (all.every(function (_) { return _ === 0; })) {
        cstoctdata.result = '正常';
    }
    return cstoctdata;
}
exports.Cstoct = Cstoct;
//# sourceMappingURL=Cstoct.js.map