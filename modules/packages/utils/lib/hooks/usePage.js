"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var request_1 = require("@lianmed/request");
exports.usePage = function (model, initParams, genParams, keyMaps) {
    if (initParams === void 0) { initParams = { pageSize: 10, current: 1 }; }
    if (genParams === void 0) { genParams = function () { return Promise.resolve({}); }; }
    if (keyMaps === void 0) { keyMaps = {}; }
    var current = initParams.current, pageSize = initParams.pageSize, others = __rest(initParams, ["current", "pageSize"]);
    var _a = react_1.useState([]), listData = _a[0], setListData = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState({ current: current, pageSize: pageSize }), pagination = _c[0], setPagination = _c[1];
    function fetchList(runtimeParams) {
        if (runtimeParams === void 0) { runtimeParams = {}; }
        setLoading(true);
        genParams().then(function (gParams) {
            request_1.fetchPage(model, __assign(__assign(__assign({ pageSize: pagination.pageSize, current: pagination.current }, others), gParams), runtimeParams), keyMaps)
                .then(function (r) {
                setListData(r.data);
                setPagination(r.pagination);
                return r;
            })
                .finally(function () { return setLoading(false); });
        });
    }
    function getItems(params) {
        if (params === void 0) { params = {}; }
        return request_1.get("/" + model, {
            params: __assign(__assign({}, initParams), params)
        });
    }
    function updateItem(data) {
        return request_1.put("/" + model, {
            data: data
        }).then(function () { return fetchList(); });
    }
    function createItem(data) {
        return request_1.post("/" + model, {
            data: data
        }).then(function () { return fetchList(); });
    }
    function removeItem(data) {
        return request_1.del("/" + model, {
            data: data
        }).then(function () { return fetchList(); });
    }
    react_1.useEffect(function () {
        fetchList();
    }, []);
    return {
        loading: loading,
        listData: listData,
        pagination: pagination,
        fetchList: fetchList,
        createItem: createItem,
        removeItem: removeItem,
        updateItem: updateItem,
        getItems: getItems,
    };
};
//# sourceMappingURL=usePage.js.map