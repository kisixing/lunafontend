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
var AccPoint_1 = __importDefault(require("./AccPoint"));
var m = {
    AccPoint: AccPoint_1.default
};
exports.default = react_1.memo(function (props) {
    return (react_1.default.createElement(antd_1.Menu, null,
        react_1.default.createElement(antd_1.Menu.Item, { key: "1" }, "\u6807\u8BB0\u52A0\u901F"),
        react_1.default.createElement(antd_1.Menu.Item, { key: "2" }, "\u53D6\u6D88\u6807\u8BB0")));
});
//# sourceMappingURL=index.js.map