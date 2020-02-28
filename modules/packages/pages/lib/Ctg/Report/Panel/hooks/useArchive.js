"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var request_1 = __importDefault(require("@lianmed/request"));
var antd_1 = require("antd");
var utils_1 = require("@lianmed/utils");
var info = antd_1.message.info;
exports.default = (function (docid) {
    var _a = react_1.useState(docid), bizSn = _a[0], setBizSn = _a[1];
    var _b = react_1.useState(false), archived = _b[0], setArchived = _b[1];
    var _c = react_1.useState(false), archiveLoading = _c[0], setArchiveLoading = _c[1];
    var archive = function () {
        setArchiveLoading(true);
        request_1.default.put("/doc/" + (archived ? 'undo-' : '') + "archive", { data: { bizSn: bizSn } })
            .then(function (r) {
            if (!r)
                return;
            setArchived(!archived);
            utils_1.event.emit('signed');
        })
            .finally(function () { return setArchiveLoading(false); });
    };
    return {
        setBizSn: setBizSn, bizSn: bizSn, archive: archive, archiveLoading: archiveLoading, archived: archived
    };
});
