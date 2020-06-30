"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var react_1 = __importStar(require("react"));
var Ecg_1 = __importDefault(require("../Ecg"));
var ScrollBar_1 = __importDefault(require("../ScrollBar"));
var WsService_1 = require("../services/WsService");
var useDraw_1 = __importDefault(require("../useDraw"));
var ButtonTools_1 = require("./ButtonTools");
var ContextMenu_1 = __importDefault(require("./ContextMenu"));
var Loading_1 = require("./Loading");
var Suit_1 = require("./Suit");
var styled_components_1 = __importDefault(require("styled-components"));
var MultiParam_1 = require("./MultiParam");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width:100%;\n  height:100%;\n  display:flex;\n  .btns{\n    display:none\n  }\n  :hover .btns{\n    display:block\n  }\n  .bar {\n    opacity:0;\n    transition:opacity 0.5s;\n  }\n  :hover .bar{\n    opacity:1\n  }\n  .box {\n    flex:1\n  }\n"], ["\n  width:100%;\n  height:100%;\n  display:flex;\n  .btns{\n    display:none\n  }\n  :hover .btns{\n    display:block\n  }\n  .bar {\n    opacity:0;\n    transition:opacity 0.5s;\n  }\n  :hover .bar{\n    opacity:1\n  }\n  .box {\n    flex:1\n  }\n"])));
exports.default = react_1.memo(react_1.forwardRef(function (props, ref) {
    var data = props.data, _a = props.mutableSuitObject, mutableSuitObject = _a === void 0 ? { suit: null } : _a, _b = props.suitType, suitType = _b === void 0 ? 0 : _b, _c = props.loading, loading = _c === void 0 ? false : _c, _d = props.onReady, onReady = _d === void 0 ? function (s) { } : _d, audios = props.audios, isFullscreen = props.isFullscreen, others = __rest(props, ["data", "mutableSuitObject", "suitType", "loading", "onReady", "audios", "isFullscreen"]);
    var ismulti = false || data.ismulti;
    var _e = react_1.useState(false), ctgReady = _e[0], setCtgReady = _e[1];
    var isV3 = false || data && (data.deviceType === 'V3');
    var barTool = react_1.useRef(null);
    var canvasgrid = react_1.useRef(null);
    var canvasdata = react_1.useRef(null);
    var canvasline = react_1.useRef(null);
    var canvasselect = react_1.useRef(null);
    var canvasanalyse = react_1.useRef(null);
    var box = react_1.useRef(null);
    var ctgBox = react_1.useRef(null);
    var ctg = react_1.useRef(null);
    var ecg = react_1.useRef(null);
    var rightClickXy = react_1.useRef({ x: 0, y: 0 });
    useDraw_1.default(data, ctgBox, function () {
        var instance = ctg.current = new Suit_1.Suit(canvasgrid.current, canvasdata.current, canvasline.current, canvasselect.current, canvasanalyse.current, ctgBox.current, barTool.current, suitType);
        onReady(instance);
        mutableSuitObject.suit = instance;
        setCtgReady(true);
        return instance;
    }, function () {
    });
    console.log('isFullScreen', isFullscreen);
    WsService_1.useCheckNetwork(function (isOn) { return ctg.current && (ctg.current.isOn = isOn); });
    react_1.useImperativeHandle(ref, function () {
        return ctg.current;
    }, [ctgReady]);
    var canvasStyles = { position: 'absolute' };
    return (react_1.default.createElement(Wrapper, { style: { flexDirection: isFullscreen ? 'row' : 'column-reverse' } },
        ismulti && react_1.default.createElement(MultiParam_1.MultiParam, { data: data, isFullScreen: isFullscreen }),
        react_1.default.createElement("div", __assign({ className: "box", ref: box }, others, { onMouseDownCapture: function (e) {
                var x = e.nativeEvent.offsetX;
                var y = e.nativeEvent.offsetY;
                var which = e.nativeEvent.which;
                if (which === 3) {
                    rightClickXy.current.x = x;
                    rightClickXy.current.y = y;
                }
            } }),
            loading && (react_1.default.createElement("div", { style: { position: 'absolute', width: '100%', height: '100%', background: '#fff', zIndex: 1, opacity: .9 } },
                react_1.default.createElement(Loading_1.Loading, { style: { margin: 'auto', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 } }))),
            react_1.default.createElement("div", { style: { height: isV3 ? 0 : ((isFullscreen && ismulti) ? "calc(100% - 210px)" : '100%'), position: 'relative' }, ref: ctgBox },
                react_1.default.createElement("canvas", { style: canvasStyles, ref: canvasgrid }),
                react_1.default.createElement("canvas", { style: canvasStyles, ref: canvasline }),
                react_1.default.createElement("canvas", { style: canvasStyles, ref: canvasdata }),
                react_1.default.createElement("canvas", { style: canvasStyles, ref: canvasselect }),
                react_1.default.createElement("canvas", { style: canvasStyles, ref: canvasanalyse })),
            ismulti && (isV3 || isFullscreen) && (react_1.default.createElement("div", { style: { height: isV3 ? "100%" : (isFullscreen ? 210 : 0), overflow: 'hidden' } },
                react_1.default.createElement(Ecg_1.default, { isFullscreen: isFullscreen, data: data, onReady: function (e) { return ecg.current = e; } }))),
            react_1.default.createElement(ContextMenu_1.default, { s: ctg },
                react_1.default.createElement(ScrollBar_1.default, { box: box, getBarTool: function (tool) { barTool.current = tool; } })),
            audios && react_1.default.createElement(ButtonTools_1.ButtonTools, { audios: audios, data: data, visible: true, ctg: ctg, className: "btns" }))));
}));
var templateObject_1;
//# sourceMappingURL=index.js.map