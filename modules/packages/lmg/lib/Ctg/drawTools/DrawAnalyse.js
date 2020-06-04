"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Draw_1 = __importDefault(require("../../Draw"));
var DrawAnalyse = (function (_super) {
    __extends(DrawAnalyse, _super);
    function DrawAnalyse(wrap, canvas, suit) {
        var _this = _super.call(this, wrap, canvas) || this;
        _this.mapXtoY = {};
        _this.mapBaselilneXtoY = {};
        _this.drawflag = function (canvas, x, y, index) {
            _this.mapXtoY[x] = { y: y + _this.suit.drawobj.basetop, index: index };
            var _a = _this, context2D = _a.context2D, analyseData = _a.analysisData;
            if (!context2D || !analyseData)
                return;
            var _b = analyseData.analysis, acc = _b.acc, dec = _b.dec;
            var _acc = acc.map(function (_) { return _.index; });
            var _dec = dec.map(function (_) { return _.index; });
            context2D.textAlign = 'left';
            context2D.textBaseline = 'top';
            var txt = '';
            if (_acc.indexOf(index) > -1 || _acc.indexOf(index - 1) > -1) {
                var target = acc.find(function (_) { return [index, index - 1].includes(_.index); });
                target.x = x;
                target.y = y;
                if (target.marked) {
                    txt = "+";
                    canvas.font = '18px arial';
                    canvas.fillStyle = 'green';
                    canvas.fillText(txt, x + 1, y + 10);
                }
                else if (target.reliability > 45) {
                    if (!target.remove) {
                        txt = "+" + (target.reliability + "%");
                        canvas.font = '15px arial';
                        canvas.fillStyle = 'orange';
                        canvas.fillText(txt, x + 1, y + 10);
                    }
                }
            }
            else if (_dec.indexOf(index) > -1 || _dec.indexOf(index - 1) > -1) {
                console.log('drawflag', x, y);
                var target = dec.find(function (_) { return [index, index - 1].includes(_.index); });
                target.x = x;
                target.y = y;
                txt = target ? target.type.toUpperCase() : '-';
                canvas.font = 'bold 15px arial';
                canvas.fillStyle = 'red';
                canvas.fillText(txt, x + 1, y + 20);
            }
        };
        _this.inRange = function (value, min, max) {
            var result = false;
            if (value >= min && value <= max)
                result = true;
            return result;
        };
        _this.countAcc = function (start, end) {
            var accnum = 0;
            var analysisData = _this.analysisData;
            if (!analysisData)
                return accnum;
            var analysis = analysisData.analysis;
            analysis.acc.map(function (item) {
                if (item.index > end) {
                    return accnum;
                }
                else if (item.index >= start) {
                    if (item.marked)
                        accnum++;
                }
            });
            return accnum;
        };
        _this.countDec = function (start, end, type) {
            var decnum = 0;
            var analysisData = _this.analysisData;
            if (!analysisData)
                return decnum;
            var analysis = analysisData.analysis;
            analysis.dec.map(function (item) {
                if (item.index > end) {
                    return decnum;
                }
                else if (item.index >= start) {
                    if (item.type.toUpperCase() == type && !item.remove)
                        decnum++;
                }
            });
            return decnum;
        };
        _this.cycleAcc = function () {
            var error = 8;
            var analysisData = _this.analysisData;
            if (!analysisData)
                return 0;
            var analysis = analysisData.analysis;
            if (analysis.acc.length < 3)
                return 0;
            var base = analysis.acc[1].index - analysis.acc[0].index;
            for (var i = 2; i < analysis.acc.length; i++) {
                var diff = analysis.acc[i].index - analysis.acc[i - 1].index;
                if (diff > base + error || diff < base - error) {
                    return 1;
                }
            }
            return 0;
        };
        _this.countFm = function (start, end) {
            var fmnum = 0;
            for (var i = start; i <= end; i++) {
                if (i % 2 == 1)
                    continue;
                if (_this.suit.data.fm[i] == 128 || _this.suit.data.fm[i] == 1) {
                    fmnum++;
                }
            }
            return fmnum;
        };
        _this.fhrDuration = function (start, end) {
            var accnum = 0;
            var sum = 0;
            var analysisData = _this.analysisData;
            if (!analysisData)
                return accnum;
            var analysis = analysisData.analysis;
            analysis.acc.map(function (item) {
                if (item.index > end) {
                    if (accnum == 0)
                        return accnum;
                    else {
                        return Math.ceil(sum / accnum / 4);
                    }
                }
                else if (item.index >= start) {
                    if (item.marked) {
                        if (item.duration != 0) {
                            sum += item.duration;
                            accnum++;
                        }
                        console.log(item.duration);
                    }
                }
            });
            if (accnum == 0)
                return accnum;
            else {
                return Math.ceil(sum / accnum / 4);
            }
        };
        _this.fhrAmpl = function (start, end) {
            var accnum = 0;
            var sum = 0;
            var analysisData = _this.analysisData;
            if (!analysisData)
                return accnum;
            var analysis = analysisData.analysis;
            analysis.acc.map(function (item) {
                if (item.index > end) {
                    if (accnum == 0)
                        return accnum;
                    else {
                        return Math.ceil(sum / accnum);
                    }
                }
                else if (item.index >= start) {
                    if (item.marked) {
                        if (item.ampl != 0) {
                            sum += item.ampl;
                            accnum++;
                        }
                    }
                }
            });
            if (accnum == 0)
                return accnum;
            else {
                return Math.ceil(sum / accnum);
            }
        };
        _this.ctgscore = function (type) {
            var analysisData = _this.analysisData;
            if (!analysisData)
                return null;
            analysisData = JSON.parse(JSON.stringify(analysisData));
            var analysis = analysisData.analysis, score = analysisData.score;
            var bhr = analysis.bhr;
            if (type == 'Nst') {
                score.nstdata.bhrvalue = bhr;
                if (bhr < 100)
                    score.nstdata.bhrscore = 0;
                else if (_this.inRange(bhr, 100, 109) || bhr > 160)
                    score.nstdata.bhrscore = 1;
                else if (_this.inRange(bhr, 110, 160)) {
                    score.nstdata.bhrscore = 2;
                }
                score.nstdata.ltvvalue = analysis.ltv;
                if (analysis.ltv < 5) {
                    score.nstdata.ltvscore = 0;
                }
                else if (_this.inRange(analysis.ltv, 5, 9) || analysis.ltv > 30) {
                    score.nstdata.ltvscore = 1;
                }
                else if (_this.inRange(analysis.ltv, 10, 30)) {
                    score.nstdata.ltvscore = 2;
                }
                var fhr_uptime = _this.fhrDuration(analysis.start, analysis.end);
                score.nstdata.accdurationvalue = fhr_uptime;
                if (fhr_uptime < 10) {
                    score.nstdata.accdurationscore = 0;
                }
                else if (_this.inRange(fhr_uptime, 10, 14)) {
                    score.nstdata.accdurationscore = 1;
                }
                else if (fhr_uptime > 15) {
                    score.nstdata.accdurationscore = 2;
                }
                var fhr_ampl = _this.fhrAmpl(analysis.start, analysis.end);
                ;
                score.nstdata.accamplvalue = fhr_ampl;
                if (fhr_ampl < 10) {
                    score.nstdata.accamplscore = 0;
                }
                else if (_this.inRange(fhr_ampl, 10, 14)) {
                    score.nstdata.accamplscore = 1;
                }
                else if (fhr_ampl > 15) {
                    score.nstdata.accamplscore = 2;
                }
                var fmnum = _this.countFm(analysis.start, analysis.end);
                score.nstdata.fmvalue = fmnum;
                if (fmnum == 0) {
                    score.nstdata.fmscore = 0;
                }
                else if (_this.inRange(fmnum, 1, 2)) {
                    score.nstdata.fmscore = 1;
                }
                else if (fmnum > 2) {
                    score.nstdata.fmscore = 2;
                }
                analysis.ldtimes = _this.countDec(analysis.start, analysis.end, 'LD');
                analysis.vdtimes = _this.countDec(analysis.start, analysis.end, 'VD');
                analysis.edtimes = _this.countDec(analysis.start, analysis.end, 'ED');
                score.nstdata.total = score.nstdata.accamplscore + score.nstdata.accdurationscore + score.nstdata.bhrscore + score.nstdata.fmscore + score.nstdata.ltvscore;
                return _this.analysisData = analysisData;
            }
            else if (type == 'Krebs') {
                score.krebsdata.bhrvalue = bhr;
                if (bhr < 100 || bhr > 180) {
                    score.krebsdata.bhrscore = 0;
                }
                else if (_this.inRange(bhr, 100, 109) || _this.inRange(bhr, 161, 180)) {
                    score.krebsdata.bhrscore = 1;
                }
                else if (_this.inRange(bhr, 110, 160)) {
                    score.krebsdata.bhrscore = 2;
                }
                var zhenfu_tv = analysis.ltv;
                score.krebsdata.ltvvalue = zhenfu_tv;
                if (zhenfu_tv < 5) {
                    score.krebsdata.ltvscore = 0;
                }
                else if (_this.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 25) {
                    score.krebsdata.ltvscore = 1;
                }
                else if (_this.inRange(zhenfu_tv, 10, 25)) {
                    score.krebsdata.ltvscore = 2;
                }
                var zhouqi_tv = analysis.stv;
                score.krebsdata.stvvalue = zhouqi_tv;
                if (zhouqi_tv < 3) {
                    score.krebsdata.stvscore = 0;
                }
                else if (_this.inRange(zhouqi_tv, 3, 6)) {
                    score.krebsdata.stvscore = 1;
                }
                else if (zhouqi_tv > 6) {
                    score.krebsdata.stvscore = 2;
                }
                var accnum = _this.countAcc(analysis.start, analysis.end);
                score.krebsdata.accvalue = accnum;
                if (accnum == 0) {
                    score.krebsdata.accscore = 0;
                }
                else if (_this.inRange(accnum, 1, 4)) {
                    score.krebsdata.accscore = 1;
                }
                else if (accnum > 4) {
                    score.krebsdata.accscore = 2;
                }
                var ld = analysis.ldtimes = _this.countDec(analysis.start, analysis.end, 'LD');
                var vd = analysis.vdtimes = _this.countDec(analysis.start, analysis.end, 'VD');
                var ed = analysis.edtimes = _this.countDec(analysis.start, analysis.end, 'ED');
                console.log(ld, vd, ed);
                var sum = ld + vd;
                if (sum > 1) {
                    score.krebsdata.decscore = 0;
                    score.krebsdata.decvalue = sum + "";
                }
                else if (sum == 1) {
                    score.krebsdata.decscore = 1;
                    score.krebsdata.decvalue = sum + "";
                }
                else {
                    score.krebsdata.decscore = 2;
                    if (ed > 0) {
                        score.krebsdata.decvalue = "早减";
                    }
                    else {
                        score.krebsdata.decvalue = "无";
                    }
                }
                var fmnum = _this.countFm(analysis.start, analysis.end);
                score.krebsdata.fmvalue = fmnum;
                if (fmnum == 0) {
                    score.krebsdata.fmscore = 0;
                }
                else if (_this.inRange(fmnum, 1, 4)) {
                    score.krebsdata.fmscore = 1;
                }
                else if (fmnum > 4) {
                    score.krebsdata.fmscore = 2;
                }
                score.krebsdata.total = score.krebsdata.bhrscore + score.krebsdata.accscore + score.krebsdata.decscore + score.krebsdata.ltvscore + score.krebsdata.stvscore + score.krebsdata.fmscore;
            }
            else if (type == 'Fischer') {
                score.fischerdata.bhrvalue = bhr;
                if (bhr < 100 || bhr > 180) {
                    score.fischerdata.bhrscore = 0;
                }
                else if (_this.inRange(bhr, 100, 109) || _this.inRange(bhr, 161, 180)) {
                    score.fischerdata.bhrscore = 1;
                }
                else if (_this.inRange(bhr, 110, 160)) {
                    score.fischerdata.bhrscore = 2;
                }
                var zhenfu_tv = analysis.ltv;
                score.fischerdata.ltvvalue = zhenfu_tv;
                if (zhenfu_tv < 5) {
                    score.fischerdata.ltvscore = 0;
                }
                else if (_this.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 30) {
                    score.fischerdata.ltvscore = 1;
                }
                else if (_this.inRange(zhenfu_tv, 10, 30)) {
                    score.fischerdata.ltvscore = 2;
                }
                var zhouqi_tv = analysis.stv;
                score.fischerdata.stvvalue = zhouqi_tv;
                if (zhouqi_tv < 3) {
                    score.fischerdata.stvscore = 0;
                }
                else if (_this.inRange(zhouqi_tv, 3, 6)) {
                    score.fischerdata.stvscore = 1;
                }
                else if (zhouqi_tv > 6) {
                    score.fischerdata.stvscore = 2;
                }
                var accnum = _this.countAcc(analysis.start, analysis.end);
                score.fischerdata.accvalue = accnum;
                if (accnum == 0) {
                    score.fischerdata.accscore = 0;
                }
                else if (_this.inRange(accnum, 1, 4)) {
                    score.fischerdata.accscore = 1;
                }
                else if (accnum > 4) {
                    score.fischerdata.accscore = 2;
                }
                var ld = analysis.ldtimes = _this.countDec(analysis.start, analysis.end, 'LD');
                var vd = analysis.vdtimes = _this.countDec(analysis.start, analysis.end, 'VD');
                var ed = analysis.edtimes = _this.countDec(analysis.start, analysis.end, 'ED');
                if (ld > 0) {
                    score.fischerdata.decscore = 0;
                    score.fischerdata.decvalue = 'LD';
                }
                else if (vd > 0) {
                    score.fischerdata.decscore = 1;
                    score.fischerdata.decvalue = 'VD';
                }
                else {
                    if (ed > 0) {
                        score.fischerdata.decvalue = 'ED';
                    }
                    else {
                        score.fischerdata.decvalue = '无';
                    }
                    score.fischerdata.decscore = 2;
                }
                score.fischerdata.total = score.fischerdata.bhrscore + score.fischerdata.accscore + score.fischerdata.decscore + score.fischerdata.ltvscore + score.fischerdata.stvscore;
            }
            else if (type == 'Sogc') {
                var length_1 = analysis.fhrbaselineMinute.length;
                score.sogcdata.bhrvalue = bhr;
                if (bhr < 100 || (bhr > 160 && length_1 > 30))
                    score.sogcdata.bhrscore = 0;
                else if (_this.inRange(bhr, 100, 109) || bhr > 160)
                    score.sogcdata.bhrscore = 1;
                else if (_this.inRange(bhr, 110, 160)) {
                    score.sogcdata.bhrscore = 2;
                }
                score.sogcdata.ltvvalue = analysis.ltv;
                if (analysis.ltv < 5) {
                    if (length_1 < 40) {
                        score.sogcdata.ltvscore = 2;
                    }
                    else if (_this.inRange(length_1, 40, 80)) {
                        score.sogcdata.ltvscore = 1;
                    }
                    else {
                        score.sogcdata.ltvscore = 0;
                    }
                }
                else if (_this.inRange(analysis.ltv, 5, 9) || analysis.ltv > 30) {
                    score.sogcdata.ltvscore = 1;
                }
                else if (_this.inRange(analysis.ltv, 6, 25)) {
                    score.sogcdata.ltvscore = 2;
                }
                if (analysis.isSinusoid) {
                    score.sogcdata.ltvscore = 0;
                }
                var accnum = _this.countAcc(analysis.start, analysis.end);
                score.sogcdata.accvalue = accnum;
                if (accnum == 0) {
                    score.sogcdata.accscore = 0;
                }
                else if (_this.inRange(accnum, 1, 2)) {
                    score.sogcdata.accscore = 1;
                }
                else if (accnum > 2) {
                    score.sogcdata.accscore = 2;
                }
                var ld = analysis.ldtimes = _this.countDec(analysis.start, analysis.end, 'LD');
                var vd = analysis.vdtimes = _this.countDec(analysis.start, analysis.end, 'VD');
                var ed = analysis.edtimes = _this.countDec(analysis.start, analysis.end, 'ED');
                if (ld > 0) {
                    score.sogcdata.decscore = 0;
                    score.sogcdata.decvalue = 'LD';
                }
                else if (vd > 0) {
                    score.sogcdata.decscore = 1;
                    score.sogcdata.decvalue = 'VD';
                    analysis.dec.map(function (item) {
                        if (item.type.toUpperCase() == 'VD') {
                            if (_this.inRange(item.duration, 30, 60)) {
                                score.sogcdata.decscore = 1;
                                score.sogcdata.decvalue = 'VD';
                            }
                            else if (item.duration > 60) {
                                score.sogcdata.decscore = 0;
                                score.sogcdata.decvalue = 'VD';
                            }
                        }
                    });
                }
                else {
                    if (ed > 0) {
                        score.sogcdata.decvalue = 'ED';
                    }
                    else {
                        score.sogcdata.decvalue = '无';
                    }
                    score.sogcdata.decscore = 2;
                }
                if (score.sogcdata.bhrscore + score.sogcdata.accscore + score.sogcdata.decscore + score.sogcdata.ltvscore == 8) {
                    score.sogcdata.total = 2;
                }
                else if (score.sogcdata.bhrscore == 0 || score.sogcdata.accscore == 0 || score.sogcdata.decscore == 0 || score.sogcdata.ltvscore) {
                    score.sogcdata.total = 0;
                }
                score.sogcdata.total = 1;
            }
            else if (type == 'Cst') {
                score.cstdata.bhrvalue = bhr;
                if (bhr < 100 || bhr > 180) {
                    score.cstdata.bhrscore = 0;
                }
                else if (_this.inRange(bhr, 100, 109) || _this.inRange(bhr, 161, 180)) {
                    score.cstdata.bhrscore = 1;
                }
                else if (_this.inRange(bhr, 110, 160)) {
                    score.cstdata.bhrscore = 2;
                }
                var zhenfu_tv = analysis.ltv;
                score.cstdata.ltvvalue = zhenfu_tv;
                if (zhenfu_tv < 5) {
                    score.cstdata.ltvscore = 0;
                }
                else if (_this.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 30) {
                    score.cstdata.ltvscore = 1;
                }
                else if (_this.inRange(zhenfu_tv, 10, 30)) {
                    score.cstdata.ltvscore = 2;
                }
                var zhouqi_tv = analysis.stv;
                score.cstdata.stvvalue = zhouqi_tv;
                if (zhouqi_tv < 3) {
                    score.cstdata.stvscore = 0;
                }
                else if (_this.inRange(zhouqi_tv, 3, 6)) {
                    score.cstdata.stvscore = 1;
                }
                else if (zhouqi_tv > 6) {
                    score.cstdata.stvscore = 2;
                }
                var accnum = _this.countAcc(analysis.start, analysis.end);
                score.cstdata.accvalue = accnum;
                if (accnum == 0) {
                    score.cstdata.accscore = 0;
                }
                else if (_this.cycleAcc() == 1) {
                    score.cstdata.accscore = 1;
                }
                else {
                    score.cstdata.accscore = 2;
                }
                var ld = analysis.ldtimes = _this.countDec(analysis.start, analysis.end, 'LD');
                var vd = analysis.vdtimes = _this.countDec(analysis.start, analysis.end, 'VD');
                var ed = analysis.edtimes = _this.countDec(analysis.start, analysis.end, 'ED');
                if (ld > 0) {
                    score.cstdata.decscore = 0;
                    score.cstdata.decvalue = 'LD';
                }
                else if (vd > 0) {
                    score.cstdata.decscore = 1;
                    score.cstdata.decvalue = 'VD';
                }
                else {
                    if (ed > 0) {
                        score.cstdata.decvalue = 'ED';
                        score.cstdata.decscore = 0;
                    }
                    else {
                        score.cstdata.decvalue = '无';
                        score.cstdata.decscore = 2;
                    }
                }
                score.cstdata.total = score.cstdata.bhrscore + score.cstdata.accscore + score.cstdata.decscore + score.cstdata.ltvscore + score.cstdata.stvscore;
            }
            else if (type == 'Cstoct') {
                score.cstoctdata.bhrvalue = bhr;
                if (bhr < 100 || (bhr > 160 && length > 30))
                    score.cstoctdata.bhrscore = 0;
                else if (_this.inRange(bhr, 100, 109) || bhr > 160)
                    score.cstoctdata.bhrscore = 1;
                else if (_this.inRange(bhr, 110, 160)) {
                    score.cstoctdata.bhrscore = 2;
                }
                score.cstoctdata.ltvvalue = analysis.ltv;
                if (analysis.ltv < 5) {
                    if (length < 40) {
                        score.cstoctdata.ltvscore = 2;
                    }
                    else if (_this.inRange(length, 40, 80)) {
                        score.cstoctdata.ltvscore = 1;
                    }
                    else {
                        score.cstoctdata.ltvscore = 0;
                    }
                }
                else if (_this.inRange(analysis.ltv, 5, 9) || analysis.ltv > 30) {
                    score.cstoctdata.ltvscore = 1;
                }
                else if (_this.inRange(analysis.ltv, 6, 25)) {
                    score.cstoctdata.ltvscore = 2;
                }
                if (analysis.isSinusoid) {
                    score.cstoctdata.sinusoidscore = 0;
                    score.cstoctdata.sinusoidvalue = 0;
                }
                else {
                    score.cstoctdata.sinusoidscore = 2;
                    score.cstoctdata.sinusoidvalue = 2;
                }
                var accnum = _this.countAcc(analysis.start, analysis.end);
                score.cstoctdata.accvalue = accnum;
                if (accnum == 0) {
                    score.cstoctdata.accscore = 0;
                }
                else if (_this.inRange(accnum, 1, 2)) {
                    score.cstoctdata.accscore = 1;
                }
                else if (accnum > 2) {
                    score.cstoctdata.accscore = 2;
                }
                var ld = analysis.ldtimes = _this.countDec(analysis.start, analysis.end, 'LD');
                var vd = analysis.vdtimes = _this.countDec(analysis.start, analysis.end, 'VD');
                var ed = analysis.edtimes = _this.countDec(analysis.start, analysis.end, 'ED');
                if (ld > 0) {
                    score.cstoctdata.decscore = 0;
                    score.cstoctdata.decvalue = 'LD';
                }
                else if (vd > 0) {
                    score.cstoctdata.decscore = 1;
                    score.cstoctdata.decvalue = 'VD';
                    analysis.dec.map(function (item) {
                        if (item.type.toUpperCase() == 'VD') {
                            if (_this.inRange(item.duration, 30, 60)) {
                                score.cstoctdata.decscore = 1;
                                score.cstoctdata.decvalue = 'VD';
                            }
                            else if (item.duration > 60) {
                                score.cstoctdata.decscore = 0;
                                score.cstoctdata.decvalue = 'VD';
                            }
                        }
                    });
                }
                else {
                    if (ed > 0) {
                        score.cstoctdata.decvalue = 'ED';
                    }
                    else {
                        score.cstoctdata.decvalue = '无';
                    }
                    score.cstoctdata.decscore = 2;
                }
                if (score.cstoctdata.bhrscore + score.cstoctdata.accscore + score.cstoctdata.decscore + score.cstoctdata.ltvscore == 8) {
                    score.cstoctdata.total = 2;
                }
                else if (score.cstoctdata.bhrscore == 0 || score.cstoctdata.accscore == 0 || score.cstoctdata.decscore == 0 || score.cstoctdata.ltvscore) {
                    score.cstoctdata.total = 0;
                }
                score.cstoctdata.total = 1;
            }
            return (_this.analysisData = analysisData);
        };
        _this.suit = suit;
        return _this;
    }
    DrawAnalyse.prototype.init = function () {
        this.analysisData = null;
    };
    DrawAnalyse.prototype.setData = function (analyseData) {
        this.analysisData = analyseData;
    };
    DrawAnalyse.prototype.drawBaseline = function (cur, color, yspan, xspan, max, basetop) {
        var _a = this, context2D = _a.context2D, width = _a.width, height = _a.height, analyseData = _a.analysisData;
        width = Math.floor(width);
        context2D && context2D.clearRect(0, 0, width, height);
        if (!analyseData) {
            return;
        }
        var _b = analyseData.analysis, baseline = _b.fhrbaselineMinute, start = _b.start, end = _b.end;
        var lastx = 0;
        var leftViewposition = cur - width * 2 > 0 ? cur - width * 2 : 0;
        var curfhroffset = 0;
        context2D.beginPath();
        context2D.strokeStyle = color;
        context2D.lineWidth = 2;
        if (true) {
            var baselineoff = 0;
            var firstindex = Math.floor(leftViewposition / (xspan * 6));
            context2D.moveTo(baselineoff * xspan * 3, (max - curfhroffset - baseline[firstindex]) * yspan + basetop);
            for (var i = leftViewposition; i < cur; i++) {
                baselineoff = Math.ceil(i / (xspan * 6));
                if (baselineoff >= baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    lastx = Math.floor((i - leftViewposition) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - baseline[baselineoff]) * yspan + basetop);
                    this.mapBaselilneXtoY[lastx] = (max - curfhroffset - baseline[baselineoff]) * yspan + basetop;
                }
            }
            context2D.lineTo(cur, (max - curfhroffset - baseline[baselineoff]) * yspan + basetop);
            context2D.stroke();
        }
        else if (leftViewposition < end) {
            var baselineoff = Math.ceil((leftViewposition - start) / (xspan * 6));
            var firstindex = baselineoff - 1 > 0 ? baselineoff - 1 : 0;
            context2D.moveTo(0, (max - curfhroffset - baseline[firstindex]) * yspan + basetop);
            for (var i = leftViewposition + 1; i < cur; i++) {
                baselineoff = Math.ceil((i - start) / (xspan * 6));
                if (baselineoff >= baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    lastx = Math.floor((i - leftViewposition) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - baseline[baselineoff]) * yspan + basetop);
                }
            }
            context2D.lineTo((end - leftViewposition) / 2, (max - curfhroffset - baseline[baselineoff]) * yspan + basetop);
            context2D.stroke();
        }
    };
    DrawAnalyse.prototype.analyse = function (type, start, end, data) {
        if (data === void 0) { data = this.analysisData; }
        if (!data)
            return;
        var suit = this.suit;
        this.setData(data);
        if (!start && !end && this.analysisData) {
            start = this.analysisData.analysis.start;
            end = this.analysisData.analysis.end;
        }
        suit.drawSelect.$selectrpend = data.analysis.end = end;
        suit.drawSelect.$selectrpstart = data.analysis.start = start;
        var newData = this.ctgscore(type);
        suit.drawobj.drawdot(suit.rightViewPosition, false);
        return newData;
    };
    DrawAnalyse.prototype.revicePoint = function (x, y) {
        if (!this.analysisData)
            return;
        var edge = 20;
        var _a = this.analysisData.analysis, acc = _a.acc, dec = _a.dec;
        var target = acc.find(function (_) { return (x < _.x + edge) && (x > _.x - edge); }) || dec.find(function (_) { return (x < _.x + edge) && (x > _.x - edge); });
        if (target && (y < (target.y + edge) && y > (target.y - edge))) {
            var isAcc = 'reliability' in target;
            return isAcc ? '' : '';
        }
        return null;
    };
    DrawAnalyse.prototype.refresh = function () {
        this.suit.emit('suit:analyseMark');
        this.suit.drawobj.drawdot(this.suit.viewposition < this.width * 2 ? this.width * 2 : this.suit.viewposition);
    };
    DrawAnalyse.prototype.markAccPoint = function () {
        if (!this.analysisData)
            return;
        var acc = this.analysisData.analysis.acc;
        acc.push({
            marked: true,
            index: this.pointToInsert.index,
            start: 0,
            end: 0,
            peak: 0,
            duration: 0,
            ampl: 0,
            reliability: 0,
            user: true
        });
        this.refresh();
    };
    DrawAnalyse.prototype.editAccPoint = function (marked) {
        if (marked === void 0) { marked = true; }
        if (!this.analysisData)
            return;
        var acc = this.analysisData.analysis.acc;
        var target = this.pointToEdit;
        target.marked = marked;
        target.remove = !marked;
        var user = target.user;
        if (user && !marked) {
            var index = acc.findIndex(function (_) { return _.index === target.index; });
            acc.splice(index, 1);
        }
        this.refresh();
    };
    DrawAnalyse.prototype.markDecPoint = function (type) {
        if (!this.analysisData)
            return;
        var dec = this.analysisData.analysis.dec;
        dec.push({
            index: this.pointToInsert.index,
            type: type,
            start: 0,
            end: 0,
            peak: 0,
            duration: 0,
            ampl: 0,
            marked: true,
            user: true
        });
        this.refresh();
    };
    DrawAnalyse.prototype.editDecPoint = function (type) {
        if (!this.analysisData)
            return;
        var dec = this.analysisData.analysis.dec;
        var target = this.pointToEdit;
        var user = target.user;
        target.type = type;
        console.log('markDecPoint', type);
        if (type == "ld" || type == "vd" || type == "ed") {
            target.remove = false;
        }
        else {
            target.remove = true;
        }
        if (user && !type) {
            var index = dec.findIndex(function (_) { return _.index === target.index; });
            dec.splice(index, 1);
        }
        this.refresh();
    };
    return DrawAnalyse;
}(Draw_1.default));
exports.DrawAnalyse = DrawAnalyse;
//# sourceMappingURL=DrawAnalyse.js.map