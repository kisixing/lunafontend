"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
var utils_2 = require("./utils");
exports.useStomp = function (visitedData, stomp_url) {
    var stompService = react_1.useRef(new utils_1.StompService(stomp_url));
    react_1.useEffect(function () {
        var s = stompService.current;
        var k = '/topic/ordernotify';
        var cb = function () {
            var target = visitedData.find(function (_) { return _.name === 'remote'; });
            target && utils_2.onOpen(target);
        };
        s.on(k, cb);
        return function () {
            s.off(k, cb);
        };
    }, [visitedData]);
    return {};
};
//# sourceMappingURL=useStomp.js.map