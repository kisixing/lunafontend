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
var braft_editor_1 = __importDefault(require('braft-editor'));
var braft_utils_1 = require('braft-utils');
exports.ContentUtils = braft_utils_1.ContentUtils;
require('braft-editor/dist/index.css');
var C = (function(_super) {
  __extends(C, _super);
  function C() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = { value: null };
    return _this;
  }
  C.getDerivedStateFromProps = function(p, s) {
    if (s.value || !p.value) return {};
    var value = braft_editor_1.default.createEditorState(p.value);
    return {
      value: value,
    };
  };
  C.prototype.render = function() {
    var _this = this;
    var _a = this.props,
      bordered = _a.bordered,
      _b = _a.style,
      style = _b === void 0 ? {} : _b,
      onChange = _a.onChange,
      onUpload = _a.onUpload;
    return react_1.default.createElement(
      braft_editor_1.default,
      __assign({}, this.props, {
        style: __assign(__assign({}, style), { border: bordered ? '1px solid #d9d9d9' : '' }),
        onChange: function(e) {
          _this.setState({ value: e });
          onChange(e.toHTML());
        },
        value: this.state.value,
        media: {
          uploadFn: onUpload,
        },
      })
    );
  };
  return C;
})(react_1.default.Component);
exports.default = C;
//# sourceMappingURL=index.js.map
