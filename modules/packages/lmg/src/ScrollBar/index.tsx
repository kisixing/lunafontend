import React, { useEffect, MutableRefObject } from 'react';
import useScroll, { IBarTool } from './useScroll';
export default (props: {
  box: MutableRefObject<HTMLElement>;
  getBarTool?: (tool: IBarTool) => void;
}) => {
  const { box, getBarTool = () => { } } = props;
  const [bar, _getBarTool] = useScroll(box);

  useEffect(() => {
    getBarTool(_getBarTool());
    box.current.style.position = 'relative';
    // box.current.style.cursor = 'pointer';grab
  }, []);
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', bottom: 0 }}>
      <div
        ref={bar}
        style={{
          width: '5px',
          background: '#4169E1',
          border: '1px solid #4169E1',
          height: 6,
          borderRadius: 1,
          position: 'absolute',
          bottom: 0,
        }}
      >

        {/* <div style={{ marginLeft: '-11px', marginTop: '-1px', float: 'left', width: 0, height: 0, border: '12px solid', borderColor: '#4169E1 transparent transparent transparent' }}></div> */}
        {/* <div style={{ marginLeft: '-11px', marginTop: '370px', float: 'left', width: 100, height: 0 }}>开始</div> */}
      </div>
    </div>
  );
};
