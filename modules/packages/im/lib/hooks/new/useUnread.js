"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var request_1 = require("@lianmed/request");
exports.useUnread = function () {
    var _a = react_1.useState({}), chatUnread = _a[0], setChatUnread = _a[1];
    react_1.useEffect(function () {
        setChatUnread({});
        console.log('ppppp', '离线');
        request_1.post('/pullUnreadMessage').then(function (r) {
            console.log('ppppp', r);
        });
    }, []);
    return { chatUnread: chatUnread };
};
//# sourceMappingURL=useUnread.js.map