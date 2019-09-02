/**
 * 高危管理
 * Created by ADMIN on 2019/7/25
 */

import React, { Component, Fragment } from 'react';
import { Table, Input, Button, Checkbox, Form, Icon } from 'antd';
import ColorDot from './ColorDot';
import RecordsModal from './RecordsModal';
import ManagementModal from './ManagementModal';
// import styles from './index.less';
import { registerFormField, connect, IFieldProps } from '@uform/react';
import { ColumnProps } from 'antd/lib/table';

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
const columns: Array<ColumnProps<any>> = [
  {
    title: '高危类型',
    dataIndex: 'type',
    align: 'center',
    width: '25%',
    render: function(text, record) {
      const { type, factor } = record;
      return (
        <div style={{ color: '#f44336' }}>
          <ColorDot />
          {type}: {factor}
        </div>
      );
    },
  },
  {
    title: '治愈',
    dataIndex: 'cure',
    align: 'center',
    width: '25%',
    render: function(text, record) {
      const { cure } = record;
      return cure ? (
        <Icon type="check" style={{ color: '#29b6f6' }} />
      ) : (
        <Icon type="close" style={{ color: '#f44336' }} />
      );
    },
  },
  {
    title: '高危因素',
    dataIndex: 'factor',
    align: 'center',
    width: '25%',
    render: function(text, record) {
      return <div style={{ color: '#f44336' }}>{text}</div>;
    },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    align: 'center',
    width: '25%',
    render: function(text, record) {
      return <div style={{ color: '#f44336' }}>{text}</div>;
    },
  },
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
class HighRisk extends Component<fieldProps> {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      checkedList: [],
      managementVisible: false,
      recordVisible: false,
    };
  }

  onChange = value => {
    this.setState({
      checkedList: value,
    });
  };

  showRecords = bool => {
    this.setState({
      recordVisible: bool,
    });
  };

  showManagement = bool => {
    this.setState({
      managementVisible: bool,
    });
  };

  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val) {
    console.log('search:', val);
  }

  render() {
    const { checkedList, managementVisible, recordVisible } = this.state as any;
    return (
      <Fragment>
        <Form.Item label="传染病" style={{ display: 'flex' }}>
          <Checkbox.Group options={plainOptions} value={checkedList} onChange={this.onChange} />
        </Form.Item>
        <div style={{ marginBottom: '18px' }}>
          <Search
            placeholder="请输入关键字"
            enterButton="新增"
            onSearch={value => console.log(value)}
          />
          <Button
            type="primary"
            style={{ marginLeft: '24px', marginRight: '24px' }}
            icon="edit"
            onClick={() => this.showManagement(true)}
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
          <Button type="link" onClick={() => this.showRecords(true)}>
            过程记录
          </Button>
        </div>
        {/* 弹窗 */}
        <RecordsModal visible={recordVisible} onCancel={this.showRecords} />
        <ManagementModal visible={managementVisible} onCancel={this.showManagement} />
      </Fragment>
    );
  }
}

registerFormField('risk_assessment', connect()(HighRisk));
