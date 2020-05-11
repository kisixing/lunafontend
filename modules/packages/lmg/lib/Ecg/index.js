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
var DrawEcg_1 = require("./DrawEcg");
var data_1 = require("./data");
var useDraw_1 = __importDefault(require("../useDraw"));
var antd_1 = require("antd");
exports.default = (function (props) {
    var data = props.data, _a = props.mutableSuitObject, mutableSuitObject = _a === void 0 ? { suit: null } : _a, _b = props.onReady, onReady = _b === void 0 ? function (s) { } : _b, ecgHeight = props.ecgHeight;
    var showDetail = (ecgHeight) >= 240;
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
        width: showDetail ? '80%' : '100%',
        height: '100%',
    };
    return (react_1.default.createElement("div", { style: { position: 'relative', height: '100%' }, ref: box },
        react_1.default.createElement("canvas", { id: "background", style: canvasStyles, ref: canvas }),
        react_1.default.createElement("canvas", { ref: canvasline, id: "line", style: canvasStyles }),
        react_1.default.createElement("canvas", { ref: canvasmonitor, id: "monitor", style: canvasStyles }),
        !!(showDetail && data && data.ecgdata) && react_1.default.createElement("div", { style: { position: 'absolute', right: 0, width: '20%', height: '100%', top: 0, } },
            react_1.default.createElement(antd_1.Descriptions, { column: 2, bordered: true, size: "small" },
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "\u8109\u7387bpm", span: 2 }, data.ecgdata[0]),
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "\u8840\u6C27%", span: 2 }, data.ecgdata[1]),
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "\u4F53\u6E29\u2103", span: 2 },
                    data.ecgdata[2],
                    "~",
                    data.ecgdata[3]),
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "\u5FC3\u7387bpm", span: 2 }, data.ecgdata[4]),
                react_1.default.createElement(antd_1.Descriptions.Item, { label: "\u547C\u5438(\u6B21/\u5206)", span: 2 }, data.ecgdata[5]),
                react_1.default.createElement(antd_1.Descriptions.Item, { span: 2, label: "\u8840\u538B(SDM)mmHg" }, data.ecgdata[6])))));
});
//# sourceMappingURL=index.js.map