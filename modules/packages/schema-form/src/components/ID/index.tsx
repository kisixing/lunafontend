import React from 'react';
import { Select, Input } from 'antd';
const { Option } = Select;
import { registerFormField, connect } from '@uform/antd';
const TYPES = {
  '0': '身份证',
  '1': '护照',
};
export default registerFormField(
  'idPicker',
  connect({})((props: any) => {
    const {
      onChange,
      value: [type, number],
      readOnly,
    } = props;
    return readOnly ? (
      <div>{`${TYPES[type]} ( ${number} ) `}</div>
    ) : (
      <div>
        <Select
          disabled={readOnly}
          value={type}
          style={{ width: '100px' }}
          onChange={value => {
            onChange([value, number]);
          }}
        >
          {Object.entries(TYPES).map(kv => (
            <Option value={kv[0]} key={kv[0]}>
              {kv[1]}
            </Option>
          ))}
        </Select>
        <Input
          style={{ marginLeft: '10px', position: 'absolute' }}
          value={number}
          onChange={e => onChange([type, e.target.value])}
        />
      </div>
    );
  })
);
