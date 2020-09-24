import { obvue } from "@lianmed/f_types";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import React, { useMemo } from 'react';
import Methods from './methods';

const intervals = [20, 40, 80]
interface IProps {
  ctgData: any;
  docid: string,
  v: Suit
  MARKS: any
  startTime: any
  mark, setMark: any
  interval, setInterval: any
  mapFormToMark: any
  disabled: boolean
  initData: obvue.ctg_exams_analyse

  [x: string]: any
}

const ScoringMethod = (props: IProps) => {
  const { docid, ctgData, fetal, setFetal, disabled } = props;


  const {
    MARKS,
    startTime,
    mark, setMark,
    interval, setInterval, endTime
  } = props

  const onChange = e => {
    // const mark = e.target.value
    setMark(e.target.value)
  };






  const IntervalRadio = useMemo(() => {
    return (
      <span style={{ marginRight: 10 }}> 时长：
        <select disabled={!docid} onChange={e => {
          const i = Number(e.target.value) || 20
          setInterval(i)

        }} value={interval}>
          {
            intervals.map(value => (
              <option value={value} key={value}>{value + '分钟'}</option>
            ))
          }
        </select>
      </span>
    )
  }, [interval, docid])
  const FetalSelect = useMemo(() => {
    return (
      <span style={{ marginRight: 10 }}> 胎心率：
        <select disabled={!docid} onChange={e => setFetal(e.target.value)} value={fetal}>
          {
            Array(+ctgData.fetalnum).fill(0).map((_, i) => (
              <option value={i + 1} key={i + 1}>{`FHR${i + 1}`}</option>
            ))
          }
        </select>
      </span>
    )
  }, [ctgData, fetal, setFetal, docid])

  const StartTime = () => {
    return <span style={{ marginRight: 10 }}>开始时间：{(startTime / 240).toFixed(1)}分</span>
  }
  const EndTime = () => {
    return <span>结束时间：{(endTime / 240).toFixed(1)}分</span>
  }
  const R = useMemo(
    () => {
      return (
        <>
          <span>方法：</span>


          <select disabled={!docid} onChange={onChange} value={mark} style={{ marginBottom: 5, width: 90 }}>
            {
              MARKS.map(_ => (
                <option value={_} key={_}>{_}</option>
              ))
            }
          </select>
        </>

      )
    },
    [mark, docid],
  )
  return (
    <div style={{ height: '100%',  borderRight: 0 }} className="bordered">
      <div className="divider" style={{ padding: '8px 20px', margin: 0 }}>
        <>
          {
            R
          }
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