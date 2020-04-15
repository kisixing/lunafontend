"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@lianmed/utils");
exports.default = (function (data, box, onReady, onResize) {
    var suit = react_1.useRef(null);
    react_1.useEffect(function () {
        var instance = suit.current = onReady();
        var resizeObserver = new utils_1.ResizeObserver(function () {
            console.log('suit render resize');
            onResize && onResize();
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
        console.log('yyyyyyyyyyyyyyyyy init', current);
        current && current.init(data);
    }, [data]);
    return {};
});
//# sourceMappingURL=useDraw.js.map