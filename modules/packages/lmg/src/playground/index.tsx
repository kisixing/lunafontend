import React, { useEffect } from 'react';
import { drawecg, ecg } from './a';

export default () => {
  useEffect(() => {
    drawecg();
    ecg();
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      <div className="boack">
        <canvas id="background" width="1150" height="300" style={{ marginLeft: 20 }}></canvas>
      </div>
      <div
        className="boack"
        style={{ position: 'absolute', left: 0, top: 50, width: 1000, height: 1300 }}
      >
        <canvas id="line" width="1150" height="300" style={{ marginLeft: 20 }}></canvas>
      </div>
    </div>
  );
};
