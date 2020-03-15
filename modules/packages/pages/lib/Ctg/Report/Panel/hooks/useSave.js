"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var request_1 = __importDefault(require("@lianmed/request"));
var utils_1 = require("@lianmed/utils");
exports.default = (function (bizSn, setBizSn) {
    var _a = react_1.useState(false), caEnable = _a[0], setCaEnable = _a[1];
    var _b = react_1.useState(false), saveLoading = _b[0], setSaveLoading = _b[1];
    var _c = react_1.useState(false), saved = _c[0], setSaved = _c[1];
    var save = react_1.useCallback(function () {
        setSaveLoading(true);
        request_1.default.post('/rep/save', { data: { bizSn: bizSn } }).then(function (r) {
            r.sn && setBizSn(r.sn);
            utils_1.event.emit('signed');
            setSaved(true);
        }).finally(function () { return setSaveLoading(false); });
    }, [bizSn]);
    react_1.useEffect(function () {
        request_1.default.get('/ca/isEnable').then(function (r) {
            console.log('ca enable', r);
            setCaEnable(r);
        });
    }, []);
    return {
        caEnable: caEnable,
        save: save,
        saveLoading: saveLoading,
        saved: saved
    };
});
//# sourceMappingURL=useSave.js.map