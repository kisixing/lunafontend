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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var RemarkCheckbox_1 = require("./RemarkCheckbox");
exports.RemarkCheckbox = RemarkCheckbox_1.default;
var Editor_1 = require("./Editor");
exports.Editor = Editor_1.default;
var Button_1 = require("./Button");
exports.Button = Button_1.default;
var PartogramTable_1 = require("./PartogramTable");
exports.PartogramTable = PartogramTable_1.default;
var DataSelect_1 = require("./DataSelect");
exports.DataSelect = DataSelect_1.default;
__export(require("./Theme"));
exports.configs = {};
exports.config = function (data) {
    exports.configs = __assign({}, data);
};
