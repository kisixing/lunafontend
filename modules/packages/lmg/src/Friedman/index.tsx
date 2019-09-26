import React, { useEffect, useRef } from 'react';
import { DrawFriedman } from './DrawFriedman';
import ScrollBar from '../ScrollBar';
import { IBarTool } from '../useScroll';

export default () => {
  let barTool: IBarTool;
  const box = useRef<HTMLDivElement>(null);
  const canvas1 = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const draw = new DrawFriedman({
      canvas: canvas1.current,
      canvas2: canvas2.current,
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={box}>
      <div id="pecharts" className="canvasbody">
        <canvas ref={canvas1} id="canvas" width="1200" height="480" className="z2">
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas ref={canvas2} id="canvas2" width="1200" height="480" className="z3">
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
      </div>
      {/* 是否显示事件<input id="showtype" value="1"></input>
      <button onClick={e => {}}></button> */}
      <div>
        <ScrollBar
          box={box}
          getBarTool={tool => {
            barTool = tool;
          }}
        />
      </div>
    </div>
  );
};
