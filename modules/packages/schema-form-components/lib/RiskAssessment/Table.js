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
var ColorDot_1 = __importDefault(require('./ColorDot'));
var dataSource_1 = require('./dataSource');
var index_1 = require('./ManagementModal/index');
function C(props) {
  var editable = props.editable,
    value = props.value,
    onChange = props.onChange;
  var risks = value.risks;
  var changeField = function(targetKey, key, _value) {
    var data = risks.map(function(_) {
      var _a;
      if (_.key === targetKey) {
        return __assign(__assign({}, _), ((_a = {}), (_a[key] = _value), _a));
      }
      return _;
    });
    onChange(__assign(__assign({}, value), { risks: data }));
  };
  var columns = [
    {
      title: '高危类型',
      dataIndex: 'key',
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
      width: '100px',
      render: function(cured, record) {
        return editable
          ? react_1.default.createElement(antd_1.Checkbox, {
              checked: cured,
              onChange: function(e) {
                return changeField(record.key, 'cured', e.target.checked);
              },
            })
          : react_1.default.createElement(antd_1.Icon, {
              type: cured ? 'check' : 'close',
              style: { color: cured ? '#29b6f6' : '#f44336' },
            });
      },
    },
    {
      title: '高危因素',
      dataIndex: 'factor',
      align: 'center',
      width: '30%',
      render: function(factor, record) {
        return editable
          ? react_1.default.createElement(antd_1.Input, {
              value: factor,
              style: { color: '#f44336' },
              onChange: function(e) {
                return changeField(record.key, 'factor', e.target.value);
              },
            })
          : factor;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      width: '30%',
      render: function(remark, record) {
        return editable
          ? react_1.default.createElement(antd_1.Input, {
              value: remark,
              style: { color: '#f44336' },
              onChange: function(e) {
                return changeField(record.key, 'remark', e.target.value);
              },
            })
          : remark;
      },
    },
  ];
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
