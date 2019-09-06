import React, { Fragment, useState } from 'react';
import { Input, Button, Checkbox, Form } from 'antd';
import RecordsModal from './RecordsModal';
import ManagementModal from './ManagementModal/index';
// import styles from './index.less';
import Table from './Table';
import { registerFormField, connect, IFieldProps } from '@uform/react';
import context, { IValue } from './context';
import { InfectiousDisease } from '../RemarkCheckbox';
const Search = Input.Search;
interface fieldProps extends IFieldProps {}
const HighRisk = (props: fieldProps) => {
  const { value, onChange } = props;
  const { risks, infectiousDisease } = value as IValue;
  const [managementVisible, setManagementVisible] = useState(true);
  const [recordVisible, setRecordVisible] = useState(false);

  const showRecords = bool => {
    setRecordVisible(bool);
  };

  const showManagement = bool => {
    setManagementVisible(bool);
  };

  return (
    <context.Provider value={[value, (onChange as unknown) as (value: IValue) => void]}>
      <Form.Item label="传染病" style={{ display: 'flex' }}>
        <InfectiousDisease
          value={infectiousDisease}
          onChange={infectiousDisease => onChange({ ...value, infectiousDisease })}
        />
      </Form.Item>
      <div style={{ marginBottom: '18px', display: 'flex' }}>
        <Search
          placeholder="请输入关键字"
          enterButton="新增"
          onSearch={value => console.log(value)}
        />
        <Button
          type="primary"
          style={{ marginLeft: '24px', marginRight: '24px' }}
          icon="edit"
          onClick={() => showManagement(true)}
        >
          高危管理
        </Button>
      </div>
      <Table value={value} />
      <div style={{ textAlign: 'right' }}>
        <Button type="link" onClick={() => showRecords(true)}>
          过程记录
        </Button>
      </div>
      {/* 弹窗 */}
      <RecordsModal visible={recordVisible} onCancel={showRecords} />
      <ManagementModal visible={managementVisible} onCancel={showManagement} value={value} />
    </context.Provider>
  );
};

registerFormField('risk_assessment', connect()(HighRisk));
