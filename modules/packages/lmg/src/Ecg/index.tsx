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

    </div>
  );
};


