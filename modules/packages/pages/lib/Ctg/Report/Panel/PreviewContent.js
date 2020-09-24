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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var react_pdf_1 = require("react-pdf");
require("react-pdf/dist/Page/AnnotationLayer.css");
var PreviewContent = function (props) {
    var pdfBase64 = props.pdfBase64, _a = props.isFull, isFull = _a === void 0 ? false : _a, wh = props.wh, _b = props.borderd, borderd = _b === void 0 ? true : _b, onDownload = props.onDownload;
    var h = wh.h, w = wh.w;
    var _c = react_1.useState(false), isFullpage = _c[0], setFullpage = _c[1];
    var _d = react_1.useState(200), height = _d[0], setHeight = _d[1];
    var _e = react_1.useState('100%'), width = _e[0], setWidth = _e[1];
    var _f = react_1.useState(0), numPages = _f[0], setNumPages = _f[1];
    var _g = react_1.useState(1), pageNumber = _g[0], setPageNumber = _g[1];
    var onDocumentLoad = react_1.useCallback(function (_a) {
        var numPages = _a.numPages;
        setNumPages(numPages);
    }, []);
    var onChangePage = react_1.useCallback(function (page) { setPageNumber(page); }, []);
    var largen = function () {
        setFullpage(true);
        setHeight(h - 24);
        setWidth(w);
    };
    var shrink = function () {
        setFullpage(false);
        setHeight(200);
        setWidth('100%');
    };
    var ref1 = react_1.useRef(null);
    var ref2 = react_1.useRef(null);
    react_1.useLayoutEffect(function () {
        if (document.querySelector('style')) {
            document.querySelector('style').innerHTML = document.querySelector('style').innerHTML + " \n            .react-pdf__Page {\n                display: inline-block;\n              }\n            ";
        }
    }, []);
    react_1.useEffect(function () {
        if (isFull) {
            setHeight(h - 24);
            setWidth(w);
        }
    }, [w, h]);
    react_1.useEffect(function () {
        setPageNumber(1);
    }, [pdfBase64]);
    var content = pdfBase64 ? (react_1.default.createElement("div", { style: __assign({ width: width }, (isFullpage ? {
            position: 'absolute',
            top: 0,
            left: 0,
        } : {})) },
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_pdf_1.Document, { ref: ref1, loading: react_1.default.createElement(antd_1.Spin, { style: { margin: '120px 0' } }), onLoadSuccess: onDocumentLoad, file: pdfBase64, renderMode: "canvas" },
                react_1.default.createElement(react_pdf_1.Page, { pageNumber: pageNumber, scale: 1, height: height })),
            react_1.default.createElement(antd_1.Pagination, { ref: ref2, total: numPages, showTotal: function (total) { return "\u5171 " + total + " \u9875"; }, current: pageNumber, pageSize: 1, size: "small", onChange: onChangePage })),
        isFullpage ? (react_1.default.createElement("div", { style: { position: 'absolute', top: 24, right: 24 } },
            react_1.default.createElement(antd_1.Button, { size: "large", type: "primary", style: { marginRight: 10 }, onClick: shrink },
                react_1.default.createElement("span", null, "\u8FD4\u56DE")),
            onDownload && (react_1.default.createElement(antd_1.Button, { size: "large", type: "primary", onClick: onDownload },
                react_1.default.createElement("span", null, "\u6253\u5370"))))) : (isFull || react_1.default.createElement("span", { style: { position: 'absolute', bottom: 36, right: 12, } },
            react_1.default.createElement(antd_1.Button, { title: "\u5168\u5C4F", type: "primary", onClick: largen }, "\u653E\u5927\u9884\u89C8"))))) : (react_1.default.createElement(antd_1.Empty, { style: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0 } }));
    return (react_1.default.createElement("div", { style: {
            position: 'relative',
            flex: 1,
            marginRight: 12,
            zIndex: 99,
            border: borderd && '1px solid #d9d9d9',
        } }, content));
};
exports.default = PreviewContent;
//# sourceMappingURL=PreviewContent.js.map