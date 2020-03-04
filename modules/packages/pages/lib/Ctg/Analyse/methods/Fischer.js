"use strict";
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
var dataSource = [
    {
        name: '心率基线',
        0: '<100,>180',
        1: '100~109,161~180',
        2: '110~160',
        key: 'bhr',
    },
    {
        name: '振幅变异',
        0: '<5',
        1: '5~9,>30',
        2: '10~30',
        key: 'ltv',
    },
    {
        name: '周期变异',
        0: '<2',
        1: '2~6',
        2: '>6',
        key: 'stv',
    },
    {
        name: '加速',
        0: '无',
        1: '1～4',
        2: '>4',
        key: 'acc',
    },
    {
        name: '减速',
        0: 'LD',
        1: 'VD',
        2: '无，其它',
        key: 'dec',
    },
];
exports.default = react_1.forwardRef(function (props, ref) {
    var columns = [
        {
            title: '项目',
            dataIndex: 'name'
        },
        {
            title: '0分',
            dataIndex: '0'
        },
        {
            title: '1分',
            dataIndex: '1'
        },
        {
            title: '2分',
            dataIndex: '2'
        },
        {
            title: '结果',
            dataIndex: 'result',
            render: function (a, _a) {
                var key = _a.key;
                return (react_1.default.createElement(antd_1.Form.Item, { name: key + "value", style: { margin: -8 } },
                    react_1.default.createElement(antd_1.InputNumber, null)));
            }
        },
        {
            title: '得分',
            dataIndex: 'score',
            render: function (a, _a) {
                var key = _a.key;
                return (react_1.default.createElement(antd_1.Form.Item, { name: key + "score", style: { margin: -8 } },
                    react_1.default.createElement(antd_1.InputNumber, null)));
            }
        },
    ];
    var form = antd_1.Form.useForm()[0];
    return (react_1.default.createElement(antd_1.Form, { ref: ref, form: form, size: "small", style: { display: props.name !== 'Fischer' ? 'none' : 'block' } },
        react_1.default.createElement(antd_1.Table, { size: "small", pagination: false, columns: columns, dataSource: dataSource })));
});
