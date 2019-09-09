import React, { useState, useContext } from 'react';
import { Tree, Input, Form } from 'antd';
import { treeData, listData, IItem } from '../dataSource';
import context, { IRiskItem } from '../context';

const { TreeNode } = Tree;
const { Search } = Input;

export default props => {
  const [value, onChange] = useContext(context);
  const { risks } = value;

  const [state, setState] = useState({
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    checkedKeys: risks.map(_ => _.key),
    selectedKeys: [],
  });

  const onExpand = expandedKeys => {
    setState({
      ...state,
      expandedKeys,
      autoExpandParent: false,
    });
  };

  const onSearchChange = e => {
    const { value } = e.target;
    if (value === '' || value === ' ') {
      setState({
        ...state,
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
    setState({
      ...state,

      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };
  const onCheck = (checkedKeys: Array<string>) => {
    console.log('onCheck', checkedKeys);
    checkedKeys = checkedKeys.filter(_ => {
      const item = listData.find(risk => risk.key === _);
      return item.checkable;
    });
    onChange({
      ...value,
      risks: checkedKeys.map(_ => {
        const preservedItem = risks.find(risk => risk.key === _);
        const target = listData.find(risk => risk.key === _);
        const newItem: IRiskItem = { cured: false, fator: '', key: target.key, remark: '' };
        return preservedItem || newItem;
      }),
    });
  };

  const { searchValue, expandedKeys, autoExpandParent } = state;
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
    <div style={{ marginTop: '20px' }}>
      <Form.Item label="选择高危因素" labelAlign="left" labelCol={{ xs: 3 }}>
        <Search placeholder="Search" onChange={onSearchChange} style={{ width: '40%' }} />
      </Form.Item>
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        checkable
        onCheck={onCheck}
        checkedKeys={risks.map(_ => _.key)}
        // onSelect={onSelect}
        selectedKeys={state.selectedKeys}
      >
        {loop(treeData)}
      </Tree>
    </div>
  );
};
