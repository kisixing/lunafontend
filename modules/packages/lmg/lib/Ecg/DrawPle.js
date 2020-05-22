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
var DrawEcg_1 = require("./DrawEcg");
var BASE_INEVAL = 128;
var adu = 52;
var samplingrate = 100;
var points_one_times = 6;
var points_one_second = 1000 * points_one_times / samplingrate;
var gride_width = 1;
var gx = points_one_times * gride_width;
var x_start = 40;
var scale = 0.5;
var baseY = 180;
var DrawPle = (function (_super) {
    __extends(DrawPle, _super);
    function DrawPle(wrap, canvas) {
        var _this = _super.call(this, wrap, canvas) || this;
        _this._current_times = 0;
        _this.max_times = 135;
        _this.start = NaN;
        _this.intervalIds = [];
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
    DrawPle.prototype.init = function (data) {
        console.log('ple', this);
        if (data) {
            this.initparm();
            this.ple_data = data.ple;
            this.data = data;
            this.current_times = 0;
            this.last_points = [];
            this.loop();
        }
    };
    DrawPle.prototype.destroy = function () {
        this.intervalIds.forEach(function (_) { return clearInterval(_); });
        this.canvas = null;
        this.canvas = null;
    };
    DrawPle.prototype._resize = function () {
        this.initparm();
    };
    DrawPle.prototype.loop = function () {
        var _this = this;
        var id = setInterval(function () {
            if (!_this) {
                console.log('ecg', 'clear interval');
                clearInterval(id);
            }
            _this.drawsingle();
        }, samplingrate);
        this.intervalIds.push(id);
    };
    DrawPle.prototype.initparm = function () {
        var _a = this, width = _a.width, context2D = _a.context2D, ple_data = _a.ple_data;
        context2D.strokeStyle = '#006003';
        context2D.font = 'bold 16px';
        context2D.textAlign = 'left';
        context2D.textBaseline = 'top';
        context2D.lineJoin = 'round';
        if (width < 150) {
        }
        else {
            this.max_times = Math.floor((width - x_start * 2) * DrawEcg_1.L_SCALE / gx);
            context2D.fillText('血氧', x_start - 30, baseY - 70);
            context2D.fillText('100', x_start - 30, baseY - 50);
            context2D.fillText('0', x_start - 30, baseY);
        }
        this.current_times = 0;
    };
    DrawPle.prototype.drawsingle = function () {
        var _a = this, last_points = _a.last_points, context2D = _a.context2D, height = _a.height;
        this.ple_data = this.data.ple;
        if (this.ple_data.GetSize() < points_one_times * 1) {
            this.start = NaN;
            console.log('ws ws ws', height < 50, this.ple_data.GetSize() < points_one_times * 1);
            return;
        }
        this.clearcanvans();
        var F = [];
        for (var J = 0; J < points_one_times; J++) {
            var ecgdot = this.ple_data.DeQueue();
            F.push(ecgdot * scale);
        }
        if (height < 50)
            return;
        var blockStartX = x_start + this.current_times * gx;
        context2D.beginPath();
        for (var K = 0; K < F.length; K++) {
            var y = baseY - F[K];
            var xSpan = K * gride_width;
            if (this.current_times !== 0) {
                context2D.moveTo(last_points[0], last_points[1]);
            }
            context2D.lineTo(blockStartX + xSpan, y);
            last_points[0] = blockStartX + xSpan;
            last_points[1] = y;
        }
        context2D.stroke();
        this.current_times++;
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
    DrawPle.Queue = Queue_1.default;
    return DrawPle;
}(Draw_1.default));
exports.DrawPle = DrawPle;
//# sourceMappingURL=DrawPle.js.map