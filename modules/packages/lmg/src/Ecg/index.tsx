import React, { useEffect, useRef, useState } from 'react';

import { DrawEcg } from './DrawEcg';
import { MultiParam, Ple, Tre } from './data';

// import { IBarTool } from '../ScrollBar/useScroll';
// import ScrollBar from '../ScrollBar';


const ResizeObserver = (window as any).ResizeObserver

interface IProps {
  data: any;
  mutableSuitObject?: { suit: (DrawEcg | any) };

}
export default (props: IProps) => {
  const { data, mutableSuitObject = { suit: null } } = props
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasline = useRef<HTMLCanvasElement>(null);
  const canvasmonitor = useRef<HTMLCanvasElement>(null);
  const [suit, setSuit] = useState<DrawEcg>(null)
  // let barTool: IBarTool;
  useEffect(() => {
    let instance = new DrawEcg({
      canvas: canvas.current,
      canvasline: canvasline.current,
      canvasmonitor: canvasmonitor.current,
      MultiParam,
      Ple,
      Tre,
      data
    });
    console.log('ecg', instance)

    setSuit(instance)
    mutableSuitObject.suit = instance;


    let resizeObserver = new ResizeObserver(entries => {
      instance.resize()
    });
    resizeObserver.observe(box.current);


    return () => {
      instance.destroy();
      instance = null
      resizeObserver.disconnect()
      resizeObserver = null
    };
  }, []);



  useEffect(() => {
    suit && suit.init(data)
  }, [data, suit])


  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} ref={box}>
      <div style={{ border: '1px solid black' }}>
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
    </div>
  );
};


