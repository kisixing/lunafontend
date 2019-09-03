import React, { Component } from 'react';
import { Checkbox, Form, Icon, Input, Modal, Table, Select, Button } from 'antd';
import ColorDot from './ColorDot';
import { ColumnProps } from 'antd/lib/table';
import HighRiskTree from './Tree';
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
const selectOption = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ'];
const columns: Array<ColumnProps<any>> = [
  {
    title: '高危类型',
    dataIndex: 'type',
    align: 'center',
    width: '30%',
    render: function(text, record) {
      const { type, factor } = record;
      return (
        <div>
          <ColorDot /> {type}: {factor}
        </div>
      );
    },
  },
  {
    title: '治愈',
    dataIndex: 'cure',
    align: 'center',
    width: '10%',
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
    width: '30%',
    render: function(text, record) {
      return <div style={{ color: '#f44336' }}>{text}</div>;
    },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    align: 'center',
    width: '30%',
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

class ManagementModal extends Component<
  { visible: boolean; onCancel: (b: boolean) => void },
  { checkedList: Array<any> }
> {
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      checkedList: [],
    };
  }
  onChange() {}
  render() {
    const { checkedList } = this.state;
    const { visible, onCancel } = this.props;
    return (
      <Modal
        destroyOnClose
        centered
        title="风险管理"
        visible={visible}
        width={1080}
        bodyStyle={{ overflowY: 'scroll', maxHeight: '80vh  ' }}
        footer={null}
        onCancel={() => onCancel(false)}
      >
        <div>
          <Form.Item label="传染病" style={{ display: 'flex' }}>
            <Checkbox.Group options={plainOptions} value={checkedList} onChange={this.onChange} />
          </Form.Item>
          <div style={{ display: 'flex' }}>
            <Table
              bordered
              size="small"
              rowKey="id"
              pagination={false}
              columns={columns}
              dataSource={dataSource}
              style={{ flex: 1 }}
            />
            <div style={{ marginLeft: '24px', position: 'relative' }}>
              <Form.Item label="高危等级" style={{ display: 'flex' }}>
                <Select
                  showSearch
                  placeholder="选择..."
                  style={{ width: '116px' }}
                  optionFilterProp="children"
                  // onChange={this.onChange}
                  // onFocus={this.onFocus}
                  // onBlur={this.onBlur}
                  // onSearch={this.onSearch}
                  filterOption={(input, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {selectOption.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <div
                style={{ textAlign: 'center', position: 'absolute', width: '100%', bottom: '0' }}
              >
                <Button style={{ marginLeft: '12px', marginRight: '12px' }}>取消</Button>
                <Button type="primary" style={{ marginLeft: '12px', marginRight: '12px' }}>
                  保存
                </Button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '12px' }}>选择高危因素：</span>
            <Search enterButton placeholder="请输入关键字" onSearch={value => console.log(value)} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ height: '800px' }}>
            <HighRiskTree />
          </div>
        </div>
      </Modal>
    );
  }
}

export default ManagementModal;
