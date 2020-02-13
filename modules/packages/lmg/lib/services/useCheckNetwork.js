"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var WsService_1 = require("./WsService");
var types_1 = require("./types");
function useCheckNetwork(fn) {
    var _a = react_1.useState(true), v = _a[0], setV = _a[1];
    var cb = react_1.useCallback(function (isOn) {
        setV(isOn);
        fn && fn(isOn);
    }, []);
    react_1.useEffect(function () {
        WsService_1.WsService._this && WsService_1.WsService._this.on(types_1.EWsEvents.pong, cb);
        return function () {
            WsService_1.WsService._this && WsService_1.WsService._this.off(types_1.EWsEvents.pong, cb);
        };
    }, [WsService_1.WsService._this]);
    return [v];
}
exports.useCheckNetwork = useCheckNetwork;
