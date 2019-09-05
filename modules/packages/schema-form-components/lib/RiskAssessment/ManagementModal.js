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
var ColorDot_1 = __importDefault(require('./ColorDot'));
var Tree_1 = __importDefault(require('./Tree'));
var context_1 = __importDefault(require('./context'));
var components_1 = require('@lianmed/components');
var plainOptions = ['乙肝大三阳', '乙肝小三阳', '梅毒', 'HIV', '结核病', '重症感染性肺炎', '其他'];
var selectOption = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ'];
var columns = [
  {
    title: '高危类型',
    dataIndex: 'type',
    align: 'center',
    width: '30%',
    render: function(text, record) {
      var type = record.type,
        factor = record.factor;
      return react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(ColorDot_1.default, null),
        ' ',
        type,
        ': ',
        factor
      );
    },
  },
  {
    title: '治愈',
    dataIndex: 'cure',
    align: 'center',
    width: '10%',
    render: function(text, record) {
      var cure = record.cure;
      return cure
        ? react_1.default.createElement(antd_1.Icon, { type: 'check', style: { color: '#29b6f6' } })
        : react_1.default.createElement(antd_1.Icon, {
            type: 'close',
            style: { color: '#f44336' },
          });
    },
  },
  {
    title: '高危因素',
    dataIndex: 'factor',
    align: 'center',
    width: '30%',
    render: function(text, record) {
      return react_1.default.createElement('div', { style: { color: '#f44336' } }, text);
    },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    align: 'center',
    width: '30%',
    render: function(text, record) {
      return react_1.default.createElement('div', { style: { color: '#f44336' } }, text);
    },
  },
];
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
function ManagementModal(props) {
  var _a = react_1.useState([]),
    checkedList = _a[0],
    setCheckedList = _a[1];
  var _b = react_1.useContext(context_1.default),
    value = _b[0],
    onChange = _b[1];
  var infectiousDisease = value.infectiousDisease;
  var visible = props.visible,
    onCancel = props.onCancel;
  return react_1.default.createElement(
    antd_1.Modal,
    {
      destroyOnClose: true,
      centered: true,
      title: '\u98CE\u9669\u7BA1\u7406',
      visible: visible,
      width: 1080,
      bodyStyle: { overflowY: 'scroll', maxHeight: '80vh  ' },
      footer: null,
      onCancel: function() {
        return onCancel(false);
      },
    },
    react_1.default.createElement(
      'div',
      null,
      react_1.default.createElement(
        antd_1.Form.Item,
        { label: '\u4F20\u67D3\u75C5', style: { display: 'flex' } },
        react_1.default.createElement(components_1.RemarkCheckbox, {
          dataset: { HIV: '艾滋病', Heart: '心脏病' },
          value: infectiousDisease,
          onChange: function(infectiousDisease) {
            return onChange(
              __assign(__assign({}, value), { infectiousDisease: infectiousDisease })
            );
          },
        })
      ),
      react_1.default.createElement(
        'div',
        { style: { display: 'flex' } },
        react_1.default.createElement(antd_1.Table, {
          bordered: true,
          size: 'small',
          rowKey: 'id',
          pagination: false,
          columns: columns,
          dataSource: dataSource,
          style: { flex: 1 },
        }),
        react_1.default.createElement(
          'div',
          { style: { marginLeft: '24px', position: 'relative' } },
          react_1.default.createElement(
            antd_1.Form.Item,
            { label: '\u9AD8\u5371\u7B49\u7EA7', style: { display: 'flex' } },
            react_1.default.createElement(
              antd_1.Select,
              {
                showSearch: true,
                placeholder: '\u9009\u62E9...',
                style: { width: '116px' },
                optionFilterProp: 'children',
                filterOption: function(input, option) {
                  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                },
              },
              selectOption.map(function(item) {
                return react_1.default.createElement(
                  antd_1.Select.Option,
                  { key: item, value: item },
                  item
                );
              })
            )
          ),
          react_1.default.createElement(
            'div',
            { style: { textAlign: 'center', position: 'absolute', width: '100%', bottom: '0' } },
            react_1.default.createElement(
              antd_1.Button,
              { style: { marginLeft: '12px', marginRight: '12px' } },
              '\u53D6\u6D88'
            ),
            react_1.default.createElement(
              antd_1.Button,
              { type: 'primary', style: { marginLeft: '12px', marginRight: '12px' } },
              '\u4FDD\u5B58'
            )
          )
        )
      )
    ),
    react_1.default.createElement(
      'div',
      { style: { flex: 1, overflowY: 'auto' } },
      react_1.default.createElement(
        'div',
        { style: { minHeight: '800px' } },
        react_1.default.createElement(Tree_1.default, null)
      )
    )
  );
}
exports.default = ManagementModal;
