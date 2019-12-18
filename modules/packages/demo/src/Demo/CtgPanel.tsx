import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Ctg } from '@lianmed/lmg';
import useCtgData from '@lianmed/pages/lib/Ctg/Analyse/useCtgData'
import { Select } from 'antd';
import { Form, Row, Col, Input, Button, Icon } from 'antd';

const toplist: string[] = Array(7).fill(65).map((_, i) => _ + i).map(_ => String.fromCharCode(_))
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
  const [activeTopList, setActiveTopList] = useState(new Set<String>())

  const [ctgData] = useCtgData('190_190_191216224850')
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
      <div style={{ marginBottom: 10 }}>
        {
          toplist.map(_ => {
            const _activeTopList = new Set(activeTopList)
            const existed = _activeTopList.has(_)
            return <Button style={{ margin: '0 6px' }} key={_} type={existed ? 'primary' : 'default'} onClick={e => {

              existed ? _activeTopList.delete(_) : _activeTopList.add(_)
              setActiveTopList(_activeTopList)
            }}>{_}</Button>
          })
        }
      </div>
      <div style={{ height: '50vh', marginBottom: 30 }}>
        <Ctg data={ctgData} />
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