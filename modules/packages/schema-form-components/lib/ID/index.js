'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var antd_1 = require('antd');
var Option = antd_1.Select.Option;
var antd_2 = require('@uform/antd');
var TYPES = {
  '0': '身份证',
  '1': '护照',
};
exports.default = antd_2.registerFormField(
  'idPicker',
  antd_2.connect({})(function(props) {
    var onChange = props.onChange,
      _a = props.value,
      type = _a[0],
      number = _a[1],
      readOnly = props.readOnly;
    return readOnly
      ? react_1.default.createElement('div', null, TYPES[type] + ' ( ' + number + ' ) ')
      : react_1.default.createElement(
          'div',
          null,
          react_1.default.createElement(
            antd_1.Select,
            {
              disabled: readOnly,
              value: type,
              style: { width: '100px' },
              onChange: function(value) {
                onChange([value, number]);
              },
            },
            Object.entries(TYPES).map(function(kv) {
              return react_1.default.createElement(Option, { value: kv[0] }, kv[1]);
            })
          ),
          react_1.default.createElement(antd_1.Input, {
            style: { marginLeft: '10px', position: 'absolute' },
            value: number,
            onChange: function(e) {
              return onChange([type, e.target.value]);
            },
          })
        );
  })
);
