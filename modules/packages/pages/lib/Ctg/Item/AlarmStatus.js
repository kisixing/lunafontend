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
var utils_1 = require("@lianmed/utils");
function genAlarm(type, text) {
    var target = { type: type, text: text, fucked: false, dirty: 0 };
    return target;
}
var Status = react_1.memo(function (_a) {
    var alarm2Text = _a.alarm2Text, status = _a.status, alarm0Text = _a.alarm0Text, alarm1Text = _a.alarm1Text, unitId = _a.unitId;
    var intervalId = react_1.useRef();
    var interval = react_1.useRef(1000);
    var alarmList = react_1.useRef([]);
    var _b = react_1.useState(), current = _b[0], setCurrent = _b[1];
    react_1.useEffect(function () {
        var cb = function (_unitId, type, text) {
            if (_unitId !== unitId)
                return;
            var list = alarmList.current;
            var old = list.find(function (_) { return _.text === text; });
            if (!old) {
                var target = genAlarm(type, text);
                list.push(target);
            }
        };
        utils_1.event.on('item:alarm', cb);
        return function () {
            utils_1.event.off('item:alarm', cb);
        };
    }, [unitId]);
    react_1.useEffect(function () {
        call();
        console.log('call', unitId);
        return function () {
            console.log('clear', unitId);
            clearTimeout(intervalId.current);
        };
    }, []);
    function call() {
        intervalId.current = setTimeout(function () {
            var list = alarmList.current;
            if (!list.length) {
                setCurrent(null);
            }
            else {
                var head = list.shift();
                setCurrent(head);
            }
            call();
        }, interval.current);
    }
    return !!WsService_1.mapStatusToColor[status] && (react_1.default.createElement(react_1.default.Fragment, null, current ? react_1.default.createElement(Alarm2_1.default, { alarm: current }) : (react_1.default.createElement(antd_1.Tag, { style: { border: '2px solid #fff' }, color: WsService_1.mapStatusToColor[status] }, WsService_1.mapStatusToText[status]))));
});
exports.default = react_1.memo(Status);
//# sourceMappingURL=AlarmStatus.js.map