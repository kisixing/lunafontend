"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
exports.default = (function (data, box, onReady, resolveSs, resolveDd) {
    var suit = react_1.useRef(null);
    react_1.useEffect(function () {
        var instance = suit.current = onReady();
        resolveSs.current(instance);
        var resizeObserver = new utils_1.ResizeObserver(function () {
            instance.resize();
            window.hasOwnProperty('ResizeObserver') || setTimeout(instance.resize.bind(instance), 300);
        });
        resizeObserver.observe(box.current);
        return function () {
            instance.destroy();
            resizeObserver.disconnect();
        };
    }, []);
    react_1.useEffect(function () {
        var current = suit.current;
        current && current.init(data);
        data && resolveDd.current(data);
    }, [data]);
    return {};
});
//# sourceMappingURL=useDraw.js.map