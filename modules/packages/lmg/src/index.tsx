import React, { useEffect, useRef, MutableRefObject, useState } from 'react';
import fakeData from './data';
import { Suit } from './Suit';
import { Button } from 'antd';
import useScroll from './useScroll';
export default ({ data, showBtn = false }) => {
  data = data || fakeData;
  // console.log(data);
  const canvas1 = useRef(null);
  const canvas2 = useRef(null);
  const canvasline = useRef(null);
  const title = useRef(null);
  const wrap = useRef(null);
  const [playStatus, setPlayStatus] = useState(false);

  const [suit, setSuit] = useState(null as Suit);
  const [bar, scrollBar, box, onMouseDown] = useScroll();
  useEffect(() => {
    const rect = wrap.current.getBoundingClientRect();
    const { width, height } = rect;
    const instance = new Suit(
      data,
      canvas1.current,
      canvas2.current,
      canvasline.current,
      title.current,
      width,
      height
    );
    setSuit(instance);
    instance.onStatusChange = status => {
      console.log(status);
      setPlayStatus(status);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }} ref={box}>
      <div
        ref={wrap}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <canvas ref={canvas1} width="1500" height="430">
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas
          style={{ position: 'absolute', left: '0', top: '0' }}
          ref={canvasline}
          width="1500"
          height="430"
        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas
          style={{ position: 'absolute', left: '0', top: '0' }}
          ref={canvas2}
          width="1500"
          height="430"
          onMouseDown={e => {
            suit && suit.p.OnMouseDown(e.nativeEvent);
          }}
          onMouseMove={e => {
            suit && suit.p.OnMouseMove(e.nativeEvent);
          }}
          onMouseUp={e => {
            suit && suit.p.OnMouseUp(e.nativeEvent);
          }}
        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
      </div>

      <div ref={scrollBar} style={{ position: 'absolute', width: '100%', bottom: 0 }}>
        <div
          ref={bar}
          style={{ background: 'skyblue', width: 100, height: 10, position: 'absolute' }}
          onMouseDown={onMouseDown}
        ></div>
      </div>
    </div>
  );
};
