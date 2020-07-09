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
var Columns_1 = __importDefault(require("./Columns"));
var request_1 = __importDefault(require("@lianmed/request"));
function EditableCell(props) {
    var value = props.value, onChange = props.onChange, o = __rest(props, ["value", "onChange"]);
    return (react_1.default.createElement(antd_1.Table, { size: "small", rowKey: "id", pagination: false, columns: Columns_1.default(__assign({ onChange: onChange, value: value }, o)), dataSource: value }));
}
exports.default = (function (_a) {
    var url = _a.url, _b = _a.style, style = _b === void 0 ? {} : _b, id = _a.id;
    console.log('partogram table render');
    var _c = react_1.useState([]), data = _c[0], setData = _c[1];
    function getData() {
        request_1.default.get(url + ("?gynecologicalExamId.specified=true&pregnancyId.equals=" + id), { loading: '请求中' }).then(function (res) {
            setData(res.map(function (_) {
                return __assign(__assign({}, _.gynecologicalExam), { visitTime: _.visitTime, outerId: _.id, pregnancy: _.pregnancy, doctor: _.doctor });
            }));
            console.log(res);
        }).catch(function (e) {
            console.log('err', e);
        });
    }
    function onDel(id) {
        request_1.default.delete(url + ("/" + id)).then(function (res) {
            getData();
        });
    }
    function commitData(data) {
        var method = data ? 'put' : 'post';
        data = data || {
            "visitType": "30",
            "visitTime": new Date(),
            "gestationalWeek": "30",
            "gynecologicalExam": {
                "fundalHeight": null,
                "waistHip": null,
                "fetalPosition": null,
                "fetalHeart": null,
                "presentation": null,
                "engagement": null,
                "vagina": null,
                "cervix": null,
                "adnexa": null,
                "note": null
            },
            "pregnancy": {
                id: id
            }
        };
        var risks = data.pregnancy.riskRecords;
        if (Array.isArray(risks) && risks.length === 0) {
            delete data.pregnancy.riskRecords;
        }
        return request_1.default[method](url, {
            data: data
        }).then(function () {
            getData();
        });
    }
    react_1.useEffect(getData, []);
    return (react_1.default.createElement("div", { style: style },
        react_1.default.createElement(EditableCell, { value: data, onChange: function (data) {
                setData(data);
            }, onAdd: function () {
                commitData();
            }, onCommit: function (data) {
                commitData(data);
            }, onDel: onDel })));
});
//# sourceMappingURL=index.js.map