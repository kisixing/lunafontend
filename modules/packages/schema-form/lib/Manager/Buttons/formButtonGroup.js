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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_stikky_1 = __importDefault(require("react-stikky"));
var Context_1 = __importDefault(require("../Context"));
var components_1 = require("@lianmed/components");
var isElementInViewport = function (rect, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, _d = _b.threshold, threshold = _d === void 0 ? 0 : _d;
    var top = rect.top, right = rect.right, bottom = rect.bottom, left = rect.left, width = rect.width, height = rect.height;
    var intersection = {
        t: bottom,
        r: window.innerWidth - left,
        b: window.innerHeight - top,
        l: right,
    };
    var elementThreshold = {
        x: threshold * width,
        y: threshold * height,
    };
    return (intersection.t >= (offset.top || offset + elementThreshold.y) &&
        intersection.r >= (offset.right || offset + elementThreshold.x) &&
        intersection.b >= (offset.bottom || offset + elementThreshold.y) &&
        intersection.l >= (offset.left || offset + elementThreshold.x));
};
var FormButtonGroup = (function (_super) {
    __extends(FormButtonGroup, _super);
    function FormButtonGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRegistered = false;
        _this.stickyRef = react_1.default.createRef();
        return _this;
    }
    FormButtonGroup.prototype.onScrollHandler = function () {
        var stickyIns = this.stickyRef.current;
        return stickyIns.onScrollHandler(stickyIns);
    };
    FormButtonGroup.prototype.registerEvents = function () {
        var scrollWrapper = this.props.scrollWrapper;
        if (this.isRegistered || !scrollWrapper)
            return;
        this.isRegistered = true;
        var current = scrollWrapper.current;
        if (current) {
            current.addEventListener('scroll', this.onScrollHandler());
        }
    };
    FormButtonGroup.prototype.cancelEvents = function () {
        var scrollWrapper = this.props.scrollWrapper;
        if (this.isRegistered || !scrollWrapper)
            return;
        this.isRegistered = true;
        var current = scrollWrapper.current;
        if (current) {
            current.removeEventListener('scroll', this.onScrollHandler());
        }
    };
    FormButtonGroup.prototype.componentDidUpdate = function () {
        this.registerEvents();
    };
    FormButtonGroup.prototype.componentWillUnmount = function () {
        this.cancelEvents();
    };
    FormButtonGroup.prototype.render = function () {
        var _this = this;
        var style = this.props.style;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Context_1.default.Consumer, null, function (_a) {
                var _b = _a === void 0 ? {} : _a, FormRef = _b.FormRef, submit = _b.submit;
                if (!FormRef) {
                    return;
                }
                return (react_1.default.createElement(react_stikky_1.default, { ref: _this.stickyRef, edge: 'bottom', triggerDistance: _this.props.triggerDistance, zIndex: _this.props.zIndex, getStickyBoundary: _this.getStickyBoundaryHandler(FormRef), style: {
                        borderTop: '1px solid #eee',
                        background: (style && style.background) || '#fff',
                        padding: (style && style.padding) || '8px 10px',
                        boxShadow: '0px -1px 1px 0px #ddd',
                        borderRadius: '2px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    } },
                    react_1.default.createElement(components_1.Button, { interval: 2000, onClick: submit, size: "small", type: "primary" }, "\u63D0\u4EA4")));
            })));
    };
    FormButtonGroup.prototype.getStickyBoundaryHandler = function (ref) {
        var _this = this;
        return function () {
            _this.formNode = _this.formNode || react_dom_1.default.findDOMNode(ref.current);
            if (_this.formNode) {
                return isElementInViewport(_this.formNode.getBoundingClientRect());
            }
            return true;
        };
    };
    FormButtonGroup.defaultProps = {
        span: 24,
    };
    return FormButtonGroup;
}(react_1.Component));
exports.FormButtonGroup = FormButtonGroup;
