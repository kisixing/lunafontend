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
var WsService_1 = require("@lianmed/lmg/lib/services/WsService");
var antd_1 = require("antd");
require("antd/lib/card/style/index.css");
require("antd/lib/tag/style/index.css");
var react_1 = __importStar(require("react"));
var Alarm2_1 = __importDefault(require("./Alarm2"));
var Status = react_1.memo(function (_a) {
    var alarmStatus = _a.alarmStatus, status = _a.status;
    var r = react_1.default.createElement("marquee", { style: { width: 100, display: 'inline-block', verticalAlign: 'bottom' } },
        react_1.default.createElement(Alarm2_1.default, { alarmText: alarmStatus }));
    return !!WsService_1.mapStatusToColor[status] && (react_1.default.createElement(react_1.default.Fragment, null, alarmStatus ? r : (react_1.default.createElement(antd_1.Tag, { style: { border: '2px solid #fff' }, color: WsService_1.mapStatusToColor[status] }, WsService_1.mapStatusToText[status]))));
});
exports.default = react_1.memo(Status);
//# sourceMappingURL=AlarmStatus.js.map