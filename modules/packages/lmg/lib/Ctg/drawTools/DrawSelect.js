"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Draw_1 = __importDefault(require("../../Draw"));
var DrawSelect = (function (_super) {
    __extends(DrawSelect, _super);
    function DrawSelect(canvas, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        return _super.call(this, width, height, canvas) || this;
    }
    DrawSelect.prototype.init = function () {
    };
    return DrawSelect;
}(Draw_1.default));
exports.DrawSelect = DrawSelect;
