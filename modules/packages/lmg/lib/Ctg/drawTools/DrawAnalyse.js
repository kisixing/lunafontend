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
    function DrawAnalyse(canvas, width, height, suit) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var _this = _super.call(this, width, height, canvas) || this;
        _this.drawflag = function (canvas, x, y, index) {
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
                    canvas.font = '16px arial';
                    canvas.fillStyle = 'green';
                    canvas.fillText(txt, x + 1, y + 10);
                }
                else if (target.reliability > 45) {
                    txt = "+ " + (target.reliability + "+\"%\"");
                    canvas.font = '15px arial';
                    canvas.fillStyle = 'orange';
                    canvas.fillText(txt, x + 1, y + 10);
                }
            }
            else if (_dec.indexOf(index) > -1 || _dec.indexOf(index - 1) > -1) {
                var target = dec.find(function (_) { return [index, index - 1].includes(_.index); });
                target.x = x;
                target.y = y;
                txt = target ? target.type : '-';
                canvas.font = 'bold 15px arial';
                canvas.fillStyle = 'red';
                canvas.fillText(txt, x + 1, y - 1);
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
                    if (item.type.toUpperCase() == type)
                        decnum++;
                }
            });
            return decnum;
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
                        return sum / accnum;
                    }
                }
                else if (item.index >= start) {
                    if (item.marked) {
                        sum += item.duration;
                        accnum++;
                    }
                }
            });
            if (accnum == 0)
                return accnum;
            else {
                return sum / accnum;
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
                        return sum / accnum;
                    }
                }
                else if (item.index >= start) {
                    if (item.marked) {
                        sum += item.ampl;
                        accnum++;
                    }
                }
            });
            if (accnum == 0)
                return accnum;
            else {
                return sum / accnum;
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
                score.nstdata.totalscore = score.nstdata.accamplscore + score.nstdata.accdurationscore + score.nstdata.bhrscore + score.nstdata.fmscore + score.nstdata.ltvscore;
                return _this.analysisData = analysisData;
            }
            else if (type == 'Krebs') {
                score.Krebsdata.bhrvalue = bhr;
                if (analysis.bhr < 100)
                    if (bhr < 100 || bhr > 180) {
                        score.Krebsdata.bhrscore = 0;
                    }
                    else if (_this.inRange(bhr, 100, 109) || _this.inRange(bhr, 161, 180)) {
                        score.Krebsdata.bhrscore = 1;
                    }
                    else if (_this.inRange(bhr, 110, 160)) {
                        score.Krebsdata.bhrscore = 2;
                    }
                var zhenfu_tv = analysis.ltv;
                score.Krebsdata.ltvvalue = zhenfu_tv;
                if (zhenfu_tv < 5) {
                    score.Krebsdata.ltvscore = 0;
                }
                else if (_this.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 25) {
                    score.Krebsdata.ltvscore = 1;
                }
                else if (_this.inRange(zhenfu_tv, 10, 25)) {
                    score.Krebsdata.ltvscore = 2;
                }
                var zhouqi_tv = analysis.stv;
                score.Krebsdata.stvvalue = zhouqi_tv;
                if (zhouqi_tv < 3) {
                    score.Krebsdata.stvscore = 0;
                }
                else if (_this.inRange(zhouqi_tv, 3, 6)) {
                    score.Krebsdata.stvscore = 1;
                }
                else if (zhouqi_tv > 6) {
                    score.Krebsdata.stvscore = 2;
                }
                var accnum = _this.countAcc(analysis.start, analysis.end);
                score.Krebsdata.accvalue = accnum;
                if (accnum == 0) {
                    score.Krebsdata.accscore = 0;
                }
                else if (_this.inRange(accnum, 1, 4)) {
                    score.Krebsdata.accscore = 1;
                }
                else if (accnum > 4) {
                    score.Krebsdata.accscore = 2;
                }
                var decnum = analysis.ldtimes + analysis.vdtimes;
                if (decnum > 1) {
                    score.Krebsdata.decscore = 0;
                    score.Krebsdata.decvalue = decnum + "";
                }
                else if (decnum = 1) {
                    score.Krebsdata.decscore = 1;
                    score.Krebsdata.decvalue = decnum + "";
                }
                else {
                    score.Krebsdata.decscore = 2;
                    if (analysis.edtimes > 0) {
                        score.Krebsdata.decvalue = "早减";
                    }
                    else {
                        score.Krebsdata.decvalue = "无";
                    }
                }
                var fmnum = _this.countFm(analysis.start, analysis.end);
                score.Krebsdata.fmvalue = fmnum;
                if (fmnum == 0) {
                    score.Krebsdata.fmscore = 0;
                }
                else if (_this.inRange(fmnum, 1, 4)) {
                    score.Krebsdata.fmscore = 1;
                }
                else if (fmnum > 4) {
                    score.Krebsdata.fmscore = 2;
                }
                score.Krebsdata.totalscore = score.Krebsdata.bhrscore + score.Krebsdata.accscore + score.Krebsdata.decscore + score.Krebsdata.ltvscore + score.Krebsdata.stvscore + score.Krebsdata.fmscore;
            }
            else if (type == 'Fischer') {
                score.fischerdata.bhrvalue = bhr;
                if (analysis.bhr < 100)
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
                var ld = analysis.ldtimes;
                var vd = analysis.vdtimes;
                var ed = analysis.edtimes;
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
                score.fischerdata.totalscore = score.fischerdata.bhrscore + score.fischerdata.accscore + score.fischerdata.decscore + score.fischerdata.ltvscore + score.fischerdata.stvscore;
            }
            else if (type == 'Sogc') {
                score.sogcdata.bhrvalue = bhr;
                if (bhr < 100)
                    score.sogcdata.bhrscore = 0;
                else if (_this.inRange(bhr, 100, 109) || bhr > 160)
                    score.sogcdata.bhrscore = 1;
                else if (_this.inRange(bhr, 110, 160)) {
                    score.sogcdata.bhrscore = 2;
                }
                score.sogcdata.ltvvalue = analysis.ltv;
                if (analysis.ltv < 5) {
                    score.sogcdata.ltvscore = 0;
                }
                else if (_this.inRange(analysis.ltv, 5, 9) || analysis.ltv > 30) {
                    score.sogcdata.ltvscore = 1;
                }
                else if (_this.inRange(analysis.ltv, 10, 30)) {
                    score.sogcdata.ltvscore = 2;
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
                var ld = analysis.ldtimes;
                var vd = analysis.vdtimes;
                var ed = analysis.edtimes;
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
            }
            else if (type == 'Cst') {
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
        if (!data)
            return;
        var suit = this.suit;
        this.setData(data);
        console.log('local analyse result', data);
        suit.drawSelect.$selectrpend = end;
        suit.drawSelect.$selectrpstart = start;
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
        this.suit.drawobj.drawdot(this.suit.viewposition < this.width * 2 ? this.width * 2 : this.suit.viewposition);
    };
    DrawAnalyse.prototype.markAccPoint = function (x, y, marked) {
        if (marked === void 0) { marked = true; }
        if (!this.analysisData)
            return;
        var edge = 24;
        var acc = this.analysisData.analysis.acc;
        var target = acc.find(function (_) { return (x < _.x + edge) && (x > _.x - edge); });
        if (target && (y < (target.y + edge) && y > (target.y - edge))) {
            target.marked = marked;
        }
        this.refresh();
    };
    DrawAnalyse.prototype.markDecPoint = function (x, y, type) {
        if (!this.analysisData)
            return;
        var edge = 24;
        var dec = this.analysisData.analysis.dec;
        var target = dec.find(function (_) { return (x < _.x + edge) && (x > _.x - edge); });
        if (target && (y < (target.y + edge) && y > (target.y - edge))) {
            target.type = type;
        }
        this.refresh();
    };
    return DrawAnalyse;
}(Draw_1.default));
exports.DrawAnalyse = DrawAnalyse;
//# sourceMappingURL=DrawAnalyse.js.map