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
var moment_1 = __importDefault(require("moment"));
var lmg_1 = require("@lianmed/lmg");
var Extra_1 = __importDefault(require("./Extra"));
require("antd/lib/card/style/index.css");
require("antd/lib/tag/style/index.css");
var Item = function (props) {
    var data = props.data, bedname = props.bedname, onClose = props.onClose, onDoubleClick = props.onDoubleClick, loading = props.loading, onSuitRead = props.onSuitRead, _a = props.themeColor, themeColor = _a === void 0 ? 'rgb(74, 20, 140)' : _a;
    var status = props.status === undefined ? data && data.status : props.status;
    var ismulti = data && data.ismulti;
    var bedNO = props.bedNO, GP = props.GP, gestationalWeek = props.gestationalWeek, name = props.name, age = props.age, startTime = props.startTime;
    var _b = react_1.useState(null), suit = _b[0], setSuit = _b[1];
    var RenderTilte = function () {
        var text = (react_1.default.createElement("span", null, [
            ['姓名', name],
            ['床号', bedNO],
            ['年龄', age],
            ['孕周', gestationalWeek],
            ['GP', GP],
            ['开始时间', moment_1.default(startTime).format('HH:mm')],
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
    return (react_1.default.createElement(antd_1.Card, { size: "small", title: react_1.default.createElement(RenderTilte, null), style: { height: '100%', overflow: 'hidden', userSelect: 'none' }, extra: react_1.default.createElement(Extra_1.default, { bedname: bedname, onClose: onClose, status: status, suit: suit }), headStyle: { background: themeColor, color: '#fff' }, bodyStyle: { padding: 0, height: 'calc(100% - 38px)' } },
        react_1.default.createElement(lmg_1.Ctg, { data: data, onReady: function (suit) { setSuit(suit); onSuitRead && onSuitRead(suit); }, onDoubleClick: onDoubleClick, loading: loading, showEcg: ismulti })));
};
exports.default = Item;
