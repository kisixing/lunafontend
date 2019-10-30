import React, { useEffect, useRef, useState } from 'react';

import { Suit } from './Suit';
import { IBarTool } from '../ScrollBar/useScroll';
import ScrollBar from '../ScrollBar';
import Ecg from "../Ecg";

interface Iprops extends React.HTMLProps<HTMLDivElement> {
  data: any;
  mutableSuitObject?: { suit: (Suit | any) };
  itemHeight?: number;
  suitType?: 0 | 1 | 2,
  showEcg?: boolean
}

const ResizeObserver = (window as any).ResizeObserver
export default (props: Iprops) => {
  const {
    data,
    mutableSuitObject = { suit: null },
    itemHeight = 0,
    suitType = 0,
    showEcg = false,
    ...others
  } = props
  let barTool: IBarTool;

  const canvasgrid = useRef<HTMLCanvasElement>(null);
  const canvasdata = useRef<HTMLCanvasElement>(null);
  const canvasline = useRef<HTMLCanvasElement>(null);
  const canvasselect = useRef<HTMLCanvasElement>(null);
  const canvasanalyse = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const ctgBox = useRef<HTMLDivElement>(null);

  const [suit, setSuit] = useState<Suit>(null)

  useEffect(() => {

    let instance = (new Suit(
      canvasgrid.current,
      canvasdata.current,
      canvasline.current,
      canvasselect.current,
      canvasanalyse.current,
      ctgBox.current,
      barTool,
      suitType
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
    <div style={{ width: '100%', height: '100%' }} ref={box} {...others}>
      <div style={{ height: `${showEcg ? 70 : 100}%`, minHeight: `calc(100% - 200px)` }} ref={ctgBox}>
        <canvas ref={canvasgrid}>
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas style={{ position: 'absolute', left: '0', top: '0' }} ref={canvasline}>
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas style={{ position: 'absolute', left: '0', top: '0' }} ref={canvasdata}>
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas style={{ position: 'absolute', left: '0', top: '0' }} ref={canvasselect}>
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas style={{ position: 'absolute', left: '0', top: '0' }} ref={canvasanalyse}>
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
      </div>
      {
        showEcg && <div style={{ height: '30%', overflow: 'hidden', maxHeight: 200 }} >
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
