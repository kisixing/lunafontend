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
var request_1 = require("@lianmed/request");
var options_1 = require("./options");
var antd_1 = require("antd");
var lmg_1 = require("@lianmed/lmg");
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require("echarts/lib/component/dataZoom");
require("echarts/lib/component/dataZoomInside");
exports.MultiParamDisplay = function (props) {
    var ref1 = react_1.useRef();
    var docid = props.docid;
    var _a = react_1.useState([]), pressures = _a[0], setPressures = _a[1];
    react_1.useEffect(function () {
        var myChart = echarts.init(ref1.current);
        request_1.get("/ctg-exams-mother-data/" + ('1801_1_200524200942' && docid)).then(function (r) {
            var _a = r.normals, normals = _a === void 0 ? [] : _a, _b = r.pressures, pressures = _b === void 0 ? [] : _b;
            setPressures(pressures.map(function (_) { return (__assign(__assign({}, _), { time: lmg_1.convertstarttime(_.time) })); }));
            var _hr = [], _pulse = [], _temperature = [], _spoz = [];
            normals.forEach(function (_) {
                _hr.push(_.hr);
                _pulse.push(_.pulse);
                _temperature.push(_.temperature);
                _spoz.push(_.spoz);
            });
            console.log(normals, _pulse);
            myChart.setOption(options_1.getOptions1(_hr, _pulse, _temperature, _spoz, _pulse.map(function (_, i) { return (i / 60).toFixed(0) + "\u5206" + i % 60 + "\u79D2"; })));
        });
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: ref1, style: { width: '100%', height: 400 } }),
        react_1.default.createElement(antd_1.Table, { size: "small", style: { margin: '0 10%' }, columns: [
                { dataIndex: 'sbp', title: '收缩压' },
                { dataIndex: 'dbp', title: '舒张压' },
                { dataIndex: 'map', title: '平均压' },
                { dataIndex: 'time', title: '时间' },
            ].map(function (_) { return (__assign(__assign({}, _), { align: 'center' })); }), dataSource: pressures, pagination: { pageSize: 6 } })));
};
//# sourceMappingURL=index.js.map