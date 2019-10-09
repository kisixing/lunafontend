import React, { useEffect, useRef } from 'react';
import { DrawEcg } from './DrawEcg';
import { MultiParam, Ple, Tre } from './data';

export default () => {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasline = useRef<HTMLCanvasElement>(null);
  const canvasmonitor = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    new DrawEcg({
      canvas: canvas.current,
      canvasline: canvasline.current,
      canvasmonitor:canvasmonitor.current,
      MultiParam,
      Ple,
      Tre,
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} ref={box}>
      <div  style={{ border:'1px solid black'}}>
        <canvas
          id="background"
          width="750"
          height="200"
          style={{ marginLeft: 20 }}
          ref={canvas}
        ></canvas>
        <canvas
        ref={canvasline}
        id="line"
        width="750"
        height="200"
        style={{ marginLeft: 20, position: 'absolute', left: 0,}}
        ></canvas>
        <canvas
        ref={canvasmonitor}
        id="line"
        width="200"
        height="50"
        style={{ marginLeft: 770, position: 'absolute', left: 0,}}
        ></canvas>
      </div>
    </div>
  );
};
