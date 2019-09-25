import { useRef } from 'react';
const useScroll = () => {
  const bar = useRef(null);
  const scrollBar = useRef(null);
  const box = useRef(null);
  const onMouseDown = (e: MouseEvent) => {
    //鼠标在滚动条中的位置
    //2.2鼠标在页面上移动的时候，滚动条的位置
    document.onmousemove = function(e) {
      var rec = box.current.getClientRects()[0];
      rec;
      var { x, y } = getCoordInDocument(e);
      var { left: rX, width: rWidth } = rec;
      const resX = x - rX;
      const mWidth = bar.current.getClientRects()[0].width;
      const offsetLeft = resX <= 0 ? 0 : resX >= rWidth - mWidth ? rWidth - mWidth : resX;
      console.log(resX, rWidth + mWidth);

      bar.current.style.left = offsetLeft + 'px';
    };
    document.onmouseup = function() {
      //移除鼠标移动事件
      document.onmousemove = null;
    };
  };
  return [bar as any, scrollBar as any, box as any, onMouseDown as any];
};
function getCoordInDocument(e: MouseEvent) {
  e = (e as any) || window.event;
  var x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
  var y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
  return { x: x, y: y };
}
export default useScroll;
