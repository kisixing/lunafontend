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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Draw_1 = __importDefault(require("../Draw"));
var Queue_1 = __importDefault(require("./Queue"));
var utils_1 = require("@lianmed/utils");
var BASE_INEVAL = 128;
var adu = 52;
var samplingrate = 90;
var points_one_times = 8;
var gride_width = 40;
var gx = points_one_times * ((gride_width * 5) / samplingrate);
var x_start = 25;
var ruler = [64, 64, 64, 64, 64, 64, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 64, 64, 64, 64, 64, 64];
var isstop = true;
var loopmill = 90;
var displayMode;
(function (displayMode) {
    displayMode[displayMode["canvas"] = 0] = "canvas";
    displayMode[displayMode["text"] = 1] = "text";
})(displayMode || (displayMode = {}));
var DrawEcg = (function (_super) {
    __extends(DrawEcg, _super);
    function DrawEcg(args) {
        var _this = _super.call(this) || this;
        _this.mode = displayMode.canvas;
        _this.ecg_scope = 2;
        _this.current_times = 0;
        _this.max_times = 135;
        _this.current_time_millis = 0;
        _this.start = NaN;
        _this.intervalIds = [];
        var canvas = args.canvas, canvasline = args.canvasline, canvasmonitor = args.canvasmonitor;
        var width = canvas.width, height = canvas.height;
        canvas.style.letterSpacing = '5px';
        Object.assign(_this, __assign(__assign({}, args), { width: width,
            height: height, ctx: canvas.getContext('2d'), linectx: canvasline.getContext('2d'), datactx: canvasmonitor.getContext('2d') }));
        _this.ecg();
        return _this;
    }
    DrawEcg.prototype.init = function (data) {
        if (data) {
            this.data = data;
            this.current_time_millis = 0;
            this.current_times = 0;
            isstop = false;
            this.last_points = [];
            this.timerEcg(loopmill);
            console.log(this);
        }
    };
    DrawEcg.prototype._resize = function () {
        var _a = this, height = _a.height, width = _a.width;
        this.mode = height <= 50 ? displayMode.text : displayMode.canvas;
        Object.assign(this.canvas, { width: width, height: height });
        Object.assign(this.canvasline, { width: width, height: height });
        Object.assign(this.canvasmonitor, { width: width, height: height });
        this.addfilltext();
        this.initparm();
    };
    DrawEcg.prototype.destroy = function () {
        isstop = false;
        this.intervalIds.forEach(function (_) { return clearInterval(_); });
        this.canvas = null;
        this.canvasline = null;
        this.canvasmonitor = null;
    };
    DrawEcg.prototype.ecg = function () {
        this.addfilltext();
        this.initparm();
    };
    DrawEcg.prototype.Convert16Scale = function () {
    };
    DrawEcg.prototype.addfilltext = function () {
        var _a = this, ctx = _a.ctx, canvas = _a.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 14px';
        ctx.fillText('' + 'I' + '', 10, 10);
        var scale = 1;
        ctx.strokeStyle = '#006003';
        ctx.beginPath();
        ctx.moveTo(x_start * 2, ruler[0] * scale);
        for (var i = 0; i < ruler.length; i++) {
            ctx.lineTo(i + x_start * 2, ruler[i] * scale);
        }
        ctx.stroke();
    };
    DrawEcg.prototype.DrawDatatext = function () {
        var _a = this, datactx = _a.datactx, data = _a.data, height = _a.height, width = _a.width;
        var keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];
        var v = Object.assign(Array(7).fill('--'), data.ecgdata);
        v[2] = v[2] + " ~ " + v[3];
        v.splice(3, 1);
        var entries = utils_1._R.zip(keys, v);
        datactx.clearRect(0, 0, width, height);
        if (height > 60) {
            var V_1 = (height) / 6;
            var size_1 = V_1 / 2;
            var D_1 = 10;
            datactx.fillStyle = "#222";
            datactx.font = "normal " + size_1 + "px YaHei";
            datactx.textAlign = 'right';
            datactx.textAlign = "center";
            datactx.textBaseline = "middle";
            entries.forEach(function (_a, i) {
                var k = _a[0], v = _a[1];
                var isRight = i > 2;
                var x = (isRight ? 10 : 26);
                var y = D_1 + (i % 3) * V_1 + 3 * size_1;
                datactx.fillText("" + k, width - size_1 * x, y);
                datactx.fillText("" + v, width - size_1 * (x - 8), y);
            });
        }
        else if (height > 30) {
            var d_1 = width / 6 + -2;
            var size = 14;
            var D_2 = 12;
            datactx.fillStyle = "#eee";
            datactx.fillRect(0, 0, width, height);
            if (width < 622) {
                size = 12;
            }
            if (width < 520) {
                size = 10;
            }
            datactx.font = "normal " + size + "px YaHei";
            datactx.fillStyle = "#222";
            datactx.textAlign = "center";
            datactx.textBaseline = "middle";
            entries.forEach(function (_a, i) {
                var k = _a[0], v = _a[1];
                var x = 50 + d_1 * i;
                if (width < 622) {
                    x = 40 + d_1 * i;
                }
                datactx.fillText("" + k, x, D_2, d_1);
                datactx.fillText("" + (v || ''), x, 2.5 * D_2, d_1);
            });
        }
        else {
            var d_2 = width / 6 + -2;
            var size = d_2 < 100 ? 9 : 11;
            var D_3 = 14;
            datactx.fillStyle = "#eee";
            datactx.fillRect(0, 0, width, height);
            datactx.font = "normal " + size + "px YaHei";
            datactx.fillStyle = "#222";
            datactx.textAlign = "center";
            datactx.textBaseline = "middle";
            entries.forEach(function (_a, i) {
                var k = _a[0], v = _a[1];
                var x = 40 + (i > 0 ? (i > 4 ? d_2 - 2 : (d_2 - 6)) : d_2) * i;
                datactx.fillText("" + k + (v || ''), x, D_3, d_2);
            });
        }
    };
    DrawEcg.prototype.getLength = function (val) {
        var str = new String(val);
        var bytesCount = 0;
        for (var i = 0, n = str.length; i < n; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                bytesCount += 1;
            }
            else {
                bytesCount += 2;
            }
        }
        return bytesCount;
    };
    DrawEcg.prototype.initparm = function () {
        var _a = this, canvasline = _a.canvasline, linectx = _a.linectx;
        if (canvasline.width < 150) {
        }
        else {
            this.max_times = Math.floor((canvasline.width - 25) * 0.6 / gx);
        }
        linectx.strokeStyle = '#9d6003';
        this.current_times = 0;
    };
    DrawEcg.prototype.timerEcg = function (dely) {
        var _this = this;
        var id = setInterval(function () {
            if (!_this) {
                console.log('ecg', 'clear interval');
                clearInterval(id);
            }
            _this.DrawDatatext();
            var A = new Date().getTime();
            _this.current_time_millis = A;
            if (!isNaN(_this.start) || _this.data.ecg.GetSize() > points_one_times * 5) {
                _this.start = 1;
                _this.drawsingle();
            }
        }, dely);
        this.intervalIds.push(id);
    };
    DrawEcg.prototype.drawsingle = function () {
        var _a = this, last_points = _a.last_points, max_times = _a.max_times, linectx = _a.linectx;
        var y_starts = this.GetYStarts(12);
        if (isstop) {
            return;
        }
        isstop = true;
        this.current_times = this.current_times % max_times;
        if (this.data.ecg.IsEmpty()) {
            this.start = NaN;
            isstop = false;
            return;
        }
        if (this.data.ecg.GetSize() < points_one_times * 5) {
            this.start = NaN;
            isstop = false;
            return;
        }
        this.clearcanvans(this.current_times, points_one_times, samplingrate, linectx);
        var F = [];
        var invalid = 0;
        for (var J = 0; J < points_one_times; J++) {
            var ecgdot = this.data.ecg.DeQueue();
            if (ecgdot == 1) {
                invalid++;
            }
            else {
                invalid = 0;
            }
            if (ecgdot > BASE_INEVAL) {
                ecgdot = ecgdot - BASE_INEVAL;
            }
            else if (ecgdot > 0) {
                ecgdot = -ecgdot;
            }
            F.push(ecgdot * this.ecg_scope);
        }
        if (invalid > 7) {
            return;
        }
        var L = x_start + this.current_times * points_one_times * ((gride_width * 5) / samplingrate);
        linectx.beginPath();
        for (var K = 0; K < F.length; K++) {
            var C = F[K] - BASE_INEVAL;
            var I = K * (gride_width * 5 / samplingrate);
            var M = void 0;
            linectx.strokeStyle = '#9d6003';
            if (this.ecg_scope != 0) {
                M = Math.abs(C);
            }
            else {
                M = (Math.abs(C) * (adu / (gride_width * 2))) / 2;
            }
            if (K == 0) {
                if (this.current_times != 0) {
                    linectx.moveTo(last_points[0], last_points[1]);
                    var D = parseFloat(C >= 0 ? y_starts[0] - M : y_starts[0] + M);
                    linectx.lineTo(last_points[0], D);
                    last_points[0] = last_points[0];
                    last_points[1] = D;
                }
                else {
                    var D = parseFloat(C >= 0 ? y_starts[0] - M : y_starts[0] + M);
                    linectx.moveTo(x_start, D);
                    last_points[0] = x_start;
                    last_points[1] = D;
                }
            }
            else {
                linectx.moveTo(last_points[0], last_points[1]);
                var D = parseFloat(C >= 0 ? y_starts[0] - M : y_starts[0] + M);
                linectx.lineTo(L + I, D);
                if (L + I < last_points[0]) {
                }
                last_points[0] = L + I;
                last_points[1] = D;
            }
        }
        linectx.stroke();
        this.current_times++;
        isstop = false;
    };
    DrawEcg.prototype.clearcanvans = function (B, F, C, D) {
        var A = F * ((gride_width * 5) / C);
        var E = x_start + B * A;
        if (B != 0) {
            D.clearRect(E, 0, 20, this.height);
        }
        else {
            D.clearRect(E - 10, 0, E + 20, this.height);
        }
    };
    DrawEcg.prototype.GetYStarts = function (C) {
        var height = this.height;
        var B = [];
        for (var A = 0; A < C; A++) {
            if (height < 480) {
                B[A] = -BASE_INEVAL / 2 + A * 100 - 20 + 0.3 * height;
            }
            else {
                B[A] = -BASE_INEVAL / 2 + A * 100 - 20 + 0.3 * height;
            }
        }
        return B;
    };
    DrawEcg.Queue = Queue_1.default;
    return DrawEcg;
}(Draw_1.default));
exports.DrawEcg = DrawEcg;
