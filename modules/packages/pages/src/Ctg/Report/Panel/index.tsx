import React, { useState } from 'react';
import PreviewContent from './PreviewContent'
import useDiagnosis from "./hooks/useDiagnosis";
import Diagnosis from './Diagnosis'
import TimeSelect from "./TimeSelect";

import { IProps as IP } from "../index";


interface IProps extends IP {
  wh: { w: number, h: number }
  empId?: string
  setFetal: any
  fetal: any
}
const Preview = (props: IProps) => {
  const { wh, empId = null, onDownload, ...others } = props;
  const [pdfBase64, setPdfBase64] = useState('')
  const [t, setT] = useState('')


  const { diagnosis, setDiagnosis } = useDiagnosis(t)
  return (

    <div style={{ display: 'flex', height: '100%' }}>
      <PreviewContent pdfBase64={pdfBase64} wh={wh} onDownload={onDownload} />
      <Diagnosis value={diagnosis} onChange={setDiagnosis} />
      <TimeSelect empId={empId} diagnosis={diagnosis} onTotalChange={setT} onDownload={onDownload} pdfBase64={pdfBase64} setPdfBase64={setPdfBase64}
        fetalcount={props.fetalcount}
        {...others} />
    </div>

  );
}

export default Preview