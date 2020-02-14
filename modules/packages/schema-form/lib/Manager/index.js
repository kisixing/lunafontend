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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var storage_1 = __importStar(require("./storage"));
var antd_1 = require("antd");
var checkDirtyCreator_1 = __importDefault(require("./checkDirtyCreator"));
var Context_1 = __importDefault(require("./Context"));
exports.Context = Context_1.default;
var formButtonGroup_1 = require("./Buttons/formButtonGroup");
var request_1 = require("@lianmed/request");
var mapChildren_1 = require("./utils/mapChildren");
var SchemaForm_1 = require("../SchemaForm");
var schemaMockData_1 = require("./schemaMockData");
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var $name = hasSymbol ? Symbol.for('lian.formName') : 'lian.formName';
var connectAdvanced = react_1.memo(function (props) {
    var _a = props.url, url = _a === void 0 ? '' : _a, _b = props.interrupted, interrupted = _b === void 0 ? false : _b, _c = props.cache, cache = _c === void 0 ? false : _c, _d = props.getStorageName, getStorageName = _d === void 0 ? function () {
        return String(name) + "_storage";
    } : _d, _e = props.schemaUrl, schemaUrl = _e === void 0 ? '' : _e, _f = props.schemaData, schemaData = _f === void 0 ? null : _f, _g = props.name, name = _g === void 0 ? $name : _g, children = props.children, _h = props.test, test = _h === void 0 ? false : _h, _j = props.values, values = _j === void 0 ? [] : _j;
    var _k = react_1.useState(schemaData || []), schemas = _k[0], setSchemas = _k[1];
    var _l = react_1.useState(values || []), initialValues = _l[0], setInitialValues = _l[1];
    var all = react_1.useMemo(function () { return []; }, []);
    console.log('all', all);
    var storageHelp = react_1.useMemo(function () { return new storage_1.default(getStorageName()); }, []);
    var setValues = react_1.useCallback(function (values) {
        values.forEach(function (_, index) {
            var actions = all[index];
            actions &&
                actions.setFormState(function (state) {
                    state.values = _;
                });
        });
    }, []);
    var getValues = react_1.useCallback(function (arr) {
        return arr.reduce(function (result, current) {
            return __assign(__assign({}, result), current.getFormState().values);
        }, {});
    }, []);
    var FormRef = react_1.useRef(null);
    react_1.useEffect(function () {
        schemaUrl &&
            storage_1.localforage.getItem(schemaUrl).then(function (value) {
                if (false) {
                    setSchemas(value);
                }
                else {
                    request_1.get(schemaUrl).then(function (value) {
                        if (schemaUrl === 'getSchema') {
                            value = schemaMockData_1.schemasData;
                        }
                        setSchemas(value);
                        storage_1.localforage.setItem(schemaUrl, value);
                    });
                }
            }, function (reason) {
                console.log('reason', reason);
            });
        url &&
            request_1.get(url).then(function (value) {
                setInitialValues(value);
            });
    }, []);
    if (!schemas.length) {
        return null;
    }
    var collectActions = function (actions) {
        all.push(actions);
    };
    var onBeforeunloadCb = checkDirtyCreator_1.default(all)[0];
    interrupted && top.addEventListener('beforeunload', onBeforeunloadCb);
    var submit = function () {
        Promise.all(all.map(function (_) { return _.validate(); }))
            .then(function (res) {
            var lastCommitData = getValues(all);
            return request_1.post(url, {
                data: { data: lastCommitData },
                successText: '提交成功111！',
                loading: '提交中',
                interval: 1000,
            })
                .then(function (res) {
                console.log('success', res);
                cache && storageHelp.removeItem();
                top.removeEventListener('beforeunload', onBeforeunloadCb);
            })
                .catch(function (err) {
                console.log('request err', err);
                cache && storageHelp.setItem(lastCommitData);
            });
        })
            .catch(function (err) {
            console.log('表单验证失败', err);
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
                    setValues(value);
                },
                onCancel: function () { },
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    var newChildren = !test
        ? mapChildren_1.mapChildren()(children, SchemaForm_1.componentNameKey, SchemaForm_1.componentName, function (_, index) {
            return { schema: schemas[index], initialValues: initialValues, formIndex: index };
        })
        : children;
    return (react_1.default.createElement(Context_1.default.Provider, { value: { collectActions: collectActions, FormRef: FormRef, submit: submit } },
        react_1.default.createElement("div", { ref: FormRef }, newChildren)));
});
connectAdvanced.Buttons = formButtonGroup_1.FormButtonGroup;
exports.default = react_1.memo(connectAdvanced);
