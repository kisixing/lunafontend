import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { CustomTable } from '@/components/Table';
import DATA, { dataSource } from './fakedata';

@connect(({ global, loading }) => ({
  loading: loading.effects['permission/query'],
}))
class FileCreate extends Component {

  handleSearch = () => {};

  handleReset = () => {};

  render() {
    return (
      <PageHeaderWrapper>
        <CustomTable
          modalSpan={24}
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

export default FileCreate;
