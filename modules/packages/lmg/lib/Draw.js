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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@lianmed/utils");
var sid = 0;
var Draw = (function (_super) {
    __extends(Draw, _super);
    function Draw(width, height, canvas) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var _this = _super.call(this) || this;
        _this.sid = sid++;
        _this.log = console.log.bind(console, _this.constructor.name, _this.sid);
        _this.canvas = canvas;
        _this.context2D = canvas && canvas.getContext('2d');
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Object.defineProperty(Draw.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (v) {
            this._width = v;
            this.canvas && (this.canvas.width = v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Draw.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (v) {
            this._height = v;
            this.canvas && (this.canvas.height = v);
        },
        enumerable: true,
        configurable: true
    });
    Draw.prototype.destroy = function () { };
    Draw.prototype.init = function (data) { };
    Draw.prototype.resize = function (w, h) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        var rect = this.wrap ? this.wrap.getBoundingClientRect() : { width: w, height: h };
        var width = rect.width, height = rect.height;
        this.width = width;
        this.height = height;
        this._resize();
    };
    Draw.prototype._resize = function () {
    };
    return Draw;
}(utils_1.EventEmitter));
exports.default = Draw;
