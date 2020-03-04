import React, { useState, useRef } from 'react';
import { Row, Col, Button } from 'antd';
import Score from './Score';
import Analyse from './Analyse';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { event } from '@lianmed/utils';
import request from "@lianmed/request";
import useCtgData from './useCtgData'
import { Ctg } from '@lianmed/lmg';
import useAnalyse from './useAnalyse'
import styled from "styled-components";
import 'antd/dist/antd.css'

const Wrapper = styled.div`
  height:100%;
  .ant-divider {
    margin:6px 0;
  }
  button {
    margin:0 6px 6px 0
  }
`

const border = { border: '1px solid #ddd' }
function Analysis({
  docid = '1_1112_160415144057'
}) {
  // docid = '1_1112_160415144057'
  const { ctgData, loading } = useCtgData(docid)
  const [disabled, setDisabled] = useState(true)

  const [fetal, setFetal] = useState(1)
  const submit = () => {
    const data = { note: docid }
    event.emit('analysis:result', result => {
      Object.assign(data, { result })
    })
    event.emit('analysis:diagnosis', diagnosis => {
      Object.assign(data, { diagnosis })
    })

    request.put(`/ctg-exams-note`, { data })
  }
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
    analysis_ref
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
    Krebs_ref
  }

  return (
    <Wrapper >
      <div style={{ height: `calc(100% - 420px - 12px)`, marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' }}>
        <Ctg suitType={1} ref={ref} loading={loading} data={ctgData} />

      </div>
      <Row gutter={12} style={{ height: 420 }}>
        <Col span={12} style={{ height: '100%' }} >
          <Score disabled={disabled} {...d} fetal={fetal} setFetal={setFetal} ctgData={ctgData} docid={docid} v={ref.current} style={{ ...border, height: '100%', background: '#fff' }} />
            <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
              <Button size="small" style={{ marginBottom: 10 }} type="primary" onClick={analyse}>分析</Button>
              <Button size="small" style={{ marginBottom: 10 }} onClick={() => {
                const next = !disabled

                setDisabled(next)
              }}>{disabled ? '修改' : '确认'}</Button>
            </div>
        </Col>
        <Col span={12} style={{ height: '100%' }} >
          <Analyse ref={analysis_ref} fetal={fetal} style={{ ...border, height: '100%', background: '#fff' }} />
          <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
            <Button size="small" type="primary" onClick={submit}>保存</Button>
            <Button size="small" style={{ marginBottom: 10 }}>打印</Button>
          </div>

        </Col>
      </Row>
    </Wrapper>
  );
}

export default Analysis;
