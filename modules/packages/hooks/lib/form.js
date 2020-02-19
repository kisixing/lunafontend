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
exports.useForm = function (config) {
    var _a = react_1.useState(false), defaultFormValuesLoading = _a[0], setDefaultFormValuesLoading = _a[1];
    var _b = react_1.useState({}), initialValues = _b[0], setInitialValues = _b[1];
    var defaultFormValues = config.defaultFormValues, form = config.form, submit = config.submit;
    var _c = react_1.useState({}), formValues = _c[0], setFormValues = _c[1];
    var _d = react_1.useState(false), formLoading = _d[0], setFormLoading = _d[1];
    var _e = react_1.useState(), formResult = _e[0], setFormResult = _e[1];
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
    var onFinish = function (formValue) {
        setFormValues(formValue);
        setFormLoading(true);
        return new Promise(function (resolve, reject) {
            formInstance.validateFields().then(function (values) {
                resolve(Promise.resolve(submit(values)).then(function (data) {
                    setFormLoading(false);
                    setFormResult(data);
                    return data;
                }).catch(function (err) {
                    setFormLoading(false);
                    throw err;
                }));
            }).catch(function (validateErr) {
                setFormLoading(false);
                reject(validateErr);
            });
        });
    };
    react_1.useEffect(function () {
        var isUnMounted = false;
        if (!defaultFormValues) {
            return;
        }
        var value;
        if (typeof defaultFormValues === 'function') {
            setDefaultFormValuesLoading(true);
            value = defaultFormValues();
        }
        else {
            value = defaultFormValues;
        }
        Promise.resolve(value).then(function (data) {
            if (!isUnMounted) {
                var obj_1 = __assign({}, data);
                Object.keys(data).forEach(function (name) {
                    obj_1[name] = form.isFieldTouched(name) ? form.getFieldValue(name) : data[name];
                });
                setDefaultFormValuesLoading(false);
                setInitialValues(data);
                form.setFieldsValue(obj_1);
            }
        }).catch(function () {
            if (!isUnMounted) {
                setDefaultFormValuesLoading(false);
            }
        });
        return function () {
            isUnMounted = true;
        };
    }, []);
    var formProps = version === 4 ? {
        form: formInstance,
        onFinish: onFinish,
        initialValues: initialValues,
    } : {
        onSubmit: function (e) {
            e.preventDefault();
            onFinish(form.getFieldsValue());
        },
    };
    return {
        form: formInstance,
        formProps: formProps,
        defaultFormValuesLoading: defaultFormValuesLoading,
        formValues: formValues,
        initialValues: initialValues,
        formResult: formResult,
        formLoading: formLoading,
        submit: function (values) {
            formInstance.setFieldsValue(values);
            return onFinish(formInstance.getFieldsValue());
        },
    };
};
