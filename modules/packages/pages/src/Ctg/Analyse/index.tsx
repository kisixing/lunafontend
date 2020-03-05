import { Ctg } from '@lianmed/lmg';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import request from "@lianmed/request";
import { Button, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import React, { useRef, useState } from 'react';
import styled from "styled-components";
import Analyse from './Analyse';
import Score from './Score';
import useAnalyse from './useAnalyse';
import useCtgData from './useCtgData';

const Wrapper = styled.div`
  height:100%;
  .ant-divider {
    margin:10px 0 2px;
    border-radius:2px;
  }
  button {
    margin:0 6px 6px 0
  }
  .bordered {
    border: 1px solid #ddd;
  }
`

function Analysis({
  docid = ''
}) {
  // docid = '1_1112_160415144057'
  const { ctgData, loading } = useCtgData(docid)
  const [disabled, setDisabled] = useState(true)

  const [fetal, setFetal] = useState(1)

  const ref = useRef<Suit>(null)

  const {
    responseData,
    MARKS,
    analyse,
    startTime,
    mark, setMark,
    interval, setInterval,
    Fischer_ref,
    Nst_ref,
    Krebs_ref,
    analysis_ref,
    old_ref,
  } = useAnalyse(ref.current, docid, fetal)

  const d = {
    responseData,
    MARKS,
    analyse,
    startTime,
    mark, setMark,
    interval, setInterval,
    Fischer_ref,
    Nst_ref,
    Krebs_ref,
    old_ref
  }
  const submit = () => {
    const curData: { [x: string]: number } = d[`${mark}_ref`].current.getFieldsValue()
    const oldData: { [x: string]: number } = old_ref.current[mark]
    const isedit = Object.entries(curData).find(([k, v]) => oldData[k] !== v) ? true : false
    const data = {
      note: docid,
      diagnosis: { ...analysis_ref.current.getFieldsValue() },
      result: {
        ...curData,
        isedit
      }
    }


    request.put(`/ctg-exams-note`, { data })
  }
  const btnDisabled = !docid || !disabled
  return (
    <Wrapper >
      <div style={{ height: `calc(100% - 420px - 12px)`, marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' }}>
        <Ctg suitType={1} ref={ref} loading={loading} data={ctgData} />

      </div>
      <Row gutter={12} style={{ height: 420 }}>
        <Col span={12} >
          <Score disabled={disabled}  {...d} fetal={fetal} setFetal={setFetal} ctgData={ctgData} docid={docid} v={ref.current} className="bordered" />
          <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
            <Button size="small" style={{ marginBottom: 10 }} onClick={analyse} disabled={btnDisabled}>历史分析</Button>
            <Button size="small" style={{ marginBottom: 10 }} disabled={!docid} onClick={() => setDisabled(!disabled)}>{disabled ? '修改' : '确认'}</Button>
            <Button size="small" style={{ marginBottom: 10 }} type="primary" onClick={analyse} disabled={!docid}>分析</Button>
          </div>
        </Col>
        <Col span={12}  >
          <Analyse ref={analysis_ref} />
          <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
            <Button size="small" style={{ marginBottom: 10 }} disabled={btnDisabled}>打印</Button>
            <Button size="small" type="primary" onClick={submit} disabled={btnDisabled}>保存</Button>
          </div>

        </Col>
      </Row>
    </Wrapper>
  );
}

export default Analysis;
