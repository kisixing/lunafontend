"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var MultiParamL_1 = require("./MultiParamL");
var border = '1px dashed #ccc';
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
    return (!!(ecgData) && (react_1.default.createElement("div", { style: { width: isFullScreen ? 280 : '100%', height: isFullScreen ? 'auto' : '20%', maxHeight: isFullScreen ? 'unset' : 40, minHeight: isFullScreen ? 'auto' : 26, borderRight: isFullScreen && border } }, isFullScreen ?
        (react_1.default.createElement(MultiParamL_1.MultiParamL, { ecgData: ecgData, p: data.ple, bloodList: list })) : (react_1.default.createElement("div", { style: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 10 } },
        react_1.default.createElement("span", null,
            "\u8109\u7387bpm",
            ecgData.pulseRate),
        react_1.default.createElement("span", null,
            "\u8840\u6C27%",
            ecgData.bloodOxygen),
        react_1.default.createElement("span", null,
            "\u4F53\u6E29\u2103",
            ecgData.temperature),
        react_1.default.createElement("span", null,
            "\u547C\u5438(\u6B21/\u5206)",
            ecgData.respRate),
        react_1.default.createElement("span", null,
            "\u8840\u538B(SDM)mmHg",
            ecgData.bloodPress))))));
};
//# sourceMappingURL=MultiParam.js.map