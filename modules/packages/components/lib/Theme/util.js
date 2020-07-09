"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bezier_easing_1 = __importDefault(require("bezier-easing"));
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var theme_1 = __importStar(require("./theme"));
var colorManipulator_1 = require("./colorManipulator");
var tonalOffset = 0.2;
var baseEasing = bezier_easing_1.default(0.26, 0.09, 0.37, 0.18);
var primaryEasing = baseEasing(0.6);
var currentEasing = function (index) { return baseEasing(index * 0.1); };
tinycolor2_1.default.mix = function (color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);
    var rgb1 = tinycolor2_1.default(color1).toRgb();
    var rgb2 = tinycolor2_1.default(color2).toRgb();
    var p = amount / 100;
    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };
    return tinycolor2_1.default(rgba);
};
function getHoverColor(color, ratio) {
    if (ratio === void 0) { ratio = 5; }
    return tinycolor2_1.default.mix('#ffffff', color, currentEasing(ratio) * 100 / primaryEasing).toHexString();
}
function getActiveColor(color, ratio) {
    if (ratio === void 0) { ratio = 7; }
    return tinycolor2_1.default.mix('#333333', color, (1 - (currentEasing(ratio) - primaryEasing) / (1 - primaryEasing)) * 100).toHexString();
}
function getShadowColor(color, ratio) {
    if (ratio === void 0) { ratio = 9; }
    return tinycolor2_1.default.mix('#888888', color, (1 - (currentEasing(ratio) - primaryEasing) / (1 - primaryEasing)) * 100).setAlpha(.2).toRgbString();
}
function getThemeColor(color) {
    var lightColor = colorManipulator_1.lighten(color, tonalOffset * 4);
    var darkColor = colorManipulator_1.darken(color, tonalOffset * 1.5);
    var result = {
        primaryColor: color,
        hoverColor: getHoverColor(color),
        activeColor: getActiveColor(color),
        shadowColor: getShadowColor(color),
        lightColor: lightColor,
        darkColor: darkColor,
        isDark: false
    };
    if (color === theme_1.DARK_COLOR) {
        result.isDark = true;
    }
    console.log('theme color', color, result);
    return result;
}
exports.getThemeColor = getThemeColor;
function IEVersion() {
    var userAgent = navigator.userAgent;
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        }
        else if (fIEVersion == 8) {
            return 8;
        }
        else if (fIEVersion == 9) {
            return 9;
        }
        else if (fIEVersion == 10) {
            return 10;
        }
        else {
            return 6;
        }
    }
    else if (isEdge) {
        return 'edge';
    }
    else if (isIE11) {
        return 11;
    }
    else {
        return 0;
    }
}
var generateStyleHtml = function (colorObj) {
    var activeColor = colorObj.activeColor, primaryColor = colorObj.primaryColor, hoverColor = colorObj.hoverColor, shadowColor = colorObj.shadowColor, lightColor = colorObj.lightColor, darkColor = colorObj.darkColor, isDark = colorObj.isDark;
    if (!IEVersion()) {
        var cssVar = "\n      :root {\n        --theme-color: " + primaryColor + ";\n        --theme-hover-color: " + hoverColor + ";\n        --theme-active-color: " + activeColor + ";\n        --theme-shadow-color: " + shadowColor + ";\n        --theme-light-color: " + lightColor + ";\n        --theme-dark-color: " + darkColor + ";\n        --customed-bg:#F8F8FB;\n        --customed-color:#fff;\n        --customed-font:#5A6676;\n        --customed-border:#DBDBDB;\n      }\n    ";
        return cssVar + "\n" + (isDark ? theme_1.configDark(theme_1.default) : theme_1.default);
    }
    var IECSSContent = theme_1.default;
    IECSSContent = IECSSContent.replace(/var\(\-\-theme\-color\)/g, primaryColor);
    IECSSContent = IECSSContent.replace(/var\(\-\-theme\-hover\-color\)/g, hoverColor);
    IECSSContent = IECSSContent.replace(/var\(\-\-theme\-active\-color\)/g, activeColor);
    IECSSContent = IECSSContent.replace(/var\(\-\-theme\-shadow\-color\)/g, shadowColor);
    return IECSSContent;
};
function applyAntdTheme(colorObj) {
    var styleNode = document.getElementById('dynamic_antd_theme_custom_style');
    if (!styleNode) {
        styleNode = document.createElement('style');
        styleNode.id = 'dynamic_antd_theme_custom_style';
        styleNode.innerHTML = generateStyleHtml(colorObj);
        document.getElementsByTagName('head')[0].appendChild(styleNode);
    }
    else {
        styleNode.innerHTML = generateStyleHtml(colorObj);
    }
}
exports.applyAntdTheme = applyAntdTheme;
function placementSketchPicker(placement) {
    switch (placement) {
        case 'bottomRight': {
            return {
                marginLeft: '0px'
            };
        }
        case 'bottom': {
            return {
                marginLeft: '-87px'
            };
        }
        case 'bottomLeft': {
            return {
                marginLeft: '-180px'
            };
        }
        case 'right': {
            return {
                marginLeft: '56px',
                marginTop: '-129px'
            };
        }
        case 'topRight': {
            return {
                marginTop: '-68px'
            };
        }
        case 'top': {
            return {
                marginLeft: '-87px',
                marginTop: '-68px'
            };
        }
        case 'topLeft': {
            return {
                marginLeft: '-180px',
                marginTop: '-68px'
            };
        }
        case 'left': {
            return {
                marginLeft: '-230px',
                marginTop: '-129px'
            };
        }
        default:
            return {
                marginLeft: '0px'
            };
    }
}
exports.placementSketchPicker = placementSketchPicker;
//# sourceMappingURL=util.js.map