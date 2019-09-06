'use strict';
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
exports.default = function(props) {
  var _a = props.dataset,
    dataset = _a === void 0 ? { heart: '心脏病' } : _a,
    _b = props.onChange,
    onChange = _b === void 0 ? function() {} : _b,
    _c = props.value,
    value = _c === void 0 ? {} : _c;
  console.log(value);
  var _onChange = function(data) {
    onChange(__assign(__assign({}, value), data));
  };
  var kvs = Object.entries(dataset);
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    kvs.map(function(_a) {
      var k = _a[0],
        v = _a[1];
      var noteKey = k + 'Note';
      return react_1.default.createElement(
        'div',
        { key: k, style: { display: 'inline-block', marginRight: '10px' } },
        react_1.default.createElement(
          antd_1.Checkbox,
          {
            onChange: function(e) {
              var _a;
              var bool = e.target.checked;
              console.log('bool', bool);
              _onChange(
                ((_a = {}), (_a[k] = bool), (_a[noteKey] = bool ? value[noteKey] : ''), _a)
              );
            },
            checked: value[k],
          },
          v
        ),
        value[k] &&
          react_1.default.createElement(antd_1.Input, {
            style: { display: 'inline-block', maxWidth: '100px' },
            onChange: function(e) {
              var _a;
              return _onChange(((_a = {}), (_a[noteKey] = e.target.value), _a));
            },
            value: value[noteKey],
          })
      );
    })
  );
};
