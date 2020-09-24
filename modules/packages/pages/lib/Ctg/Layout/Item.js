"use strict";
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
var antd_1 = require("antd");
var index_1 = __importDefault(require("../Item/index"));
var utils_1 = require("@lianmed/utils");
var WorkbenchItem = function (props) {
    var onSelect = props.onSelect, bordered = props.bordered, borderedColor = props.borderedColor, themeColor = props.themeColor, RenderMaskIn = props.RenderMaskIn, itemData = props.itemData, onClose = props.onClose, _a = props.loading, loading = _a === void 0 ? false : _a, fullScreenId = props.fullScreenId, itemHeight = props.itemHeight, itemSpan = props.itemSpan, outPadding = props.outPadding, data = props.data, bedname = props.bedname, status = props.status, unitId = props.unitId;
    var startTime = props.startTime, pregnancy = props.pregnancy;
    var _b = react_1.useState(false), isFullscreen = _b[0], setIsFullscreen = _b[1];
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
    return (react_1.default.createElement(antd_1.Col, { span: itemSpan, ref: ref, onClick: function () { return onSelect && onSelect(unitId); }, style: { transition: 'all .3s', padding: outPadding, height: itemHeight, background: bordered ? borderedColor : "var(--customed-" + 'bg' + ")", position: 'relative' } },
        react_1.default.createElement(index_1.default, { isFullscreen: isFullscreen, themeColor: themeColor, startTime: startTime, bedname: bedname, status: status, data: data, onDoubleClick: fullScreenCb, loading: loading, onClose: onClose && (function () { return onClose(itemData); }), unitId: unitId, name: pregnancy.name, age: pregnancy.age, bedNO: pregnancy.bedNO, GP: pregnancy.GP, gestationalWeek: pregnancy.gestationalWeek, onSelect: null, RenderMaskIn: RenderMaskIn, telephone: pregnancy.telephone }, props.children)));
};
exports.default = react_1.memo(WorkbenchItem);
//# sourceMappingURL=Item.js.map