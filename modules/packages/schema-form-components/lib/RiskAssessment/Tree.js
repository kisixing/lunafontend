'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = __importDefault(require('react'));
var antd_1 = require('antd');
var dataSource_1 = require('./dataSource');
var TreeNode = antd_1.Tree.TreeNode;
var Search = antd_1.Input.Search;
var SearchTree = (function(_super) {
  __extends(SearchTree, _super);
  function SearchTree() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      checkedKeys: ['1'],
      selectedKeys: [],
    };
    _this.onExpand = function(expandedKeys) {
      _this.setState({
        expandedKeys: expandedKeys,
        autoExpandParent: false,
      });
    };
    _this.onChange = function(e) {
      var value = e.target.value;
      if (value === '' || value === ' ') {
        _this.setState({
          expandedKeys: [],
          searchValue: value,
          autoExpandParent: false,
        });
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
      _this.setState({
        expandedKeys: expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      });
    };
    _this.onCheck = function(checkedKeys) {
      console.log('onCheck', checkedKeys);
      _this.setState({ checkedKeys: checkedKeys });
    };
    _this.onSelect = function(selectedKeys, info) {
      console.log('onSelect', info);
      _this.setState({ selectedKeys: selectedKeys });
    };
    return _this;
  }
  SearchTree.prototype.render = function() {
    var _a = this.state,
      searchValue = _a.searchValue,
      expandedKeys = _a.expandedKeys,
      autoExpandParent = _a.autoExpandParent;
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
      null,
      react_1.default.createElement(
        'div',
        { style: { margin: '8px 0', display: 'flex', alignItems: 'center', width: '50%' } },
        '\u9009\u62E9\u9AD8\u5371\u56E0\u7D20',
        react_1.default.createElement(Search, {
          placeholder: 'Search',
          onChange: this.onChange,
          style: { flex: 1, marginLeft: '10px' },
        })
      ),
      react_1.default.createElement(
        antd_1.Tree,
        {
          onExpand: this.onExpand,
          expandedKeys: expandedKeys,
          autoExpandParent: autoExpandParent,
          checkable: true,
          onCheck: this.onCheck,
          checkedKeys: this.state.checkedKeys,
          selectedKeys: this.state.selectedKeys,
        },
        loop(dataSource_1.treeData)
      )
    );
  };
  return SearchTree;
})(react_1.default.Component);
exports.default = SearchTree;
