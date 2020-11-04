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
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var Table_1 = __importDefault(require("./Table"));
var tableData_1 = require("./tableData");
var Methods = function (props) {
    var mark = props.mark, disabled = props.disabled, initData = props.initData;
    var tableDataEntries = Object.entries(tableData_1.tableData);
    var targetE2lements = react_1.useState(function () { return tableDataEntries.reduce(function (a, _a) {
        var _b;
        var k = _a[0], v = _a[1];
        return Object.assign(a, (_b = {}, _b[k] = document.createElement('div'), _b));
    }, {}); })[0];
    var containerRef = react_1.useRef();
    react_1.useLayoutEffect(function () {
        var _a;
        var target = targetE2lements[mark];
        try {
            (_a = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) === null || _a === void 0 ? void 0 : _a.innerHTML = null;
            containerRef === null || containerRef === void 0 ? void 0 : containerRef.current.appendChild(target);
        }
        catch (e) {
            console.log('fuck', e);
        }
    }, [mark]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: containerRef }),
        tableDataEntries.map(function (_a) {
            var k = _a[0], v = _a[1];
            return react_dom_1.default.createPortal(react_1.default.createElement(Table_1.default, { initData: initData, disabled: disabled, key: k, hidden: k !== mark, mark: mark, dataSource: v, ref: props.mapFormToMark[k + "_ref"] }), targetE2lements[k]);
        })));
};
exports.default = react_1.memo(Methods);
//# sourceMappingURL=index.js.map