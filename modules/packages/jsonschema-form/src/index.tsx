/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import { SchemaForm, FormButtonGroup, Submit, Reset, createFormActions } from '@uform/antd';
import Printer from '@uform/printer';
import 'antd/dist/antd.css';

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
      <FormButtonGroup offset={7}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  );
};
