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
  const submit = () => {
    const data = {
      note: docid,
      diagnosis: {
        analysis: analysis_ref.current.getFieldsValue(),
        score: {
          fischerdata: Fischer_ref.current.getFieldsValue(),
          nstdata: Nst_ref.current.getFieldsValue(),
          krebsdata: Krebs_ref.current.getFieldsValue(),
        }
      }
    }


    request.put(`/ctg-exams-note`, { data })
  }
  return (
    <Wrapper >
      <div style={{ height: `calc(100% - 420px - 12px)`, marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' }}>
        <Ctg suitType={1} ref={ref} loading={loading} data={ctgData} />

      </div>
      <Row gutter={12} style={{ height: 420 }}>
        <Col span={12} style={{ height: '100%' }} className="bordered">
          <Score disabled={disabled}  {...d} fetal={fetal} setFetal={setFetal} ctgData={ctgData} docid={docid} v={ref.current} className="bordered" style={ {height: '100%', background: '#fff' }} />
          <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
            <Button size="small" style={{ marginBottom: 10 }} onClick={analyse}  disabled={!docid}>历史分析</Button>
            <Button size="small" style={{ marginBottom: 10 }} type="primary" onClick={analyse}  disabled={!docid}>分析</Button>
            <Button size="small" style={{ marginBottom: 10 }}  disabled={!docid} onClick={() => setDisabled(!disabled)}>{disabled ? '修改' : '确认'}</Button>
          </div>
        </Col>
        <Col span={12} style={{ height: '100%',background:'#fff' }} className="bordered" >
          <Analyse ref={analysis_ref} />
          <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
            <Button size="small" style={{ marginBottom: 10 }}  disabled={!docid}>打印</Button>
            <Button size="small" type="primary" onClick={submit} disabled={!docid}>保存</Button>
          </div>

        </Col>
      </Row>
    </Wrapper>
  );
}

export default Analysis;
