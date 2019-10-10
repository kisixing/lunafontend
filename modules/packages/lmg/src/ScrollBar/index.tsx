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
    // box.current.style.cursor = 'pointer';grab
  }, []);
  return (
    <div style={{ position: 'absolute', width: '100%', bottom: 0 }}>
      <div
        ref={bar}
        style={{
          width: '50px',
          background: '#ddd',
          border:'1px solid #aaa',
          height: 10,
          borderRadius: 1,
          position: 'absolute',
          bottom: 0,
        }}
      ></div>
    </div>
  );
};
