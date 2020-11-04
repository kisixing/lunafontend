import { Ctg } from '@lianmed/lmg';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import React, { FC, useRef, useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import styled from "styled-components";
import Analyse from './Analyse';
import HistoryList from './HistoryList';
import Score from './Score';
import Toolbar, { IToolbarProps } from './Toolbar';
import useAnalyse, { MARKS } from './useAnalyse';
import { useCtgData } from './useCtgData';
export const ANALYSE_SUCCESS_TYPE = "(●'◡'●)"
export { useCtgData };
// background:linear-gradient(45deg, #e0e0e0, #fff) !important;

const Wrapper = styled.div`
  height:100%;
  .divider {
    // border-radius:2px;
    background:#aaa !important;
    color:#444 !important;
    padding-left:6px;
    margin: 2px 0;
  }
  .divider:not(:first-child){
    margin-top:16px;
  }
  button {
    // margin:0 6px 6px 0
    margin-right:6px;
  }
  .bordered {
    border: 1px solid #ddd;
  }
`
interface IProps {
  onDownload: (url: string) => void,
  docid?: string,
  note?: string,
  id?: string,
  type?: 'default' | 'remote',
  showHistory?: boolean
}

export const Ctg_Analyse: FC<IProps> = function ({ docid, type = "default", id, note, onDownload = (url: string) => { }, showHistory = false }) {
  note = note ? note : docid
  if (!note) return null
  const { ctgData, loading, fetal, setFetal, fetchData } = useCtgData(note, true)
  const [disabled, setDisabled] = useState(true)

  const isRemote = type === 'remote'
  const ref = useRef<Promise<Suit>>()
  const wrap = useRef<HTMLDivElement>(null)
  const {
    reAnalyse,
    startTime,
    endTime,
    mark, setMark,
    interval, setInterval,
    mapFormToMark,
    analysis_ref,
    old_ref,
    analyseLoading,
    initData,
    setFetalCb,
    currentHistory,
    setCurrentHistory,
    historyList,
    fakeHistoryLoading,
    ...o
  } = useAnalyse(ref, note, fetal, ctgData)

  const others = {
    historyList,
    MARKS,
    loading,
    analyseLoading,
    startTime,
    reAnalyse,
    fetchData,
    mark,
    setMark,
    interval,
    setInterval,
    mapFormToMark,
    old_ref,
    showHistory,
  }


  const toolbarProps: IToolbarProps = {
    ...o,
    setDisabled,
    type,
    id,
    onDownload,
    note,
    showHistory,
    mapFormToMark,
    startTime,
    endTime,
    mark,
    analysis_ref,
    old_ref,
    initData,
    currentHistory,
    fetal,
    disabled
  }



  return (
    <Wrapper ref={wrap} >
      <div style={{ height: `calc(100% - 420px - 6px - 40px)`, marginBottom: 6, boxShadow: '#ddd 0px 0px 2px 2px', width: '100%', display: 'flex' }}>
        {
          showHistory && (
            <div style={{ borderLeft: '1px solid #ddd', padding: 2, display: 'flex', flexDirection: 'column' }}>
              <HistoryList historyList={historyList} currentHistory={currentHistory} setCurrentHistory={setCurrentHistory} />
            </div>
          )
        }
        <Ctg style={{ minHeight: 200, overflow: 'hidden', flex: 1 }} suitType={1} ref={ref} loading={loading || fakeHistoryLoading} data={ctgData} />
      </div>
      <Row style={{ flexDirection: `row${showHistory ? '-reverse' : ''}` as any, height: 420, }}>
        <Col className="bordered" span={17} style={{ height: '100%', }} >
          <Score disabled={disabled} endTime={endTime} initData={initData}  {...others} fetal={fetal} setFetal={n => {
            setFetal(n)
            setFetalCb()
          }} ctgData={ctgData} docid={note} />

        </Col>
        <Col span={7} style={{ height: '100%' }} >
          <Analyse ref={analysis_ref} isRemote={isRemote} showHistory={showHistory} />
        </Col>
      </Row>

      <Toolbar  {...toolbarProps} />

    </Wrapper >
  );
}
export default Ctg_Analyse;
