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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var button_1 = __importDefault(require("antd/es/button/button"));
var Option = antd_1.Select.Option;
function C(props) {
    var value = props.value, onChange = props.onChange, dataset = props.dataset, _a = props.showIndex, showIndex = _a === void 0 ? true : _a;
    var changeField = function (targetKey, key, _value) {
        var data = value.map(function (_) {
            var _a;
            if (_.key === targetKey) {
                return __assign(__assign({}, _), (_a = {}, _a[key] = _value, _a));
            }
            return _;
        });
        onChange(data);
    };
    var columns = dataset
        .map(function (_a) {
        var title = _a.title, key = _a.key, dataset = _a.dataset;
        return {
            title: title,
            dataIndex: key,
            align: 'center',
            render: function (cured, record) {
                var isSelect = !!dataset;
                return (react_1.default.createElement("div", { key: key }, isSelect ? (react_1.default.createElement(antd_1.Select, { value: cured, onChange: function (value) {
                        changeField(record.key, key, value);
                    } }, dataset.map(function (_) {
                    return (react_1.default.createElement(Option, { value: _.value, key: _.value }, _.label));
                }))) : (react_1.default.createElement(antd_1.Input, { value: cured, onChange: function (e) { return changeField(record.key, key, e.target.value); } }))));
            },
        };
    })
        .concat({
        title: (react_1.default.createElement(button_1.default, { size: "small", icon: "plus", onClick: function () {
                onChange(__spreadArrays(value, [
                    {
                        key: Math.random()
                            .toString()
                            .slice(2),
                    },
                ]));
            } })),
        align: 'center',
        render: function (a, b, rowIndex) {
            return (react_1.default.createElement(button_1.default, { size: "small", icon: "minus", onClick: function () {
                    var _value = __spreadArrays(value);
                    _value.splice(rowIndex, 1);
                    onChange(_value);
                } }));
        },
    });
    if (showIndex) {
        columns.unshift({
            title: '序号',
            width: 50,
            align: 'center',
            render: function (cured, record, index) {
                return index;
            },
        });
    }
    return (react_1.default.createElement(antd_1.Table, { size: "small", rowKey: "key", pagination: false, columns: columns, dataSource: value }));
}
exports.default = C;
