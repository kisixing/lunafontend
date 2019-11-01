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

  useDraw(() => {
    let instance = new DrawEcg({
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
  }, data, box)


  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} ref={box}>
      <canvas
        id="background"
        width="750"
        height="500"
        style={{ marginLeft: 20 }}
        ref={canvas}
      ></canvas>
      <canvas
        ref={canvasline}
        id="line"
        width="750"
        height="500"
        style={{ marginLeft: 20, position: 'absolute', left: 0, }}
      ></canvas>
      <canvas
        ref={canvasmonitor}
        id="line"
        width="200"
        height="50"
        style={{ marginLeft: 770, position: 'absolute', left: 0, }}
      ></canvas>
    </div>
  );
};


