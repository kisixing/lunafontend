import React, { Component } from 'react';
import { Form, Modal, Row, Col } from 'antd';

import Item from '../Form/Item';
import styles from './EditModal.less';
const moment = require('moment');

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: [],
      initialValue: {}
    }
  }

  componentDidMount() {
    const { columns, selectedRows, type } = this.props;
    const config = this.transformConfig(columns);
    let selectedRow = {};
    if (selectedRows.length === 1) {
      selectedRow = selectedRows[0];
    }
    const initialValue = this.transformInitialValue(columns, selectedRow);
    this.setState({
      config,
      initialValue,
    }, () => {
      type === 'edit' ? this.props.form.setFieldsValue(initialValue) : null;
    });
  }

  // 主要调整date时间格式
  transformInitialValue(columns, initialValue) {
    let momentKeys = [];
    let newInitialValue = [];
    for (let i = 0; i < columns.length; i++) {
      if (!columns[i].children && columns[i].inputProps && columns[i].inputProps.type === 'date') {
        momentKeys.push(columns[i]['dataIndex']);
      }
    }
    for (let i = 0; i < momentKeys.length; i++) {
      const key = momentKeys[i];
      if (initialValue[key]) {
        newInitialValue = {
          ...initialValue,
          [key]: moment(initialValue[key])
        }
      }
    }
    console.log('111111111111111111', newInitialValue);
    return newInitialValue;
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const transformConfig = (data) => {
  //     let newData = [];
  //     const length = data.length;
  //     for (let i = 0; i < length; i++) {
  //       const item = data[i];
  //       if (item.children) {
  //         const arr = transformConfig(item.children);
  //         newData = [...newData, ...arr];
  //       } else if (item.dataIndex !== 'operation') {
  //         const obj = {
  //           key: item.dataIndex,
  //           span: 12,
  //           labelProps: {
  //             label: item.title,
  //             name: item.dataIndex,
  //           },
  //           inputProps: {
  //             type: item.inputProps.type,
  //             placeholder: `输入${item.title}`,
  //             disabled: item.inputProps.disabled || false,
  //           },
  //           rules: [{
  //             required: item.required, message: `请输入${item.title}!`
  //           }],
  //         }
  //         newData.push(obj);
  //       }
  //     }
  //     return newData;
  //   };
  //   let state = {};
  //   if (nextProps.columns !== prevState.columns) {
  //     const config = transformConfig(nextProps.columns);
  //     state = { ...state, config };
  //   }
  //   if (nextProps.selectedRows !== prevState.selectedRows && nextProps.selectedRows.length === 1) {
  //     const selectedRow = nextProps.selectedRows[0];
  //     // this.props.form.setFieldsValue(initialValue);
  //     state = { ...state, initialValue: selectedRow }
  //   }
  //   const isEmpty = JSON.stringify(state) === '{}';
  //   return isEmpty ? null : state;
  // }

  // 提取适合form布局配置
  transformConfig = (data) => {
    let newData = [];
    const length = data.length;
    for (let i = 0; i < length; i++) {
      const item = data[i];
      if (item.children) {
        const arr = this.transformConfig(item.children);
        newData = [...newData, ...arr];
      } else if (item.dataIndex !== 'operation') {
        const obj = {
          key: item.dataIndex,
          // span: 12,
          labelProps: {
            label: item.title,
            name: item.dataIndex,
          },
          inputProps: {
            type: item.inputProps.type,
            placeholder: `输入${item.title}`,
            disabled: item.inputProps.disabled || false,
          },
          rules: [{
            required: item.required, message: `请输入${item.title}!`
          }],
        };
        newData.push(obj);
      }
    }
    return newData;
  };

  render() {
    const { visible, onCancel, onCreate, form, title, width, span, columns } = this.props;
    const { config, initialValue } = this.state;
    const { getFieldDecorator } = form;

    return (
      <Modal
        destroyOnClose
        centered
        title={title}
        width={width || 800}
        maskClosable={false}
        visible={visible}
        okText="创建"
        onCancel={onCancel}
        onOk={onCreate}
        wrapClassName={styles.modal}
      >
        <Row gutter={36}>
          {config.length && config.map((item) => {
            const { key, ...rest } = item;
            return (
              <Col
                key={key}
                xs={{ span: 24 }}
                lg={{ span }}
              >
                <Item form={form} params={rest} />
              </Col>
            );
          })}
        </Row>
      </Modal>
    )
  }
}

export default Form.create()(EditModal);
