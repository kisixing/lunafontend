import React, { useEffect, forwardRef, memo } from 'react';
import { Form, Radio, Input,  InputNumber, Row, Col } from 'antd';
import { event } from '@lianmed/utils';
import { FormInstance } from 'antd/lib/form';

const Setting = forwardRef<FormInstance, { [x: string]: any }>((props, ref) => {

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
  const cFn = (t: string) => ({
    formatter: v => v && `${v}${t}`,
    parser: v => v.replace(t, '')
  })



  return (
    <div style={{ height: '100%', background: '#fff' }} className="bordered">
      <div >

        {/* <div style={{ padding: '12px 24px', background: '#ddd' }}>
          <span> &nbsp;</span>
        </div> */}
        <Form ref={ref} size="small" style={{ padding: '6px 12px' }} form={form} labelCol={{ xs: 9 }} wrapperCol={{ xs: 15 }} labelAlign="left">
          <div className="divider"  >宫缩 </div>
          <Row>
            <Col span={6}>
              <Form.Item label="宫缩次数" style={{ marginBottom: 0 }} name="uctimes">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="宫缩强度" style={{ marginBottom: 0 }} name="ucStrong">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="间隔时间" style={{ marginBottom: 0 }} name="ucdurationtime">
                <InputNumber {...cFn('min')} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="持续时间" style={{ marginBottom: 0 }} name="uckeeptime">
                <InputNumber {...cFn('s')} />
              </Form.Item>
            </Col>

          </Row>



          {/* <div >胎心率</div>
          <Row>
            <Col span={6}>
              <Form.Item label="短变异" style={{ marginBottom: 0 }} name="stv">

                <InputNumber />

              </Form.Item>
            </Col>
          </Row> */}
          <div className="divider" >减速</div>

          <Row>
            <Col span={6}>
              <Form.Item label="早减" style={{ marginBottom: 0 }} name="edtimes">
                <InputNumber  {...cFn('次')} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="晚减" style={{ marginBottom: 0 }} name="ldtimes">
                <InputNumber  {...cFn('次')} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="变异减速" style={{ marginBottom: 0 }} name="vdtimes">
                <InputNumber  {...cFn('次')} />
              </Form.Item>
            </Col>
          </Row>

          <div className="divider" >类型</div>
          <Form.Item label="NST" labelCol={{ xs: 4 }} wrapperCol={{ xs: 18 }} style={{ marginBottom: 0 }}  name='classification0'>
            <Radio.Group>
              <Radio value={1}>有反应</Radio>
              <Radio value={2}>无反应</Radio>
              <Radio value={3}>可疑</Radio>
              <Radio value={4}>不满意</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="CST/OCT" style={{ marginBottom: 0 }} labelCol={{ xs: 4 }} wrapperCol={{ xs: 18 }} name='classification1'>
            <Radio.Group>
              <Radio value={1}>阴性</Radio>
              <Radio value={2}>阳性</Radio>
              <Radio value={3}>可疑</Radio>
              <Radio value={4}>不满意</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="divider" >波形</div>
          <Form.Item label="" style={{ marginBottom: 0 }} name="wave">

            <Radio.Group>
              <Radio value={1}>平滑</Radio>
              <Radio value={2}>小波浪</Radio>
              <Radio value={3}>中波浪</Radio>
              <Radio value={4}>大波浪</Radio>
              <Radio value={5}>正弦型</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="divider" >诊断</div>

          <Form.Item wrapperCol={{ xs: 24 }} style={{ marginBottom: 0 }} name="diagnosistxt" >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
})

export default memo(Setting)