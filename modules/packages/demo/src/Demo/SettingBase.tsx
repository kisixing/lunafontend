import React, { useEffect } from 'react';
import { Form, Radio, Input } from 'antd';
import { event } from '@lianmed/utils';

const SettingBase = (props: { form: any }) => {

  const { form, ...others } = props;
  const { getFieldDecorator } = form;

  
  return (
    <div {...others}>
      <div >
        <div style={{ padding: '12px 24px', background: '#ddd' }}>
          CTG分析
          </div>
        <Form style={{ padding: '12px 24px' }}>
          <Form.Item label="基线" style={{ marginBottom: 0 }}>
            {getFieldDecorator('info', {
              rules: [{ required: true, message: '' }],
            })(
              <Radio.Group>
                <Radio value={1}>有反应</Radio>
                <Radio value={2}>无反应</Radio>
                <Radio value={3}>正弦型</Radio>
                <Radio value={4}>不满意</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="变异" style={{ marginBottom: 0 }}>
            {getFieldDecorator('info', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Radio.Group>
                <Radio value={1}>阴性</Radio>
                <Radio value={2}>阳性</Radio>
                <Radio value={3}>可以</Radio>
                <Radio value={4}>不满意</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="加速" style={{ marginBottom: 0 }}>
            {getFieldDecorator('info', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Radio.Group>
                <Radio value={1}>平滑</Radio>
                <Radio value={2}>小波浪</Radio>
                <Radio value={3}>中波浪</Radio>
                <Radio value={4}>大波浪</Radio>
                <Radio value={5}>正弦型</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Form.create<{ form: any;[x: string]: any }>()(SettingBase);