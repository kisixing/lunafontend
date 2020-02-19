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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
var search_result_1 = require("./search-result");
exports.useFormTable = function (config) {
    var formTableConfig = config || {};
    var search = formTableConfig.search, _a = formTableConfig.autoFirstSearch, autoFirstSearch = _a === void 0 ? true : _a, _b = formTableConfig.defaultPageSize, defaultPageSize = _b === void 0 ? 10 : _b, _c = formTableConfig.defaultCurrent, defaultCurrent = _c === void 0 ? 1 : _c, _d = formTableConfig.defaultFormValues, defaultFormValues = _d === void 0 ? {} : _d, form = formTableConfig.form;
    var version = 3;
    if (antd_1.Form['useForm']) {
        version = 4;
    }
    var formInstance = form;
    if (!form) {
        if (version === 4) {
            formInstance = antd_1.Form['useForm']()[0];
        }
        else {
            throw new Error('"form" need in antd@3');
        }
    }
    var _e = react_1.useState(), initialValues = _e[0], setInitialValues = _e[1];
    var _f = search_result_1.useSearchResult({
        search: search,
        autoFirstSearch: autoFirstSearch,
        defaultRequestData: function () {
            var value;
            if (typeof defaultFormValues === 'function') {
                value = defaultFormValues();
            }
            else {
                value = defaultFormValues;
            }
            return Promise.resolve(value).then(function (data) {
                var touched = form.isFieldsTouched();
                var obj = __assign({}, data);
                Object.keys(data).forEach(function (name) {
                    obj[name] = form.isFieldTouched(name) ? form.getFieldValue(name) : data[name];
                });
                setInitialValues(data);
                form.setFieldsValue(obj);
                if (touched) {
                    setRequestData(__assign({ pageSize: defaultPageSize, current: defaultCurrent }, obj));
                    throw new Error('will not autoFirstSearch');
                }
                return __assign({ pageSize: defaultPageSize, current: defaultCurrent }, obj);
            });
        },
    }), loading = _f.loading, _g = _f.requestData, requestData = _g === void 0 ? {} : _g, setRequestData = _f.setRequestData, _h = _f.responseData, responseData = _h === void 0 ? {} : _h, defaultRequestDataLoading = _f.defaultRequestDataLoading, searchFunc = _f.search;
    var onFinish = function (values) {
        searchFunc(__assign({ current: 1, pageSize: requestData.pageSize }, values));
    };
    var onChange = function (pagination, filters, sorter) {
        searchFunc(__assign(__assign({}, requestData), { current: pagination.current === requestData.current ? 1 : pagination.current, pageSize: pagination.pageSize, filters: filters,
            sorter: sorter }));
    };
    var formProps = version === 4 ? {
        form: formInstance,
        onFinish: onFinish,
        initialValues: initialValues,
    } : {
        onSubmit: function (e) {
            e.preventDefault();
            formInstance.validateFields(function (err, values) {
                if (!err) {
                    searchFunc(__assign({ current: 1, pageSize: requestData.pageSize }, values));
                }
            });
        },
    };
    var tableProps = {
        pagination: {
            pageSize: requestData.pageSize,
            current: requestData.current,
            defaultPageSize: defaultPageSize,
            defaultCurrent: defaultCurrent,
            total: responseData.total,
        },
        loading: loading,
        dataSource: responseData.dataSource,
        onChange: onChange,
    };
    var formValues = __assign({}, requestData);
    delete formValues.current;
    delete formValues.pageSize;
    delete formValues.filter;
    delete formValues.sorter;
    return {
        form: formInstance,
        formProps: formProps,
        tableProps: tableProps,
        loading: loading,
        defaultFormValuesLoading: defaultRequestDataLoading,
        formValues: formValues,
        filters: requestData.filters,
        sorter: requestData.sorter,
        current: requestData.current,
        pageSize: requestData.pageSize,
        dataSource: responseData.dataSource,
        total: responseData.total,
        search: function (data) {
            searchFunc(__assign(__assign({}, requestData), data));
        },
    };
};
