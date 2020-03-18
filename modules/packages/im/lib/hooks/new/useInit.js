"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
var stomp_url = 'transfer.lian-med.com:9987';
exports.useInit = function () {
    var stompService = react_1.useRef(new utils_1.StompService(stomp_url));
    react_1.useEffect(function () {
        var s = stompService.current;
        var k2 = s.getSessionId().then(function (s) { return "/user/" + s + "/chat"; });
        var cb2 = function (data) { return console.log('stomp 22', data); };
        s.on(k2, cb2);
        return function () {
            s.off(k2, cb2);
        };
    }, []);
    return { stompService: stompService };
};
//# sourceMappingURL=useInit.js.map