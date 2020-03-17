"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
exports.default = (function (suit) {
    var _a = react_1.useState(null), alarmStatus = _a[0], setAlarmStatus = _a[1];
    var _setAlarmStatus = react_1.useCallback(function (alarmType) {
        setAlarmStatus(alarmType);
    }, []);
    react_1.useEffect(function () {
        var onCb = function (alarmType) {
            utils_1.event.emit("Suit:alarmOn", alarmType);
            _setAlarmStatus(alarmType);
        };
        var offCb = function (alarmType) {
            utils_1.event.emit("Suit:alarmOff", alarmType);
            _setAlarmStatus(null);
        };
        suit && suit
            .on('alarmOn', onCb)
            .on('alarmOff', offCb);
        return function () {
            suit && suit
                .off('alarmOn', onCb)
                .off('alarmOff', offCb);
        };
    }, [suit]);
    return [alarmStatus];
});
//# sourceMappingURL=useItemAlarm.js.map