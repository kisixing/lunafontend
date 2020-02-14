"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var columns = [
    {
        title: '日期',
        dataIndex: 'date',
        align: 'center',
    },
    {
        title: '孕周',
        dataIndex: 'gestationalWeeks',
        align: 'center',
    },
    {
        title: '高危等级',
        dataIndex: 'level',
        align: 'center',
        render: function (text, record) {
            return react_1.default.createElement("div", { style: { background: '#faad14' } }, text);
        },
    },
    {
        title: '高危因素',
        dataIndex: 'factor',
        align: 'center',
    },
    {
        title: '备注',
        dataIndex: 'remark',
        align: 'center',
    },
    {
        title: '医师签名',
        dataIndex: 'physician',
        align: 'center',
    },
];
var dataSource = [
    {
        id: '8794554',
        date: '2019-03-25',
        gestationalWeeks: '22',
        level: '较高风险',
        factor: '妊娠糖尿病-A1级',
        remark: '',
        physician: '陈志超',
    },
    {
        id: '8794558',
        date: '2019-02-25',
        gestationalWeeks: '18',
        level: '一般风险',
        factor: '仅有妊娠期贫血，血红蛋白>100g/L',
        remark: '',
        physician: '陈志超',
    },
];
var RecordsModal = (function (_super) {
    __extends(RecordsModal, _super);
    function RecordsModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecordsModal.prototype.render = function () {
        var _a = this.props, visible = _a.visible, onCancel = _a.onCancel;
        return (react_1.default.createElement(antd_1.Modal, { centered: true, title: "\u8FC7\u7A0B\u8BB0\u5F55", visible: visible, width: 800, footer: null, onCancel: function () { return onCancel(false); } },
            react_1.default.createElement(antd_1.Table, { bordered: true, size: "small", rowKey: "id", pagination: false, columns: columns, dataSource: dataSource })));
    };
    return RecordsModal;
}(react_1.PureComponent));
exports.default = RecordsModal;
