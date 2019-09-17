/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { Props, useContext } from 'react';
import { SchemaForm, createFormActions } from '@uform/antd';
import '../components';
import { Context } from '../Manager';
interface IP extends Props<any> {
  schema: object;
  initialValues?: object;
  [x: string]: any;
}
const _SchemaForm = ({ schema, initialValues, ...props }: IP) => {
  const actions = createFormActions();
  const { collectActions } = useContext(Context);
  return (
    <SchemaForm
      labelAlign="left"
      schema={schema}
      initialValues={initialValues}
      onChange={(a, b) => {
        console.log(a, b);
      }}
      onSubmit={v => console.log(v)}
      actions={actions}
      labelCol={{ style: { width: '90px', float: 'left' } }}
      wrapperCol={{
        xs: 10,
        sm: 10,
        md: 10,
        lg: 16,
      }}
      effects={$ => {
        $('onFormInit').subscribe(() => {
          collectActions(actions);
        });
      }}
      {...props}
      style={{ overflow: 'hidden' }}
    >
      {props.children}
    </SchemaForm>
  );
};
export const componentNameKey = 'componentName';
export const componentName = 0x1234;
_SchemaForm[componentNameKey] = componentName;
export default _SchemaForm;
