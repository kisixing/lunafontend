import React, { useState } from 'react';
import PreviewContent from './PreviewContent'
import useDiagnosis from "./hooks/useDiagnosis";
import Diagnosis from './Diagnosis'
import TimeSelect from "./TimeSelect";

import { IProps as IP } from "../index";


interface IProps extends IP {
  wh: { w: number, h: number }
  empId?: string
}
const Preview = (props: IProps) => {
  const { wh, empId = null, ...others } = props;
  const [pdfBase64, setPdfBase64] = useState('')
  const [t, setT] = useState(0)


  const { diagnosis, setDiagnosis } = useDiagnosis(t)
  return (

    <div style={{ display: 'flex', height: '100%' }}>
      <PreviewContent pdfBase64={pdfBase64} wh={wh} />
      <Diagnosis value={diagnosis} onChange={setDiagnosis} />
      <TimeSelect empId={empId} diagnosis={diagnosis} onTotalChange={setT} pdfBase64={pdfBase64} setPdfBase64={setPdfBase64} {...others} />
    </div>

  );
}

export default Preview