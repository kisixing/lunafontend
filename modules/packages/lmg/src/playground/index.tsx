import React, { useEffect, useRef } from 'react';
import { DrawEcg } from './a';
import ScrollBar from '../ScrollBar';
import { IBarTool } from '../useScroll';
import { MultiParam, Ple, Tre } from './data';

export default () => {
  let barTool: IBarTool;
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasline = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    new DrawEcg({
      canvas: canvas.current,
      canvasline: canvasline.current,
      MultiParam,
      Ple,
      Tre,
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={box}>
      <div className="boack">
        <canvas
          id="background"
          width="1150"
          height="300"
          style={{ marginLeft: 20 }}
          ref={canvas}
        ></canvas>
      </div>

      <canvas
        ref={canvasline}
        id="line"
        width="1150"
        height="300"
        style={{ marginLeft: 20, position: 'absolute', left: 0, top: 50 }}
      ></canvas>
      <ScrollBar
        box={box}
        getBarTool={tool => {
          barTool = tool;
        }}
      />
    </div>
  );
};
