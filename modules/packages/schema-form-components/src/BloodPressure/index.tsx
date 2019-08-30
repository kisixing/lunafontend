import React from 'react';
import { InputNumber } from 'antd';
import { registerFormField, connect } from '@uform/antd';
export default registerFormField(
  'BP',
  connect({})((props: any) => {
    const {
      onChange,
      value: [systolicBP, diastolicBP],
    } = props;
    return (
      <div>
        <InputNumber
          style={{ width: '60px' }}
          value={systolicBP}
          onChange={value => onChange([value, diastolicBP])}
        />
        <span style={{ margin: '0 6px' }}>/</span>
        <InputNumber
          style={{ width: '60px' }}
          value={diastolicBP}
          onChange={value => onChange([systolicBP, value])}
        />
        <span style={{ margin: '0 6px' }}>mmhg</span>
      </div>
    );
  })
);
