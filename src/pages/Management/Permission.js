import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Table, Pagination, Card, Radio, Button, Input, Select } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Permission.less';

const Search = Input.Search;
const ButtonGroup = Button.Group;
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '别名',
    dataIndex: 'alias',
    key: 'alias',
  },
  {
    title: '创建日期',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (text, record) => (
      <span className={styles.actionButton}>
        <Button icon="edit" size="small" type="primary" onClick={() => {}} />
        <Button icon="delete" size="small" type="danger" onClick={() => {}} />
      </span>
    ),
  },
];

@connect(({ global, loading, permission }) => ({
  loading: loading.effects['permission/query'],
  dataSource: permission.dataSource,
}))
class PermissionManagemant extends Component {
  state = {
    expand: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/query'
    })
  }

  onSearch = () => {

  };

  add = () => {

  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  paginationChange = (page, pageSize) => {
    // page 第几页 pageSize 每页多少列
    console.log('pagination Change', page, pageSize);
    // 做数据请求
  };

  render () {
    const { dataSource } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={styles.top}>
          <Input placeholder="输入部门名称搜索..." allowClear style={{  width: '240px' }} onClick={value => console.log(value)} onPressEnter={this.onSearch} />
          <Button type="primary" icon="search" className="green-button" onClick={this.onSearch}>搜索</Button>
          <Button type="primary" icon="plus" onClick={this.add}>新增</Button>
          <Button type="primary" icon="ellipsis" className="yellow-button" onClick={this.add}>折叠</Button>
        </div>
        <Table
          size="small"
          pagination={{
            size: 'small', // middle
            total: 50,
            showTotal: (total) => `共 ${total} 项`,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.paginationChange,
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </PageHeaderWrapper>
    )
  }
}

export default PermissionManagemant;
