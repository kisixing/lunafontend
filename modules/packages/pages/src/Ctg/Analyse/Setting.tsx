import React, { useEffect } from 'react';
import { Form, Radio, Input, Divider } from 'antd';
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
        <Form style={{ padding: '12px 24px' }} form={form} wrapperCol={{ xs: 16 }} labelCol={{ xs: 5 }} labelAlign="left">
          <Form.Item label="宫缩" style={{ marginBottom: 0 }}  key="inf6o">

            <div>宫缩次数--------------------------------------------0次</div>
            <div>宫缩强度--------------------------------------------0%</div>
            <div>间隔时间--------------------------------------------0次</div>
            <div>持持续时间--------------------------------------------0次</div>
          </Form.Item>
          <Form.Item label="胎心率" style={{ marginBottom: 0 }}  key="inf5o">
            <Radio.Group>
              <div>短变异--------------------------------------------5.94毫秒</div>

            </Radio.Group>
          </Form.Item>
          <Form.Item label="减速" style={{ marginBottom: 0 }}  key="info4">
            <Radio.Group>
              <span>早减（ED）：0次</span><Divider type="vertical" />
              <span>晚减（LD）：0次</span><Divider type="vertical" />
              <span>变异减速VD）：0次</span>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="CST/OCT" style={{ marginBottom: 0 }} required key='info1'>

            <Radio.Group>
              <Radio value={1}>阴性</Radio>
              <Radio value={2}>阳性</Radio>
              <Radio value={3}>可以</Radio>
              <Radio value={4}>不满意</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="短变异（毫秒）" style={{ marginBottom: 0 }} key="info2" required>

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