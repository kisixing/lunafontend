"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useCurrent(chatMessage, contacts) {
    var _a = react_1.useState(null), current = _a[0], setCurrent = _a[1];
    var _b = react_1.useState([]), currentMessage = _b[0], setCurrentMessage = _b[1];
    react_1.useEffect(function () {
        if (current) {
            var mesgArr = chatMessage[current.name] || [];
            mesgArr = mesgArr.sort(function (a, b) { return +new Date(a.timestamp) - +new Date(b.timestamp); })
                .reduce(function (res, _) {
                var preIndex = (res.length - 1) < 0 ? 0 : (res.length - 1);
                var pre = res[preIndex] || { timestamp: new Date().toUTCString() };
                var isHead = (+new Date(_.timestamp) - +new Date(pre.timestamp)) > 1000 * 10;
                _.isHead = isHead;
                return res.concat(_);
            }, []);
            setCurrentMessage(mesgArr);
        }
    }, [chatMessage, current]);
    var setCurrentId = react_1.useCallback(function (id) {
        var target = contacts.find(function (_) { return _.name === id; });
        setCurrent(target);
    }, [contacts]);
    return { currentMessage: currentMessage, setCurrentId: setCurrentId, current: current };
}
exports.useCurrent = useCurrent;
//# sourceMappingURL=useCurrent copy.js.map