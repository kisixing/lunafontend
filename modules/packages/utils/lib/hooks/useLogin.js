"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var request_1 = __importDefault(require("@lianmed/request"));
exports.default = (function (prefix, data, cb) {
    react_1.useEffect(function () {
        var sp = new window.URL(location.href).searchParams;
        var password = sp.get('password');
        var username = sp.get('username');
        if (!data && password && username) {
            data = { password: password, username: username };
        }
        request_1.default.post('/authenticate', { data: data, prefix: prefix }).then(function (_a) {
            var id_token = _a.id_token;
            request_1.default.config({ Authorization: id_token, prefix: prefix });
            cb && cb();
        });
    }, []);
});
