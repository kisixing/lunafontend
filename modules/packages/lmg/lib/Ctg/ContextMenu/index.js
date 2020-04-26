"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var index_1 = __importDefault(require("./MenuStrategies/index"));
exports.default = (function (props) {
    var s = props.s;
    var _a = react_1.useState(), pType = _a[0], setPType = _a[1];
    var offsetX = react_1.useRef(0);
    var offsetY = react_1.useRef(0);
    react_1.useEffect(function () {
        document.oncontextmenu = function () { return false; };
        return function () {
            document.oncontextmenu = null;
        };
    }, [pType]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.Dropdown, { overlay: index_1.default({ pType: pType, s: s, offsetX: offsetX, offsetY: offsetY }), trigger: ['contextMenu'] },
            react_1.default.createElement("div", { style: { width: '100%', height: '100%', position: 'absolute', top: 0 }, onContextMenu: function (e) {
                    var target = e.currentTarget;
                    var clientX = e.clientX, clientY = e.clientY;
                    var _a = target.getBoundingClientRect(), x = _a.x, y = _a.y;
                    offsetX.current = clientX - x;
                    offsetY.current = clientY - y;
                    var type = s.current.getPointType(offsetX.current, offsetY.current);
                    setPType(type);
                } }, props.children))));
});
//# sourceMappingURL=index.js.map