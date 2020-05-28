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
    var data = props.data, isFullScreen = props.isFullScreen, height = props.height;
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
    var keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];
    return (!!(ecgData && ecgData.length) && (react_1.default.createElement("div", { style: { width: isFullScreen ? 280 : '100%', borderRight: isFullScreen && border } }, isFullScreen ?
        (react_1.default.createElement(MultiParamL_1.MultiParamL, { ecgData: ecgData, p: data.ple, bloodList: list })) : (react_1.default.createElement("div", { style: { height: height, display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 10 } }, keys.map(function (_, i) {
        return (react_1.default.createElement("span", null,
            _,
            ecgData[i]));
    }))))));
};
//# sourceMappingURL=MultiParam.js.map