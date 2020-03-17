"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var fabric_1 = require("fabric");
var Line_1 = require("./Obj/Line");
exports.Line = Line_1.default;
var Rect_1 = require("./Obj/Rect");
exports.Rect = Rect_1.default;
exports.FancyCanvas = function (props) {
    var canvas = react_1.useRef(null);
    var _a = react_1.useState(null), c = _a[0], setC = _a[1];
    react_1.useEffect(function () {
        var fc = new fabric_1.fabric.Canvas(canvas.current);
        setC(fc);
    }, []);
    var children = react_1.default.Children.map(props.children, function (child) {
        return react_1.default.cloneElement(child, {
            c: c,
        });
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("canvas", __assign({ ref: canvas }, props)),
        c && children));
};
//# sourceMappingURL=index.js.map