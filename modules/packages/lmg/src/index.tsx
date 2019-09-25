import React, { useEffect, useRef, MutableRefObject, useState } from 'react';
import fakeData from './data';
import { Suit } from './Suit';
// import { Button } from 'antd';
export default ({ data }) => {
  data = data || fakeData;
  // console.log(data);
  const audio: MutableRefObject<any> = useRef(null);
  const canvas1 = useRef(null);
  const canvas2 = useRef(null);
  const title = useRef(null);
  const wrap = useRef(null);
  // const [playStatus, setPlayStatus] = useState(false);

  const [suit, setSuit] = useState(null as Suit);

  useEffect(() => {
    const instance = new Suit(
      data,
      audio.current,
      canvas1.current,
      canvas2.current,
      title.current,
      wrap.current
    );
    setSuit(instance);
    instance.onStatusChange = status => {
      console.log(status);
      // setPlayStatus(status);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <div>
        <h4 ref={title}>CTG</h4>

        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => {
              if (playStatus) {
                suit.btnaudiopause();
              } else {
                suit.btnaudioplay();
              }
            }}
            icon={playStatus ? 'pause' : 'caret-right'}
          ></Button>
        </div>
      </div> */}
      <div ref={wrap} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <canvas ref={canvas1} width="1500" height="430">
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
      <audio ref={audio} src="out.wav"></audio>
    </div>
  );
};
