"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
var s = '192.168.123.56:9987';
exports.useInit = function () {
    var stompService = react_1.useMemo(function () { return new utils_1.StompService(s); }, []);
    return { stompService: stompService };
};
//# sourceMappingURL=useInit.js.map