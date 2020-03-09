import React from 'react';
import { FormInstance } from 'antd/lib/form/Form';
export declare const horizontalFormItemLayout: {
  labelCol: {
    xs: {
      span: number;
    };
    sm: {
      span: number;
    };
  };
  wrapperCol: {
    xs: {
      span: number;
    };
    sm: {
      span: number;
    };
  };
};
export declare const verticalFormItemLayout: {
  labelCol: {
    xs: {
      span: number;
    };
    sm: {
      span: number;
    };
  };
  wrapperCol: {
    xs: {
      span: number;
    };
    sm: {
      span: number;
    };
  };
};
export declare const nonLabelLayout: {
  labelCol: {
    xs: {
      span: number;
    };
    sm: {
      span: number;
    };
  };
  wrapperCol: {
    xs: {
      span: number;
    };
    sm: {
      span: number;
    };
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
          xs: {
            span: number;
          };
          sm: {
            span: number;
          };
        };
        wrapperCol: {
          xs: {
            span: number;
          };
          sm: {
            span: number;
          };
        };
      };
    }
  ) => (key: any, ReactNode: any) => JSX.Element;
  generateRenderViewItem: () => () => void;
  render(): JSX.Element;
}
