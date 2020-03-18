"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var types_1 = require("./types");
var request_1 = require("@lianmed/request");
exports.useUnread = function () {
    var _a = react_1.useState({}), chatUnread = _a[0], setChatUnread = _a[1];
    react_1.useEffect(function () {
        request_1.post('/pullUnreadMessage').then(function (r) {
            var result = r.result || [
                {
                    id: 2,
                    receiver: 'admin',
                    sender: 'zz',
                    timestamp: '2019-01-01',
                    msg: 'www',
                    type: types_1.MessageType.text
                },
                {
                    id: 2,
                    receiver: 'admin',
                    sender: 'ff',
                    timestamp: '2019-01-01',
                    msg: 'w d我第三方为夫士大夫；理解为人',
                    type: types_1.MessageType.text
                },
                {
                    id: 2,
                    receiver: 'admin',
                    sender: 'qq',
                    timestamp: '2019-01-01',
                    msg: 'www',
                    type: types_1.MessageType.text
                },
            ];
            var data = result.reduce(function (res, a) {
                var _a;
                var sender = a.sender;
                var old = res[sender] || [];
                old.push(a);
                return Object.assign(res, (_a = {}, _a[sender] = old, _a));
            }, {});
            setChatUnread(data);
        });
    }, []);
    return { chatUnread: chatUnread };
};
//# sourceMappingURL=useUnread.js.map