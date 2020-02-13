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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var braft_editor_1 = __importDefault(require("braft-editor"));
var braft_utils_1 = require("braft-utils");
require("braft-editor/dist/index.css");
var toggleSelectionBackgroundColor = braft_utils_1.ContentUtils.toggleSelectionBackgroundColor;
function C(props) {
    return react_1.default.createElement(braft_editor_1.default, __assign({}, props, { style: { background: '#fff' } }));
}
var Editor = Object.assign(C, braft_editor_1.default, { toggleSelectionBackgroundColor: toggleSelectionBackgroundColor });
exports.default = Editor;
