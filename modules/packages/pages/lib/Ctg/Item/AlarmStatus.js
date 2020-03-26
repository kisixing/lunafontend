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
var useItemAlarm_1 = __importDefault(require("./useItemAlarm"));
var WsService_1 = require("@lianmed/lmg/lib/services/WsService");
var styled_components_1 = __importDefault(require("styled-components"));
require("antd/lib/card/style/index.css");
require("antd/lib/tag/style/index.css");
var SB = styled_components_1.default(antd_1.Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n:hover {\n    background: rgba(255,255,255,.2)\n}\n"], ["\n:hover {\n    background: rgba(255,255,255,.2)\n}\n"])));
var C = function (props) {
    var status = props.status, suit = props.suit, onClose = props.onClose, bedname = props.bedname;
    var alarmStatus = useItemAlarm_1.default(suit)[0];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { style: { marginRight: '8px', color: '#fff' } },
            bedname,
            "\u53F7"),
        !!WsService_1.mapStatusToColor[status] && (react_1.default.createElement(antd_1.Tag, { style: { border: '2px solid #fff' }, color: alarmStatus ? '#f5222d' : WsService_1.mapStatusToColor[status] }, alarmStatus ? alarmStatus : WsService_1.mapStatusToText[status])),
        onClose && react_1.default.createElement(SB, { title: "\u5173\u95ED\u76D1\u62A4\u7A97\u53E3", icon: "close", size: "small", type: "link", style: { color: "#fff" }, onClick: onClose })));
};
exports.default = react_1.memo(C);
var templateObject_1;
//# sourceMappingURL=AlarmStatus.js.map