import { Col, Row } from "antd";
import React, { useRef } from 'react';
import { Canvas, Div, Drawer, IProps } from "../interface";
import useDraw from "../useDraw";
import { MultiParam, Ple, Tre } from './data';
import { DrawEcg } from './DrawEcg';

const Gg = (props: { title?: string, value?: any, unit?: string }) => {
  const { title, value, unit } = props
  return (
    <div style={{ display: 'flex', height: '70px', fontWeight: 'bold', fontFamily: 'arial', border: '1px dashed #ccc', borderTop: 'none' }}>
      <div style={{ position: 'absolute', left: 10, top: 0, fontSize: 12 }}>{title}</div>
      <div style={{ flex: 1, fontSize: 48, lineHeight: '74px', textAlign: 'center' }}>{value || ''}</div>
      <div style={{ position: 'absolute', right: 10, bottom: 0, fontSize: 12, }}>{unit}</div>
    </div>
  )
}


export default (props: IProps) => {
  const {
    data,
    mutableSuitObject = { suit: null },
    onReady = (s: Drawer) => { },
    ecgHeight
  } = props
  const showDetail = (ecgHeight) >= 200
  const box = useRef<Div>(null);
  const canvas = useRef<Canvas>(null);
  const canvasline = useRef<Canvas>(null);
  const canvasmonitor = useRef<Canvas>(null);

  useDraw(data, box, () => {
    let instance = new DrawEcg({
      wrap: box.current,
      canvas: canvas.current,
      canvasline: canvasline.current,
      canvasmonitor: canvasmonitor.current,
      MultiParam,
      Ple,
      Tre,
      data
    });
    mutableSuitObject.suit = instance;
    onReady(instance)
    return instance
  })

  const canvasStyles: React.CSSProperties = {
    position: 'absolute',
    width: showDetail ? '70%' : '100%',
    height: '100%',
    // letterSpacing: '1px',
  };

  return (
    <div style={{ position: 'relative', height: '100%' }} ref={box}>
      <canvas id="background" style={canvasStyles} ref={canvas} />
      <canvas ref={canvasline} id="line" style={canvasStyles} />
      <canvas ref={canvasmonitor} id="monitor" style={canvasStyles} />
      {
        !!(showDetail && data && data.ecgdata && data.ecgdata.length) && <div style={{ position: 'absolute', right: 0, width: '30%', height: '100%', top: 0, }}>

          {/* <Descriptions  column={2} bordered size="small">
                <Descriptions.Item label="脉率bpm"span={2}>{data.ecgdata[0]}</Descriptions.Item>
                <Descriptions.Item label="血氧%"span={2}>{data.ecgdata[1]}</Descriptions.Item>
                <Descriptions.Item label="体温℃" span={2}>{data.ecgdata[2]}~{data.ecgdata[3]}</Descriptions.Item>
                <Descriptions.Item label="心率bpm"span={2}>{data.ecgdata[4]}</Descriptions.Item>
                <Descriptions.Item label="呼吸(次/分)" span={2} >{data.ecgdata[5]}</Descriptions.Item>
                <Descriptions.Item span={2} label="血压(SDM)mmHg">{data.ecgdata[6]}</Descriptions.Item>
            </Descriptions> */}
          <Row gutter={0}>
            <Col span={12} >
              <Gg title="脉率" value={`${data.ecgdata[0] || ''}`} unit="bpm" />
            </Col>
            <Col span={12} >
              <Gg title="血氧" value={`${data.ecgdata[1] || ''}`} unit="%" />
            </Col>
            <Col span={12} >
              <Gg title="体温" value={`${data.ecgdata[2] || ''}~${data.ecgdata[3] || ''}`} unit="℃" />
            </Col>
            <Col span={12} >
              <Gg title="心率" value={`${data.ecgdata[4] || ''}`} unit="bpm" />
            </Col>
            <Col span={12} >
              <Gg title="呼吸" value={`${data.ecgdata[5] || ''}`} unit="次/分" />
            </Col>
            <Col span={12} >
              <Gg title="血压SDM" value={`${data.ecgdata[6] || ''}`} unit="mmHg" />
            </Col>
          </Row>
          {/* <Row gutter={0}>
            <Col span={12} >
              <Statistic title="脉率" value={`${data.ecgdata[0]}bpm`} />
            </Col>
            <Col span={12} >
              <Statistic title="血氧" value={`${data.ecgdata[1]}%`} />
            </Col>
            <Col span={12} >
              <Statistic title="体温" value={`${data.ecgdata[2]}~${data.ecgdata[3]}℃`} />
            </Col>
            <Col span={12} >
              <Statistic title="心率" value={`${data.ecgdata[4]}bpm`} />
            </Col>
            <Col span={12} >
              <Statistic title="呼吸" value={`${data.ecgdata[5]}次/分`} />
            </Col>
            <Col span={12} >
              <Statistic title="血压SDM" value={`${data.ecgdata[6]}mmHg`} />
            </Col>
          </Row> */}
        </div>
      }
    </div>
  );
};


