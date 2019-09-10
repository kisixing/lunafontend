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
Object.defineProperty(exports, "__esModule", { value: true });
var RemarkCheckbox_1 = require("./RemarkCheckbox");
exports.RemarkCheckbox = RemarkCheckbox_1.default;
var Icon_1 = require("./Icon");
exports.Icon = Icon_1.default;
var Editor_1 = require("./Editor");
exports.Editor = Editor_1.default;
exports.configs = {};
exports.config = function (data) {
    exports.configs = __assign({}, data);
};
