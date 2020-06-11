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
var useDraw_1 = __importDefault(require("../useDraw"));
var DrawEcg_1 = require("./DrawEcg");
exports.default = (function (props) {
    var data = props.data, _a = props.mutableSuitObject, mutableSuitObject = _a === void 0 ? { suit: null } : _a, _b = props.onReady, onReady = _b === void 0 ? function (s) { } : _b;
    var box = react_1.useRef(null);
    var canvas = react_1.useRef(null);
    var canvasline = react_1.useRef(null);
    var canvasmonitor = react_1.useRef(null);
    var canvasPle = react_1.useRef(null);
    useDraw_1.default(data, box, function () {
        var instance = new DrawEcg_1.DrawEcg({
            wrap: box.current,
            canvas: canvas.current,
            canvasline: canvasline.current,
            canvasmonitor: canvasmonitor.current,
            canvasPle: canvasPle.current,
            data: data
        });
        mutableSuitObject.suit = instance;
        onReady(instance);
        return instance;
    });
    var canvasStyles = {
        position: 'absolute',
        width: '100%',
        height: '100%',
    };
    return (react_1.default.createElement("div", { style: { position: 'relative', height: '100%' }, ref: box },
        react_1.default.createElement("canvas", { id: "background", style: canvasStyles, ref: canvas }),
        react_1.default.createElement("canvas", { id: "line", ref: canvasline, style: canvasStyles }),
        react_1.default.createElement("canvas", { id: "monitor", ref: canvasmonitor, style: canvasStyles }),
        react_1.default.createElement("canvas", { id: "ple", ref: canvasPle, style: canvasStyles })));
});
//# sourceMappingURL=index.js.map