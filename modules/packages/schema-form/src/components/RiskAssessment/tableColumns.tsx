import React from 'react';
import { Icon } from 'antd';
import ColorDot from './ColorDot';
import { ColumnProps } from 'antd/lib/table';

const columns: Array<ColumnProps<any>> = [
  {
    title: '高危类型',
    dataIndex: 'type',
    align: 'center',
    width: '25%',
    render: function(text, record) {
      const { type, factor } = record;
      return (
        <div style={{ color: '#f44336' }}>
          <ColorDot />
          {type}: {factor}
        </div>
      );
    },
  },
  {
    title: '治愈',
    dataIndex: 'cure',
    align: 'center',
    width: '25%',
    render: function(text, record) {
      const { cure } = record;
      return cure ? (
        <Icon type="check" style={{ color: '#29b6f6' }} />
      ) : (
        <Icon type="close" style={{ color: '#f44336' }} />
      );
    },
  },
  {
    title: '高危因素',
    dataIndex: 'factor',
    align: 'center',
    width: '25%',
    render: function(text, record) {
      return <div style={{ color: '#f44336' }}>{text}</div>;
    },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    align: 'center',
    width: '25%',
    render: function(text, record) {
      return <div style={{ color: '#f44336' }}>{text}</div>;
    },
  },
];
export default columns;
