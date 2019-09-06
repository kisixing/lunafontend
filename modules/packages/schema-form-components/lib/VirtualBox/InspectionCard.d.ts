import React from 'react';
import { IFieldProps } from '@uform/antd';
declare const _default: {
  ({
    children,
    name: fieldName,
    render,
    ...props
  }: {
    name?: string;
    render?: (fieldProps: IFieldProps) => import('@uform/types').TextEl;
  } & {
    children?: React.ReactNode;
  }): JSX.Element;
  defaultProps: Partial<IFieldProps>;
  displayName: string;
};
export default _default;
