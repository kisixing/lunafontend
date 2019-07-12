/*
 * @Description: 孕册/基本信息
 * @Author: ZHONG JUN
 * @Date: 2019-05-14
 * @LastEditTime: 2019-05-30
 */

import React, { PureComponent  } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { Button } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { MultipleForm } from '@/components/Form';

import styles from './index.less';
import config from './config';

@connect(({ global, loading, pregnancy }) => ({
  loading: loading.effects['pregnancy/query'] || loading.effects['pregnancy/update'],
  patient: global.patient,
  dataSource: pregnancy.dataSource,
}))
class index extends PureComponent  {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 初始化数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pregnancy/query',
      payload: '440337'
    });
  }

  /**
   * 获取form表单的输入结果
   */
  submit = () => {
    // let result = {};
    // this.form.props.form.validateFields((err, values) => {
    //   console.log('验证未通过...', values);
    //   if (!err) {
    //     console.log('验证通过...', values);
    //     result = values;
    //   }
    // });
    // console.log('form submit', result)
    // return result;
    const node = this.myRef;
    const values = node.getAllValues();
    // console.log('77777777777', values)
    if (values) {
      this.props.dispatch({
        type: 'pregnancy/update',
        payload: values,
      });
    }
  };

  render() {
    const { dataSource, loading, patient } = this.props;
    return (
      <PageHeaderWrapper patient={patient} submit={this.submit}>
        <div className={styles.headerButton}>
          <Button icon="save" onClick={this.submit}>确认</Button>
          <Button icon="printer">打印预览</Button>
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

export default index;
