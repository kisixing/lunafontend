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
var DrawSelect = (function (_super) {
    __extends(DrawSelect, _super);
    function DrawSelect(canvas, suit, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var _this = _super.call(this, width, height, canvas) || this;
        _this.selectrpstart = 0;
        _this.selectend = 0;
        _this.selectrpend = 0;
        _this.selectflag = false;
        _this.selectstart = 0;
        _this.selectstartposition = 0;
        _this.clearselect = function () {
            var _a = _this, suit = _a.suit, context2D = _a.context2D;
            var selectcontext = context2D;
            selectcontext.clearRect(0, 0, suit.width, suit.height);
            _this.selectrpstart = 0;
            _this.selectend = 0;
            _this.selectrpend = 0;
            _this.selectflag = false;
            _this.selectstart = 0;
            _this.selectstartposition = 0;
        };
        _this.showselect = function (start, end) {
            var _a = _this, suit = _a.suit, context2D = _a.context2D;
            var selectcontext = context2D;
            start = start === void 0 ? _this.selectrpstart : start;
            end = end === void 0 ? _this.selectrpend : end;
            var basetop = _this.suit.drawobj.basetop;
            var drawwidth = suit.width;
            selectcontext.clearRect(0, 0, drawwidth, suit.height);
            if (end == 0) {
                return;
            }
            var curstart = suit.rightViewPosition < drawwidth * 2 ? 0 : (suit.rightViewPosition - drawwidth * 2);
            if (suit.data.index <= drawwidth * 2) {
                end = end / 2;
            }
            else {
                end = (suit.rightViewPosition - end) > 0 ? drawwidth - Math.floor((suit.rightViewPosition - end) / 2) : drawwidth;
            }
            start = start - curstart > 0 ? start - curstart : 0;
            start = (start + 4) / 2;
            var baseHeight = _this.suit.height - 4;
            selectcontext.fillStyle = suit.ctgconfig.selectarea;
            selectcontext.beginPath();
            selectcontext.strokeStyle = 'rgb(10, 10, 20)';
            selectcontext.lineWidth = 4;
            selectcontext.moveTo(start, basetop);
            selectcontext.lineTo(start, baseHeight);
            selectcontext.moveTo(start, baseHeight);
            selectcontext.lineTo(end, baseHeight);
            selectcontext.moveTo(end, basetop);
            selectcontext.lineTo(start, basetop);
            if (_this.selectend == 0) {
                selectcontext.moveTo(end, basetop);
                selectcontext.lineTo(end, baseHeight);
            }
            selectcontext.stroke();
            _this.startingBar.setLeft(start - 2, false);
            _this.endingBar.setLeft(end - 2, false);
            var leftEdge = _this.suit.leftViewposition - 240;
            var rightEdge = _this.suit.rightViewPosition + 240;
            if (_this.selectrpstart <= leftEdge || _this.selectrpstart >= rightEdge) {
                _this.startingBar.setVisibility(false);
            }
            else {
                _this.startingBar.setVisibility(_this.selectflag);
            }
            if (_this.selectrpend <= leftEdge || _this.selectrpend >= rightEdge) {
                _this.endingBar.setVisibility(false);
            }
            else {
                _this.endingBar.setVisibility(_this.selectflag);
            }
        };
        _this.suit = suit;
        return _this;
    }
    Object.defineProperty(DrawSelect.prototype, "selectingBarPoint", {
        get: function () {
            var suit = this.suit;
            return ~~(suit.leftViewposition + (this.selectingBar ? this.selectingBar.getLeft() * 2 : 0));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawSelect.prototype, "$selectrpend", {
        get: function () {
            return this.selectrpend;
        },
        set: function (value) {
            this.selectrpend = value;
            var absLen = (value - this.suit.leftViewposition) / 2;
            this.endingBar.setLeft(absLen, false);
            this.showselect();
            this.selectflag && this.suit.drawobj.showcur(value);
            this.suit.emit('endTime', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawSelect.prototype, "$selectrpstart", {
        get: function () {
            return this.selectrpstart;
        },
        set: function (value) {
            this.selectrpstart = value;
            var absLen = (value - this.suit.leftViewposition) / 2;
            this.startingBar.setLeft(absLen, false);
            this.showselect();
            this.selectflag && this.suit.drawobj.showcur(value);
            this.suit.emit('startTime', value);
        },
        enumerable: true,
        configurable: true
    });
    DrawSelect.prototype.init = function () {
        this.createBar();
    };
    DrawSelect.prototype.selectBasedOnStartingBar = function (isLeft, len) {
        if (isLeft === void 0) { isLeft = true; }
        if (len === void 0) { len = this.suit.ctgconfig.print_interval * 240; }
        var suit = this.suit;
        var width = suit.width, data = suit.data;
        var endPosition;
        if (isLeft) {
            if (this.selectingBarPoint < 1) {
                this.selectingBar.setLeft(this.width);
                suit.rightViewPosition = data.index;
            }
            endPosition = this.selectingBarPoint - len;
            this.$selectrpstart = Math.max(endPosition, 0);
            this.$selectrpend = this.selectingBarPoint;
        }
        else {
            if (this.selectingBarPoint + 10 >= data.index) {
                suit.rightViewPosition = width * 2;
                this.selectingBar.setLeft(0);
            }
            endPosition = this.selectingBarPoint + len;
            this.$selectrpend = Math.min(endPosition, data.index);
            this.$selectrpstart = this.selectingBarPoint;
        }
        this.suit.updateBarTool();
    };
    DrawSelect.prototype.updateSelectCur = function () {
        var suit = this.suit;
        if (suit.rightViewPosition > suit.canvasline.width * 2) {
            this.selectstart =
                this.selectstartposition * 2 + suit.rightViewPosition - 2 * suit.canvasline.width;
        }
        else {
            this.selectstart = this.selectstartposition * 2;
        }
        suit.drawobj.showcur(this.selectstart, false);
    };
    DrawSelect.prototype.createBar = function () {
        var _this = this;
        if (this.startingBar && this.endingBar && this.selectingBar) {
            this.selectingBar.setLeft(0);
            this.startingBar.setLeft(0);
            return;
        }
        var barTool = this.suit.barTool;
        var startingBar = (this.startingBar = barTool.createRod('开始'));
        var endingBar = (this.endingBar = barTool.createRod('结束'));
        var selectingBar = (this.selectingBar = barTool.createRod('选择'));
        this.suit.type === 0 && selectingBar.setVisibility(false);
        selectingBar.setLeft(0);
        startingBar.setLeft(0);
        endingBar.toggleVisibility();
        startingBar.toggleVisibility();
        selectingBar.on('change:x', function (value) {
            if (!_this.suit)
                return;
            _this.suit.drawobj && _this.suit.drawobj.showcur(_this.selectingBarPoint, false);
            _this.suit.emit('change:selectPoint', _this.selectingBarPoint);
        });
        startingBar.on('change:x', function (value) {
            _this.$selectrpstart = suit.leftViewposition + value * 2;
        });
        var suit = this.suit;
        endingBar.on('change:x', function (value) {
            if (suit.data.index < suit.canvasline.width * 2) {
                _this.selectrpend = value * 2;
            }
            else {
                _this.selectrpend = suit.rightViewPosition - (suit.canvasline.width - value) * 2;
            }
            if (_this.selectrpstart > _this.selectrpend) {
                return;
            }
            _this.showselect();
            _this.suit.emit('endTime', _this.selectrpend);
            _this.$selectrpend = suit.leftViewposition + value * 2;
        });
    };
    return DrawSelect;
}(Draw_1.default));
exports.DrawSelect = DrawSelect;
//# sourceMappingURL=DrawSelect.js.map