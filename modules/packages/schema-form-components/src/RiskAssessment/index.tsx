import React, { useState } from 'react';
import { Button, AutoComplete, Form } from 'antd';
import RecordsModal from './RecordsModal';
import ManagementModal from './ManagementModal/index';
// import styles from './index.less';
import Table from './Table';
import { registerFormField, connect, IFieldProps } from '@uform/react';
import context, { IValue } from './context';
import { InfectiousDisease } from '../RemarkCheckbox';
import { listData } from './dataSource';
import { DataSourceItemObject } from 'antd/lib/auto-complete';
interface fieldProps extends IFieldProps {}
const HighRisk = (props: fieldProps) => {
  const { value, onChange } = props;
  const { risks, infectiousDisease } = value as IValue;
  const [managementVisible, setManagementVisible] = useState(false);
  const [recordVisible, setRecordVisible] = useState(false);
  const [searchDataSource, setSearchDataSource] = useState<Array<DataSourceItemObject>>([]);
  const [searchText, setSearchText] = useState('');
  const showRecords = bool => {
    setRecordVisible(bool);
  };

  const showManagement = bool => {
    setManagementVisible(bool);
  };
  const onSearch = text => {
    setSearchText(text);
    if (text === '' || text === ' ') {
      setSearchDataSource([]);
    } else {
      const dataSource = listData
        .filter(_ => _.title.includes(text))
        .filter(_ => !risks.some(risk => risk.key === _.key))
        .map(_ => ({ value: _.key, text: _.title }));
      setSearchDataSource(dataSource);
    }
  };
  const onSearchSelect = searchSelectedKey => {
    setSearchText('');
    if (risks.some(_ => _.key === searchSelectedKey)) return;
    onChange({
      ...value,
      risks: risks.concat({
        key: searchSelectedKey,
        fator: '',
        cured: false,
        remark: '',
      }),
    });
    setManagementVisible(true);
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
        <AutoComplete
          dataSource={searchDataSource}
          placeholder="请输入关键字"
          onChange={onSearch}
          onSelect={onSearchSelect}
          value={searchText}
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
