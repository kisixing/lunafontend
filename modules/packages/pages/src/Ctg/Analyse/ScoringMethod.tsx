import React, { useState, useEffect } from 'react';
import { Tabs, Radio, Form, Button, InputNumber, Tag } from 'antd';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import useAnalyse, { IResult } from './useAnalyse'
import { event } from '@lianmed/utils';
const { TabPane } = Tabs;

const ScoringMethod = (props: IProps) => {
  const { form, docid, v, ...others } = props;

  const [disabled, setDisabled] = useState(true)
  const { responseData, activeItem, setMark, mark, MARKS, analyse } = useAnalyse(v, docid, (_result) => {
    form.setFieldsValue(_result)
  })

  const callback = (key) => { console.log(key); }
  const onChange = e => {
    const mark = e.target.value
    setDisabled(true)
    form.resetFields()
    setMark(mark)
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  useEffect(() => {
    const cb = fn => fn({
      result: JSON.stringify({
        ...responseData, result: JSON.stringify(form.getFieldsValue())
      })
    })
    event.on('analysis:result', cb)
    return () => {
      event.off('analysis:result', cb)
    };
  }, [responseData])
  return (
    <div  {...others}>
      <div >
        <div style={{ padding: '12px 24px', background: '#ddd' }}>
          <Radio.Group onChange={onChange} value={mark}>
            {
              MARKS.map(_ => (
                <Radio value={_} key={_}>{_}分析法</Radio>
              ))
            }
          </Radio.Group>
        </div>
        <Tabs size="small" defaultActiveKey="1" onChange={callback}>
          <TabPane tab={`${mark}分析法`} key="1" >
            <div style={{ display: 'flex', padding: '0 24px' }}>
              <Form {...formItemLayout} style={{ width: '100%' }}>
                {
                  activeItem.map(({ label, key, required, message }) => (
                    <Form.Item label={label} key={key} style={{ marginBottom: 0 }}>
                      {form.getFieldDecorator(key, {
                        rules: [{ required, message }],
                      })(<InputNumber disabled={disabled} style={{ width: '150px' }} />)}
                    </Form.Item>
                  ))
                }

              </Form>
              <div style={{ width: 68 }}>
                <Button style={{ marginBottom: 10 }} type="primary" onClick={analyse}>分析</Button>
                <Button style={{ marginBottom: 10 }} onClick={() => {
                  const opposite = !disabled
                  setDisabled(opposite)
                }}>{disabled ? '修改' : '确认'}</Button>
                <Button style={{ marginBottom: 10 }}>打印</Button>
              </div>
            </div>
            <div style={{padding:'0 24px'}}>
              <div>
                电脑评分：
            <span>CTG = {Object.values(form.getFieldsValue()).reduce((a, b) => ~~a + ~~b, 0)}</span>
              </div>
              <div style={{ textAlign: 'center', marginBottom: 10 }}>
                <Tag >注意：电脑自动分析数据和结果仅供参考</Tag>
              </div>
            </div>
          </TabPane>
          {/* <TabPane tab="分析备注" key="2" className={styles.tabContent}>
            <div></div>
          </TabPane> */}
        </Tabs>
      </div>

    </div>
  );
}
interface IProps {
  docid: string,
  form: WrappedFormUtils<IResult>,
  v: { suit: Suit }
  [x: string]: any
}
export default Form.create<IProps>()(ScoringMethod);