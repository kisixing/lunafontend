"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var icons_1 = require("@ant-design/icons");
var utils_1 = require("@lianmed/utils");
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var UpdateForm = function (props) {
    var _a;
    var historyList = props.historyList, currentHistory = props.currentHistory, setCurrentHistory = props.setCurrentHistory;
    var _b = react_1.useState(false), showTime = _b[0], setShowTime = _b[1];
    react_1.useEffect(function () {
        var firstOne = historyList[0];
        var isCurrentIn = historyList.findIndex(function (_) { return _.id === (currentHistory === null || currentHistory === void 0 ? void 0 : currentHistory.id); }) > -1;
        if (!isCurrentIn && firstOne) {
        }
    }, [historyList, currentHistory]);
    return (historyList.length ? react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "divider", style: { display: 'flex', justifyContent: 'space-between' } },
            react_1.default.createElement("span", null, "\u5386\u53F2"),
            react_1.default.createElement("span", null,
                react_1.default.createElement(icons_1.MenuUnfoldOutlined, { onClick: function () { return setShowTime(!showTime); }, style: { cursor: 'pointer', padding: '0 4px 0 6px' } }))),
        react_1.default.createElement(antd_1.Menu, { style: { height: '100%', overflowY: 'auto', minWidth: 0, fontSize: showTime ? 12 : 'unset', textAlign: 'center' }, selectedKeys: [(_a = currentHistory === null || currentHistory === void 0 ? void 0 : currentHistory.id) === null || _a === void 0 ? void 0 : _a.toString()], onSelect: function (_a) {
                var key = _a.key;
                var target = historyList.find(function (_) { return _.id.toString() == key; });
                console.log(target);
                setCurrentHistory(target || {});
            } }, historyList.map(function (_a) {
            var doctor = _a.doctor, id = _a.id, diagnosisTime = _a.diagnosisTime;
            return (react_1.default.createElement(antd_1.Menu.Item, { style: { padding: '0 4px' }, key: id === null || id === void 0 ? void 0 : id.toString() },
                doctor,
                showTime ? '_' + utils_1.formatTime(diagnosisTime) : ''));
        }))) : null);
};
exports.default = UpdateForm;
//# sourceMappingURL=HistoryList.js.map