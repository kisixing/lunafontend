"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var fabric_1 = require("fabric");
var FancyCanvas = function (props) {
    var _a = props.points, points = _a === void 0 ? [10, 10, 9999, 10] : _a, _b = props.options, options = _b === void 0 ? {
        left: 0,
        top: 150,
        stroke: 'red',
        hasControls: false,
        fill: 'red'
    } : _b, c = props.c;
    react_1.useEffect(function () {
        var line = new fabric_1.fabric.Line(points, options);
        c && c.add(line);
    }, [c]);
    return null;
};
exports.default = FancyCanvas;
