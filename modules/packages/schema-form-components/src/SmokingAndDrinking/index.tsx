import React from 'react';
import { Select, Input } from 'antd';
const { Option } = Select;
import { registerFormField, connect } from '@uform/antd';
const styles = { width: '60px', marginRight: '10px' };
export default registerFormField(
  'smoking_and_drinking',
  connect({})((props: any) => {
    const {
      onChange,
      value: [smokingNum, drinkingNum],
    } = props;
    return (
      <div>
        烟：
        <Input
          value={smokingNum}
          style={styles}
          onChange={e => {
            onChange([e.target.value, drinkingNum]);
          }}
        />
        支/日 &nbsp;&nbsp; 酒：
        <Input
          style={styles}
          value={drinkingNum}
          onChange={e => onChange([smokingNum, e.target.value])}
        />
        毫升/日
      </div>
    );
  })
);
