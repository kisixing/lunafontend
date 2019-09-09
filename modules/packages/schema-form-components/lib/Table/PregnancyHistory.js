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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var antd_2 = require("@uform/antd");
var moment_1 = __importDefault(require("moment"));
var columnData = [
    { title: '孕次', dataIndex: '孕次', display: true },
    { title: '日期', dataIndex: '日期' },
    {
        title: '流产史',
        children: [
            { title: '自然', dataIndex: '自然' },
            { title: '人工', dataIndex: '人工' },
            { title: '药流', dataIndex: '药流' },
        ],
    },
    {
        title: '不良生育史',
        children: [
            { title: '葡萄胎', dataIndex: '葡萄胎' },
            { title: '异位妊娠', dataIndex: '异位妊娠' },
            { title: '引产', dataIndex: '引产' },
            { title: '死胎', dataIndex: '死胎' },
            { title: '早产', dataIndex: '早产' },
            { title: '死产', dataIndex: '死产' },
        ],
    },
    {
        title: '正常分娩史',
        children: [
            { title: '足月产', dataIndex: '足月产' },
            { title: '顺产', dataIndex: '顺产' },
            { title: '剖宫产', dataIndex: '剖宫产' },
        ],
    },
].map(function (d) {
    var onCell = function (_a) {
        var dataIndex = _a.dataIndex, display = _a.display;
        return function (record, rowIndex) {
            return {
                editable: !display,
                record: record,
                rowIndex: rowIndex,
                dataIndex: dataIndex,
                inputType: dataIndex === '日期' ? 'date' : 'checkbox',
            };
        };
    };
    if (!d.children) {
        return __assign(__assign({}, d), { onCell: onCell(d) });
    }
    return __assign(__assign({}, d), { children: d.children.map(function (dd) { return (__assign(__assign({}, dd), { onCell: onCell(dd) })); }) });
});
var Column = antd_1.Table.Column, ColumnGroup = antd_1.Table.ColumnGroup;
var EditableContext = react_1.default.createContext({});
var MyCheckbox = function (props) {
    return react_1.default.createElement(antd_1.Checkbox, __assign({ checked: props.value }, props));
};
var EditableCell = function (props) {
    var editable = props.editable, dataIndex = props.dataIndex, title = props.title, inputType = props.inputType, record = props.record, index = props.index, children = props.children, rowIndex = props.rowIndex, readOnly = props.readOnly, restProps = __rest(props, ["editable", "dataIndex", "title", "inputType", "record", "index", "children", "rowIndex", "readOnly"]);
    var getInput = function () {
        if (inputType === 'date') {
            return react_1.default.createElement(antd_1.DatePicker, { disabled: readOnly });
        }
        return react_1.default.createElement(MyCheckbox, { disabled: readOnly });
    };
    var renderCell = function (_a) {
        var getFieldDecorator = _a.getFieldDecorator;
        return (react_1.default.createElement("td", __assign({}, restProps), editable ? (react_1.default.createElement(antd_1.Form.Item, { style: { margin: 0 } }, getFieldDecorator(dataIndex + ":" + rowIndex, {
            rules: [
                {
                    required: true,
                    message: "Please Input " + title + "!",
                },
            ],
            initialValue: record[dataIndex],
        })(getInput()))) : (children)));
    };
    return react_1.default.createElement(EditableContext.Consumer, null, renderCell);
};
function EditableTable(props) {
    var data = props.value;
    var flag = false;
    for (var i = 0, len = data.length; i < len; i++) {
        if (!data[i]) {
            data[i] = {
                日期: '2019-9-11',
                自然: false,
                人工: false,
                药流: false,
                葡萄胎: false,
                异位妊娠: false,
                引产: false,
                死胎: false,
                早产: false,
                死产: false,
                足月产: false,
                顺产: false,
                剖宫产: false,
            };
            flag = true;
        }
    }
    if (flag) {
        props.onChange(data);
    }
    data = data.map(function (d, index) { return (__assign(__assign({}, d), { 日期: moment_1.default(d.日期), 孕次: index + 1 })); });
    return (react_1.default.createElement(EditableContext.Provider, { value: props.form },
        react_1.default.createElement(antd_1.Table, { rowKey: function () { return Math.random().toString(); }, size: "small", components: {
                body: {
                    cell: function (p) { return react_1.default.createElement(EditableCell, __assign({}, p, { readOnly: props.readOnly })); },
                },
            }, bordered: true, dataSource: data }, columnData.map(function (d, index) {
            if (!d.children) {
                return react_1.default.createElement(Column, __assign({ align: "center" }, d, { key: index + Math.random().toString() }));
            }
            return (react_1.default.createElement(ColumnGroup, { title: d.title, key: index + Math.random().toString() }, d.children.map(function (dd, dd_index) {
                return react_1.default.createElement(Column, __assign({ align: "center" }, dd, { key: dd_index + Math.random().toString() }));
            })));
        }))));
}
exports.default = antd_2.registerFormField('pregnancy_history', antd_2.connect({})(function (props) {
    var value = props.value, onChange = props.onChange, readOnly = props.readOnly;
    var EditableFormTable = antd_1.Form.create({
        onValuesChange: function (props, keyValue) {
            var _a = Object.entries(keyValue)[0], keyRowIndex = _a[0], cellValue = _a[1];
            var _b = keyRowIndex.split(':'), key = _b[0], rowIndex = _b[1];
            onChange(value.map(function (v, index) {
                var _a;
                if (index === parseInt(rowIndex)) {
                    return __assign(__assign({}, v), (_a = {}, _a[key] = typeof cellValue === 'boolean' ? cellValue : cellValue.format(), _a));
                }
                return v;
            }));
        },
    })(EditableTable);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(EditableFormTable, { value: value, onChange: onChange, readOnly: readOnly })));
}));
