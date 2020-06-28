"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ScrollEl_1 = __importDefault(require("./ScrollEl"));
var ScrollEl_2 = require("./ScrollEl");
function useScroll(box, wrapper) {
    var bar;
    var resolveGrab = function () { };
    var dragInterval = 10;
    react_1.useEffect(function () {
        var boxEl = box.current;
        bar = new ScrollEl_1.default(wrapper.current, { lockMovementY: true }).setStyles({
            background: '#4169E1',
            width: 10,
            height: 12,
            bottom: 0
        });
        var boxGrabCb = function (e) {
            if (e.which !== 1)
                return e.preventDefault();
            var x1 = ScrollEl_2.getCoordInDocument(e).x;
            var temp = x1;
            boxEl.style.cursor = 'grab';
            var fn = function (e) {
                requestAnimationFrame(function () {
                    var x2 = ScrollEl_2.getCoordInDocument(e).x;
                    if (Math.abs(x2 - temp) > dragInterval) {
                        resolveGrab(x2 - temp);
                        temp = x2;
                    }
                });
            };
            document.addEventListener('mousemove', fn);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', fn);
                boxEl.style.cursor = 'auto';
            });
        };
        var boxTouchCb = function (e) {
            var x1 = ScrollEl_2.getCoordInDocument(e).x;
            var temp = x1;
            var fn = function (e) {
                requestAnimationFrame(function () {
                    var x2 = ScrollEl_2.getCoordInDocument(e).x;
                    if (Math.abs(x2 - temp) > dragInterval) {
                        resolveGrab(x2 - x1);
                        temp = x2;
                    }
                });
            };
            document.addEventListener('touchmove', fn);
            document.addEventListener('touchend', function () {
                document.removeEventListener('touchmove', fn);
                boxEl.style.cursor = 'auto';
            });
        };
        boxEl.addEventListener('mousedown', boxGrabCb);
        boxEl.addEventListener('touchstart', boxTouchCb);
        return function () {
            boxEl.removeEventListener('mousedown', boxGrabCb);
            boxEl.removeEventListener('touchstart', boxTouchCb);
        };
    }, []);
    var g = function () {
        return {
            watch: function (fn) {
                bar.on('change:x', function (value) {
                    fn(value);
                });
            },
            watchGrab: function (fn, interval) {
                if (interval === void 0) { interval = 10; }
                resolveGrab = fn;
                dragInterval = interval;
            },
            setBarWidth: function (width) {
                bar.setStyles({ width: width });
            },
            setBarLeft: bar.setLeft.bind(bar),
            createRod: function (name, bg) {
                if (bg === void 0) { bg = '#aaa'; }
                var ins = new ScrollEl_1.default(wrapper.current, { lockMovementY: true }).setStyles({
                    width: 4,
                    background: bg,
                    height: '100%',
                    cursor: 'e-resize'
                }).on('mousedown', function () {
                    document.body.style.cursor = 'e-resize';
                }).on('mouseup', function () {
                    document.body.style.cursor = 'auto';
                });
                ins.el.innerHTML = "\n              <span style=\"user-select:none;position:absolute;bottom:-24px;width:100px;line-height:24px;left:-50px;text-align:center\">\n              " + name + "\n              </span>\n              <div style=\"margin-left:-8px; margin-top:-1px;width: 0; height: 0; border: 10px solid; border-color: " + bg + " transparent transparent transparent\"></div>\n          ";
                return ins;
            },
            createHLine: function (bg) {
                if (bg === void 0) { bg = '#FFCC99'; }
                var ins0 = new ScrollEl_1.default(wrapper.current, { lockMovementX: true }).setStyles({
                    width: '100%',
                    background: bg,
                    height: '2px',
                    cursor: 'n-resize'
                }).on('mousedown', function () {
                    document.body.style.cursor = 'n-resize';
                }).on('mouseup', function () {
                    document.body.style.cursor = 'auto';
                });
                var ins = [];
                return {
                    toggleVisibility: function () {
                        ins.forEach(function (_) { return _.toggleVisibility(); });
                        ins0.toggleVisibility();
                    },
                    rowline: ins0,
                    setBase: function (n) {
                        ins0.setStyle('bottom', n);
                        ins.forEach(function (i) { return i.setStyle('bottom', n + ins0.getRect().height); });
                    },
                    addDot: function (_a) {
                        var _b = _a.width, width = _b === void 0 ? 4 : _b, _c = _a.height, height = _c === void 0 ? 10 : _c, _d = _a.left, left = _d === void 0 ? 0 : _d;
                        var i = new ScrollEl_1.default(wrapper.current, { lockMovementY: true }).setStyles({
                            background: 'transparent',
                            border: "6px solid transparent",
                            left: left,
                            height: 0
                        });
                        ins.push(i);
                        ins0.mates.push(i);
                        return i;
                    }
                };
            }
        };
    };
    return [g];
}
exports.default = useScroll;
//# sourceMappingURL=useScroll.js.map