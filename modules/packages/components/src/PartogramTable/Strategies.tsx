import { DatePicker, Input, Select, InputNumber } from 'antd';
const { Option } = Select;
import moment from 'moment';

import React from 'react';

export default {
  string: ({ value, onChange,...others }) => {
    return <Input  value={value} onChange={e => onChange(e.target.value)} {...others} />;
  },
  select: ({ dataset, ...o }) => {
    return (
      <Select {...o} style={{width:'100%'}}>
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
    var a = new Date(o.value),
    b = moment(a)
    return <DatePicker  {...o} value={b} format="YYYY-MM-DD hh:mm" />;
  },
  number: o => {
    return <InputNumber {...o} onChange={value => o.onChange(''+value)} value={parseInt(o.value)||0} />;
  },
};
