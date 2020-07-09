"use strict";
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
var types_1 = require("@lianmed/lmg/lib/services/types");
var utils_1 = require("@lianmed/utils");
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var index_1 = __importDefault(require("../Item/index"));
var WorkbenchItem = function (props) {
    var onSelect = props.onSelect, bordered = props.bordered, activeColor = props.activeColor, fontColor = props.fontColor, itemData = props.itemData, onClose = props.onClose, _a = props.loading, loading = _a === void 0 ? false : _a, fullScreenId = props.fullScreenId, itemHeight = props.itemHeight, itemSpan = props.itemSpan, outPadding = props.outPadding, data = props.data, bedname = props.bedname, status = props.status, unitId = props.unitId, headColor = props.headColor, backgroundColor = props.backgroundColor, borderedColor = props.borderedColor;
    var startTime = props.startTime, pregnancy = props.pregnancy;
    var _b = react_1.useState(false), isFullscreen = _b[0], setIsFullscreen = _b[1];
    var w = window;
    var k = "spinfo_" + unitId;
    var c = w[k] || (w[k] = {});
    if ([types_1.BedStatus.Stopped, types_1.BedStatus.OfflineStopped].includes(status)) {
        startTime = c.startTime;
        pregnancy = c.pregnancy || {};
    }
    else {
        Object.assign(c, { pregnancy: __assign(__assign({}, pregnancy), { pvId: null }), startTime: startTime });
    }
    var ref = react_1.useRef(null);
    var fullScreenCb = react_1.useCallback(function (e) {
        var el = react_dom_1.default.findDOMNode(ref.current);
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        else {
            el.requestFullscreen();
        }
    }, []);
    react_1.useEffect(function () {
        var cb = function (e) {
            var el = react_dom_1.default.findDOMNode(ref.current);
            if (e.target === el) {
                setIsFullscreen(!isFullscreen);
            }
        };
        document.addEventListener('fullscreenchange', cb);
        return function () {
            document.removeEventListener('fullscreenchange', cb);
        };
    }, [isFullscreen]);
    react_1.useEffect(function () {
        if (fullScreenId === unitId) {
            fullScreenCb(null);
            utils_1.event.emit('bedFullScreen', unitId);
        }
    }, [fullScreenId]);
    return (react_1.default.createElement(antd_1.Col, { span: itemSpan, ref: ref, onClick: function () { return onSelect(unitId); }, style: { transition: 'background .6s', padding: outPadding, border: "1px solid " + borderedColor, height: itemHeight, background: bordered ? activeColor : backgroundColor, position: 'relative' } },
        react_1.default.createElement(index_1.default, { fontColor: fontColor, isFullscreen: isFullscreen, themeColor: headColor, startTime: startTime, bedname: bedname, status: status, data: data, onDoubleClick: fullScreenCb, loading: loading, onClose: onClose && (function () { return onClose(itemData); }), unitId: unitId, name: pregnancy.name, age: pregnancy.age, bedNO: pregnancy.bedNO, GP: pregnancy.GP, gestationalWeek: pregnancy.gestationalWeek, onSelect: null }, props.children)));
};
exports.default = react_1.memo(WorkbenchItem);
;
//# sourceMappingURL=Item.js.map