"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
exports.default = (function (props) {
    var pType = props.pType;
    var offsetX = react_1.useRef(0);
    var offsetY = react_1.useRef(0);
    var MenuItems = function () {
        switch (pType) {
            case 'AccPoint':
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(antd_1.Menu.Item, { key: "1", onClick: function (e) {
                            console.log('标记加速');
                        } }, "\u6807\u8BB0\u52A0\u901F"),
                    react_1.default.createElement(antd_1.Menu.Item, { key: "2" }, "\u53D6\u6D88\u6807\u8BB0")));
            case 'DecPoint':
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(antd_1.Menu.Item, { key: "1" }, "\u6807\u8BB0\u52A0\u901F"),
                    react_1.default.createElement(antd_1.Menu.Item, { key: "2" }, "\u53D6\u6D88\u6807\u8BB0")));
            default:
                return react_1.default.createElement(antd_1.Menu.Item, { key: "1" }, "\u9ED8\u8BA4");
        }
    };
    var menu = (react_1.default.createElement(antd_1.Menu, { onClick: function (e) {
            console.log(1111);
            var point = s.current.drawAnalyse.revicePoint(offsetX.current, offsetY.current);
            point && alert(JSON.stringify(point));
        } },
        react_1.default.createElement(MenuItems, null)));
});
//# sourceMappingURL=MenuStrategies.js.map