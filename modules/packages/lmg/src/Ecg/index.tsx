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


  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} ref={box}>
      <canvas
        id="background"
        width="500"
        height="200"
        style={{ marginLeft: 20 }}
        ref={canvas}
      ></canvas>
      <canvas
        ref={canvasline}
        id="line"
        width="500"
        height="200"
        style={{ marginLeft: 20, position: 'absolute', left: 0, top: '0' }}
      ></canvas>
      <canvas
        ref={canvasmonitor}
        id="monitor"
        width="500"
        height="200"
        style={{ marginLeft: 770, position: 'absolute', left: 0, top: '0' }}
      ></canvas>
    </div>
  );
};


