import { Ctg } from '@lianmed/lmg';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import request from "@lianmed/request";
import { Button, Col, Row, message, Modal, Alert } from 'antd';
import 'antd/dist/antd.css';
import React, { useRef, useState, FC } from 'react';
import styled from "styled-components";
import Analyse from './Analyse';
import Score from './Score';
import useAnalyse from './useAnalyse';
import useCtgData from './useCtgData';
import { event } from '@lianmed/utils';
import { stringify, parse } from 'qs';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
console.log(' stringify,parse ', stringify, parse)
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
}> = function ({ docid, type = "default", id, note, onDownload = (url: string) => { },
  age = 0,
  fetalcount = 0,
  gestationalWeek = '',
  inpatientNO = '',
  name = '',
  startdate = '',
}) {
    note = note ? note : docid
    if (!note) return null
    const { ctgData, loading, setFhr, fetal, setFetal } = useCtgData(note)
    const [disabled, setDisabled] = useState(true)
    const [visible, setVisible] = useState(false)
    const [pdfBase64, setPdfBase64] = useState('')
    const [padBase64Loading, setPadBase64Loading] = useState(false)

    const ref = useRef<Suit>(null)

    const {
      MARKS,
      reAnalyse,
      startTime,
      endTime,
      mark, setMark,
      interval, setInterval,
      Fischer_ref,
      Nst_ref,
      Krebs_ref,
      analysis_ref,
      old_ref,
      analyseLoading,
      isToShort
    } = useAnalyse(ref, note, fetal, setFhr, ctgData)

    const others = {
      MARKS,

      startTime,
      mark,
      setMark,
      interval,
      setInterval,
      Fischer_ref,
      Nst_ref,
      Krebs_ref,
      old_ref
    }

    const getrRequestData = () => {
      const rightData = analysis_ref.current.getFieldsValue()
      const { wave, diagnosistxt, NST, CST_OCT, ...analyseData } = rightData
      const curData: { [x: string]: number } = others[`${mark}_ref`].current.getFieldsValue()
      const oldData: { [x: string]: number } = old_ref.current[mark] || {}


      const isedit = Object.entries(curData).find(([k, v]) => oldData[k] !== v) ? true : false
      const identify = type === 'default' ? { note } : { id }
      const requestData = {
        ...identify,
        diagnosis: JSON.stringify({ wave, diagnosistxt, NST, CST_OCT }),
        result: JSON.stringify({
          ...analyseData,
          ...curData,
          isedit,
          type: mark,
          startTime,
          endTime
        })
      }
      return requestData
    }
    const getPrintUrl = (path: string) => {
      const url = `${path}?query=${btoa(unescape(encodeURIComponent(JSON.stringify(getrRequestData()))))}`
      console.log('url', url);
      return url
    }

    const submit = () => {

      request.put(type === "default" ? '/ctg-exams-note' : '/serviceorders', { data: getrRequestData() }).then((r: any) => {
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
        <div style={{ height: `calc(100% - 420px - 12px)`, minHeight: 200, marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' }}>
          <Ctg suitType={1} ref={ref} loading={loading} data={ctgData} />

        </div>
        <Row gutter={12} style={{ height: 420 }}>
          <Col span={12} >
            <Score disabled={disabled} endTime={endTime}  {...others} fetal={fetal} setFetal={setFetal} ctgData={ctgData} docid={note} v={ref.current} className="bordered" />
            <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
              {isToShort && <Alert message="选段时间过短" style={{ display: 'inline-block', padding: '1px 4px', marginRight: 10 }} />}

              <Button size="small" style={{ marginBottom: 10 }} onClick={history} disabled={btnDisabled}>历史分析</Button>
              <Button size="small" style={{ marginBottom: 10 }} disabled={!note} onClick={() => setDisabled(!disabled)}>{disabled ? '修改评分' : '确认'}</Button>
            </div>
            <Button style={{ position: 'absolute', right: 12, top: 16 }} size="small" type="primary" onClick={reAnalyse as any} loading={analyseLoading} disabled={!note || isToShort}>重新分析</Button>

          </Col>
          <Col span={12}  >
            <Analyse ref={analysis_ref} />
            <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
              <Button size="small" onClick={() => {
                setPadBase64Loading(true)
                request.get(getPrintUrl('/ctg-exams-analysis-pdf-preview')).then(r => {
                  setVisible(true)
                  setPdfBase64(r.pdfdata)
                }).finally(() => setPadBase64Loading(false))
              }} style={{ marginBottom: 10 }} disabled={btnDisabled} loading={padBase64Loading}>打印预览</Button>
              <Button size="small" type="primary" onClick={submit} disabled={btnDisabled}>保存</Button>
            </div>

          </Col>
        </Row>
        <Modal visible={visible} closable={false} okText="打印" onCancel={() => setVisible(false)} onOk={() => {
          setVisible(false)
          onDownload(getPrintUrl('/ctg-exams-analysis-pdf'))
        }}>
          <Document
            file={pdfBase64 ? `data:application/pdf;base64,${pdfBase64}` : null}
            renderMode="canvas"

          >
            <Page pageNumber={1} scale={0.8} />
          </Document>
        </Modal>
      </Wrapper>
    );
  }
export default Ctg_Analyse;
