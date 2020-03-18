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
var Table_1 = __importDefault(require("./Table"));
var tableData_1 = require("./tableData");
var Methods = function (props) {
    var mark = props.mark, disabled = props.disabled;
    return (react_1.default.createElement(react_1.default.Fragment, null, Object.entries(tableData_1.tableData).map(function (_a) {
        var k = _a[0], v = _a[1];
        return (react_1.default.createElement(Table_1.default, { disabled: disabled, key: k, hidden: k !== mark, dataSource: v, ref: props[k + "_ref"] }));
    })));
};
exports.default = react_1.memo(Methods);
//# sourceMappingURL=index.js.map