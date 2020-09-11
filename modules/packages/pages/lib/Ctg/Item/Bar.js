"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var Bar = function (props) {
    var _a = react_1.useState(false), showBar = _a[0], setShowBar = _a[1];
<<<<<<< HEAD
    var mutableSuit = props.mutableSuit, onSelect = props.onSelect, unitId = props.unitId, backgroundColor = props.backgroundColor;
=======
    var mutableSuit = props.mutableSuit, onSelect = props.onSelect, unitId = props.unitId, setMaskVisible = props.setMaskVisible;
>>>>>>> 7月三类评分
    var timeout = react_1.useRef(null);
    var autoHide = function () {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(function () {
            setShowBar(false);
        }, 15000);
    };
    var toggleTool = function () {
        setShowBar(!showBar);
        onSelect && onSelect(unitId);
        autoHide();
    };
    var fp = 12;
    return !!props.children && react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                left: 5 * fp,
                bottom: 2 * fp,
                height: 32,
                width: showBar ? "calc(100% - " + 4 * fp + "px - 36px)" : 0,
                background: backgroundColor,
                borderRadius: 3,
                boxShadow: '#aaa 3px 3px 5px 1px',
                transition: 'width 0.2s ease-out',
                visibility: showBar ? 'visible' : 'hidden',
            } }, react_1.default.Children.map(props.children, function (_) {
            return react_1.default.cloneElement(_, { mutableSuit: mutableSuit, setMaskVisible: setMaskVisible });
        })),
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                bottom: 2 * fp,
                left: 2 * fp,
            } },
            react_1.default.createElement(antd_1.Button, { icon: showBar ? react_1.default.createElement(icons_1.CloseOutlined, null) : react_1.default.createElement(icons_1.PlusOutlined, null), shape: 'circle', style: { boxShadow: '#aaa 3px 3px 5px 1px' }, className: "btn", type: "primary", onClick: toggleTool })));
};
exports.default = react_1.memo(Bar);
//# sourceMappingURL=Bar.js.map