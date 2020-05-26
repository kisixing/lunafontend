"use strict";
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
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var map = {
    0: {
        color: 'red',
        star: '*',
        interval: 1000
    },
    1: {
        color: 'red',
        star: '**',
        interval: 500
    },
    2: {
        color: 'red',
        star: '***',
        interval: 250
    }
};
var C = function (props) {
    var alarm = props.alarm;
    if (!alarm)
        return null;
    var ref = react_1.useRef();
    var flag = react_1.useRef(false);
    var config = map[alarm.type];
    react_1.useEffect(function () {
        var d = react_dom_1.default.findDOMNode(ref.current);
        var id = setInterval(function () {
            d && (d.style.background = flag.current ? config.color : 'transparent');
            flag.current = !flag.current;
        }, config.interval);
        return function () {
            return clearInterval(id);
        };
    }, [config]);
    return (react_1.default.createElement(antd_1.Tag, { ref: ref, style: { border: '2px solid #fff', color: '#fff', display: alarm.text ? 'inline-block' : 'none' } },
        config.star,
        alarm.text));
};
exports.default = react_1.memo(C);
//# sourceMappingURL=Alarm2.js.map