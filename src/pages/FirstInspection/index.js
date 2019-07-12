/**
 * 首检信息
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { MultipleForm } from '@/components/Form';
import styles from './index.less';

import config from './config';

@connect(({ global, loading, firstInspection }) => ({
  loading: loading.effects['form/submitRegularForm'],
  patient: global.patient,
  dataSource: firstInspection.dataSource,
}))
class FirstInspection extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  submit = () => {
    this.form.props.form.validateFields((err, values) => {
      console.log('验证未通过...', values);
      if (!err) {
        console.log('验证通过...', values);
        console.log('submit', values);
      }
    });
  };

  render() {
    const { dataSource, loading, patient } = this.props;
    return (
      <PageHeaderWrapper patient={patient} submit={this.submit}>
        <div className={styles.headerButton}>
          <Button icon="save">确认</Button>
          <Button icon="printer">打印预览</Button>
          <Button icon="printer">针式打印</Button>
        </div>
        <MultipleForm
          loading={loading}
          configs={config}
          dataSource={dataSource}
          ref={form =>this.myRef = form}
        />
      </PageHeaderWrapper>
    )
  }
}

export default FirstInspection;
