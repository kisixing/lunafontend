"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var tooltip_1 = __importDefault(require("antd/es/tooltip"));
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("./utils");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nimg {\n    width:48px;\n    height:48px;\n    padding:8px;\n    border-radius:48px;\n    background:rgb(236,236,236);\n}\n.b {\n    width:112px;\n    padding:16px 0;\n    position:relative;\n    display:block;\n    height:auto;\n    border:0;\n    box-shadow:unset;\n    cursor:pointer;\n    transition:all .5s;\n}\n.b:hover {\n    background:rgb(20,20,20);\n}\n.b:hover .more {\n    display:block;\n}\n.title {\n    width: 88px;\n    text-align: center;\n    margin-top: 6px;\n    text-overflow:ellipsis;\n    white-space:nowrap;\n    overflow:hidden;\n}\n.more {\n    position:absolute !important;\n    padding:6px;\n    right:0;\n    top:0;\n    border:unset;\n    display:none;\n}\n"], ["\nimg {\n    width:48px;\n    height:48px;\n    padding:8px;\n    border-radius:48px;\n    background:rgb(236,236,236);\n}\n.b {\n    width:112px;\n    padding:16px 0;\n    position:relative;\n    display:block;\n    height:auto;\n    border:0;\n    box-shadow:unset;\n    cursor:pointer;\n    transition:all .5s;\n}\n.b:hover {\n    background:rgb(20,20,20);\n}\n.b:hover .more {\n    display:block;\n}\n.title {\n    width: 88px;\n    text-align: center;\n    margin-top: 6px;\n    text-overflow:ellipsis;\n    white-space:nowrap;\n    overflow:hidden;\n}\n.more {\n    position:absolute !important;\n    padding:6px;\n    right:0;\n    top:0;\n    border:unset;\n    display:none;\n}\n"])));
var Panel = function (_a) {
    var visitedData = _a.visitedData;
    var B = function (_a) {
        var v = _a.v;
        return (react_1.default.createElement("div", { title: v.title, className: "b", onClick: function () { return utils_1.onOpen(v); } },
            react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', flexFlow: 'column nowrap' } },
                react_1.default.createElement("img", { src: v.iconUrl }),
                react_1.default.createElement("div", { className: "title" }, v.title))));
    };
    var Title = function () {
        return (react_1.default.createElement(Wrapper, { style: { display: 'flex', maxWidth: 340, flexWrap: 'wrap' } }, visitedData.map(function (_) { return (react_1.default.createElement(B, { v: _, key: _.name })); })));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(tooltip_1.default, { placement: "rightBottom", title: react_1.default.createElement(Title, null) },
            react_1.default.createElement("div", { style: {
                    position: 'fixed',
                    right: 0,
                    bottom: 60,
                    width: 10,
                    height: 40,
                    background: 'var(--theme-color)',
                    lineHeight: '40px',
                    color: '#fff',
                    textAlign: 'center',
                    cursor: 'pointer'
                } }, "||"))));
};
exports.default = react_1.memo(Panel);
var templateObject_1;
//# sourceMappingURL=Panel.js.map