"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var Item_1 = __importDefault(require("./Item"));
var Home = function (props) {
    var _a = props.listLayout, listLayout = _a === void 0 ? [] : _a, fullScreenId = props.fullScreenId, contentHeight = props.contentHeight, RenderIn = props.RenderIn, items = props.items, onClose = props.onClose, _b = props.themeColor, themeColor = _b === void 0 ? 'skyblue' : _b;
    var wrap = react_1.useRef(null);
    var empty = react_1.useRef(null);
    var itemSpan = 24 / listLayout[1];
    var outPadding = 6;
    var itemHeight = (contentHeight - outPadding * 2) / listLayout[0];
    return (react_1.default.createElement("div", { style: { height: '100%' }, ref: wrap }, react_1.default.createElement(antd_1.Row, { justify: "start", align: "top", style: { padding: outPadding, maxHeight: contentHeight, overflowY: items.length > (listLayout[0] * listLayout[1]) ? 'scroll' : 'hidden' } }, items.length ? items.map(function (item) {
        var data = item.data, bedname = item.bedname, unitId = item.unitId, id = item.id;
        var pregnancy = data.pregnancy, docid = data.docid, starttime = data.starttime, status = data.status, ismulti = data.ismulti;
        var safePregnancy = pregnancy || { age: null, name: null, bedNO: null, GP: null, gestationalWeek: null };
        var startTime = starttime;
        return (react_1.default.createElement(Item_1.default, { onClose: onClose, themeColor: themeColor, itemData: item, bedname: bedname, unitId: unitId, key: id, data: data, ismulti: ismulti, docid: docid, status: status, loading: false, pregnancy: safePregnancy, startTime: startTime, itemHeight: itemHeight, itemSpan: itemSpan, outPadding: outPadding, fullScreenId: fullScreenId }, RenderIn && react_1.default.createElement(RenderIn, { itemData: item })));
    }) : (react_1.default.createElement("div", { ref: empty, style: { marginTop: 200, display: 'flex', justifyContent: 'center', width: '100%' } },
        react_1.default.createElement(antd_1.Empty, { description: "\u80CE\u76D1\u5DE5\u4F5C\u7AD9" }))))));
};
exports.default = Home;
//# sourceMappingURL=index.js.map