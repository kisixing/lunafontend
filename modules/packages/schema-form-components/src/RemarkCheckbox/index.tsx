import { registerFormField, connect } from '@uform/antd';

import { RemarkCheckbox } from '@lianmed/components';
import React from 'react';

export const InfectiousDisease = ({ value, onChange }) => {
  return (
    <RemarkCheckbox
      dataset={{
        da: '乙肝大三阳',
        xiao: '乙肝小三阳',
        meidu: '梅毒',
        HIV: 'HIV',
        jiehe: '结核',
        feiyan: '重症感染性肺炎',
        other: '其他',
      }}
      value={value}
      onChange={onChange}
    />
  );
};

export default registerFormField('infectious_disease', connect({})(InfectiousDisease));
