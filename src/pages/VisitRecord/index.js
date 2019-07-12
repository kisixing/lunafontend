import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { CustomTable } from '@/components/Table';

import storage from '@/utils/storage';
import { PREGNANCY_ID } from '@/utils/constant';
import DATA, { dataSource } from './mockdata';
import styles from './index.less';

const ButtonGroup = Button.Group;

@connect(({ global, loading, visitRecord }) => ({
  loading: loading.effects['visitRecord/query'],
  patient: global.patient,
  dataSource: visitRecord.lists,
}))
class VisitRecord extends Component {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    const pregnancyId = storage.getItem(PREGNANCY_ID);
    dispatch({
      type: 'visitRecord/query',
      payload: {
        id: pregnancyId,
        type: '首诊',
      }
    })
  }

  submit = () => {
    console.log('VisitRecord page')
  };

  // 搜索事件
  handleSearch = (values) => {
    console.log('handleSearch', values);
    // fetch action
  };

  // 重置事件
  handleReset = () => {
    console.log('handleReset');
    // 重新全部检索一遍
  };

  render() {
    const { patient } = this.props;
    return (
      <PageHeaderWrapper patient={patient}>
        <CustomTable
          configs={DATA}
          dataSource={dataSource}
          handleSearch={this.handleSearch}
          handleReset={this.handleReset}
        />
      </PageHeaderWrapper>
    );
  }
}

export default VisitRecord;
