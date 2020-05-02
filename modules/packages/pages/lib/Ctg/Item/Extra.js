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
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var useItemAlarm_1 = __importDefault(require("./useItemAlarm"));
var styled_components_1 = __importDefault(require("styled-components"));
var AlarmStatus_1 = __importDefault(require("./AlarmStatus"));
require("antd/lib/card/style/index.css");
require("antd/lib/tag/style/index.css");
var SB = styled_components_1.default(antd_1.Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n:hover {\n    background: rgba(255,255,255,.2)\n}\n"], ["\n:hover {\n    background: rgba(255,255,255,.2)\n}\n"])));
var Bed = react_1.memo(function (_a) {
    var bedname = _a.bedname;
    console.log('ggg');
    return react_1.default.createElement("span", { style: { marginRight: '8px', color: '#fff' } },
        bedname,
        "\u53F7");
});
var C = function (props) {
    var status = props.status, suit = props.suit, onClose = props.onClose, bedname = props.bedname;
    var alarmStatus = useItemAlarm_1.default(suit)[0];
    var close = react_1.useMemo(function () {
        return onClose &&
            (react_1.default.createElement(SB, { title: "\u5173\u95ED\u76D1\u62A4\u7A97\u53E3", icon: react_1.default.createElement(icons_1.CloseOutlined, null), size: "small", type: "link", style: { color: "#fff" }, onClick: onClose }));
    }, [onClose]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Bed, { bedname: bedname }),
        react_1.default.createElement(AlarmStatus_1.default, { alarmStatus: alarmStatus, status: status }),
        close));
};
exports.default = react_1.memo(C);
var templateObject_1;
//# sourceMappingURL=Extra.js.map