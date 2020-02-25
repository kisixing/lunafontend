"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.useRoster = function (conn) {
    var _a = react_1.useState([]), friends = _a[0], setFriends = _a[1];
    react_1.useEffect(function () {
        conn && conn.getRoster({
            success: function (data) {
                if (!data)
                    return;
                console.log('getRoster success ', data);
                var friend = data.filter(function (d) { return d.subscription !== 'none'; }).map(function (d) { return d.name; });
                setFriends(friend);
            }
        });
    }, [conn]);
    return { friends: friends };
};
