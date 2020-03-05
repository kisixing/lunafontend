"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var checkTarget = function (target, key, value) {
    var type = target.type;
    return !!type && type[key] === value;
};
exports.mapChildren = function () {
    var index = 0;
    var inner = function (node, key, value, fn) {
        var map = react_1.Children.map || Array.prototype.map.call.bind(Array.prototype.map);
        return map(react_1.Children.count(node) === 1 ? [node] : node, function (_) {
            var isTarget = checkTarget(_, key, value);
            if (isTarget) {
                return react_1.cloneElement(_, fn(_, index++));
            }
            else {
                var props = _.props;
                if (props && props.children) {
                    return react_1.cloneElement.apply(void 0, __spreadArrays([_, {}], inner(props.children, key, value, fn)));
                }
                else {
                    return _;
                }
            }
        });
    };
    return inner;
};
