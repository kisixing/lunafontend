"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
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
    var ref = react_1.useRef();
    var _a = props.ecgData, ecgData = _a === void 0 ? {} : _a, p = props.p, _b = props.bloodList, bloodList = _b === void 0 ? [] : _b;
    react_1.useEffect(function () {
        var id = setInterval(function () {
            var _ = p.B[0];
            ref.current.style.height = (_ === 50 ? 0 : _) + "%";
        }, 50);
        return function () {
            clearInterval(id);
        };
    }, [p]);
    var columns = [
        { dataIndex: 'sys_bp', title: 'SBP' },
        { dataIndex: 'mean_bp', title: 'MBP' },
        { dataIndex: 'dia_bp', title: 'DBP' },
        { dataIndex: 'time', title: '时间' },
    ];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Gg, { title: "\u8109\u7387", value: ecgData.pulseRate || '', unit: "bpm", color: Suit_1.Suit.option.fhrcolor1 }),
        react_1.default.createElement(Gg, { title: "\u8840\u6C27", value: (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", null, ecgData.bloodOxygen || ''),
                react_1.default.createElement("div", { style: { display: 'inline-block', width: 14, height: 46, border: '2px solid red', position: 'relative' } },
                    react_1.default.createElement("div", { ref: ref, style: { background: 'blue', width: 14 - 4, position: 'absolute', bottom: 0 } })))), unit: "%", color: Suit_1.Suit.option.tococolor }),
        react_1.default.createElement(Gg, { title: "\u4F53\u6E29", small: true, value: ecgData.temperature || '', unit: "\u2103" }),
        react_1.default.createElement(antd_1.Table, { title: function () { return "\u8840\u538B(mmHg)\uFF1A" + ecgData.bloodPress; }, rowKey: "id", size: "small", pagination: false, columns: columns, dataSource: bloodList })));
};
//# sourceMappingURL=MultiParamL.js.map