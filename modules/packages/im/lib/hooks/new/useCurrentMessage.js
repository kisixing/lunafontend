"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useCurrentMessage(chatMessage, current) {
    var _a = react_1.useState([]), currentMessage = _a[0], setCurrentMessage = _a[1];
    react_1.useEffect(function () {
        if (current) {
            var mesgArr = chatMessage[current.name] || [];
            setCurrentMessage(mesgArr);
        }
    }, [chatMessage, current]);
    return { currentMessage: currentMessage };
}
exports.useCurrentMessage = useCurrentMessage;
//# sourceMappingURL=useCurrentMessage.js.map