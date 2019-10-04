import React, { useEffect, MutableRefObject } from 'react';
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
    box.current.style.cursor = 'pointer';
  }, []);
  return (
    <div style={{ position: 'absolute', width: '100%', bottom: 0 }}>
      <div
        ref={bar}
        style={{
          width: '50px',
          background: '#5c6bc0',
          height: 10,
          borderRadius: 1,
          position: 'absolute',
          bottom: 0,
        }}
      ></div>
    </div>
  );
};
