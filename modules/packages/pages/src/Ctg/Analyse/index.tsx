import { Ctg } from '@lianmed/lmg';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import request from "@lianmed/request";
import { Button, Col, Row, message, Modal } from 'antd';
import 'antd/dist/antd.css';
import React, { useRef, useState, FC } from 'react';
import styled from "styled-components";
import Analyse from './Analyse';
import Score from './Score';
import useAnalyse from './useAnalyse';
import useCtgData from './useCtgData';
import { event } from '@lianmed/utils';
import { fetchCtgExamsPdf } from '../services';
export const ANALYSE_SUCCESS_TYPE = "(●'◡'●)"

const Wrapper = styled.div`
  height:100%;
  .divider {
    border-radius:2px;
    background:linear-gradient(45deg, #e0e0e0, transparent) !important;
    padding-left:20px;
    margin: 8px 0;
  }
  button {
    margin:0 6px 6px 0
  }
  .bordered {
    border: 1px solid #ddd;
  }
`


export const Ctg_Analyse: FC<{
  onDownload: () => void, docid?: string, note?: string, id?: string, type?: 'default' | 'remote'
  fetalcount?: number,
  gestationalWeek?: string,
  inpatientNO?: string,
  name?: string,
  startdate?: string,
  age?: any
}> = function ({ docid, type = "default", id, note, onDownload = () => { },
  age = 0,
  fetalcount = 0,
  gestationalWeek = '',
  inpatientNO = '',
  name = '',
  startdate = '',
}) {
    note = note ? note : docid
    const { ctgData, loading, setFhr, fetal, setFetal } = useCtgData(note)
    const [disabled, setDisabled] = useState(true)


    const ref = useRef<Suit>(null)

    const {
      responseData,
      MARKS,
      analyse,
      startTime,
      endTime,
      mark, setMark,
      interval, setInterval,
      Fischer_ref,
      Nst_ref,
      Krebs_ref,
      analysis_ref,
      old_ref,

    } = useAnalyse(ref.current, note, fetal, setFhr)

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
      const rightData = analysis_ref.current.getFieldsValue()
      const { wave, diagnosistxt, NST, CST_OCT, ...analyseData } = rightData
      const curData: { [x: string]: number } = d[`${mark}_ref`].current.getFieldsValue()
      const oldData: { [x: string]: number } = old_ref.current[mark] || {}



      const isedit = Object.entries(curData).find(([k, v]) => oldData[k] !== v) ? true : false
      const identify = type === 'default' ? { note } : { id }
      const data = {
        ...identify,
        diagnosis: JSON.stringify({ wave, diagnosistxt, NST, CST_OCT }),
        result: JSON.stringify({
          ...analyseData,
          ...curData,
          isedit
        })
      }

      request.put(type === "default" ? '/ctg-exams-note' : '/serviceorders', { data }).then((r: any) => {
        //TODO: 结果判断
        message.success('保存成功！', 3);
        event.emit(ANALYSE_SUCCESS_TYPE, type == "default" ? note : id)
      })
    }

    const history = () => {
      const data = {
        'note.equals': note
      }


      request.get(`/ctg-exams-criteria`, { params: data }).then(function (r) {
        if (r.length > 0) {
          const diagnosis = r[0].diagnosis;
          let t;
          try {
            const d = JSON.parse(diagnosis) || {}
            t = (
              <div>
                <div>NST：<span>{d.NST}</span></div>
                <div>CST/OCT：<span>{d.CST_OCT}</span></div>
                <div>诊断：<span>{d.diagnosistxt}</span></div>
              </div>
            )
          } catch (error) {
          }
          info(t || '暂无记录');
        }
      })
    }

    const info = (message: any) => {
      Modal.info({
        title: '历史记录',
        content: message,
        onOk() { }
      });
    }
    const btnDisabled = !note || !disabled
    return (
      <Wrapper >
        <div style={{ height: `calc(100% - 420px - 12px)`,minHeight:200, marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' }}>
          <Ctg suitType={1} ref={ref} loading={loading} data={ctgData} />

        </div>
        <Row gutter={12} style={{ height: 420 }}>
          <Col span={12} >
            <Score disabled={disabled}  {...d} fetal={fetal} setFetal={setFetal} ctgData={ctgData} docid={note} v={ref.current} className="bordered" />
            <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
              <Button size="small" style={{ marginBottom: 10 }} onClick={history} disabled={btnDisabled}>历史分析</Button>
              <Button size="small" style={{ marginBottom: 10 }} disabled={!note} onClick={() => setDisabled(!disabled)}>{disabled ? '修改' : '确认'}</Button>
              <Button size="small" style={{ marginBottom: 10 }} type="primary" onClick={analyse} disabled={!note}>评分</Button>
            </div>
          </Col>
          <Col span={12}  >
            <Analyse ref={analysis_ref} />
            <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
              <Button size="small" onClick={() => {
                const rightData = analysis_ref.current.getFieldsValue()
                const { diagnosistxt } = rightData
                fetchCtgExamsPdf({
                  diagnosis: diagnosistxt,
                  docid,
                  end: endTime,
                  start: startTime,
                  age,
                  fetalcount,
                  gestationalWeek,
                  inpatientNO,
                  name,
                  startdate,
                }).then(onDownload)
              }} style={{ marginBottom: 10 }} disabled={btnDisabled}>打印</Button>
              <Button size="small" type="primary" onClick={submit} disabled={btnDisabled}>保存</Button>
            </div>

          </Col>
        </Row>
      </Wrapper>
    );
  }
export default Ctg_Analyse;
