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
var modal_1 = require("./modal");
var form_1 = require("./form");
exports.useModalForm = function (config) {
    var modalFormConfig = config || {};
    var _a = modalFormConfig.defaultVisible, defaultVisible = _a === void 0 ? false : _a, _b = modalFormConfig.autoSubmitClose, autoSubmitClose = _b === void 0 ? true : _b, _c = modalFormConfig.autoResetForm, autoResetForm = _c === void 0 ? true : _c, submit = modalFormConfig.submit, form = modalFormConfig.form, defaultFormValues = modalFormConfig.defaultFormValues;
    var _d = modal_1.useModal({
        defaultVisible: defaultVisible,
    }), visible = _d.visible, show = _d.show, close = _d.close, modalProps = _d.modalProps;
    var _e = form_1.useForm({
        form: form,
        submit: submit,
        defaultFormValues: defaultFormValues,
    }), formInstance = _e.form, formProps = _e.formProps, formLoading = _e.formLoading, defaultFormValuesLoading = _e.defaultFormValuesLoading, formValues = _e.formValues, initialValues = _e.initialValues, formResult = _e.formResult, formSubmit = _e.submit;
    var modalFormProps = __assign(__assign({}, modalProps), { onOk: function () {
            formSubmit().then(function () {
                if (autoSubmitClose) {
                    close();
                }
                if (autoResetForm) {
                    formInstance.resetFields();
                }
            });
        } });
    return {
        form: formInstance,
        visible: visible,
        show: show,
        close: close,
        modalProps: modalFormProps,
        formProps: formProps,
        formLoading: formLoading,
        defaultFormValuesLoading: defaultFormValuesLoading,
        formValues: formValues,
        initialValues: initialValues,
        formResult: formResult,
        submit: formSubmit,
    };
};
