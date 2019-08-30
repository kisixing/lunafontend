/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import { SchemaForm, FormButtonGroup, Submit, Reset, createFormActions } from '@uform/antd';
import 'antd/dist/antd.css';
import '@lianmed/schema-form-components';
export default ({
  schema,
  initialValues,
  saveActions = actions => {
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
          saveActions(actions);
        });
      }}
      {...props}
    >
      {props.children}
    </SchemaForm>
  );
};
