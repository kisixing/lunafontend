import React, { useEffect, useRef, useState } from 'react';

import { Suit } from './Suit';
import { IBarTool } from '../ScrollBar/useScroll';
import ScrollBar from '../ScrollBar';
import Ecg from "../Ecg";
const ResizeObserver = (window as any).ResizeObserver
export default ({
  data,
  mutableSuitObject = { suit: null },
  itemHeight = 0,
  type = 0,
  showEcg = false
}: {
  data: any;
  mutableSuitObject?: { suit: (Suit | any) };
  itemHeight?: number;
  type?: 0 | 1,
  showEcg?: boolean
}) => {
  let barTool: IBarTool;

  const canvas1 = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);
  const canvasline = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const ctgBox = useRef<HTMLDivElement>(null);

  const [suit, setSuit] = useState<Suit>(null)

  useEffect(() => {

    let instance = (new Suit(
      canvas1.current,
      canvas2.current,
      canvasline.current,
      ctgBox.current,
      barTool,
      type
    ))
    instance.onStatusChange = status => {
      console.log(status);
    };
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
    <div style={{ width: '100%', height: '100%' }} ref={box}>
      <div style={{ height: `${showEcg ? 70 : 100}%`,minHeight:`calc(100% - 200px)` }} ref={ctgBox}>
        <canvas ref={canvas1}>
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas style={{ position: 'absolute', left: '0', top: '0' }} ref={canvasline}>
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas
          style={{ position: 'absolute', left: '0', top: '0' }}
          ref={canvas2}

        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
      </div>
      {
        showEcg && <div style={{ height: '30%',overflow:'hidden',maxHeight:200 }} >
          <Ecg data={data} />
        </div>
      }
      <ScrollBar
        box={box}
        getBarTool={tool => {
          barTool = tool;
        }}
      />
    </div>
  );
};
