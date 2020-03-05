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
exports.useCascadeSearch = function (_a) {
    var _b = _a.list, list = _b === void 0 ? [] : _b;
    var _c = react_1.useState([]), responseDataList = _c[0], setResponseDataList = _c[1];
    var _d = react_1.useState(list.map(function () { return false; })), loadingList = _d[0], setLoadingList = _d[1];
    var search = function (index) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (index >= list.length || index < 0) {
            return;
        }
        if (index > 0 && !responseDataList[index - 1]) {
            return;
        }
        var array = __spreadArrays(responseDataList.slice(0, index));
        setResponseDataList(array);
        var loading = __spreadArrays(loadingList);
        loading[index] = true;
        setLoadingList(loading);
        Promise.resolve(list[index].apply(list, __spreadArrays([responseDataList[index - 1]], args)))
            .then(function (value) {
            var nextArray = __spreadArrays(responseDataList.slice(0, index + 1));
            nextArray[index] = value;
            var nextLoading = __spreadArrays(loadingList);
            nextLoading[index] = false;
            setLoadingList(nextLoading);
            setResponseDataList(nextArray);
        });
    };
    return {
        search: search,
        responseDataList: responseDataList,
        loadingList: loadingList,
        setResponseDataList: setResponseDataList,
    };
};
