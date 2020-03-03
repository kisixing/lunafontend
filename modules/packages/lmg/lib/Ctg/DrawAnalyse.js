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
var DrawAnalyse = (function (_super) {
    __extends(DrawAnalyse, _super);
    function DrawAnalyse(canvas, width, height) {
        if (width === void 0) { width = 30; }
        if (height === void 0) { height = -20; }
        return _super.call(this, width, height, canvas) || this;
    }
    DrawAnalyse.prototype.draw = function (analyseData, cur, color, yspan, xspan, max, basetop) {
        if (!analyseData) {
            return;
        }
        var _a = this, context2D = _a.context2D, width = _a.width, height = _a.height;
        context2D.clearRect(0, 0, width, height);
        var lastx = 0;
        var start = cur - width * 2 > 0 ? cur - width * 2 : 0;
        var curfhroffset = 0;
        context2D.beginPath();
        context2D.strokeStyle = color;
        context2D.lineWidth = 1;
        if (start <= analyseData.start && cur > analyseData.start) {
            var baselineoff = Math.ceil((analyseData.start - start) / (xspan * 6));
            var firstindex = baselineoff - 2 > 0 ? baselineoff - 2 : 0;
            console.log(firstindex);
            context2D.moveTo(baselineoff * xspan * 3, (max - curfhroffset - analyseData.baseline[firstindex]) * yspan + basetop);
            for (var i = baselineoff * xspan * 3 + 1; i < cur; i++) {
                baselineoff = Math.ceil((i - start) / (xspan * 6));
                if (baselineoff >= analyseData.baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    lastx = Math.floor((i - start) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - analyseData.baseline[baselineoff]) * yspan + basetop);
                }
            }
            context2D.stroke();
        }
        else if (start < analyseData.end) {
            var baselineoff = Math.ceil((start - analyseData.start) / (xspan * 6));
            var firstindex = baselineoff - 1 > 0 ? baselineoff - 1 : 0;
            context2D.moveTo(0, (max - curfhroffset - analyseData.baseline[firstindex]) * yspan + basetop);
            for (var i = start + 1; i < cur; i++) {
                baselineoff = Math.ceil((i - analyseData.start) / (xspan * 6));
                if (baselineoff >= analyseData.baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    lastx = Math.floor((i - start) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - analyseData.baseline[baselineoff]) * yspan + basetop);
                }
            }
            context2D.stroke();
        }
    };
    return DrawAnalyse;
}(Draw_1.default));
exports.DrawAnalyse = DrawAnalyse;
