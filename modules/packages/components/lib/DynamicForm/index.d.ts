import React from 'react';
import { FormInstance } from 'antd/lib/form/Form';
export declare const horizontalFormItemLayout: {
  labelCol: {
    span: number;
  };
  wrapperCol: {
    span: number;
  };
};
export declare const verticalFormItemLayout: {
  labelCol: {
    span: number;
  };
  wrapperCol: {
    span: number;
  };
};
export declare const nonLabelLayout: {
  labelCol: {
    span: number;
  };
  wrapperCol: {
    span: number;
  };
};
export default class DynamicForm extends React.Component {
  formRef: React.RefObject<FormInstance>;
  form: any;
  componentDidMount(): void;
  generateRenderEditItem: (
    formDescriptions: any,
    options?: {
      formItemLayout: {
        labelCol: {
          span: number;
        };
        wrapperCol: {
          span: number;
        };
      };
    }
  ) => (key: any, ReactNode: any, options?: {}) => JSX.Element;
  generateRenderViewItem: () => () => void;
  render(): JSX.Element;
}
