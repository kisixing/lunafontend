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
    function DrawAnalyse(canvas, width, height) {
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
                txt = "" + (target.reliability / 10 || 0).toFixed(1);
                canvas.font = '15px arial';
                canvas.fillStyle = 'blue';
                canvas.fillText(txt, x + 1, y + 10);
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
        _this.ctgscore = function (type, start, end) {
            var analysisData = _this.analysisData;
            if (!analysisData)
                return;
            var analysis = analysisData.analysis, score = analysisData.score;
            if (type == 0) {
                score.nstdata.bhrvalue = analysis.bhr;
                if (analysis.bhr < 100)
                    score.nstdata.bhrscore = 0;
                else if (_this.inRange(analysis.bhr, 100, 109) || analysis.bhr > 160)
                    score.nstdata.bhrscore = 1;
                else if (_this.inRange(analysis.bhr, 120, 160)) {
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
                var fhr_uptime = analysis.ltv;
                score.nstdata.ltvvalue = fhr_uptime;
                if (fhr_uptime < 10) {
                    score.nstdata.ltvscore = 0;
                }
                else if (_this.inRange(fhr_uptime, 10, 14)) {
                    score.nstdata.ltvscore = 1;
                }
                else if (fhr_uptime > 15) {
                    score.nstdata.ltvscore = 2;
                }
                var fhr_ampl = 10;
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
                var fmnum = analysis.fm.length;
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
            }
        };
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
    DrawAnalyse.prototype.revice = function (x, y) {
        if (!this.analysisData)
            return;
        var edge = 20;
        var _a = this.analysisData.analysis, acc = _a.acc, dec = _a.dec;
        var target = acc.find(function (_) { return (x < _.x + edge) && (x > _.x - edge); }) || dec.find(function (_) { return (x < _.x + edge) && (x > _.x - edge); });
        if (target && (y < (target.y + edge) && y > (target.y - edge))) {
            console.log(x, y, target);
        }
    };
    return DrawAnalyse;
}(Draw_1.default));
exports.DrawAnalyse = DrawAnalyse;
//# sourceMappingURL=DrawAnalyse.js.map