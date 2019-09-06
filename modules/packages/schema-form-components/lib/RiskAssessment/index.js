'use strict';
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
var react_2 = require('@uform/react');
var tableColumns_1 = __importDefault(require('./tableColumns'));
var context_1 = __importDefault(require('./context'));
var Search = antd_1.Input.Search;
var plainOptions = ['乙肝大三阳', '乙肝小三阳', '梅毒', 'HIV', '结核病', '重症感染性肺炎', '其他'];
var dataSource = [
  {
    id: '8794554',
    date: '2019-03-25',
    type: 'Ⅲ',
    factor: '仅有妊娠期贫血，血红蛋白70-100 g/L',
    cure: true,
    remarks: '补血',
  },
  {
    id: '8794558',
    date: '2019-04-25',
    type: 'Ⅳ',
    factor: '妊娠糖尿病-A2级',
    cure: false,
    remarks: '控制血糖',
  },
  {
    id: '87945582',
    date: '2019-05-25',
    type: 'Ⅳ',
    factor: '妊娠糖尿病-A2级',
    cure: false,
    remarks: '控制血糖',
  },
];
var HighRisk = function(props) {
  var value = props.value,
    onChange = props.onChange;
  var _a = react_1.useState([]),
    checkedList = _a[0],
    setCheckedList = _a[1];
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
      react_1.default.createElement(antd_1.Checkbox.Group, {
        options: plainOptions,
        value: checkedList,
        onChange: function(value) {
          return console.log(value);
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
    react_1.default.createElement(antd_1.Table, {
      bordered: true,
      size: 'small',
      rowKey: 'id',
      pagination: false,
      columns: tableColumns_1.default,
      dataSource: dataSource,
    }),
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
