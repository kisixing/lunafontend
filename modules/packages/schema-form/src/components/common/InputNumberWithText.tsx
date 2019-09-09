import React from 'react';
import { InputNumber } from 'antd';
import { registerFormField, connect } from '@uform/antd';
export default registerFormField(
  'input_number_with_text',
  connect({})((props: any) => {
    const { onChange, value, suffix, prefix } = props;
    return (
      <div>
        {prefix}

        <InputNumber
          value={value}
          onChange={number => onChange(number)}
          style={{ margin: '0 5px' }}
        />
        {suffix}
      </div>
    );
  })
);
