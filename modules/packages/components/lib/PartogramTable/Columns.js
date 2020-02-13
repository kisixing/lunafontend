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
var button_1 = __importDefault(require("antd/es/button/button"));
var react_1 = __importDefault(require("react"));
var Strategies_1 = __importDefault(require("./Strategies"));
var columnData_1 = __importDefault(require("./columnData"));
var ColumnTool = (function () {
    function ColumnTool(data) {
        this.result = [];
        this.unshiftIndex = unshiftIndex;
        this.pushColumnDataMap = pushColumnDataMap;
        this.pushTool = pushTool;
        Object.assign(this, data);
    }
    return ColumnTool;
}());
exports.default = (function (data) {
    return new ColumnTool(data)
        .unshiftIndex()
        .pushColumnDataMap()
        .pushTool()
        .result.map(function (_) { return (__assign(__assign({}, _), { align: 'center' })); });
});
function unshiftIndex() {
    this.result = __spreadArrays([
        {
            dataIndex: Math.random().toString(),
            title: '序号',
            width: '50px',
            render: function (cured, record, index) {
                return index + 1;
            },
        }
    ], this.result);
    return this;
}
function pushColumnDataMap() {
    var _this = this;
    var changeField = function (targetKey, key, _value) {
        var data = _this.value.map(function (_) {
            var _a;
            if (_.id === targetKey) {
                return __assign(__assign({}, _), (_a = {}, _a[key] = _value, _a));
            }
            return _;
        });
        _this.onChange(data);
    };
    this.result = __spreadArrays(this.result, columnData_1.default.map(function (_a) {
        var title = _a.title, key = _a.key, dataset = _a.dataset, type = _a.type, width = _a.width, others = __rest(_a, ["title", "key", "dataset", "type", "width"]);
        dataset = dataset;
        return __assign({ title: title, dataIndex: key, width: width || '140px', align: 'center', render: function (cured, record, rowIndex) {
                var C = Strategies_1.default[type];
                return (react_1.default.createElement(C, __assign({ dataset: dataset, value: cured, onChange: function (v) {
                        changeField(record.id, key, v);
                    } }, others)));
            } }, others);
    }));
    return this;
}
function pushTool() {
    var _this = this;
    this.result = __spreadArrays(this.result, [
        {
            dataIndex: Math.random().toString(),
            width: '100px',
            title: (react_1.default.createElement(button_1.default, { size: "small", icon: "plus", onClick: function () {
                    _this.onCommit();
                } })),
            render: function (a, b, rowIndex) {
                return (react_1.default.createElement("span", null,
                    react_1.default.createElement(button_1.default, { size: "small", icon: "minus", onClick: function () {
                            _this.onDel(b.outerId);
                        } }),
                    react_1.default.createElement(button_1.default, { size: "small", icon: "check", onClick: function () {
                            var outerId = b.outerId, visitTime = b.visitTime, pregnancy = b.pregnancy, doctor = b.doctor, other = __rest(b, ["outerId", "visitTime", "pregnancy", "doctor"]);
                            _this.onCommit({
                                gynecologicalExam: other,
                                visitTime: visitTime._isAMomentObject ? visitTime.toJSON() : visitTime,
                                id: outerId,
                                pregnancy: pregnancy,
                            });
                        } })));
            },
        },
    ]);
    return this;
}
