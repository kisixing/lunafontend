"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useCurrentMessage(chatMessage, current) {
    var _a = react_1.useState([]), currentMessage = _a[0], setCurrentMessage = _a[1];
    react_1.useEffect(function () {
        if (current) {
            var mesgArr = chatMessage[current.name] || [];
            mesgArr = mesgArr.sort(function (a, b) { return +new Date(a.timestamp) - +new Date(b.timestamp); })
                .reduce(function (res, _) {
                var preIndex = (res.length - 1) < 0 ? 0 : (res.length - 1);
                var pre = res[preIndex] || { timestamp: new Date(0).toUTCString() };
                var isHead = (+new Date(_.timestamp) - +new Date(pre.timestamp)) > 1000 * 10;
                _.isHead = isHead;
                return res.concat(_);
            }, []);
            setCurrentMessage(mesgArr);
        }
    }, [chatMessage, current]);
    return { currentMessage: currentMessage };
}
exports.useCurrentMessage = useCurrentMessage;
//# sourceMappingURL=useCurrentMessage.js.map