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
var Suit_1 = require("./Suit");
var border = '1px dashed #ccc';
var Gg = function (props) {
    var title = props.title, value = props.value, unit = props.unit, _a = props.color, color = _a === void 0 ? '#333' : _a, _b = props.small, small = _b === void 0 ? false : _b;
    return (react_1.default.createElement("div", { style: { position: 'relative', height: small ? 34 : 100, fontFamily: 'arial', borderBottom: border } },
        react_1.default.createElement("div", { style: { position: 'absolute', left: 10, top: 4, fontSize: 16 } },
            title,
            react_1.default.createElement("sub", { style: { color: '#aaa' } },
                "(",
                unit,
                ")")),
        react_1.default.createElement("div", { style: { fontSize: small ? 18 : 64, lineHeight: small ? '34px' : '120px', textAlign: 'right', marginRight: 10, color: color } }, value || '')));
};
exports.MultiParamL = function (props) {
    var data = props.data, isFullScreen = props.isFullScreen, height = props.height;
    var _a = react_1.useState(data.ecgdata), ecgData = _a[0], setEcgData = _a[1];
    react_1.useEffect(function () {
        setEcgData(data.ecgdata);
        var id = setInterval(function () {
            setEcgData(data.ecgdata);
        }, 2000);
        return function () {
            clearInterval(id);
        };
    }, [data]);
    var keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];
    return (!!(ecgData.length) && (react_1.default.createElement("div", { style: { width: isFullScreen ? 220 : '100%', borderRight: isFullScreen && border } }, isFullScreen ?
        (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Gg, { title: "\u8109\u7387", value: ecgData[0] || '', unit: "bpm", color: Suit_1.Suit.option.fhrcolor1 }),
            react_1.default.createElement(Gg, { title: "\u8840\u6C27", value: ecgData[1] || '', unit: "%", color: Suit_1.Suit.option.tococolor }),
            react_1.default.createElement(Gg, { title: "\u4F53\u6E29", small: true, value: ecgData[2] || '', unit: "\u2103" }),
            react_1.default.createElement(Gg, { title: "\u5FC3\u7387", small: true, value: ecgData[3] || '', unit: "bpm" }),
            react_1.default.createElement(Gg, { title: "\u547C\u5438", small: true, value: ecgData[4] || '', unit: "\u6B21/\u5206" }),
            react_1.default.createElement(Gg, { title: "\u8840\u538BSDM", small: true, value: ecgData[5] || '', unit: "mmHg" }))) : (react_1.default.createElement("div", { style: { height: height, display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: 10 } }, keys.map(function (_, i) {
        return (react_1.default.createElement("span", null,
            _,
            ecgData[i]));
    }))))));
};
//# sourceMappingURL=MultiParamL.js.map