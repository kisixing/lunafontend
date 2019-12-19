import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Ctg } from '@lianmed/lmg';
import useCtgData from '@lianmed/pages/lib/Ctg/Analyse/useCtgData';
import Setting from './Setting';
import { Select } from 'antd';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import SettingEvent from './SettingEvent';
import SettingBase from './SettingBase';
import SettingResult from './SettingResult';


const ButtonGroup = Button.Group;
const border = { border: '1px solid #ddd' }
const header = ['产检记录', '入院病历', '事件记录', 'CTG档案', '分娩记录']
const toplist: string[] = header ? header : Array(7).fill(65).map((_, i) => _ + i).map(_ => String.fromCharCode(_))
const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 64 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
};
function CtgPanel({ form: { getFieldDecorator } }: any) {
  const box = useRef<HTMLDivElement>(null)
  const [datacache, setDatacache] = useState(new Map());
  const [activeH, setActiveH] = useState('产检记录')
  const [ctgData] = useCtgData('1_1112_160415144057')
  function callback(key: string) {
    console.log(key);
  }
  function handleSearch() {

  }

  useEffect(() => {


    return () => {
    }
  }, []);
  return (
    <div>
      <div style={{ marginBottom: 5 }}>
        {
          toplist.map(_ => {
            const existed = activeH === _
            return <Button style={{ margin: '0 6px' }} key={_} type={existed ? 'primary' : 'default'} onClick={e => setActiveH(_)}>{_}</Button>
          })
        }
      </div>
      <div style={{ height: '40vh', marginBottom: 10 }}>
        <Ctg data={ctgData} />

      </div>
      <div style={{  marginBottom: 10,textAlign:'center' }}>
        <ButtonGroup>
          <Button type="primary">
            <Icon type="caret-right" />
            <span>心音回放</span>
          </Button>
          <Button type="primary">
            <Icon type="pause" />
          </Button>
          <Button type="primary">
            <Icon type="rollback" />
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ height: 420 }}>

        <Row gutter={24} style={{ height: '100%' }}>
          <Col span={6} style={{ height: '100%' }} >
            <SettingEvent fetal='1' setFetal='1' ctgData='' docid='' style={{ ...border, height: '100%', background: '#fff' }} />
          </Col>
          <Col span={6} style={{ height: '100%' }} >
            <SettingBase fetal='1' setFetal='1' ctgData='' docid='' style={{ ...border, height: '100%', background: '#fff' }} />
          </Col>
          <Col span={8} style={{ height: '100%' }} >
            <Setting fetal='1' style={{ ...border, height: '100%', background: '#fff' }} />
            <Button style={{ position: 'absolute', right: 24, bottom: 16 }} type="primary">保存</Button>
          </Col>
          <Col span={4} style={{ height: '100%' }} >
            <SettingResult fetal='1' style={{ ...border, height: '100%', background: '#fff' }} />
            <Button style={{ position: 'absolute', right: 24, bottom: 16 }} type="primary">保存</Button>
          </Col>
        </Row>
      </div>
      <Form className="ant-advanced-search-form" onSubmit={handleSearch} labelAlign="left" {...formItemLayout}>
        <Row gutter={24}>

          <Col span={8} >
            <Form.Item label={`Field a`}>
              {getFieldDecorator(`a`, {
                rules: [],
              })(
                <Select>
                  <Select.Option key="0">lable0</Select.Option>
                  <Select.Option key="1">lable1</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label={`Field b`}>
              {getFieldDecorator(`b`, {
                rules: [],
              })(
                <Select>
                  <Select.Option key="0">lable0</Select.Option>
                  <Select.Option key="1">lable1</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label={`Field c`}>
              {getFieldDecorator(`c`, {
                rules: [],
              })(
                <Select>
                  <Select.Option key="0">lable0</Select.Option>
                  <Select.Option key="1">lable1</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label={`Field d`}>
              {getFieldDecorator(`d`, {
                rules: [],
              })(
                <Select>
                  <Select.Option key="0">lable0</Select.Option>
                  <Select.Option key="1">lable1</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label={`Field e`}>
              {getFieldDecorator(`e`, {
                rules: [],
              })(
                <Select>
                  <Select.Option key="0">lable0</Select.Option>
                  <Select.Option key="1">lable1</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>

        </Row>

      </Form>
    </div>
  );
}
export default Form.create()(
  CtgPanel
)