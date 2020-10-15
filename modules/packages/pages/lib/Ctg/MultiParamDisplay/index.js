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
    var ref2 = react_1.useRef();
    var ref3 = react_1.useRef();
    var docid = props.docid;
    var _a = react_1.useState([]), pressures = _a[0], setPressures = _a[1];
    react_1.useEffect(function () {
        var myChart1 = echarts.init(ref1.current);
        var myChart2 = echarts.init(ref2.current);
        var myChart3 = echarts.init(ref3.current);
        request_1.get("/ctg-exams-mother-data/" + ('1801_1_200524200942' && docid)).then(function (r) {
            var normals = r.normals, pressures = r.pressures;
            normals = normals || [];
            pressures = pressures || [];
            setPressures(pressures.map(function (_) { return (__assign(__assign({}, _), { time: lmg_1.convertstarttime(_.time) })); }));
            var _hr = [], _pulse = [], _temperature = [], _spoz = [];
            normals.forEach(function (_) {
                _hr.push(_.hr || null);
                _pulse.push(_.pulse || null);
                _temperature.push(_.temperature || null);
                _spoz.push(_.spoz || null);
            });
            console.log(normals, _pulse);
            myChart1.setOption(options_1.getOptions1(_temperature, _temperature.map(function (_, i) { return (i / 60).toFixed(0) + "\u5206" + i % 60 + "\u79D2"; }), '体温趋势图', '体温', '°C', 'blue', 0, 50));
            myChart2.setOption(options_1.getOptions1(_spoz, _spoz.map(function (_, i) { return (i / 60).toFixed(0) + "\u5206" + i % 60 + "\u79D2"; }), '血氧趋势图', '血氧', '%', 'green', 35, 100));
            myChart3.setOption(options_1.getOptions1(_pulse, _pulse.map(function (_, i) { return (i / 60).toFixed(0) + "\u5206" + i % 60 + "\u79D2"; }), '脉率趋势图', '脉率', 'bpm', 'darkblue', 25, 250));
        });
    }, []);
    return (react_1.default.createElement("div", { style: { height: '100%', overflowY: 'scroll' } },
        react_1.default.createElement("div", { style: { fontSize: 18, fontWeight: 'bold', color: 'var(--customed-font)', textIndent: 6 } }, "\u8840\u538B"),
        react_1.default.createElement(antd_1.Table, { size: "small", style: { margin: '0 10%' }, columns: [
                { dataIndex: 'sbp', title: '收缩压' },
                { dataIndex: 'dbp', title: '舒张压' },
                { dataIndex: 'map', title: '平均压' },
                { dataIndex: 'time', title: '时间' },
            ].map(function (_) { return (__assign(__assign({}, _), { align: 'center' })); }), dataSource: pressures, pagination: { pageSize: 6 } }),
        react_1.default.createElement("div", { ref: ref1, style: { width: '100%', height: 300 } }),
        react_1.default.createElement("div", { ref: ref2, style: { width: '100%', height: 300 } }),
        react_1.default.createElement("div", { ref: ref3, style: { width: '100%', height: 300 } })));
};
//# sourceMappingURL=index.js.map