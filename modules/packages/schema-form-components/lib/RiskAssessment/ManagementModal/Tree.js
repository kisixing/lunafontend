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
var dataSource_1 = require('../dataSource');
var context_1 = __importDefault(require('../context'));
var TreeNode = antd_1.Tree.TreeNode;
var Search = antd_1.Input.Search;
exports.default = function(props) {
  var _a = react_1.useContext(context_1.default),
    value = _a[0],
    onChange = _a[1];
  var risks = value.risks;
  var _b = react_1.useState({
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      checkedKeys: risks.map(function(_) {
        return _.key;
      }),
      selectedKeys: [],
    }),
    state = _b[0],
    setState = _b[1];
  var onExpand = function(expandedKeys) {
    setState(
      __assign(__assign({}, state), { expandedKeys: expandedKeys, autoExpandParent: false })
    );
  };
  var onSearchChange = function(e) {
    var value = e.target.value;
    if (value === '' || value === ' ') {
      setState(
        __assign(__assign({}, state), {
          expandedKeys: [],
          searchValue: value,
          autoExpandParent: false,
        })
      );
      return;
    }
    var expandedKeys = dataSource_1.listData
      .map(function(item) {
        if (item.title.indexOf(value) > -1) {
          return item.pId;
        }
        return null;
      })
      .filter(function(item, i, self) {
        return item && self.indexOf(item) === i;
      });
    setState(
      __assign(__assign({}, state), {
        expandedKeys: expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      })
    );
  };
  var onCheck = function(checkedKeys) {
    console.log('onCheck', checkedKeys);
    checkedKeys = checkedKeys.filter(function(_) {
      var item = dataSource_1.listData.find(function(risk) {
        return risk.key === _;
      });
      return item.checkable;
    });
    onChange(
      __assign(__assign({}, value), {
        risks: checkedKeys.map(function(_) {
          var preservedItem = risks.find(function(risk) {
            return risk.key === _;
          });
          var target = dataSource_1.listData.find(function(risk) {
            return risk.key === _;
          });
          var newItem = { cured: false, fator: '', key: target.key, remark: '' };
          return preservedItem || newItem;
        }),
      })
    );
  };
  var searchValue = state.searchValue,
    expandedKeys = state.expandedKeys,
    autoExpandParent = state.autoExpandParent;
  var loop = function(data) {
    return data.map(function(item) {
      var index = item.title.indexOf(searchValue);
      var beforeStr = item.title.substr(0, index);
      var afterStr = item.title.substr(index + searchValue.length);
      var title =
        index > -1
          ? react_1.default.createElement(
              'span',
              null,
              beforeStr,
              react_1.default.createElement('span', { style: { color: '#f50' } }, searchValue),
              afterStr
            )
          : react_1.default.createElement('span', null, item.title);
      if (item.children) {
        return react_1.default.createElement(
          TreeNode,
          { key: item.key, title: title },
          loop(item.children)
        );
      }
      return react_1.default.createElement(TreeNode, { key: item.key, title: title });
    });
  };
  return react_1.default.createElement(
    'div',
    { style: { marginTop: '20px' } },
    react_1.default.createElement(
      antd_1.Form.Item,
      { label: '\u9009\u62E9\u9AD8\u5371\u56E0\u7D20', labelCol: { xs: 3 } },
      react_1.default.createElement(Search, { placeholder: 'Search', onChange: onSearchChange })
    ),
    react_1.default.createElement(
      antd_1.Tree,
      {
        onExpand: onExpand,
        expandedKeys: expandedKeys,
        autoExpandParent: autoExpandParent,
        checkable: true,
        onCheck: onCheck,
        checkedKeys: risks.map(function(_) {
          return _.key;
        }),
        selectedKeys: state.selectedKeys,
      },
      loop(dataSource_1.treeData)
    )
  );
};
