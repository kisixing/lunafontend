import { DatePicker, Input, Select, InputNumber } from 'antd';
const { Option } = Select;

import React from 'react';

export default {
  string: ({ value, onChange }) => {
    return <Input value={value} onChange={e => onChange(e.target.value)} />;
  },
  select: ({ dataset, ...o }) => {
    return (
      <Select {...o}>
        {dataset.map(_ => {
          return (
            <Option value={_.value} key={_.value}>
              {_.label}
            </Option>
          );
        })}
      </Select>
    );
  },
  date: o => {
    return <DatePicker {...o} format="YYYY-MM-DD hh:mm" />;
  },
  number: o => {
    return <InputNumber {...o} />;
  },
};
