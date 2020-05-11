import React, { useRef } from 'react';

import { DrawEcg } from './DrawEcg';
import { MultiParam, Ple, Tre } from './data';
import useDraw from "../useDraw";
import { IProps, Canvas, Div, Drawer } from "../interface";

import { Descriptions } from "antd";


export default (props: IProps) => {
  const {
    data,
    mutableSuitObject = { suit: null },
    onReady = (s: Drawer) => { },
    ecgHeight
  } = props
  const showDetail = (ecgHeight )>=240
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
    width: showDetail?'80%':'100%',
    height: '100%',
    // letterSpacing: '1px',
  };

  return (
    <div style={{ position: 'relative', height: '100%' }} ref={box}>
      <canvas id="background" style={canvasStyles} ref={canvas} />
      <canvas ref={canvasline} id="line" style={canvasStyles} />
      <canvas ref={canvasmonitor} id="monitor" style={canvasStyles} />
      {
        !!(showDetail && data && data.ecgdata) &&  <div style={{position:'absolute',right:0,width:'20%',height:'100%',top:0,}}>

            <Descriptions  column={2} bordered size="small">
                <Descriptions.Item label="脉率bpm"span={2}>{data.ecgdata[0]}</Descriptions.Item>
                <Descriptions.Item label="血氧%"span={2}>{data.ecgdata[1]}</Descriptions.Item>
                <Descriptions.Item label="体温℃" span={2}>{data.ecgdata[2]}~{data.ecgdata[3]}</Descriptions.Item>
                <Descriptions.Item label="心率bpm"span={2}>{data.ecgdata[4]}</Descriptions.Item>
                <Descriptions.Item label="呼吸(次/分)" span={2} >{data.ecgdata[5]}</Descriptions.Item>
                <Descriptions.Item span={2} label="血压(SDM)mmHg">{data.ecgdata[6]}</Descriptions.Item>
            </Descriptions>
        </div>
      }
    </div>
  );
};


