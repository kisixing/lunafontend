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
var C = function (props) {
    var alarmText = props.alarmText;
    var ref = react_1.useRef();
    var flag = react_1.useRef(false);
    react_1.useEffect(function () {
        var d = react_dom_1.default.findDOMNode(ref.current);
        var id = setInterval(function () {
            d && (d.style.background = flag.current ? 'red' : 'transparent');
            flag.current = !flag.current;
        }, 250);
        return function () {
            return clearInterval(id);
        };
    }, []);
    return (react_1.default.createElement(antd_1.Tag, { ref: ref, style: { border: '2px solid #fff', color: '#fff', display: alarmText ? 'inline-block' : 'none' } },
        "***",
        alarmText));
};
exports.default = react_1.memo(C);
//# sourceMappingURL=Alarm2.js.map