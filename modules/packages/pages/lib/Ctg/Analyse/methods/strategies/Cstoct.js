"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Cstoct(_data) {
    var cstoctdata = JSON.parse(JSON.stringify(_data));
    var bhrscore = cstoctdata.bhrscore, accscore = cstoctdata.accscore, sinusoidscore = cstoctdata.sinusoidscore, ltvscore = cstoctdata.ltvscore, ldscore = cstoctdata.ldscore, edscore = cstoctdata.edscore, vdscore = cstoctdata.vdscore;
    var all = [bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore];
    cstoctdata.result = '可疑';
    if (all.every(function (_) { return _ === 2; })) {
        cstoctdata.result = '异常';
    }
    else if (all.some(function (_) { return _ === 0; })) {
        cstoctdata.result = '正常';
    }
    return cstoctdata;
}
exports.Cstoct = Cstoct;
//# sourceMappingURL=Cstoct.js.map