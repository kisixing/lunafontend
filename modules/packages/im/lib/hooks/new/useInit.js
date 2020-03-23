"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
exports.useInit = function (url) {
    var stompService = react_1.useMemo(function () { return new utils_1.StompService(url); }, []);
    return { stompService: stompService };
};
//# sourceMappingURL=useInit.js.map