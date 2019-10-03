import { useRef, useEffect, MutableRefObject } from 'react';

// window.onload = function() {
//   mouseScroll(function(delta) {
//     var obj = $('scroll'),
//       current = parseInt(obj.offsetTop) + delta * 10;
//     obj.style.top = current + 'px';
//   });
// };
type TResolve = (value: number) => void;
export interface IBarTool {
  watch: (fn: TResolve) => void;
  watchDrag: (fn: TResolve, interval?:number) => void;
  setBarWidth: (width: number) => void;
  setBarColor?: (color: string) => void;
}
function useScroll(
  setBarLeft: (width: number) => void,
  setBarWidth: (width: number) => void,
  box: MutableRefObject<HTMLElement>
): [React.MutableRefObject<any>, () => IBarTool] {
  const bar = useRef<HTMLElement>(null);
  let resolve: TResolve = () => {};
  let resolveDrag: TResolve = () => {};
  let dragInterval = 10;
  useEffect(() => {
    const barEl = bar.current;
    const boxEl = box.current;

    const wheelCb = function(e: Event | any) {
      e.preventDefault();
      e.stopPropagation();
      var boxRec = boxEl.getBoundingClientRect();
      const barRex = barEl.getBoundingClientRect();
      var { width: boxWidth } = boxRec;
      var { width: barWidth } = barRex;
      var delta = -e.wheelDelta / 120;

      requestAnimationFrame(() => {
        setOffset(
          setBarLeft,
          delta * 30 + parseInt(bar.current.style.left) || 0,
          boxWidth,
          barWidth,
          resolve
        );
      });
    };
    const boxMousedownCb = e => {
      var { x: x1 } = getCoordInDocument(e);
      let temp = x1;

      document.onmousemove = function(e) {
        requestAnimationFrame(() => {
          var { x: x2 } = getCoordInDocument(e);
          if (Math.abs(x2 - temp) > dragInterval) {           
            temp = x2;
            resolveDrag(x2 - x1);
          }
        });
      };

      document.onmouseup = function() {
        //移除鼠标移动事件
        document.onmousemove = null;
      };
    };
    const mousedownCb = e => {
      const barRex = barEl.getBoundingClientRect();
      var { left: barLeft } = barRex;
      var { x } = getCoordInDocument(e);

      var boxRec = boxEl.getBoundingClientRect();
      var { left: boxLeft, width: boxWidth } = boxRec;

      const span = x - barLeft;
      document.onmousemove = function(e) {
        requestAnimationFrame(() => {
          const barRex = barEl.getBoundingClientRect();
          var { width: barWidth } = barRex;

          let offsetLeft = x - (boxLeft + span);
          setOffset(setBarLeft, offsetLeft, boxWidth, barWidth, resolve);
        });
      };

      document.onmouseup = function() {
        //移除鼠标移动事件
        document.onmousemove = null;
      };
    };
    boxEl.addEventListener('wheel', wheelCb);
    barEl.addEventListener('mousedown', mousedownCb);
    boxEl.addEventListener('mousedown', boxMousedownCb);

    return () => {
      boxEl.removeEventListener('wheel', wheelCb);
      barEl.removeEventListener('mousedown', mousedownCb);
      boxEl.removeEventListener('mousedown', boxMousedownCb);
    };
  }, []);
  const g = (): IBarTool => {
    return {
      watch(fn) {
        resolve = fn;
      },
      watchDrag(fn, interval = 10) {
        resolveDrag = fn;
        dragInterval = interval;
      },
      setBarWidth,
      setBarColor(color) {
        bar.current.style.background = color;
      },
    };
  };
  return [bar as any, g];
}
function getCoordInDocument(e: MouseEvent) {
  e = (e as any) || window.event;
  var x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
  var y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
  return { x: x, y: y };
}

function setOffset(
  setBarLeft: (left: number) => void,
  offset: number,
  boxWidth: number,
  barWidth: number,
  resolve
) {
  const distance = boxWidth - barWidth;
  const result = offset <= 0 ? 0 : offset >= distance ? distance : offset;
  setBarLeft(result);
  resolve(result);
}

export default useScroll;
