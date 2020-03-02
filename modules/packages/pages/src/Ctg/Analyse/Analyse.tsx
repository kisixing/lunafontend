import React, { useEffect } from 'react';
import { Form, Radio, Input, Divider, InputNumber, Row, Col } from 'antd';
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

        {/* <div style={{ padding: '12px 24px', background: '#ddd' }}>
          <span> &nbsp;</span>
        </div> */}
        <Form size="small" style={{ padding: '12px 24px' }} form={form} labelCol={{ xs: 6 }}  wrapperCol={{ xs: 16 }} labelAlign="left">
          <Divider >宫缩 </Divider>
          <Row>
            <Col span={12}>
              <Form.Item label="宫缩次数" style={{ marginBottom: 0 }} key="g0">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="宫缩强度" style={{ marginBottom: 0 }} key="g1">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="间隔时间" style={{ marginBottom: 0 }} key="g2">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="持持续时间" style={{ marginBottom: 0 }} key="g3">
                <InputNumber />
              </Form.Item>
            </Col>

          </Row>



          <Divider >胎心率</Divider>

          <Form.Item label="短变异" style={{ marginBottom: 0 }} key="t0">
            <InputNumber />

          </Form.Item>

          <Divider >减速</Divider>

          <Row>
            <Col span={8}>
              <Form.Item label="早减" style={{ marginBottom: 0 }} key="j0">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="晚减" style={{ marginBottom: 0 }} key="j0">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="变异减速" style={{ marginBottom: 0 }} key="j0">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>


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