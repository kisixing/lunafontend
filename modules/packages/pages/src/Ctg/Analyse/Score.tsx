import React, { useEffect, useMemo } from 'react';
import { Radio, Select } from 'antd';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';

import Methods from './methods'
import { event } from '@lianmed/utils';
const intervals = [20, 40]
interface IProps {
  ctgData: any;
  docid: string,
  v: Suit
  responseData: any
  MARKS: any
  analyse: any
  startTime: any
  mark, setMark: any
  interval, setInterval: any
  Fischer_ref: any
  Nst_ref: any
  Krebs_ref: any
  disabled: boolean
  [x: string]: any
}

const ScoringMethod = (props: IProps) => {
  const { docid, ctgData, fetal, setFetal, disabled } = props;


  const {
    responseData,
    MARKS,
    startTime,
    mark, setMark,
    interval, setInterval,
  } = props

  const onChange = e => {
    const mark = e.target.value

    setMark(mark)
  };



  useEffect(() => {

    const cb = fn => {
      fn(JSON.stringify(responseData))

    }
    event.on('analysis:result', cb)
    return () => {
      event.off('analysis:result', cb)
    };
  }, [responseData])


  const IntervalRadio = useMemo(() => {
    return (
      <span style={{ marginRight: 10 }}> 时长：
            <Select disabled={!docid} onChange={e => {
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
  }, [interval, docid])
  const FetalSelect = useMemo(() => {
    return (
      <span style={{ marginRight: 10 }}> 胎心率：
            <Select disabled={!docid} onChange={setFetal} value={fetal}>
          {
            Array(+ctgData.fetalnum).fill(0).map((_, i) => (
              <Select.Option value={i + 1} key={i + 1}>{`FHR${i + 1}`}</Select.Option>
            ))
          }
        </Select>
      </span>
    )
  }, [ctgData, fetal, setFetal, docid])

  const StartTime = () => {
    return <span style={{ marginRight: 10 }}>开始时间：{(startTime / 240).toFixed(1)}分</span>
  }
  const EndTime = () => {
    return <span>结束时间：{(startTime / 240 + interval).toFixed(1)}分</span>
  }
  const R = useMemo(
    () => {
      return (
        <Radio.Group disabled={!docid} onChange={onChange} value={mark} style={{ marginBottom: 5 }}>
          {
            MARKS.map(_ => (
              <Radio value={_} key={_}>{_}分析法</Radio>
            ))
          }
        </Radio.Group>
      )
    },
    [mark, docid],
  )
  return (
    <div style={{ height: '100%', background: '#fff' }} className="bordered">
      <div className="divider" style={{ padding: '12px 24px', margin: 0 }}>
        <>
          {
            IntervalRadio
          }
          {
            FetalSelect
          }
          <StartTime />
          <EndTime />
        </>
      </div>
      <div style={{ padding: '10px 24px 0' }}>
        {
          R
        }
        {/* <Form form={form} labelAlign="left" {...formItemLayout} style={{ width: '100%' }}>
          {
            activeItem.map(({ label, key, rules }) => (
              <Form.Item label={label} key={key} style={{ marginBottom: 0 }} rules={rules}>
                <InputNumber disabled={disabled} style={{ width: '150px' }} />
              </Form.Item>
            ))
          }
          <Form.Item label="电脑评分">
            <span>CTG = {Object.values(formScores).reduce((a, b) => ~~a + ~~b, 0)}</span>
          </Form.Item>

        </Form> */}


        <Methods {...props} disabled={disabled} />

      </div>
    </div>
  );
}

export default ScoringMethod