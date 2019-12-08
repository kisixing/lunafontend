import React, { useRef } from 'react';

import { DrawEcg } from './DrawEcg';
import { MultiParam, Ple, Tre } from './data';
import useDraw from "../useDraw";
import { IProps, Canvas, Div, Drawer } from "../interface";




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
    width: '100%',
    height: '100%',
    // letterSpacing: '1px',
  };

  return (
    <div style={{ position: 'relative', height: '100%' }} ref={box}>
      <canvas id="background" style={canvasStyles} ref={canvas} />
      <canvas ref={canvasline} id="line" style={canvasStyles} />
      <canvas ref={canvasmonitor} id="monitor" style={canvasStyles} />
    </div>
  );
};


