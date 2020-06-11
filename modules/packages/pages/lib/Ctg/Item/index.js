"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var moment_1 = __importDefault(require("moment"));
var lmg_1 = require("@lianmed/lmg");
var Extra_1 = __importDefault(require("./Extra"));
var styled_components_1 = __importDefault(require("styled-components"));
var Bar_1 = __importDefault(require("./Bar"));
require("antd/lib/card/style/index.css");
require("antd/lib/tag/style/index.css");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 100%;\n    user-select: none;\n    .ant-card-body:hover .btn{\n        opacity:1\n    }\n    .btn {\n        opacity: 0;\n    }\n    .ant-modal-root {\n        visibility:visible;\n        float:left;\n    }\n"], ["\n    height: 100%;\n    user-select: none;\n    .ant-card-body:hover .btn{\n        opacity:1\n    }\n    .btn {\n        opacity: 0;\n    }\n    .ant-modal-root {\n        visibility:visible;\n        float:left;\n    }\n"])));
var Item = function (props) {
    var data = props.data, bedname = props.bedname, onClose = props.onClose, onDoubleClick = props.onDoubleClick, loading = props.loading, onSuitRead = props.onSuitRead, _a = props.themeColor, themeColor = _a === void 0 ? 'rgb(74, 20, 140)' : _a, unitId = props.unitId, isFullscreen = props.isFullscreen;
    var status = props.status === undefined ? data && data.status : props.status;
    var ismulti = data && data.ismulti;
    var bedNO = props.bedNO, GP = props.GP, gestationalWeek = props.gestationalWeek, name = props.name, age = props.age, startTime = props.startTime;
    var _b = react_1.useState(null), suit = _b[0], setSuit = _b[1];
    var ref = react_1.useRef();
    var RenderTilte = function () {
        var m = moment_1.default(startTime);
        var text = (react_1.default.createElement("span", null, [
            ['姓名', name],
            ['床号', bedNO],
            ['年龄', age],
            ['孕周', gestationalWeek],
            ['GP', GP],
            ['开始时间', (startTime && m.isValid) ? m.format('HH:mm') : ' '],
        ]
            .filter(function (_) { return !!_[1]; })
            .map(function (_a) {
            var a = _a[0], b = _a[1];
            return react_1.default.createElement("span", { key: a, style: { marginRight: 12 } },
                a,
                "\uFF1A",
                b);
        })));
        return (react_1.default.createElement(antd_1.Tooltip, { title: text }, text));
    };
    var onReady = react_1.useCallback(function (suit) { setSuit(suit); onSuitRead && onSuitRead(suit); }, []);
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(antd_1.Card, { size: "small", title: react_1.default.createElement(RenderTilte, null), style: { height: '100%' }, extra: react_1.default.createElement(Extra_1.default, { bedname: bedname, onClose: onClose, status: status, suit: suit, unitId: unitId }), headStyle: { background: themeColor, color: '#fff' }, bodyStyle: { padding: 0, height: 'calc(100% - 38px)' } },
            react_1.default.createElement(lmg_1.Ctg, { ref: ref, data: data, onReady: onReady, onDoubleClick: onDoubleClick, loading: loading, showEcg: ismulti, isFullscreen: isFullscreen }),
            react_1.default.createElement(Bar_1.default, { mutableSuit: ref }, props.children))));
};
exports.default = Item;
var templateObject_1;
//# sourceMappingURL=index.js.map