import React from 'react';
import { Icon, Table, Checkbox, Input } from 'antd';
import ColorDot from './ColorDot';
import { ColumnProps } from 'antd/lib/table';
import { IValue } from './context';
import { listData, IItem } from './dataSource';
import { levelMap } from './ManagementModal/index';

interface ITable {
  editable?: boolean;
  value: IValue;
  onChange?: (value: IValue) => void;
}
function C(props: ITable) {
  const { editable, value, onChange } = props;
  const { risks } = value;

  const changeField = (targetKey: string, key: string, _value) => {
    const data = risks.map(_ => {
      if (_.key === targetKey) {
        return { ..._, [key]: _value };
      }
      return _;
    });
    onChange({ ...value, risks: data });
  };
  const columns: Array<ColumnProps<any>> = [
    {
      title: '高危类型',
      dataIndex: 'key',
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
      width: '100px',
      render: function(cured, record) {
        //   return cure ? (
        //     <Icon type="check" style={{ color: '#29b6f6' }} />
        //   ) : (
        //     <Icon type="close" style={{ color: '#f44336' }} />
        //   );
        return editable ? (
          <Checkbox
            checked={cured}
            onChange={e => changeField(record.key, 'cured', e.target.checked)}
          />
        ) : (
          <Icon type={cured ? 'check' : 'close'} style={{ color: cured ? '#29b6f6' : '#f44336' }} />
        );
      },
    },
    {
      title: '高危因素',
      dataIndex: 'factor',
      align: 'center',
      width: '30%',
      render: function(factor, record) {
        return editable ? (
          <Input
            value={factor}
            style={{ color: '#f44336' }}
            onChange={e => changeField(record.key, 'factor', e.target.value)}
          />
        ) : (
          factor
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      width: '30%',
      render: function(remark, record) {
        return editable ? (
          <Input
            value={remark}
            style={{ color: '#f44336' }}
            onChange={e => changeField(record.key, 'remark', e.target.value)}
          />
        ) : (
          remark
        );
      },
    },
  ];

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
