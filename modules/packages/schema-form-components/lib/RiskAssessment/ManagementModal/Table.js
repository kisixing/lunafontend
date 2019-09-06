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
var ColorDot_1 = __importDefault(require('../ColorDot'));
var context_1 = __importDefault(require('../context'));
var dataSource_1 = require('../dataSource');
var index_1 = require('./index');
var columns = [
  {
    title: '高危类型',
    dataIndex: 'key',
    align: 'center',
    width: '30%',
    render: function(key, record) {
      var item = dataSource_1.listData.find(function(_) {
        return _.key === key;
      }) || { key: key, title: '未知' };
      return react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(ColorDot_1.default, null),
        ' ',
        index_1.levelMap[key.slice(0, 1)],
        ': ',
        item.title
      );
    },
  },
  {
    title: '治愈',
    dataIndex: 'cured',
    align: 'center',
    width: '10%',
    render: function(cured, record) {
      return react_1.default.createElement(antd_1.Checkbox, { checked: cured });
    },
  },
  {
    title: '高危因素',
    dataIndex: 'factor',
    align: 'center',
    width: '30%',
    render: function(text, record) {
      return react_1.default.createElement(antd_1.Input, {
        value: text,
        style: { color: '#f44336' },
      });
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
    width: '30%',
    render: function(text, record) {
      return react_1.default.createElement(antd_1.Input, {
        value: text,
        style: { color: '#f44336' },
      });
    },
  },
];
function C(props) {
  var _a = react_1.useContext(context_1.default),
    value = _a[0],
    onChange = _a[1];
  var risks = value.risks;
  return react_1.default.createElement(antd_1.Table, {
    bordered: true,
    size: 'small',
    rowKey: 'key',
    pagination: false,
    columns: columns,
    dataSource: risks,
    style: { flex: 1 },
  });
}
exports.default = C;
