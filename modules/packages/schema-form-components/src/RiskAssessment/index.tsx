import React, { Fragment, useState } from 'react';
import { Table, Input, Button, Checkbox, Form } from 'antd';
import RecordsModal from './RecordsModal';
import ManagementModal from './ManagementModal';
// import styles from './index.less';
import { registerFormField, connect, IFieldProps } from '@uform/react';
import columns from './tableColumns';
import context from './context';
const Search = Input.Search;
const plainOptions = [
  '乙肝大三阳',
  '乙肝小三阳',
  '梅毒',
  'HIV',
  '结核病',
  '重症感染性肺炎',
  '其他',
];
const dataSource = [
  {
    id: '8794554',
    date: '2019-03-25',
    type: 'Ⅲ',
    factor: '仅有妊娠期贫血，血红蛋白70-100 g/L',
    cure: true,
    remarks: '补血',
  },
  {
    id: '8794558',
    date: '2019-04-25',
    type: 'Ⅳ',
    factor: '妊娠糖尿病-A2级',
    cure: false,
    remarks: '控制血糖',
  },
  {
    id: '87945582',
    date: '2019-05-25',
    type: 'Ⅳ',
    factor: '妊娠糖尿病-A2级',
    cure: false,
    remarks: '控制血糖',
  },
];
interface fieldProps extends IFieldProps {}
const HighRisk = (props: fieldProps) => {
  const { value, onChange } = props;
  const [checkedList, setCheckedList] = useState([]);
  const [managementVisible, setManagementVisible] = useState(true);
  const [recordVisible, setRecordVisible] = useState(false);

  const showRecords = bool => {
    setRecordVisible(bool);
  };

  const showManagement = bool => {
    setManagementVisible(bool);
  };

  return (
    <context.Provider value={[value, onChange]}>
      <Form.Item label="传染病" style={{ display: 'flex' }}>
        <Checkbox.Group
          options={plainOptions}
          value={checkedList}
          onChange={value => console.log(value)}
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
      <Table
        bordered
        size="small"
        rowKey="id"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
      />
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
