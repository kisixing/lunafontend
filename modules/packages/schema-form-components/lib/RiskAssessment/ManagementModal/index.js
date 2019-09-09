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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var Tree_1 = __importDefault(require("./Tree"));
var context_1 = __importDefault(require("../context"));
var Table_1 = __importDefault(require("../Table"));
var RemarkCheckbox_1 = require("../../RemarkCheckbox");
var dataSource_1 = require("../dataSource");
var levelMap;
(function (levelMap) {
    levelMap[levelMap["\u2160"] = 1] = "\u2160";
    levelMap[levelMap["\u2161"] = 2] = "\u2161";
    levelMap[levelMap["\u2162"] = 3] = "\u2162";
    levelMap[levelMap["\u2163"] = 4] = "\u2163";
    levelMap[levelMap["\u2164"] = 5] = "\u2164";
    levelMap[levelMap["\u2165"] = 6] = "\u2165";
})(levelMap = exports.levelMap || (exports.levelMap = {}));
function ManagementModal(props) {
    var _a = react_1.useContext(context_1.default), value = _a[0], onChange = _a[1];
    var _b = react_1.useState(value), state = _b[0], setState = _b[1];
    var visible = props.visible, onCancel = props.onCancel;
    var infectiousDisease = state.infectiousDisease, level = state.level, risks = state.risks;
    console.log('state', state, value);
    react_1.useEffect(function () {
        setState(value);
    }, [value, visible]);
    react_1.useEffect(function () {
        var _level = Object.values(infectiousDisease).some(function (_) { return _ === true; })
            ? '5'
            : dataSource_1.listData
                .filter(function (_) { return risks.map(function (risk) { return risk.key; }).includes(_.key); })
                .reduce(function (prev_level, cur) {
                var cur_level = cur.key.slice(0, 1);
                return prev_level > cur_level ? prev_level : cur_level;
            }, '1');
        setState(__assign(__assign({}, state), { level: _level }));
    }, [risks, infectiousDisease]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(context_1.default.Provider, { value: [state, setState] },
            react_1.default.createElement(antd_1.Modal, { destroyOnClose: true, centered: true, title: "\u98CE\u9669\u7BA1\u7406", visible: visible, width: 1080, bodyStyle: { overflowY: 'scroll', maxHeight: '80vh' }, onCancel: function () { return onCancel(false); }, onOk: function () {
                    onChange(state);
                    onCancel(false);
                } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u9AD8\u5371\u7B49\u7EA7", labelAlign: "left", labelCol: { xs: 2 } },
                        react_1.default.createElement(antd_1.Select, { placeholder: "\u9009\u62E9...", style: { width: '116px' }, value: level, onSelect: function (value) { return setState(__assign(__assign({}, state), { level: value })); } }, Object.keys(levelMap).map(function (k) {
                            if (typeof levelMap[k] === 'number') {
                                return null;
                            }
                            return (react_1.default.createElement(antd_1.Select.Option, { key: k, value: k }, levelMap[k]));
                        }))),
                    react_1.default.createElement(antd_1.Form.Item, { label: "\u4F20\u67D3\u75C5", labelAlign: "left", labelCol: { xs: 2 } },
                        react_1.default.createElement(RemarkCheckbox_1.InfectiousDisease, { value: infectiousDisease, onChange: function (infectiousDisease) { return setState(__assign(__assign({}, state), { infectiousDisease: infectiousDisease })); } })),
                    react_1.default.createElement(Table_1.default, { editable: true, value: state, onChange: setState })),
                react_1.default.createElement("div", { style: { flex: 1, overflowY: 'auto' } },
                    react_1.default.createElement("div", { style: { minHeight: '800px' } },
                        react_1.default.createElement(Tree_1.default, null)))))));
}
exports.default = ManagementModal;
