import { obvue } from "@lianmed/f_types";
import { Button } from "antd";
import React from 'react';
import Methods from './methods';

const intervals = [20, 40, 80]
interface IProps {
  ctgData: any;
  docid: string,
  MARKS: any
  startTime: any
  mark, setMark: any
  interval, setInterval: any
  disabled: boolean
  initData: obvue.ctg_exams_analyse
  fetchData: Function
  reAnalyse: Function
  loading: boolean
  analyseLoading: boolean
  showHistory: boolean,
  fetal: any,
  setFetal: any,
  endTime: any,
  mapFormToMark: any

}

const ScoringMethod = (props: IProps) => {
  const {
    docid,
    ctgData,
    fetal,
    setFetal,
    disabled,
    loading,
    analyseLoading,
    fetchData,
    reAnalyse,
    showHistory,
    MARKS,
    startTime,
    mark,
    setMark,
    interval,
    setInterval, endTime
  } = props;



  const onChange = e => {
    // const mark = e.target.value
    setMark(e.target.value)
  };









  const StartTime = () => {
    return <span style={{ marginRight: 10 }}>开始时间：{(startTime / 240).toFixed(1)}分</span>
  }
  const EndTime = () => {
    return <span style={{ marginRight: 10 }}>结束时间：{(endTime / 240).toFixed(1)}分</span>
  }

  return (
    <div style={{ borderRight: 0 }} className="bordered">
      <div className="divider" style={{ padding: '8px 20px', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <StartTime />
          <EndTime />
          <span>
            <span>方法：</span>
            <select disabled={!docid} onChange={onChange} value={mark} style={{ width: 90 }}>
              {
                MARKS.map(_ => (
                  <option value={_} key={_}>{_}</option>
                ))
              }
            </select>
          </span>
          <span style={{ marginRight: 10 }}>
            <span>
              时长：
            </span>
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
          <span style={{ marginRight: 10 }}>
            <span>胎心率：</span>
            <select disabled={!docid} onChange={e => setFetal(e.target.value)} value={fetal}>
              {
                Array(+ctgData.fetalnum).fill(0).map((_, i) => (
                  <option value={i + 1} key={i + 1}>{`FHR${i + 1}`}</option>
                ))
              }
            </select>
          </span>
          {
            showHistory && <span>
              分析版本：
              <select>
                <option value="1">v1</option>
                <option value="2">v2</option>
              </select>
            </span>
          }
        </div>
        <div>
          <Button size="small" type="primary" onClick={() => fetchData()} loading={loading} >刷新数据</Button>
          <Button size="small" type="primary" onClick={reAnalyse as any} loading={analyseLoading} >重新分析</Button>
        </div>
      </div>
      <div style={{ padding: 0, border: 0 }}>

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