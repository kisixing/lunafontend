"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var MultiParamL_1 = require("./MultiParamL");
var styled_components_1 = __importDefault(require("styled-components"));
var border = '1px dashed #ccc';
var Wrap = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 100%;\n    display: flex;\n    align-items: center; \n    justify-content: space-around; \n    font-size: 12px;\n    .aa {\n      position:relative;\n    }\n    .aa::after {\n        content: \"\";\n        position: absolute;\n        z-index: -1;\n        top: 60%;\n        left: -0.1em;\n        right: -0.1em;\n        bottom: 0;\n        transition: top 200ms cubic-bezier(0, .8, .13, 1);\n        background-color: rgba(79,192,141,0.5);\n        z-index:1;\n      }\n      .aa:hover::after {\n        top: 0%;\n      }\n"], ["\n    height: 100%;\n    display: flex;\n    align-items: center; \n    justify-content: space-around; \n    font-size: 12px;\n    .aa {\n      position:relative;\n    }\n    .aa::after {\n        content: \"\";\n        position: absolute;\n        z-index: -1;\n        top: 60%;\n        left: -0.1em;\n        right: -0.1em;\n        bottom: 0;\n        transition: top 200ms cubic-bezier(0, .8, .13, 1);\n        background-color: rgba(79,192,141,0.5);\n        z-index:1;\n      }\n      .aa:hover::after {\n        top: 0%;\n      }\n"])));
exports.MultiParam = function (props) {
    var data = props.data, isFullScreen = props.isFullScreen;
    if (!data || !data.realTime)
        return null;
    var _a = react_1.useState(data && data.ecgdata), ecgData = _a[0], setEcgData = _a[1];
    var _b = react_1.useState([]), list = _b[0], setList = _b[1];
    react_1.useEffect(function () {
        setEcgData(data.ecgdata);
        setList(data.bloodList);
        var id = setInterval(function () {
            setEcgData(data.ecgdata);
            setList(data.bloodList);
        }, 1000);
        return function () {
            clearInterval(id);
        };
    }, [data]);
    var fontSize = 22;
    return (!!(ecgData) && (react_1.default.createElement("div", { style: { width: isFullScreen ? 280 : '100%', height: isFullScreen ? 'auto' : '20%', maxHeight: isFullScreen ? 'unset' : 40, minHeight: isFullScreen ? 'auto' : 26, borderRight: isFullScreen && border } }, isFullScreen ?
        (react_1.default.createElement(MultiParamL_1.MultiParamL, { ecgData: ecgData, p: data.ple, bloodList: list })) : (react_1.default.createElement(Wrap, null,
        react_1.default.createElement("span", { className: "aa" },
            react_1.default.createElement("sup", null, "\u8109\u7387"),
            " ",
            react_1.default.createElement("span", { style: { fontSize: fontSize } }, ecgData.pulseRate),
            react_1.default.createElement("sup", null, "bpm")),
        react_1.default.createElement("span", { className: "aa" },
            react_1.default.createElement("sup", null, "\u8840\u6C27"),
            " ",
            react_1.default.createElement("span", { style: { fontSize: fontSize } }, ecgData.bloodOxygen),
            react_1.default.createElement("sup", null, "%")),
        react_1.default.createElement("span", { className: "aa" },
            react_1.default.createElement("sup", null, "\u4F53\u6E29"),
            " ",
            react_1.default.createElement("span", { style: { fontSize: fontSize } }, ecgData.temperature),
            react_1.default.createElement("sup", null, "\u2103")),
        react_1.default.createElement("span", { className: "aa" },
            react_1.default.createElement("sup", null, "\u547C\u5438"),
            " ",
            react_1.default.createElement("span", { style: { fontSize: fontSize } }, ecgData.respRate),
            react_1.default.createElement("sup", null, "\u6B21/\u5206")),
        react_1.default.createElement("span", { className: "aa" },
            react_1.default.createElement("sup", null, "\u8840\u538B(SDM)"),
            react_1.default.createElement("span", { style: { fontSize: fontSize } }, ecgData.bloodPress),
            react_1.default.createElement("sup", null, "mmHg")))))));
};
var templateObject_1;
//# sourceMappingURL=MultiParam.js.map