import React from 'react';
import { Form } from 'antd';
import { get } from 'lodash';
import { FormInstance } from 'antd/lib/form/Form';

export const horizontalFormItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
};

export const verticalFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export const nonLabelLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export default class DynamicForm extends React.Component {
  formRef = React.createRef<FormInstance>();

  form = undefined;

  componentDidMount() {
    setTimeout(() => {
      this.form = this.formRef.current;
    }, 100);
  }

  generateRenderEditItem = (
    formDescriptions,
    options = { formItemLayout: horizontalFormItemLayout }
  ) => {
    const { formItemLayout } = options;

    return (key, ReactNode) => {
      const config = get(formDescriptions, key) || {};
      const { label, rules } = config;
      return (
        <Form.Item {...formItemLayout} key={key} label={label} name={key} rules={rules}>
          {ReactNode}
        </Form.Item>
      );
    };
  };

  generateRenderViewItem = () => () => {};

  render() {
    return <div></div>;
  }
}
