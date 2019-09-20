import { registerFormField, connect } from '@uform/antd';

import { RemarkCheckbox } from '@lianmed/components';
import React from 'react';
import { Select } from 'antd';

export const Liangci = ({ value, onChange }) => {
  return (
    <RemarkCheckbox
      dataset={{
        ART: 'ART',
        肺炎: '肺炎',
        腹泻: '腹泻',
        other: '其他',
      }}
      value={value}
      onChange={onChange}
    />
  );
};

const L = ({ left, right, k, onChange, value, C = Input }) => (
  <>
    <span style={{ width: '50px', textAlign: 'left', display: 'inline-block' }}>{left}</span>
    <span style={{ textAlign: 'right', width: '90px', marginRight: '10px' }}>
      <Input
        style={{ width: '100px', margin: '0 5px' }}
        onChange={e => {
          onChange({ ...value, [k]: e.target.value });
        }}
        value={value[k]}
      />
    </span>
    {right}
  </>
);

export const Hayan = ({ value = {}, onChange }) => {
  return (
    <>
      <div>
        <L left="Hb" right="g/L" k="Hb" onChange={onChange} value={value}></L>
        <L left="血钙" right="mmol/L" k="xuegai" onChange={onChange} value={value}></L>
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <span style={{ width: '50px', textAlign: 'left' }}>其他</span>
        <Input.TextArea
          style={{ margin: '0 5px', flex: 1 }}
          onChange={e => {
            onChange({ ...value, qita: e.target.value });
          }}
          value={value['qita']}
        />
      </div>
    </>
  );
};

export const Zhuanzhen = ({ value = {}, onChange }) => {
  return (
    <>
      <Checkbox>门诊随访</Checkbox>
      <Checkbox
        checked={value['zhuanzhen']}
        onChange={v => onChange({ ...value, zhuanzhen: v.target.checked })}
      >
        转诊
      </Checkbox>
      {value['zhuanzhen'] && (
        <>
          转诊科室：
          <Select
            value={value['keshi']}
            onChange={v => onChange({ ...value, keshi: v })}
            style={{ width: '120px', marginRight: '5px' }}
          >
            <Select.Option value={'1'}>选项1</Select.Option>
          </Select>
          转诊诊断：
          <Input
            value={value['zhenduan']}
            onChange={v => onChange({ ...value, zhenduan: v.target.value })}
            style={{ width: '120px' }}
          />
        </>
      )}
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <Input.TextArea
          style={{ margin: '0 5px', flex: 1 }}
          onChange={e => {
            onChange({ ...value, zhidao: e.target.value });
          }}
          value={value['zhidao']}
        />
      </div>
    </>
  );
};

registerFormField('liangci', connect({})(Liangci));
registerFormField('huayan', connect({})(Hayan));
registerFormField('zhuanzhen', connect({})(Zhuanzhen));

import './BodyGrowthCheck/index';
import { Input, Checkbox } from 'antd';
