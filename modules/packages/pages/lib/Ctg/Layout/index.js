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
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var Item_1 = __importDefault(require("./Item"));
var Home = function (props) {
<<<<<<< HEAD
    var onSelect = props.onSelect, borderedId = props.borderedId, loading = props.loading, _a = props.listLayout, listLayout = _a === void 0 ? [] : _a, fullScreenId = props.fullScreenId, contentHeight = props.contentHeight, RenderIn = props.RenderIn, items = props.items, onClose = props.onClose, _b = props.themeColor, themeColor = _b === void 0 ? 'skyblue' : _b, _c = props.headColor, headColor = _c === void 0 ? "#fff" : _c, _d = props.backgroundColor, backgroundColor = _d === void 0 ? "#f8f8f8" : _d, _e = props.borderedColor, borderedColor = _e === void 0 ? "#DBDBDB" : _e, _f = props.fontColor, fontColor = _f === void 0 ? "#242741" : _f, _g = props.activeColor, activeColor = _g === void 0 ? '#1890ff' : _g;
=======
    var onSelect = props.onSelect, borderedId = props.borderedId, loading = props.loading, _a = props.listLayout, listLayout = _a === void 0 ? [] : _a, fullScreenId = props.fullScreenId, contentHeight = props.contentHeight, RenderIn = props.RenderIn, RenderMaskIn = props.RenderMaskIn, items = props.items, onClose = props.onClose, _b = props.themeColor, themeColor = _b === void 0 ? 'skyblue' : _b;
>>>>>>> 7月三类评分
    var wrap = react_1.useRef(null);
    var empty = react_1.useRef(null);
    var itemSpan = 24 / listLayout[1];
    var outPadding = 6;
    var itemHeight = (contentHeight) / listLayout[0];
    return (react_1.default.createElement("div", { style: { height: '100%' }, ref: wrap }, loading ? (react_1.default.createElement(antd_1.Spin, { spinning: loading, size: "large", style: { paddingTop: 100, width: '100%' } })) : react_1.default.createElement(antd_1.Row, { justify: "start", align: "top", style: { padding: 0, maxHeight: contentHeight, overflowY: items.length > (listLayout[0] * listLayout[1]) ? 'scroll' : 'hidden' } }, items.length ? items.map(function (item) {
        var data = item.data, bedname = item.bedname, unitId = item.unitId, id = item.id;
        var pregnancy = data.pregnancy, docid = data.docid, starttime = data.starttime, status = data.status, ismulti = data.ismulti;
        var safePregnancy = pregnancy || { age: null, name: null, bedNO: null, GP: null, gestationalWeek: null, telephone: null };
        var startTime = starttime;
<<<<<<< HEAD
        return (react_1.default.createElement(Item_1.default, { onClose: onClose, themeColor: headColor, itemData: item, bedname: bedname, unitId: unitId, bordered: borderedId === unitId, key: id, onSelect: onSelect, data: data, ismulti: ismulti, docid: docid, status: status, loading: false, pregnancy: safePregnancy, startTime: startTime, itemHeight: itemHeight, itemSpan: itemSpan, outPadding: outPadding, fullScreenId: fullScreenId, backgroundColor: backgroundColor, borderedColor: borderedColor, headColor: headColor, fontColor: fontColor, activeColor: activeColor }, RenderIn && react_1.default.createElement(RenderIn, { itemData: item })));
=======
        return (react_1.default.createElement(Item_1.default, { onClose: onClose, themeColor: themeColor, itemData: item, bedname: bedname, unitId: unitId, bordered: borderedId === unitId, key: id, onSelect: onSelect, data: data, RenderMaskIn: RenderMaskIn, ismulti: ismulti, docid: docid, status: status, loading: false, pregnancy: safePregnancy, startTime: startTime, itemHeight: itemHeight, itemSpan: itemSpan, outPadding: outPadding, fullScreenId: fullScreenId }, RenderIn && react_1.default.createElement(RenderIn, { itemData: item })));
>>>>>>> 7月三类评分
    }) : (react_1.default.createElement("div", { ref: empty, style: { marginTop: 200, display: 'flex', justifyContent: 'center', width: '100%' } },
        react_1.default.createElement(antd_1.Empty, { description: "\u80CE\u76D1\u5DE5\u4F5C\u7AD9" }))))));
};
exports.default = react_1.memo(Home);
//# sourceMappingURL=index.js.map