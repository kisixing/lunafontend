import React from 'react';
export default class SearchTree extends React.Component {
  state: {
    expandedKeys: any[];
    searchValue: string;
    autoExpandParent: boolean;
    checkedKeys: string[];
    selectedKeys: any[];
  };
  onExpand: (expandedKeys: any) => void;
  onChange: (e: any) => void;
  onCheck: (checkedKeys: any) => void;
  onSelect: (selectedKeys: any, info: any) => void;
  render(): JSX.Element;
}
