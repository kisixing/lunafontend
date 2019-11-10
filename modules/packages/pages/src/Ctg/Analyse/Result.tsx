import React, { useState, useEffect } from 'react';
import { Radio, Form, Button, InputNumber, Select } from 'antd';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import useAnalyse, { IResult } from './useAnalyse'
import { event } from '@lianmed/utils';
const intervals = [20, 40]

const ScoringMethod = (props: IProps) => {
  const { form, docid, v, ctgData, fetal, setFetal, ...others } = props;

  const [disabled, setDisabled] = useState(true)
  const {
    responseData,
    activeItem,
    MARKS,
    analyse,
    startTime,
    mark, setMark,
    interval, setInterval,
    modifyData
  } = useAnalyse(v, docid, fetal, form, (_result) => {
    form.setFieldsValue(_result)
  })
  const onChange = e => {
    const mark = e.target.value
    modifyData()

    setDisabled(true)
    form.resetFields()
    setMark(mark)
  };

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };
  const formScores = form.getFieldsValue()

  useEffect(() => {

    const cb = fn => {
      fn(JSON.stringify(responseData))

    }
    event.on('analysis:result', cb)
    return () => {
      event.off('analysis:result', cb)
    };
  }, [responseData, formScores])


  const IntervalRadio = () => {
    return (
      <span style={{ marginRight: 10 }}> 时长：
            <Select onChange={e => {
          const i = Number(e) || 20
          setInterval(i)

        }} value={interval}>
          {
            intervals.map(value => (
              <Select.Option value={value} key={value}>{value + '分钟'}</Select.Option>
            ))
          }
        </Select>
      </span>
    )
  }
  const FetalSelect = () => {
    return (
      <span style={{ marginRight: 10 }}> 胎次：
            <Select onChange={setFetal} value={fetal}>
          {
            Array(+ctgData.fetalnum).fill(0).map((_, i) => (
              <Select.Option value={i + 1} key={i + 1}>{i + 1 + '胎'}</Select.Option>
            ))
          }
        </Select>
      </span>
    )
  }

  const StartTime = () => {
    return <span style={{ marginRight: 10 }}>开始时间：{(startTime / 240).toFixed(1)}分</span>
  }
  const EndTime = () => {
    return <span>结束时间：{(startTime / 240 + interval).toFixed(1)}分</span>
  }

  return (
    <div  {...others}>
      <div style={{ padding: '12px 24px', background: '#ddd' }}>
        <>
          <IntervalRadio />
          <FetalSelect />
          <div style={{ marginTop: 10 }}>
            <StartTime />
            <EndTime />
          </div>
        </>
      </div>
      <div style={{ display: 'flex', padding: '10px 24px 0' }}>
        <Radio.Group onChange={onChange} value={mark} style={{ maxWidth: 200 }}>
          {
            MARKS.map(_ => (
              <Radio value={_} key={_}>{_}分析法</Radio>
            ))
          }
        </Radio.Group>
        <Form labelAlign="left" {...formItemLayout} style={{ width: '100%' }}>
          {
            activeItem.map(({ label, key, required, message }) => (
              <Form.Item label={label} key={key} style={{ marginBottom: 0 }}>
                {form.getFieldDecorator(key, {
                  rules: [{ required, message }],
                })(<InputNumber disabled={disabled} style={{ width: '150px' }} />)}
              </Form.Item>
            ))
          }
          <Form.Item label="电脑评分">
            <span>CTG = {Object.values(formScores).reduce((a, b) => ~~a + ~~b, 0)}</span>
          </Form.Item>

        </Form>
        <div style={{ width: 68 }}>
          <Button style={{ marginBottom: 10 }} type="primary" onClick={analyse}>分析</Button>
          <Button style={{ marginBottom: 10 }} onClick={() => {
            const next = !disabled
            if (next) {
              modifyData()
            }
            setDisabled(next)
          }}>{disabled ? '修改' : '确认'}</Button>
          <Button style={{ marginBottom: 10 }}>打印</Button>
        </div>
      </div>
    </div>
  );
}
interface IProps {
  ctgData: any;
  docid: string,
  form: WrappedFormUtils<IResult>,
  v: { suit: Suit }
  [x: string]: any
}
export default Form.create<IProps>()(ScoringMethod);