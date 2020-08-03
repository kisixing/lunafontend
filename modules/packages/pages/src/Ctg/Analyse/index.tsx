import { Ctg } from '@lianmed/lmg';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import request from "@lianmed/request";
import { Button, Col, Row, message, Modal, Alert, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import React, { useRef, useState, FC } from 'react';
import styled from "styled-components";
import Analyse from './Analyse';
import Score from './Score';
import useAnalyse from './useAnalyse';
import useCtgData from './useCtgData';
import { event } from '@lianmed/utils';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
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
    const { ctgData, loading, fetal, setFetal, fetchData } = useCtgData(note, true)
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
      mapFormToMark,
      analysis_ref,
      old_ref,
      analyseLoading,
      isToShort,
      autoFm,
      setAutoFm,
      autoAnalyse,
      setAutoAnalyse,
      showBase,
      setShowBase,
      initData
    } = useAnalyse(ref, note, fetal, ctgData)

    const others = {
      MARKS,

      startTime,
      mark,
      setMark,
      interval,
      setInterval,
      mapFormToMark,
      old_ref
    }

    const getrRequestData = () => {
      const rightData = analysis_ref.current.getFieldsValue()
      const { wave, diagnosistxt, NST, CST_OCT, ...analyseData } = rightData
      const curData: { [x: string]: number } = others.mapFormToMark[`${mark}_ref`].current.getFieldsValue()
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
          startTime: ref.current.drawAnalyse.analysisData.analysis.start,
          endTime: ref.current.drawAnalyse.analysisData.analysis.end
        }),
        fetalnum: fetal
      }
      return requestData
    }
    const getPrintUrl = (path: string) => {
      const url = `${path}?query=${encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(getrRequestData())))))}`
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
                {
                  d.NST && <div>NST：<span>{d.NST}</span></div>
                }
                {
                  d.CST_OCT && <div>CST/OCT：<span>{d.CST_OCT}</span></div>
                }
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
        <div style={{ height: `calc(100% - 460px - 12px)`, minHeight: 200, marginBottom: 12, background: '#fff', boxShadow: '#ddd 0px 0px 2px 2px', overflow: 'hidden' }}>
          <Ctg suitType={1} ref={ref} loading={loading} data={ctgData} />

        </div>
        <Row style={{ height: 460 }}>
          <Col span={17} >
            <Score disabled={disabled} endTime={endTime} initData={initData}  {...others} fetal={fetal} setFetal={setFetal} ctgData={ctgData} docid={note} v={ref.current} className="bordered" />
            <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
              {isToShort && <Alert message="选段时间过短" style={{ background: 'red', color: '#fff', display: 'inline-block', border: 0, padding: '1px 4px', marginRight: 10 }} />}

              <Button size="small" style={{ marginBottom: 10 }} onClick={history} disabled={btnDisabled}>历史分析</Button>
              <Button size="small" style={{ marginBottom: 10 }} disabled={!note} onClick={() => setDisabled(!disabled)}>{disabled ? '修改评分' : '确认'}</Button>
            </div>
            <Checkbox checked={autoFm} onChange={e => setAutoFm(e.target.checked)} style={{ position: 'absolute', left: 18, bottom: 8 }}>自动胎动</Checkbox>
            <Checkbox checked={autoAnalyse} onChange={e => setAutoAnalyse(e.target.checked)} style={{ position: 'absolute', left: 100, bottom: 8 }}>弹窗时自动分析</Checkbox>
            <Checkbox checked={showBase} onChange={e => setShowBase(e.target.checked)} style={{ position: 'absolute', left: 228, bottom: 8 }}>显示基线</Checkbox>
            <div style={{ position: 'absolute', right: 20, top: 16 }}>
              <Button size="small" type="primary" onClick={fetchData as any} loading={loading} >刷新数据</Button>
              <Button size="small" type="primary" onClick={reAnalyse as any} loading={analyseLoading} disabled={!note || isToShort}>重新分析</Button>
            </div>

          </Col>
          <Col span={7}  >
            <Analyse ref={analysis_ref} />
            <div style={{ position: 'absolute', right: 12, bottom: 0 }}>
              <Button size="small" onClick={() => {
                setPadBase64Loading(true)
                request.get(getPrintUrl('/ctg-exams-analysis-pdf-preview')).then(r => {
                  setVisible(true)
                  setPdfBase64(r.pdfdata)
                }).finally(() => setPadBase64Loading(false))
              }} style={{ marginBottom: 10 }} type="primary" disabled={btnDisabled || !initData} loading={padBase64Loading}>打印预览</Button>
              <Button size="small" type="primary" onClick={submit} disabled={btnDisabled || !initData}>保存</Button>
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
