"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var fabric_1 = require("fabric");
var FancyCanvas = function (props) {
    var _a = props.options, options = _a === void 0 ? {
        top: 0,
        left: 0,
        width: 50,
        height: 50,
        fill: 'red',
        hasControls: false,
    } : _a, c = props.c;
    react_1.useEffect(function () {
        var line = new fabric_1.fabric.Rect(options);
        c && c.add(line);
    }, [c]);
    return null;
};
exports.default = FancyCanvas;
//# sourceMappingURL=Rect.js.map