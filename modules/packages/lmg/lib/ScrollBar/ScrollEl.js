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
var ScrollEl = (function (_super) {
    __extends(ScrollEl, _super);
    function ScrollEl(wrapper, options) {
        if (options === void 0) { options = null; }
        var _this = _super.call(this) || this;
        _this.hasMoved = false;
        _this.mates = [];
        _this.matesOldRect = [];
        _this.moveCb = function (baseX, baseY, e) {
            _this.hasMoved = true;
            requestAnimationFrame(function () {
                var _a = getCoordInDocument(e), x = _a.x, y = _a.y;
                var offsetLeft = x - baseX;
                var offsetRight = y - baseY;
                _this.lockMovementX || _this.setLeft(offsetLeft);
                _this.lockMovementY || _this.setTop(offsetRight);
            });
        };
        _this.mousedownCb = function (e) {
            _this.emit('mousedown');
            _this.matesOldRect = _this.mates.map(function (_) { return _.getRect(); });
            _this.oldRect = _this.getRect();
            e.stopPropagation();
            var _a = _this, el = _a.el, wrapper = _a.wrapper;
            var _b = getCoordInDocument(e), x = _b.x, y = _b.y;
            var elRex = el.getBoundingClientRect();
            var boxRec = wrapper.getBoundingClientRect();
            var elLeft = elRex.left, elTop = elRex.top;
            var boxLeft = boxRec.left, boxTop = boxRec.top;
            var xSpan = x - elLeft;
            var ySpan = y - elTop;
            document.onmousemove = _this.moveCb.bind(_this, (boxLeft + xSpan), (boxTop + ySpan));
            document.onmouseup = function () {
                _this.emit('mouseup');
                document.onmousemove = null;
            };
        };
        _this.touchstartCb = function (e) {
            _this.emit('touchstart');
            _this.matesOldRect = _this.mates.map(function (_) { return _.getRect(); });
            _this.oldRect = _this.getRect();
            e.stopPropagation();
            var _a = _this, el = _a.el, wrapper = _a.wrapper;
            var _b = getCoordInDocument(e), x = _b.x, y = _b.y;
            var elRex = el.getBoundingClientRect();
            var boxRec = wrapper.getBoundingClientRect();
            var elLeft = elRex.left, elTop = elRex.top;
            var boxLeft = boxRec.left, boxTop = boxRec.top;
            var xSpan = x - elLeft;
            var ySpan = y - elTop;
            var fn = _this.moveCb.bind(_this, (boxLeft + xSpan), (boxTop + ySpan));
            document.addEventListener('touchmove', fn);
            document.addEventListener('touchend', function () {
                _this.emit('touchend');
                document.removeEventListener('touchmove', fn);
            });
        };
        Object.assign(_this, options);
        var el = _this.el = document.createElement('div');
        _this.wrapper = wrapper;
        el.addEventListener('mousedown', _this.mousedownCb);
        el.addEventListener('touchstart', _this.touchstartCb);
        wrapper.appendChild(el);
        el.setAttribute('style', "background:red;position:absolute;user-select:none");
        return _this;
    }
    ScrollEl.prototype.setStyle = function (key, value) {
        var keys = ['width', 'height', 'left', 'right', 'top', 'bottom', 'margin'];
        this.el.style[key] = String(value) + ((keys.includes(key) && typeof value === 'number') ? 'px' : '');
        return this;
    };
    ScrollEl.prototype.setStyles = function (styles) {
        var _this = this;
        Object.keys(styles).forEach(function (key) {
            _this.setStyle(key, styles[key]);
        });
        return this;
    };
    ScrollEl.prototype.toggleVisibility = function () {
        var isHidden = this.el.style.visibility === 'hidden';
        this.setStyle('visibility', isHidden ? 'visible' : 'hidden');
        return this;
    };
    ScrollEl.prototype.setVisibility = function (isHidden) {
        this.setStyle('visibility', isHidden ? 'visible' : 'hidden');
    };
    ScrollEl.prototype.addEventListener = function (key, cb) {
        this.el.addEventListener(key, cb);
        return this;
    };
    ScrollEl.prototype.setPosition = function (offset, isfire, direction) {
        if (isfire === void 0) { isfire = true; }
        var valueKey = direction === 'left' ? 'width' : 'height';
        var _a = this, el = _a.el, wrapper = _a.wrapper, mates = _a.mates, matesOldRect = _a.matesOldRect, oldRect = _a.oldRect;
        mates.forEach(function (_, i) { return _.setPosition(offset + matesOldRect[i][direction] - oldRect[direction], true, direction); });
        var boxRec = wrapper.getBoundingClientRect();
        var target = el.getBoundingClientRect();
        var boxValue = boxRec[valueKey];
        var targetValue = target[valueKey];
        var distance = boxValue - targetValue;
        var result = offset <= 0 ? 0 : offset >= distance ? distance : offset;
        if (el.style[direction] !== (result + 'px')) {
            this.setStyle(direction, result);
            isfire && this.emit("change:" + (direction === 'left' ? 'x' : 'y'), result || 0);
        }
        return this;
    };
    ScrollEl.prototype.setLeft = function (offset, isfire) {
        if (isfire === void 0) { isfire = true; }
        return this.setPosition(offset, isfire, 'left');
    };
    ScrollEl.prototype.getLeft = function () {
        return parseInt(getComputedStyle(this.el).left) || 0;
    };
    ScrollEl.prototype.setTop = function (offset, isfire) {
        if (isfire === void 0) { isfire = true; }
        return this.setPosition(offset, isfire, 'top');
    };
    ScrollEl.prototype.getTop = function () {
        return parseInt(getComputedStyle(this.el).top) || 0;
    };
    ScrollEl.prototype.getRect = function () {
        return this.el.getBoundingClientRect();
    };
    return ScrollEl;
}(utils_1.EventEmitter));
exports.default = ScrollEl;
function getCoordInDocument(e) {
    e = e || window.event;
    var x = e.pageX || e.clientX || (e.targetTouches && e.targetTouches[0] && e.targetTouches[0].clientX) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    var y = e.pageY || e.clientY || (e.targetTouches && e.targetTouches[0] && e.targetTouches[0].clientY) + (document.documentElement.scrollTop || document.body.scrollTop);
    return { x: x, y: y };
}
exports.getCoordInDocument = getCoordInDocument;
