import React, { useRef } from 'react';
import { Canvas, Div, Drawer, IProps } from "../interface";
import useDraw from "../useDraw";
import { DrawEcg } from './DrawEcg';



export default (props: IProps) => {
  const {
    data,
    mutableSuitObject = { suit: null },
    onReady = (s: Drawer) => { },
  } = props
  const box = useRef<Div>(null);
  const canvas = useRef<Canvas>(null);
  const canvasline = useRef<Canvas>(null);
  const canvasmonitor = useRef<Canvas>(null);
  const canvasPle = useRef<Canvas>(null);




  useDraw(data, box, () => {
    let instance = new DrawEcg({
      wrap: box.current,
      canvas: canvas.current,
      canvasline: canvasline.current,
      canvasmonitor: canvasmonitor.current,
      canvasPle: canvasPle.current,
      data
    });
    mutableSuitObject.suit = instance;
    onReady(instance)
    return instance
  })

  const canvasStyles: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // letterSpacing: '1px',
  };

  return (
    <div style={{ position: 'relative', height: '100%' }} ref={box}>
      <canvas id="background" style={canvasStyles} ref={canvas} />
      <canvas id="line" ref={canvasline} style={canvasStyles} />
      <canvas id="monitor" ref={canvasmonitor} style={canvasStyles} />
      <canvas id="ple" ref={canvasPle} style={canvasStyles} />
      {/* {
        !!(showDetail && data && data.ecgdata && data.ecgdata.length && false) && <div style={{ position: 'absolute', right: 0, width: '30%', height: '100%', top: 0, }}>

          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="脉率bpm" span={2}>{data.ecgdata[0]}</Descriptions.Item>
            <Descriptions.Item label="血氧%" span={2}>{data.ecgdata[1]}</Descriptions.Item>
            <Descriptions.Item label="体温℃" span={2}>{data.ecgdata[2]}~{data.ecgdata[3]}</Descriptions.Item>
            <Descriptions.Item label="心率bpm" span={2}>{data.ecgdata[4]}</Descriptions.Item>
            <Descriptions.Item label="呼吸(次/分)" span={2} >{data.ecgdata[5]}</Descriptions.Item>
            <Descriptions.Item span={2} label="血压(SDM)mmHg">{data.ecgdata[6]}</Descriptions.Item>
          </Descriptions>
          <Row gutter={0}>
            <Col span={12} >
              <Gg title="脉率" value={`${ecgData[0] || ''}`} unit="bpm" />
            </Col>
            <Col span={12} >
              <Gg title="血氧" value={`${ecgData[1] || ''}`} unit="%" />
            </Col>
            <Col span={12} >
              <Gg title="体温" value={`${ecgData[2] || ''}~${ecgData[3] || ''}`} unit="℃" />
            </Col>
            <Col span={12} >
              <Gg title="心率" value={`${ecgData[4] || ''}`} unit="bpm" />
            </Col>
            <Col span={12} >
              <Gg title="呼吸" value={`${ecgData[5] || ''}`} unit="次/分" />
            </Col>
            <Col span={12} >
              <Gg title="血压SDM" value={`${ecgData[6] || ''}`} unit="mmHg" />
            </Col>
          </Row>
          <Row gutter={0}>
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
          </Row>
        </div>
      } */}
    </div>
  );
};


