import React, { useEffect, useRef } from 'react';
import { DrawPartogram } from './DrawPartogram';
export default () => {
  const box = useRef<HTMLDivElement>(null);
  const canvas1 = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { width, height } = box.current.getBoundingClientRect();
    new DrawPartogram({
      canvas: canvas1.current,
      canvas2: canvas2.current,
      width,
      height,
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={box}>
      <div style={{ position: 'relative', height: 'calc( 100% - 400px )' }}>
        <canvas
          ref={canvas1}
          id="canvas"
          width="1200"
          height="480"
          style={{ position: 'absolute' }}
        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>

        <canvas
          ref={canvas2}
          id="canvas2"
          width="1200"
          height="480"
          style={{ position: 'absolute' }}
        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
      </div>

    </div>
  );
};
