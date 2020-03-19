"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
var stomp_url = 'transfer.lian-med.com:9987';
exports.useInit = function () {
    var stompService = react_1.useMemo(function () { return new utils_1.StompService(stomp_url); }, []);
    return { stompService: stompService };
};
//# sourceMappingURL=useInit.js.map