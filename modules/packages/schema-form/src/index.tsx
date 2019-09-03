/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import { SchemaForm, createFormActions } from '@uform/antd';
import 'antd/dist/antd.css';
import '@lianmed/schema-form-components';
export default ({
  schema,
  initialValues,
  collectActions = actions => {
    return actions;
  },
  ...props
}) => {
  const actions = createFormActions();
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
    >
      {props.children}
    </SchemaForm>
  );
};
