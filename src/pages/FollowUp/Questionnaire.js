/**
 * 随访问卷管理 统计
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { CustomTable } from '@/components/Table';

import DATA, { dataSource } from './fakedata';

@connect(({ global, loading }) => ({
  loading: loading.effects['permission/query'],
}))
class Questionnaire extends Component {

  handleSearch = () => {};

  handleReset = () => {};

  render() {
    return (
      <PageHeaderWrapper>
        <CustomTable
          searchConfig={DATA.filter.items}
          columns={DATA.column}
          configs={DATA}
          dataSource={dataSource}
          handleSearch={this.handleSearch}
          handleReset={this.handleReset}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Questionnaire;
