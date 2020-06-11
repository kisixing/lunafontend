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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var T = react_1.forwardRef(function (props, ref) {
    var hidden = props.hidden, dataSource = props.dataSource, disabled = props.disabled;
    var deformed = dataSource.deformed;
    var columns = [
        {
            title: '项目',
            dataIndex: 'name',
            render: function (a) {
                return (react_1.default.createElement("span", { style: { whiteSpace: 'nowrap', } }, a));
            }
        },
        {
            title: deformed ? '正常' : '0分',
            dataIndex: '0'
        },
        {
            title: deformed ? '可疑' : '1分',
            dataIndex: '1'
        },
        {
            title: deformed ? '异常' : '2分',
            dataIndex: '2'
        },
        {
            title: '结果',
            dataIndex: 'result',
            render: function (a, _a) {
                var key = _a.key;
                return (react_1.default.createElement(antd_1.Form.Item, { name: key + "value", style: { margin: -8 } },
                    react_1.default.createElement(antd_1.Input, { disabled: disabled, style: { width: 60 } })));
            }
        },
        deformed ? null : {
            title: '得分',
            dataIndex: 'score',
            render: function (a, _a) {
                var key = _a.key;
                return (react_1.default.createElement(antd_1.Form.Item, { name: key + "score", style: { margin: -8 } },
                    react_1.default.createElement(antd_1.InputNumber, { disabled: disabled, style: { width: 60 } })));
            }
        },
    ]
        .filter(function (_) { return !!_; })
        .map(function (_) { return (__assign(__assign({}, _), { align: 'center' })); });
    var form = antd_1.Form.useForm()[0];
    return (react_1.default.createElement(antd_1.Form, { ref: ref, form: form, size: "small", style: { display: hidden ? 'none' : 'block', position: 'relative' }, onValuesChange: function (a, b) {
            var vk = Object.entries(b);
            var k = Object.keys(a)[0];
            if (/score$/.test(k)) {
                var total = vk
                    .filter(function (_a) {
                    var k = _a[0], v = _a[1];
                    return /score$/.test(k);
                })
                    .map(function (_) { return _[1]; })
                    .reduce(function (a, b) { return a + b; }, 0);
                form.setFieldsValue({ total: total });
            }
        } },
        react_1.default.createElement(antd_1.Form.Item, { name: deformed ? 'result' : 'total', label: deformed ? '结果' : '总分', style: { position: 'absolute', top: -48, right: 100 } },
            react_1.default.createElement(antd_1.InputNumber, { disabled: true, style: { width: 50 } })),
        react_1.default.createElement(antd_1.Table, { bordered: true, size: "small", pagination: false, columns: columns, dataSource: dataSource })));
});
exports.default = react_1.memo(T);
//# sourceMappingURL=Table.js.map