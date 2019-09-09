/**
 * 过程记录弹窗
 * created by ADMIN on 2019-07-25 17:07
 */

import React, { PureComponent } from 'react';
import { Modal, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

const columns: Array<ColumnProps<any>> = [
  {
    title: '日期',
    dataIndex: 'date',
    align: 'center',
  },
  {
    title: '孕周',
    dataIndex: 'gestationalWeeks',
    align: 'center',
  },
  {
    title: '高危等级',
    dataIndex: 'level',
    align: 'center',
    render: function(text, record) {
      return <div style={{ background: '#faad14' }}>{text}</div>;
    },
  },
  {
    title: '高危因素',
    dataIndex: 'factor',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
  },
  {
    title: '医师签名',
    dataIndex: 'physician',
    align: 'center',
  },
];

const dataSource = [
  {
    id: '8794554',
    date: '2019-03-25',
    gestationalWeeks: '22',
    level: '较高风险',
    factor: '妊娠糖尿病-A1级',
    remark: '',
    physician: '陈志超',
  },
  {
    id: '8794558',
    date: '2019-02-25',
    gestationalWeeks: '18',
    level: '一般风险',
    factor: '仅有妊娠期贫血，血红蛋白>100g/L',
    remark: '',
    physician: '陈志超',
  },
];

class RecordsModal extends PureComponent<{ visible: boolean; onCancel: (b: boolean) => void }> {
  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal
        centered
        title="过程记录"
        visible={visible}
        width={800}
        footer={null}
        onCancel={() => onCancel(false)}
      >
        <Table
          bordered
          size="small"
          rowKey="id"
          pagination={false}
          columns={columns}
          dataSource={dataSource}
        />
      </Modal>
    );
  }
}

export default RecordsModal;
