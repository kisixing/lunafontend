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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_color_1 = require("react-color");
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var util_1 = require("./util");
exports.getThemeColor = util_1.getThemeColor;
exports.changeAntdTheme = util_1.applyAntdTheme;
var colors = [
    '#33691e', '#006064', '#d81b60', '#bc5100', '#1a237e',
    '#4a148c', '#827717', '#0d47a1'
];
var A = function (props, ref) {
    react_1.useImperativeHandle(ref, function () { return ({
        toggle: handleClick,
        handleChange: handleChange
    }); });
    var _a = props.primaryColor, primaryColor = _a === void 0 ? '#1890ff' : _a, _b = props.storageName, storageName = _b === void 0 ? 'custom-antd-primary-color' : _b, _c = props.style, style = _c === void 0 ? {} : _c, _d = props.placement, placement = _d === void 0 ? null : _d, _e = props.onChange, onChange = _e === void 0 ? null : _e, _f = props.mask, mask = _f === void 0 ? true : _f;
    var _g = react_1.useState(tinycolor2_1.default(primaryColor).toRgb()), color = _g[0], setColor = _g[1];
    var _h = react_1.useState(false), displayColorPicker = _h[0], setDisplayColorPicker = _h[1];
    react_1.useEffect(function () {
        var storageColor = primaryColor || window.localStorage.getItem(storageName);
        if (storageColor) {
            var theme = util_1.getThemeColor(storageColor);
            util_1.applyAntdTheme(theme);
            document.getElementById('change_antd_theme_color').style.backgroundColor = storageColor;
            if (onChange) {
                onChange(storageColor);
            }
        }
    }, []);
    var handleClick = function () {
        setDisplayColorPicker(!displayColorPicker);
    };
    var handleClose = function () {
        setDisplayColorPicker(false);
    };
    var handleChange = function (color) {
        setColor(color.rgb);
        util_1.applyAntdTheme(util_1.getThemeColor(color.hex));
        window.localStorage.setItem(storageName, color.hex);
        onChange && onChange(color.hex);
    };
    var styles = {
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")"
        },
        swatch: {
            width: '46px',
            maxWidth: '46px',
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            display: 'inline-block',
            cursor: 'pointer'
        },
        popover: __assign({ position: 'absolute', zIndex: 99999 }, util_1.placementSketchPicker(placement)),
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
            cursor: 'auto'
        }
    };
    var P = function () {
        return (react_1.default.createElement(react_color_1.GithubPicker, { styles: { default: { card: { boxSizing: 'content-box' } } }, triangle: 'hide', color: color, onChange: handleChange, colors: colors }));
    };
    return (react_1.default.createElement("div", { id: 'change_antd_theme_button', style: __assign(__assign({}, styles.swatch), style), onClick: handleClick },
        react_1.default.createElement("div", { id: 'change_antd_theme_color', style: styles.color }),
        displayColorPicker
            ? react_1.default.createElement("div", { style: styles.popover },
                mask && react_1.default.createElement("div", { style: styles.cover, onClick: handleClose }),
                react_1.default.createElement(P, null)) : null));
};
var AntdThemeManipulator = react_1.default.forwardRef(A);
var C = Object.assign(AntdThemeManipulator, { P: react_color_1.GithubPicker, colors: colors });
exports.AntdThemeManipulator = C;
//# sourceMappingURL=index.js.map