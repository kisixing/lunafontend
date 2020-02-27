import React, { useEffect } from 'react';
import { Form, Radio, Input } from 'antd';
import { event } from '@lianmed/utils';

const Setting = (props: { [x: string]: any }) => {

  const { ...others } = props;
  const [form] = Form.useForm()

  useEffect(() => {
    const formData = form.getFieldsValue()

    const cb = fn => {
      fn(
        JSON.stringify(formData),
      )
    }
    event.on('analysis:diagnosis', cb)
    return () => {
      event.off('analysis:diagnosis', cb)
    };
  }, [form])
  return (
    <div {...others}>
      <div >
        <div style={{ padding: '12px 24px', background: '#ddd' }}>
          &nbsp;
          </div>
        <Form style={{ padding: '12px 24px' }} form={form}>
          <Form.Item label="NST" style={{ marginBottom: 0 }} required key="info">
            <Radio.Group>
              <Radio value={1}>有反应</Radio>
              <Radio value={2}>无反应</Radio>
              <Radio value={3}>正弦型</Radio>
              <Radio value={4}>不满意</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="CST/OCT" style={{ marginBottom: 0 }} required key='info'>

            <Radio.Group>
              <Radio value={1}>阴性</Radio>
              <Radio value={2}>阳性</Radio>
              <Radio value={3}>可以</Radio>
              <Radio value={4}>不满意</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="短变异（毫秒）" style={{ marginBottom: 0 }} key="info" required>

            <Radio.Group>
              <Radio value={1}>平滑</Radio>
              <Radio value={2}>小波浪</Radio>
              <Radio value={3}>中波浪</Radio>
              <Radio value={4}>大波浪</Radio>
              <Radio value={5}>正弦型</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='诊断' style={{ marginBottom: 0 }} key="diagnosis" >
            <Input.TextArea style={{ maxWidth: 400 }} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default (Setting)