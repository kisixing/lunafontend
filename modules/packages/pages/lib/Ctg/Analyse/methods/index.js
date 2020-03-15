"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Table_1 = __importDefault(require("./Table"));
var tableData_1 = require("./tableData");
var Methods = function (props) {
    var mark = props.mark, disabled = props.disabled;
    return (react_1.default.createElement(react_1.default.Fragment, null, Object.entries(tableData_1.tableData).map(function (_a) {
        var k = _a[0], v = _a[1];
        return (react_1.default.createElement(Table_1.default, { disabled: disabled, key: k, hidden: k !== mark, dataSource: v, ref: props[k + "_ref"] }));
    })));
};
exports.default = Methods;
//# sourceMappingURL=index.js.map