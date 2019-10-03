import React, { useEffect, useRef, useState } from 'react';

import { Suit } from './Suit';
import { IBarTool } from './ScrollBar/useScroll';
import ScrollBar from './ScrollBar';
export default ({ data,mutableSuitObject={suit:null} }:{data:object,mutableSuitObject?:{suit:Suit}}) => {
  let barTool: IBarTool;
  let suit: Suit
  const canvas1 = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);
  const canvasline = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const instance = new Suit(
      canvas1.current,
      canvas2.current,
      canvasline.current,
      box.current,
      barTool
    );
    suit = instance
    suit.onStatusChange = status => {
      console.log(status);
    };
    suit.init(data)
    mutableSuitObject.suit = suit
    return () => {
      suit.destroy()
    }
  }, []);
  return (
    <div style={{ width: '100%', height: '100%' }} ref={box}>
      <div
        ref={box}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <canvas ref={canvas1} >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas
          style={{ position: 'absolute', left: '0', top: '0' }}
          ref={canvasline}

        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas
          style={{ position: 'absolute', left: '0', top: '0' }}
          ref={canvas2}

        // onMouseDown={e => {
        //   suit && suit.p.OnMouseDown(e.nativeEvent);
        // }}
        // onMouseMove={e => {
        //   suit && suit.p.OnMouseMove(e.nativeEvent);
        // }}
        // onMouseUp={e => {
        //   suit && suit.p.OnMouseUp(e.nativeEvent);
        // }}
        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
      </div>

      <ScrollBar
        box={box}
        getBarTool={tool => {
          barTool = tool;
        }}
      />
    </div>
  );
};
