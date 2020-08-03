"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function Cstoct(_data, analysis) {
    var cstoctdata = JSON.parse(JSON.stringify(_data));
    var bhrvalue = cstoctdata.bhrvalue, accvalue = cstoctdata.accvalue, sinusoidvalue = cstoctdata.sinusoidvalue, ldvalue = cstoctdata.ldvalue, ltvvalue = cstoctdata.ltvvalue, edvalue = cstoctdata.edvalue, vdvalue = cstoctdata.vdvalue;
    var bhr = utils_1.getValue(bhrvalue);
    var acc = utils_1.getValue(accvalue);
    var ltv = utils_1.getValue(ltvvalue);
    var sinusoid = utils_1.getValue(sinusoidvalue);
    var ld = utils_1.getValue(ldvalue);
    var ed = utils_1.getValue(edvalue);
    var vd = utils_1.getValue(vdvalue);
    if (utils_1.isModified(bhr)) {
        cstoctdata.bhrscore = bhr;
    }
    if (utils_1.isModified(ltv)) {
        cstoctdata.ltvscore = ltv;
    }
    if (utils_1.isModified(sinusoid)) {
        cstoctdata.sinusoidscore = sinusoid;
    }
    if (utils_1.isModified(acc)) {
        cstoctdata.accscore = acc;
    }
    if (utils_1.isModified(ed)) {
        cstoctdata.edscore = ed;
    }
    if (utils_1.isModified(ld)) {
        cstoctdata.ldscore = ld;
    }
    if (utils_1.isModified(vd)) {
        cstoctdata.vdscore = vd;
    }
    var bhrscore = cstoctdata.bhrscore, accscore = cstoctdata.accscore, sinusoidscore = cstoctdata.sinusoidscore, ltvscore = cstoctdata.ltvscore, ldscore = cstoctdata.ldscore, edscore = cstoctdata.edscore, vdscore = cstoctdata.vdscore;
    var all = [bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore];
    cstoctdata.result = '正常';
    if (all.some(function (_) { return _ === 2; })) {
        cstoctdata.result = '异常';
    }
    else if (all.some(function (_) { return _ === 1; })) {
        cstoctdata.result = '可疑';
    }
    else if (all.some(function (_) { return _ === 3; })) {
        cstoctdata.result = '时长不足';
    }
    return cstoctdata;
}
exports.Cstoct = Cstoct;
//# sourceMappingURL=Cstoct.js.map