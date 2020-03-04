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
import 'antd/dist/antd.css'
export const Context = React.createContext({});
const border = { border: '1px solid #ddd' }
function Analysis({
  docid = '1_1112_160415144057'
}) {
  // docid = '1_1112_160415144057'
  const { ctgData, loading } = useCtgData(docid)

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
    modifyData,
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
    modifyData,
    Fischer_ref,
    Nst_ref,
    Krebs_ref
  }

  return (
    <div style={{ height: '100%' }}>
      <div style={{ height: `calc(100% - 420px - 12px)`, marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' }}>
        <Ctg ref={ref} loading={loading} data={ctgData} />

      </div>
      <Row gutter={12} style={{ height: 420 }}>
        <Col span={12} style={{ height: '100%' }} >
          <Score {...d} fetal={fetal} setFetal={setFetal} ctgData={ctgData} docid={docid} v={ref.current} style={{ ...border, height: '100%', background: '#fff' }} />
        </Col>
        <Col span={12} style={{ height: '100%' }} >
          <Analyse ref={analysis_ref} fetal={fetal} style={{ ...border, height: '100%', background: '#fff' }} />
          <Button size="small" style={{ position: 'absolute', right: 24, bottom: 16 }} type="primary" onClick={submit}>保存</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Analysis;
