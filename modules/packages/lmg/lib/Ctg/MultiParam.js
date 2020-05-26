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
    var _b = react_1.useState(0), p = _b[0], setP = _b[1];
    react_1.useEffect(function () {
        setEcgData(data.ecgdata);
        _setP();
        var id = setInterval(function () {
            _setP();
            setEcgData(data.ecgdata);
        }, 1000);
        return function () {
            clearInterval(id);
        };
    }, [data]);
    function _setP() {
        var pv = data ? data.ple.B[0] : 0;
        pv = !!pv ? (pv === 50 ? 0 : pv) : 0;
        setP(pv);
    }
    var keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];
    return (!!(ecgData && ecgData.length) && (react_1.default.createElement("div", { style: { width: isFullScreen ? 280 : '100%', borderRight: isFullScreen && border } }, isFullScreen ?
        (react_1.default.createElement(MultiParamL_1.MultiParamL, { ecgData: ecgData, p: data.ple, bloodList: data.bloodList })) : (react_1.default.createElement("div", { style: { height: height, display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 10 } }, keys.map(function (_, i) {
        return (react_1.default.createElement("span", null,
            _,
            ecgData[i]));
    }))))));
};
//# sourceMappingURL=MultiParam.js.map