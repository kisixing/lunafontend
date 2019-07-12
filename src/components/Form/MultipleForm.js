import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import moment from 'moment';
import { Spin, message } from 'antd';

import SingleForm from './SingleForm';

class MultipleForm extends Component {
  static propTypes = {
    configs: PropTypes.object,
    dataSource: PropTypes.object,
  }

  state = {
    //
    keyArr: [],
    //保存key对应的id，put更新数据时需要
    keyObj: {},
  }

  componentDidMount() {
    const { dataSource, configs } = this.props;
    const { formname, dec, ...rest } = configs;
    const keyArr = this.getKey(rest);
    this.setState({
      keyArr,
    })
  }

  componentWillReceiveProps() {

  }

  formData (data) {
    let newData = [];
    for (let key in data) {
      const obj = data[key];
      newData.push(obj);
    }
    return newData;
  }

  getKey (data) {
    let keyArr = [];
    for (let key in data) {
      keyArr.push(key);
    }
    return keyArr;
  }

  getKeyObject (dataSource, configs) {
    if (!dataSource.id) {
      return;
    }
    const keyArr = this.getKey(configs);
    let keyObject = {};
    for (let i = 0; i < keyArr.length; i++) {
      const key = keyArr[i];
      if (key === 'data') {
        keyObject[key] = dataSource['id'];
      } else {
        keyObject[key] = dataSource[key]['id'];
      }
    }
    return keyObject;
  }

  getAllValues () {
    const { dataSource, configs } = this.props;
    const { formname, dec, ...rest } = configs;
    const keyArr = this.state.keyArr;
    // 获取id
    const keyObj = this.getKeyObject(dataSource, rest);
    // 主表
    let baseData = {};
    // 初始化all values
    let allValues = {};
    // 是否有必录项没有录入
    let isSubmit = true;
    for (let i = 0; i < keyArr.length; i++) {
      const formRef = keyArr[i];
      if (formRef === 'data') {
        this[formRef].props.form.validateFields((err, values) => {
          if (err) {
            return isSubmit = false;
          }
          baseData = values;
          baseData['id'] = keyObj[formRef];
        });
      } else {
        this[formRef].props.form.validateFields((err, values) => {
          if (err) {
            return isSubmit = false;
          }
          // console.log('验证通过...', values);
          // console.log('item form -->', formRef, allValues, values)
          allValues[formRef] = values;
          allValues[formRef]['id'] = keyObj[formRef];
        });
      }
    }
    if (!isSubmit) {
      message.config({
        top: 250,
        duration: 3,
        maxCount: 3,
      });
      message.error('请完成必录项输入...');
      return false;
    }

    return {
      ...this.transformDate(baseData),
      ...this.transformDate(allValues),
    };
  }

  // 检测是否为moment类型并且转化为string
  transformDate (obj) {
    // 处理moment 时间格式
    let newObj = lodash.clone(obj);
    for (let key in obj) {
      let value = obj[key];
      if (moment.isMoment(value)) {
        const newValue = moment(value).format('YYYY-MM-DD');
        newObj[key] = newValue;
      }
    }
    return newObj;
  }

  // 用于初始化赋值区分basedata和其他表的值
  differentiateValue (dataSource, key) {
    let data = {};
    if (key === 'data') {
      // 剔除附表数据
      let result = lodash.omit(dataSource, this.state.keyArr);
      // 更换date数据类型，antd只支持moment格式
      const config = this.props.configs[key]['data'];
      const length = config.length;

      for (let i = 0; i < length; i++) {
        const type = config[i]['inputProps']['type'];
        if (type === 'date') {
          const key = config[i]['labelProps']['name'];
          const originalValue = result[key];
          // string --> moment
          result[key] = moment(originalValue);
        }
      }
      data = result;
    } else {
      data = dataSource[key];
    }
    // console.log('44444444', data, key)
    return data;
  }

  handleFormChange = changedFields => {
    console.log('handleFormChange', changedFields);
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  };

  render () {
    const { configs, dataSource, loading } = this.props;
    // 布局配置设置
    const { formname, dec, ...rest } = configs;
    const mapConfig = this.formData(rest);
    const keyArr = this.getKey(rest);
    // 初始化数据
    return (
      <Spin spinning={loading ? true : false} delay={300} size="large">
        {mapConfig.map((item, index) => {
          const formRef = keyArr[index];
          const data = this.differentiateValue(dataSource, formRef);
          return (
            <SingleForm
              key={item.dec}
              wrappedComponentRef={form => this[formRef] = form}
              formTitle={item.dec}
              config={item.data}
              data={data}
              // onChange={this.handleFormChange}
              onChange={() => {}}
            />
          );
        })}
      </Spin>
    );
  }
}

export default MultipleForm;
