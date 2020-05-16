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
var Draw_1 = __importDefault(require("../Draw"));
var Queue_1 = __importDefault(require("./Queue"));
var BASE_INEVAL = 128;
var adu = 52;
var samplingrate = 90;
var points_one_times = 8;
var gride_width = 40;
var gx = points_one_times * ((gride_width * 5) / samplingrate);
var x_start = 25;
var isstop = true;
var loopmill = 90;
var DrawPle = (function (_super) {
    __extends(DrawPle, _super);
    function DrawPle(width, height, canvas) {
        var _this = _super.call(this, width, height, canvas) || this;
        _this.ecg_scope = 2;
        _this._current_times = 0;
        _this.max_times = 135;
        _this.start = NaN;
        _this.intervalIds = [];
        _this.context2D = _this.context2D;
        return _this;
    }
    Object.defineProperty(DrawPle.prototype, "current_times", {
        get: function () {
            return this._current_times;
        },
        set: function (value) {
            this._current_times = value % this.max_times;
        },
        enumerable: true,
        configurable: true
    });
    DrawPle.prototype.init = function (ple_data) {
        if (ple_data) {
            this.ple_data = ple_data;
            this.current_times = 0;
            isstop = false;
            this.last_points = [];
        }
    };
    DrawPle.prototype.destroy = function () {
        isstop = false;
        this.intervalIds.forEach(function (_) { return clearInterval(_); });
        this.canvas = null;
        this.canvas = null;
    };
    DrawPle.prototype.initparm = function () {
        var _a = this, canvas = _a.canvas, context2D = _a.context2D;
        context2D.lineJoin = 'round';
        context2D.strokeStyle = '#9d6003';
        if (canvas.width < 150) {
        }
        else {
            this.max_times = Math.floor((canvas.width - 25) * 0.6 / gx);
        }
        this.current_times = 0;
    };
    DrawPle.prototype.drawsingle = function () {
        var _a = this, last_points = _a.last_points, context2D = _a.context2D;
        var y_starts = this.GetYStarts(12);
        if (isstop) {
            return;
        }
        isstop = true;
        if (this.ple_data.IsEmpty()) {
            this.start = NaN;
            isstop = false;
            return;
        }
        if (this.ple_data.GetSize() < points_one_times * 5) {
            this.start = NaN;
            isstop = false;
            return;
        }
        this.clearcanvans();
        var F = [];
        var invalid = 0;
        for (var J = 0; J < points_one_times; J++) {
            var ecgdot = this.ple_data.DeQueue();
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
        var L = x_start + this.current_times * gx;
        context2D.beginPath();
        for (var K = 0; K < F.length; K++) {
            var C = F[K] - BASE_INEVAL;
            var I = K * (gride_width * 5 / samplingrate);
            var M = void 0;
            if (this.ecg_scope != 0) {
                M = Math.abs(C);
            }
            else {
                M = (Math.abs(C) * (adu / (gride_width * 2))) / 2;
            }
            var D = parseFloat(C >= 0 ? y_starts[0] - M : y_starts[0] + M);
            if (K == 0) {
                if (this.current_times != 0) {
                    context2D.moveTo(last_points[0], last_points[1]);
                    context2D.lineTo(last_points[0], D);
                    last_points[0] = last_points[0];
                    last_points[1] = D;
                }
                else {
                    context2D.moveTo(x_start, D);
                    last_points[0] = x_start;
                    last_points[1] = D;
                }
            }
            else {
                context2D.moveTo(last_points[0], last_points[1]);
                context2D.lineTo(L + I, D);
                if (L + I < last_points[0]) {
                }
                last_points[0] = L + I;
                last_points[1] = D;
            }
        }
        context2D.stroke();
        this.current_times++;
        isstop = false;
    };
    DrawPle.prototype.clearcanvans = function () {
        var current_times = this.current_times;
        var context2D = this.context2D;
        if (current_times != 0) {
            context2D.clearRect(x_start + current_times * gx, 0, 20, this.height);
        }
        else {
            context2D.clearRect(x_start - 10, 0, x_start + 20, this.height);
        }
    };
    DrawPle.prototype.GetYStarts = function (C) {
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
    DrawPle.Queue = Queue_1.default;
    return DrawPle;
}(Draw_1.default));
exports.DrawPle = DrawPle;
//# sourceMappingURL=DrawPle.js.map