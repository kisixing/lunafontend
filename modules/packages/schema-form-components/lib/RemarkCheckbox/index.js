'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var antd_1 = require('@uform/antd');
var components_1 = require('@lianmed/components');
var react_1 = __importDefault(require('react'));
exports.InfectiousDisease = function(_a) {
  var value = _a.value,
    onChange = _a.onChange;
  return react_1.default.createElement(components_1.RemarkCheckbox, {
    dataset: {
      da: '乙肝大三阳',
      xiao: '乙肝小三阳',
      meidu: '梅毒',
      HIV: 'HIV',
      jiehe: '结核',
      feiyan: '重症感染性肺炎',
      other: '其他',
    },
    value: value,
    onChange: onChange,
  });
};
exports.default = antd_1.registerFormField(
  'infectious_disease',
  antd_1.connect({})(exports.InfectiousDisease)
);
