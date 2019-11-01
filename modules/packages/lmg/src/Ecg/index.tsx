import React, { useRef } from 'react';

import { DrawEcg } from './DrawEcg';
import { MultiParam, Ple, Tre } from './data';
import useDraw from "../useDraw";



interface IProps extends React.HTMLProps<HTMLElement> {
  data: any;
  mutableSuitObject?: { suit: (DrawEcg | any) };
}
export default (props: IProps) => {
  const { data, mutableSuitObject = { suit: null } } = props
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasline = useRef<HTMLCanvasElement>(null);
  const canvasmonitor = useRef<HTMLCanvasElement>(null);

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


