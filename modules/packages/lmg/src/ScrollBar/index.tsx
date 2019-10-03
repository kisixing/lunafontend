import React, { useEffect, useState, MutableRefObject } from 'react';
import useScroll, { IBarTool } from './useScroll';
export default (props: {
  box: MutableRefObject<HTMLElement>;
  getBarTool?: (tool: IBarTool) => void;
}) => {
  const { box, getBarTool = () => {} } = props;
  const [bar, _getBarTool] = useScroll(box);
  getBarTool(_getBarTool());
  useEffect(() => {
    box.current.style.position = 'relative';
  }, []);
  return (
    <div style={{ position: 'absolute', width: '100%', bottom: 0 }}>
      <div
        ref={bar}
        style={{
          width:'50px',
          background: 'rgba(33,150,243,.8)',
          height: 16,
          borderRadius: 2,
          position: 'absolute',
          bottom: 0,
        }}
      ></div>
    </div>
  );
};
