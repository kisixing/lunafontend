import React from 'react';
import { Tree, Input } from 'antd';
import { treeData, listData, IItem } from './dataSource';

const { TreeNode } = Tree;
const { Search } = Input;

export default class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    checkedKeys: ['1'],
    selectedKeys: [],
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    const { value } = e.target;
    if (value === '' || value === ' ') {
      this.setState({
        expandedKeys: [],
        searchValue: value,
        autoExpandParent: false,
      });
      return;
    }
    const expandedKeys = listData
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return item.pId;
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = (data: Array<IItem>) =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={title} />;
      });
    return (
      <div>
        <div style={{ margin: '8px 0', display: 'flex', alignItems: 'center', width: '50%' }}>
          选择高危因素
          <Search
            placeholder="Search"
            onChange={this.onChange}
            style={{ flex: 1, marginLeft: '10px' }}
          />
        </div>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          checkable
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          // onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {loop(treeData)}
        </Tree>
      </div>
    );
  }
}
