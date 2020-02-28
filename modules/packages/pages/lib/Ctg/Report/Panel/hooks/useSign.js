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
exports.default = (function (docid, setPdfBase64) {
    var _a = react_1.useState(docid), bizSn = _a[0], setBizSn = _a[1];
    var _b = react_1.useState(''), qrCodeBase64 = _b[0], setQrCodeBase64 = _b[1];
    var _c = react_1.useState(false), qrCodeBase64Loading = _c[0], setQrCodeBase64Loading = _c[1];
    var _d = react_1.useState(false), modalVisible = _d[0], setModalVisible = _d[1];
    var _e = react_1.useState(false), signed = _e[0], setSigned = _e[1];
    var _f = react_1.useState(false), archived = _f[0], setArchived = _f[1];
    var _g = react_1.useState(false), archiveLoading = _g[0], setArchiveLoading = _g[1];
    react_1.useEffect(function () {
        var timeoutId = modalVisible && setInterval(fetchSigninfo, 1500);
        return function () {
            timeoutId && clearInterval(timeoutId);
        };
    }, [modalVisible]);
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
    var fetchQrCode = function () {
        setQrCodeBase64Loading(true);
        request_1.default.post('/ca/signreq', { data: { action: "sign", docid: docid, } })
            .then(function (r) {
            if (r && r.sn) {
                setBizSn(r.sn);
            }
            setQrCodeBase64(r && r.data);
            setModalVisible(true);
        })
            .finally(function () { return setQrCodeBase64Loading(false); });
    };
    var fetchSigninfo = function () {
        request_1.default.post('/ca/signinfo', { data: { bizSn: bizSn } }).then(function (_a) {
            var ret = _a.ret, data = _a.data;
            if (ret === '1') {
                setModalVisible(false);
                if (data) {
                    setSigned(true);
                    info('签名成功');
                    utils_1.event.emit('signed', docid);
                    setPdfBase64("data:application/pdf;base64," + data);
                }
                else {
                    info('签名失败');
                }
            }
        });
    };
    return {
        fetchQrCode: fetchQrCode, qrCodeBase64: qrCodeBase64, modalVisible: modalVisible, setModalVisible: setModalVisible, qrCodeBase64Loading: qrCodeBase64Loading, signed: signed, archive: archive, archiveLoading: archiveLoading, archived: archived
    };
});
