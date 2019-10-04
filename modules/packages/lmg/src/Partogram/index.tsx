import React, { useEffect, useRef, useState } from 'react';
import { Switch } from 'antd';
import { DrawPartogram } from './DrawPartogram';
export default () => {
  const box = useRef<HTMLDivElement>(null);
  const canvas1 = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);
  const [checked, setChecked] = useState(false);
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
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', height: 'calc( 100% - 65px )' }} ref={box}>
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
      <div style={{ padding: 20 }}>
        <span>
          是否显示事件：
          <Switch
            checked={checked}
            onChange={checked => {
              setChecked(checked);
            }}
          />
        </span>
      </div>
    </div>
  );
};
