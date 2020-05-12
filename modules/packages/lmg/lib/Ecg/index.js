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
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var useDraw_1 = __importDefault(require("../useDraw"));
var data_1 = require("./data");
var DrawEcg_1 = require("./DrawEcg");
var Gg = function (props) {
    var title = props.title, value = props.value, unit = props.unit;
    return (react_1.default.createElement("div", { style: { display: 'flex', height: '70px', fontWeight: 'bold', fontFamily: 'arial', border: '1px dashed #ccc', borderTop: 'none' } },
        react_1.default.createElement("div", { style: { position: 'absolute', left: 10, top: 0, fontSize: 12 } }, title),
        react_1.default.createElement("div", { style: { flex: 1, fontSize: 48, lineHeight: '74px', textAlign: 'center' } }, value),
        react_1.default.createElement("div", { style: { position: 'absolute', right: 10, bottom: 0, fontSize: 12, } }, unit)));
};
exports.default = (function (props) {
    var data = props.data, _a = props.mutableSuitObject, mutableSuitObject = _a === void 0 ? { suit: null } : _a, _b = props.onReady, onReady = _b === void 0 ? function (s) { } : _b, ecgHeight = props.ecgHeight;
    var showDetail = (ecgHeight) >= 200;
    var box = react_1.useRef(null);
    var canvas = react_1.useRef(null);
    var canvasline = react_1.useRef(null);
    var canvasmonitor = react_1.useRef(null);
    useDraw_1.default(data, box, function () {
        var instance = new DrawEcg_1.DrawEcg({
            wrap: box.current,
            canvas: canvas.current,
            canvasline: canvasline.current,
            canvasmonitor: canvasmonitor.current,
            MultiParam: data_1.MultiParam,
            Ple: data_1.Ple,
            Tre: data_1.Tre,
            data: data
        });
        mutableSuitObject.suit = instance;
        onReady(instance);
        return instance;
    });
    var canvasStyles = {
        position: 'absolute',
        width: showDetail ? '70%' : '100%',
        height: '100%',
    };
    return (react_1.default.createElement("div", { style: { position: 'relative', height: '100%' }, ref: box },
        react_1.default.createElement("canvas", { id: "background", style: canvasStyles, ref: canvas }),
        react_1.default.createElement("canvas", { ref: canvasline, id: "line", style: canvasStyles }),
        react_1.default.createElement("canvas", { ref: canvasmonitor, id: "monitor", style: canvasStyles }),
        !!(showDetail && data && data.ecgdata) && react_1.default.createElement("div", { style: { position: 'absolute', right: 0, width: '30%', height: '100%', top: 0, } },
            react_1.default.createElement(antd_1.Row, { gutter: 0 },
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(Gg, { title: "\u8109\u7387", value: "" + data.ecgdata[0], unit: "bpm" })),
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(Gg, { title: "\u8840\u6C27", value: "" + data.ecgdata[1], unit: "%" })),
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(Gg, { title: "\u4F53\u6E29", value: data.ecgdata[2] + "~" + data.ecgdata[3], unit: "\u2103" })),
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(Gg, { title: "\u5FC3\u7387", value: "" + data.ecgdata[4], unit: "bpm" })),
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(Gg, { title: "\u547C\u5438", value: "" + data.ecgdata[5], unit: "\u6B21/\u5206" })),
                react_1.default.createElement(antd_1.Col, { span: 12 },
                    react_1.default.createElement(Gg, { title: "\u8840\u538BSDM", value: "" + data.ecgdata[6], unit: "mmHg" }))))));
});
//# sourceMappingURL=index.js.map