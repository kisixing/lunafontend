import React, { useEffect, MutableRefObject,useRef } from 'react';
import useScroll, { IBarTool } from './useScroll';
export default (props: {
  box: MutableRefObject<HTMLElement>;
  getBarTool?: (tool: IBarTool) => void;
}) => {
  const wrapper = useRef(null)

  const { box, getBarTool = () => { } } = props;
  const [ _getBarTool] = useScroll(box,wrapper);
  useEffect(() => {
    getBarTool(_getBarTool());
    box.current.style.position = 'relative';
    // box.current.style.cursor = 'pointer';grab
  }, []);
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', bottom: 0 }} ref={wrapper}>

    </div>
  );
};
