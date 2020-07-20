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
var strategies_1 = __importDefault(require("./strategies"));
function RenderResult(_a) {
    var k = _a.k, m = _a.m, disabled = _a.disabled;
    console.log('zz', k, m, disabled);
    if (m === 'Cst') {
        if (k === 'acc') {
            return (react_1.default.createElement(antd_1.Select, { style: { width: 100 } },
                react_1.default.createElement(antd_1.Select.Option, { value: "0" }, "\u65E0"),
                react_1.default.createElement(antd_1.Select.Option, { value: "1" }, "\u5468\u671F\u6027"),
                react_1.default.createElement(antd_1.Select.Option, { value: "2" }, "\u6563\u5728\u6027")));
        }
    }
    return react_1.default.createElement(antd_1.Input, { disabled: disabled, style: { width: 44 } });
}
var T = react_1.forwardRef(function (props, ref) {
    var hidden = props.hidden, dataSource = props.dataSource, disabled = props.disabled, mark = props.mark;
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
        deformed ? null : {
            title: '结果',
            dataIndex: 'result',
            render: function (a, _a) {
                var key = _a.key, R = _a.R;
                return (react_1.default.createElement(antd_1.Form.Item, { name: key + "value", style: { margin: -8 } }, R ? react_1.default.createElement(R, { disabled: disabled }) : react_1.default.createElement(antd_1.Input, { disabled: disabled, style: { width: 44 } })));
            }
        },
        false ? null : {
            title: deformed ? '类型' : '得分',
            dataIndex: 'score',
            render: function (a, _a) {
                var key = _a.key, S = _a.S;
                return (react_1.default.createElement(antd_1.Form.Item, { name: key + "score", style: { margin: -8 } }, S ? react_1.default.createElement(S, { disabled: disabled }) : react_1.default.createElement(antd_1.InputNumber, { disabled: true, style: { width: 44 } })));
            }
        },
    ]
        .filter(function (_) { return !!_; })
        .map(function (_) { return (__assign(__assign({}, _), { align: 'center' })); });
    var form = antd_1.Form.useForm()[0];
    return (react_1.default.createElement(antd_1.Form, { ref: ref, form: form, size: "small", style: { display: hidden ? 'none' : 'block', position: 'relative' }, onValuesChange: function (a, b) {
            var newData = strategies_1.default(mark, form.getFieldsValue());
            newData && form.setFieldsValue(newData);
        } },
        react_1.default.createElement(antd_1.Form.Item, { name: deformed ? 'result' : 'total', label: deformed ? '结果' : '总分', style: { position: 'absolute', top: -48, right: 200 } },
            react_1.default.createElement(antd_1.InputNumber, { disabled: true, style: { width: 50 } })),
        react_1.default.createElement(antd_1.Table, { bordered: true, size: "small", pagination: false, columns: columns, dataSource: dataSource })));
});
exports.default = react_1.memo(T);
//# sourceMappingURL=Table.js.map