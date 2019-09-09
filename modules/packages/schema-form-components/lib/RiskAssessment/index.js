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
var RecordsModal_1 = __importDefault(require("./RecordsModal"));
var index_1 = __importDefault(require("./ManagementModal/index"));
var Table_1 = __importDefault(require("./Table"));
var react_2 = require("@uform/react");
var context_1 = __importDefault(require("./context"));
var RemarkCheckbox_1 = require("../RemarkCheckbox");
var dataSource_1 = require("./dataSource");
var HighRisk = function (props) {
    var _a = props.value, value = _a === void 0 ? {
        level: '0',
        risks: [],
        infectiousDisease: {},
    } : _a, onChange = props.onChange;
    if (!value.level) {
        value.level = '0';
    }
    if (!value.risks) {
        value.risks = [];
    }
    if (!value.infectiousDisease) {
        value.infectiousDisease = {};
    }
    var _b = value, risks = _b.risks, infectiousDisease = _b.infectiousDisease;
    var _c = react_1.useState(false), managementVisible = _c[0], setManagementVisible = _c[1];
    var _d = react_1.useState(false), recordVisible = _d[0], setRecordVisible = _d[1];
    var _e = react_1.useState([]), searchDataSource = _e[0], setSearchDataSource = _e[1];
    var _f = react_1.useState(''), searchText = _f[0], setSearchText = _f[1];
    var showRecords = function (bool) {
        setRecordVisible(bool);
    };
    var showManagement = function (bool) {
        setManagementVisible(bool);
    };
    var onSearch = function (text) {
        setSearchText(text);
        if (text === '' || text === ' ') {
            setSearchDataSource([]);
        }
        else {
            var dataSource = dataSource_1.listData
                .filter(function (_) { return _.title.includes(text); })
                .filter(function (_) { return !risks.some(function (risk) { return risk.key === _.key; }); })
                .map(function (_) { return ({ value: _.key, text: _.title }); });
            setSearchDataSource(dataSource);
        }
    };
    var onSearchSelect = function (searchSelectedKey) {
        setSearchText('');
        if (risks.some(function (_) { return _.key === searchSelectedKey; }))
            return;
        onChange(__assign(__assign({}, value), { risks: risks.concat({
                key: searchSelectedKey,
                fator: '',
                cured: false,
                remark: '',
            }) }));
        setManagementVisible(true);
    };
    return (react_1.default.createElement(context_1.default.Provider, { value: [value, onChange] },
        react_1.default.createElement(antd_1.Form.Item, { label: "\u4F20\u67D3\u75C5", style: { display: 'flex' } },
            react_1.default.createElement(RemarkCheckbox_1.InfectiousDisease, { value: infectiousDisease, onChange: function (infectiousDisease) { return onChange(__assign(__assign({}, value), { infectiousDisease: infectiousDisease })); } })),
        react_1.default.createElement("div", { style: { marginBottom: '18px', display: 'flex' } },
            react_1.default.createElement(antd_1.AutoComplete, { dataSource: searchDataSource, placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57", onChange: onSearch, onSelect: onSearchSelect, value: searchText }),
            react_1.default.createElement(antd_1.Button, { type: "primary", style: { marginLeft: '24px', marginRight: '24px' }, icon: "edit", onClick: function () { return showManagement(true); } }, "\u9AD8\u5371\u7BA1\u7406")),
        react_1.default.createElement(Table_1.default, { value: value }),
        react_1.default.createElement("div", { style: { textAlign: 'right' } },
            react_1.default.createElement(antd_1.Button, { type: "link", onClick: function () { return showRecords(true); } }, "\u8FC7\u7A0B\u8BB0\u5F55")),
        react_1.default.createElement(RecordsModal_1.default, { visible: recordVisible, onCancel: showRecords }),
        react_1.default.createElement(index_1.default, { visible: managementVisible, onCancel: showManagement, value: value })));
};
react_2.registerFormField('risk_assessment', react_2.connect()(HighRisk));
