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
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importStar(require('react'));
var antd_1 = require('antd');
var RecordsModal_1 = __importDefault(require('./RecordsModal'));
var index_1 = __importDefault(require('./ManagementModal/index'));
var Table_1 = __importDefault(require('./Table'));
var react_2 = require('@uform/react');
var context_1 = __importDefault(require('./context'));
var RemarkCheckbox_1 = require('../RemarkCheckbox');
var Search = antd_1.Input.Search;
var HighRisk = function(props) {
  var value = props.value,
    onChange = props.onChange;
  var _a = value,
    risks = _a.risks,
    infectiousDisease = _a.infectiousDisease;
  var _b = react_1.useState(true),
    managementVisible = _b[0],
    setManagementVisible = _b[1];
  var _c = react_1.useState(false),
    recordVisible = _c[0],
    setRecordVisible = _c[1];
  var showRecords = function(bool) {
    setRecordVisible(bool);
  };
  var showManagement = function(bool) {
    setManagementVisible(bool);
  };
  return react_1.default.createElement(
    context_1.default.Provider,
    { value: [value, onChange] },
    react_1.default.createElement(
      antd_1.Form.Item,
      { label: '\u4F20\u67D3\u75C5', style: { display: 'flex' } },
      react_1.default.createElement(RemarkCheckbox_1.InfectiousDisease, {
        value: infectiousDisease,
        onChange: function(infectiousDisease) {
          return onChange(__assign(__assign({}, value), { infectiousDisease: infectiousDisease }));
        },
      })
    ),
    react_1.default.createElement(
      'div',
      { style: { marginBottom: '18px', display: 'flex' } },
      react_1.default.createElement(Search, {
        placeholder: '\u8BF7\u8F93\u5165\u5173\u952E\u5B57',
        enterButton: '\u65B0\u589E',
        onSearch: function(value) {
          return console.log(value);
        },
      }),
      react_1.default.createElement(
        antd_1.Button,
        {
          type: 'primary',
          style: { marginLeft: '24px', marginRight: '24px' },
          icon: 'edit',
          onClick: function() {
            return showManagement(true);
          },
        },
        '\u9AD8\u5371\u7BA1\u7406'
      )
    ),
    react_1.default.createElement(Table_1.default, { value: value }),
    react_1.default.createElement(
      'div',
      { style: { textAlign: 'right' } },
      react_1.default.createElement(
        antd_1.Button,
        {
          type: 'link',
          onClick: function() {
            return showRecords(true);
          },
        },
        '\u8FC7\u7A0B\u8BB0\u5F55'
      )
    ),
    react_1.default.createElement(RecordsModal_1.default, {
      visible: recordVisible,
      onCancel: showRecords,
    }),
    react_1.default.createElement(index_1.default, {
      visible: managementVisible,
      onCancel: showManagement,
      value: value,
    })
  );
};
react_2.registerFormField('risk_assessment', react_2.connect()(HighRisk));
