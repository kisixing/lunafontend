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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
var react_1 = __importDefault(require("react"));
var storage_1 = __importDefault(require("./storage"));
var antd_1 = require("antd");
var checkDirtyCreator_1 = __importDefault(require("./checkDirtyCreator"));
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var $name = hasSymbol ? Symbol.for('lian.formName') : 'lian.formName';
function connectAdvanced(_a) {
    var _b = _a.interrupted, interrupted = _b === void 0 ? false : _b, _c = _a.cache, cache = _c === void 0 ? false : _c, _d = _a.getStorageName, getStorageName = _d === void 0 ? function () {
        return String(name) + "_storage";
    } : _d, _e = _a.handleErr, handleErr = _e === void 0 ? function (arr) {
        return arr;
    } : _e, _f = _a.name, name = _f === void 0 ? $name : _f, _g = _a.getDisplayName, getDisplayName = _g === void 0 ? function (name) { return "ConnectAdvanced(" + name + ")"; } : _g, _h = _a.onSubmit, onSubmit = _h === void 0 ? function (formData, status) {
        return new Promise(function (res, rej) {
            if (status) {
                setTimeout(function () { return res({ formData: formData }); }, 2000);
            }
            else {
                setTimeout(function () { return rej({ formData: formData }); }, 1000);
            }
        });
    } : _h, _j = _a.mergeFormValues, mergeFormValues = _j === void 0 ? function (arr) {
        return arr.reduce(function (result, current) {
            return __spreadArrays(result, [current.getFormState().values]);
        }, []);
    } : _j, _k = _a.forwardRef, forwardRef = _k === void 0 ? false : _k;
    var storageName = getStorageName();
    var storageHelp = new storage_1.default(storageName);
    var lastCommitData = [];
    var all = [];
    var collectActions = function (actions) {
        all.push(actions);
    };
    var _l = checkDirtyCreator_1.default(all), checkIsDirty = _l[0], onBeforeunloadCb = _l[1];
    interrupted && top.addEventListener('beforeunload', onBeforeunloadCb);
    var submit = function (status) {
        if (status === void 0) { status = true; }
        var hide = antd_1.message.loading('提交中..', 0);
        Promise.all(all.map(function (_) { return _.validate(); }))
            .then(function (res) {
            lastCommitData = mergeFormValues(all);
            onSubmit(lastCommitData, status)
                .finally(function () {
                console.log('finally');
                hide();
            })
                .then(function (res) {
                cache && storageHelp.removeItem();
                top.removeEventListener('beforeunload', onBeforeunloadCb);
                antd_1.message.success('成功！', 5);
            })
                .catch(function (err) {
                antd_1.message.error('失败！', 5);
                handleErr(all);
                cache && storageHelp.setItem(lastCommitData);
            });
        })
            .catch(function (err) {
            hide();
            console.log('表单验证失败');
        });
    };
    cache &&
        storageHelp
            .get()
            .then(function (value) {
            antd_1.Modal.confirm({
                title: '加载数据',
                content: '是否加载上次提交失败的数据？',
                onOk: function () {
                    value.forEach(function (_, index) {
                        var actions = all[index];
                        actions &&
                            actions.setFormState(function (state) {
                                state.values = _;
                            });
                    });
                },
                onCancel: function () { },
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    return function wrapWithConnect(WrappedComponent) {
        var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
        var displayName = getDisplayName(wrappedComponentName);
        function ConnectFunction(props) {
            var _props = __assign(__assign({}, props), { collectActions: collectActions, submit: submit, checkIsDirty: checkIsDirty });
            return react_1.default.createElement(WrappedComponent, __assign({}, _props));
        }
        ConnectFunction.WrappedComponent = WrappedComponent;
        ConnectFunction.displayName = displayName;
        if (forwardRef) {
            var forwarded = react_1.default.forwardRef(function forwardConnectRef(props, ref) {
                return react_1.default.createElement(ConnectFunction, __assign({}, props, { forwardedRef: ref }));
            });
            forwarded.displayName = displayName;
            forwarded.WrappedComponent = WrappedComponent;
            return hoist_non_react_statics_1.default(forwarded, WrappedComponent);
        }
        return hoist_non_react_statics_1.default(ConnectFunction, WrappedComponent);
    };
}
exports.default = connectAdvanced;
