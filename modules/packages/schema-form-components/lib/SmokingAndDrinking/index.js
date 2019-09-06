'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var antd_1 = require('antd');
var antd_2 = require('@uform/antd');
var styles = { width: '60px', marginRight: '10px' };
exports.default = antd_2.registerFormField(
  'smoking_and_drinking',
  antd_2.connect({})(function(props) {
    var onChange = props.onChange,
      _a = props.value,
      smokingNum = _a[0],
      drinkingNum = _a[1];
    return react_1.default.createElement(
      'div',
      null,
      '\u70DF\uFF1A',
      react_1.default.createElement(antd_1.Input, {
        value: smokingNum,
        style: styles,
        onChange: function(e) {
          onChange([e.target.value, drinkingNum]);
        },
      }),
      '\u652F/\u65E5 \u00A0\u00A0 \u9152\uFF1A',
      react_1.default.createElement(antd_1.Input, {
        style: styles,
        value: drinkingNum,
        onChange: function(e) {
          return onChange([smokingNum, e.target.value]);
        },
      }),
      '\u6BEB\u5347/\u65E5'
    );
  })
);
