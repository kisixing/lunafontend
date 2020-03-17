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
var react_1 = __importStar(require("react"));
var button_group_1 = __importDefault(require("antd/lib/button/button-group"));
var antd_1 = require("antd");
exports.ButtonTools = function (props) {
    var ctg = props.ctg, visible = props.visible;
    var _a = react_1.useState(new Set()), activeList = _a[0], setActiveList = _a[1];
    var btns = [
        {
            text: '基线工具',
            onClick: function () {
                var lineTool = ctg.current.lineTool;
                lineTool && lineTool.toggleVisibility();
            }
        }
    ];
    return (react_1.default.createElement(button_group_1.default, { size: "small", style: { position: 'absolute', right: 0, bottom: 0, opacity: visible ? 1 : 0 } }, btns.map(function (_, index) {
        var _set = new Set(activeList);
        var isExist = _set.has(index);
        return react_1.default.createElement(antd_1.Button, { type: isExist ? 'primary' : 'default', key: index, onClick: function () {
                if (isExist) {
                    _set.delete(index);
                }
                else {
                    _set.add(index);
                }
                _.onClick();
                setActiveList(_set);
            } }, _.text);
    })));
};
//# sourceMappingURL=ButtonTools.js.map