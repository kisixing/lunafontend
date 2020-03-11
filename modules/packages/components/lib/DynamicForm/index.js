'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var antd_1 = require('antd');
var lodash_1 = require('lodash');
exports.horizontalFormItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
};
exports.verticalFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
exports.nonLabelLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
var DynamicForm = (function(_super) {
  __extends(DynamicForm, _super);
  function DynamicForm() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.formRef = react_1.default.createRef();
    _this.form = undefined;
    _this.generateRenderEditItem = function(formDescriptions, options) {
      if (options === void 0) {
        options = { formItemLayout: exports.horizontalFormItemLayout };
      }
      var formItemLayout = options.formItemLayout;
      return function(key, ReactNode) {
        var config = lodash_1.get(formDescriptions, key) || {};
        var label = config.label,
          rules = config.rules;
        return react_1.default.createElement(
          antd_1.Form.Item,
          __assign({}, formItemLayout, { key: key, label: label, name: key, rules: rules }),
          ReactNode
        );
      };
    };
    _this.generateRenderViewItem = function() {
      return function() {};
    };
    return _this;
  }
  DynamicForm.prototype.componentDidMount = function() {
    var _this = this;
    setTimeout(function() {
      _this.form = _this.formRef.current;
    }, 100);
  };
  DynamicForm.prototype.render = function() {
    return react_1.default.createElement('div', null);
  };
  return DynamicForm;
})(react_1.default.Component);
exports.default = DynamicForm;
