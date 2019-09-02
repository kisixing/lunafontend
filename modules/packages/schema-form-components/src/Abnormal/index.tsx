import React from 'react';
import { Radio, Input } from 'antd';
import { registerFormField, connect } from '@uform/antd';
export default registerFormField(
  'Abnormal',
  connect({})((props: any) => {
    const { onChange, value } = props;
    const safeValue = value || { value: '0', text: '' };
    const { value: keyValue, text } = safeValue;
    return (
      <Radio.Group
        value={keyValue}
        onChange={e => {
          onChange({ value: e.target.value, text: '' });
        }}
      >
        <Radio value="0">未见异常</Radio>
        <Radio value="1">异常</Radio>
        {keyValue === '1' && (
          <Input
            style={{ width: '50%' }}
            value={text}
            onChange={e => onChange({ value: keyValue, text: e.target.value })}
          />
        )}
      </Radio.Group>
    );
  })
);
