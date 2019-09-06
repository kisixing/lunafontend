'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var antd_1 = require('antd');
var generator = function(Wrap, Item) {
  return function(dataset, size) {
    if (size === void 0) {
      size = 'default';
    }
    var Cop = function(props) {
      var value = props.value,
        onChange = props.onChange,
        readOnly = props.readOnly;
      var target;
      return readOnly
        ? (target = dataset.find(function(_) {
            _.value === value;
          }))
          ? target.label
          : null
        : react_1.default.createElement(
            Wrap,
            { size: size, value: value, onChange: onChange },
            dataset.map(function(item) {
              return react_1.default.createElement(
                Item,
                { value: item.value, key: item.value },
                item.label
              );
            })
          );
    };
    return Cop;
  };
};
exports.buttonGroupCreator = generator(antd_1.Radio.Group, antd_1.Radio.Button);
exports.selectCreator = generator(antd_1.Select, antd_1.Select.Option);
