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
exports.default = react_1.forwardRef(function (props, ref) {
    var hidden = props.hidden, dataSource = props.dataSource, disabled = props.disabled;
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
                    react_1.default.createElement(antd_1.InputNumber, { disabled: disabled })));
            }
        },
        {
            title: '得分',
            dataIndex: 'score',
            render: function (a, _a) {
                var key = _a.key;
                return (react_1.default.createElement(antd_1.Form.Item, { name: key + "score", style: { margin: -8 } },
                    react_1.default.createElement(antd_1.InputNumber, { disabled: disabled })));
            }
        },
    ];
    var form = antd_1.Form.useForm()[0];
    return (react_1.default.createElement(antd_1.Form, { ref: ref, form: form, size: "small", style: { display: hidden ? 'none' : 'block' } },
        react_1.default.createElement(antd_1.Table, { bordered: true, size: "small", pagination: false, columns: columns, dataSource: dataSource })));
});
