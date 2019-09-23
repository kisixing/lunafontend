import React, { useEffect, useRef } from 'react';
import data from './data';
import { btnaudiopause, btnaudioplay, init, draw8, initDom, handleServiceData } from './test';
export default () => {
  const audio = useRef(null);
  console.log(data);
  useEffect(() => {
    handleServiceData(data);
    initDom();
    draw8();
    init();
  }, []);
  return (
    <div>
      <div className="tlts">
        <h4 id="curtitle">CTG</h4>
        <button
          type="button"
          id="btnpause"
          className="btn btn-primary btn-xs"
          onClick={btnaudiopause}
        >
          <i className="glyphicon glyphicon-pause"></i>
        </button>
        <button
          type="button"
          id="btnplay"
          className="btn btn-primary btn-xs"
          onClick={btnaudioplay}
          style={{ left: '300px' }}
        >
          <i className="glyphicon glyphicon-play"></i>
        </button>
      </div>
      <div id="pecharts" className="canvasbody">
        <canvas id="canvas" width="1500" height="430" className="z2">
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
        <canvas id="canvas2" width="1500" height="430" className="z3">
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
      </div>
      <audio ref={audio} src="out.wav" id="audio"></audio>
    </div>
  );
};
