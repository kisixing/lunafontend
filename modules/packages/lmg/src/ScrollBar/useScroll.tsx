import { useRef, useEffect, MutableRefObject } from 'react';

// window.onload = function() {
//   mouseScroll(function(delta) {
//     var obj = $('scroll'),
//       current = parseInt(obj.offsetTop) + delta * 10;
//     obj.style.top = current + 'px';
//   });
// };
type TResolve = (value: number, isfire?: boolean) => void;

export interface IBarTool {
  watch: (fn: TResolve) => void;
  watchGrab: (fn: TResolve, interval?: number) => void;
  setBarWidth: (width: number) => void;
  setBarColor?: (color: string) => void;
  setBarLeft?: TResolve;
}

function useScroll(
  box: MutableRefObject<HTMLElement>
): [React.MutableRefObject<any>, () => IBarTool] {
  const bar = useRef<HTMLElement>(null);
  let resolve: TResolve = () => {};
  let resolveGrab: TResolve = () => {};
  let dragInterval = 10;
  useEffect(() => {
    const barEl = bar.current;
    const boxEl = box.current;

    const wheelCb = function(e: Event | any) {
      e.preventDefault();
      e.stopPropagation();

      var delta = -e.wheelDelta / 120;

      requestAnimationFrame(() => {
        setOffset(delta * 30 + parseInt(bar.current.style.left) || 0);
      });
    };
    const boxMousedownCb = e => {
      var { x: x1 } = getCoordInDocument(e);
      let temp = x1;
      boxEl.style.cursor = 'grab';
      document.onmousemove = function(e) {
        requestAnimationFrame(() => {
          var { x: x2 } = getCoordInDocument(e);
          if (Math.abs(x2 - temp) > dragInterval) {
            resolveGrab(x2 - x1);
            temp = x2;
          }
        });
      };

      document.onmouseup = function() {
        //移除鼠标移动事件
        document.onmousemove = null;
        boxEl.style.cursor = 'auto';
      };
    };
    const mousedownCb = e => {
      e.stopPropagation();
      const barRex = barEl.getBoundingClientRect();
      var { left: barLeft } = barRex;
      var { x } = getCoordInDocument(e);

      var boxRec = boxEl.getBoundingClientRect();
      var { left: boxLeft } = boxRec;

      const span = x - barLeft;
      document.onmousemove = function(e) {
        requestAnimationFrame(() => {
          var { x } = getCoordInDocument(e);

          let offsetLeft = x - (boxLeft + span);
          setOffset(offsetLeft);
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
      watchGrab(fn, interval = 10) {
        resolveGrab = fn;
        dragInterval = interval;
      },
      setBarWidth(width: number) {
        setBar('width', width);
      },
      setBarColor(color) {
        bar.current.style.background = color;
      },
      setBarLeft: setOffset,
    };
  };
  return [bar as any, g];

  function setOffset(offset: number, isfire = true) {
    const barEl = bar.current;
    const boxEl = box.current;
    var boxRec = boxEl.getBoundingClientRect();
    const barRex = barEl.getBoundingClientRect();
    var { width: boxWidth } = boxRec;
    var { width: barWidth } = barRex;
    const distance = boxWidth - barWidth;
    const result = offset <= 0 ? 0 : offset >= distance ? distance : offset;
    if(barEl.style['left'] != (result+'px')){
      setBar('left', result);
      if (isfire) resolve(result);
    }
  }

  function setBar(key: string, value: number) {
    const barEl = bar.current;
    barEl.style[key] = value + 'px';
  }
}
function getCoordInDocument(e: MouseEvent) {
  e = (e as any) || window.event;
  var x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
  var y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
  return { x: x, y: y };
}

export default useScroll;
