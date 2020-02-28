import React, { useEffect } from 'react';
import { Form, Radio, Input } from 'antd';
import { event } from '@lianmed/utils';

const Setting = (props: { form: any }) => {

  const { form, ...others } = props;


  return (
    <div {...others}>
      <div >
        <div style={{ padding: '12px 24px', background: '#ddd' }}>
          课程分数
          </div>
        <Form style={{ padding: '12px 24px' }}>

          <Form.Item label='' style={{ marginBottom: 0 }} >

            <Input.TextArea style={{ maxWidth: 400 }} />

          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default (Setting);