import React from 'react';
import { registerFormField, connect } from '@uform/antd';
import { Table } from 'antd';
import Columns from './Columns';
function EditableCell(props: any) {
  const { value, onChange } = props;

  return (
    <Table
      size="small"
      rowKey="key"
      pagination={false}
      columns={Columns({ onChange, value })}
      dataSource={value}
      // style={{ flex: 1 }}
    />
  );
}

export default registerFormField(
  'friedman_table',
  connect({})((props: any) => {
    const { dataset = [], value = [], onChange, readOnly, title } = props;
    return (
      <div style={{ display: 'flex' }}>
        <span style={{ width: '90px', textAlign: 'right' }}>{title && `${title}：`}</span>
        <EditableCell
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          dataset={dataset}
          title={title}
        />
      </div>
    );
  })
);
