"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useLogin_1 = __importDefault(require("./useLogin"));
__export(require("./usePage"));
var Hooks;
(function (Hooks) {
    Hooks.useLogin = useLogin_1.default;
})(Hooks = exports.Hooks || (exports.Hooks = {}));
//# sourceMappingURL=index.js.map