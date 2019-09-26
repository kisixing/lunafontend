import React, { useEffect, useState, MutableRefObject } from 'react';
import useScroll from './useScroll';
import { IBarTool } from '../useScroll';
export default (props: {
  box: MutableRefObject<HTMLElement>;
  getBarTool: (tool: IBarTool) => void;
}) => {
  const { box, getBarTool = () => {} } = props;
  // console.log(data);
  const [barWidth, setBarWidth] = useState(100);
  const [barLeft, setBarLeft] = useState(0);
  const [bar, _getBarTool] = useScroll(setBarLeft, setBarWidth, box);
  getBarTool(_getBarTool());
  useEffect(() => {
    box.current.style.position = 'relative';
  }, []);
  return (
    <div style={{ position: 'absolute', width: '100%', bottom: 0 }}>
      <div
        ref={bar}
        style={{
          left: barLeft,
          background: 'rgba(33,150,243,.8)',
          width: barWidth,
          height: 16,
          borderRadius: 2,
          position: 'absolute',
          bottom: 0,
        }}
      ></div>
    </div>
  );
};
