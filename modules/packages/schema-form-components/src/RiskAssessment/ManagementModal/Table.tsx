import React, { useContext } from 'react';
import { Icon, Table, Checkbox, Input } from 'antd';
import ColorDot from '../ColorDot';
import { ColumnProps } from 'antd/lib/table';
import context from '../context';
import { listData, IItem } from '../dataSource';
import { levelMap } from './index';
const columns: Array<ColumnProps<any>> = [
  {
    title: '高危类型',
    dataIndex: 'key',
    align: 'center',
    width: '30%',
    render: function(key, record) {
      const item: IItem = listData.find(_ => _.key === key) || { key, title: '未知' };
      return (
        <div>
          <ColorDot /> {levelMap[key.slice(0, 1)]}: {item.title}
        </div>
      );
    },
  },
  {
    title: '治愈',
    dataIndex: 'cured',
    align: 'center',
    width: '10%',
    render: function(cured, record) {
      //   return cure ? (
      //     <Icon type="check" style={{ color: '#29b6f6' }} />
      //   ) : (
      //     <Icon type="close" style={{ color: '#f44336' }} />
      //   );
      return <Checkbox checked={cured} />;
    },
  },
  {
    title: '高危因素',
    dataIndex: 'factor',
    align: 'center',
    width: '30%',
    render: function(text, record) {
      return <Input value={text} style={{ color: '#f44336' }} />;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
    width: '30%',
    render: function(text, record) {
      return <Input value={text} style={{ color: '#f44336' }} />;
    },
  },
];

function C(props) {
  const [value, onChange] = useContext(context);
  const { risks } = value;

  return (
    <Table
      bordered
      size="small"
      rowKey="key"
      pagination={false}
      columns={columns}
      dataSource={risks}
      style={{ flex: 1 }}
    />
  );
}

export default C;
