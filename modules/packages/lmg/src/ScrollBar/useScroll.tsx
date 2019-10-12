import { useRef, useEffect, MutableRefObject } from 'react';
import ScrollEl from './ScrollEl'
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
  createRod?: (name: string) => ScrollEl
}

function useScroll(
  box: MutableRefObject<HTMLElement>
): [React.MutableRefObject<any>, () => IBarTool] {



  const bar = useRef<HTMLElement>(null);
  let resolve: TResolve = () => { };
  let resolveGrab: TResolve = () => { };
  let dragInterval = 10;


  const moveCbFactory = (el: HTMLElement) => {
    return e => {
      e.stopPropagation();
      const elRex = el.getBoundingClientRect();
      var { left: elLeft } = elRex;
      var { x } = getCoordInDocument(e);

      var boxRec = box.current.getBoundingClientRect();
      var { left: boxLeft } = boxRec;

      const span = x - elLeft;
      document.onmousemove = function (e) {
        requestAnimationFrame(() => {
          var { x } = getCoordInDocument(e);

          let offsetLeft = x - (boxLeft + span);
          setOffset.call(el, offsetLeft);
        });
      };

      document.onmouseup = function () {
        document.onmousemove = null;
      };
    }
  }

  useEffect(() => {
    const barEl = bar.current;
    const boxEl = box.current;

    const wheelCb = function (e: Event | any) {
      e.preventDefault();
      e.stopPropagation();

      var delta = -e.wheelDelta / 120;

      requestAnimationFrame(() => {
        setOffset.call(barEl, delta * 30 + parseInt(bar.current.style.left) || 0);
      });
    };
    const boxGrabCb = e => {
      var { x: x1 } = getCoordInDocument(e);
      let temp = x1;
      boxEl.style.cursor = 'grab';
      document.onmousemove = function (e) {
        requestAnimationFrame(() => {
          var { x: x2 } = getCoordInDocument(e);
          if (Math.abs(x2 - temp) > dragInterval) {
            resolveGrab(x2 - x1);
            temp = x2;
          }
        });
      };

      document.onmouseup = function () {
        //移除鼠标移动事件
        document.onmousemove = null;
        boxEl.style.cursor = 'auto';
      };
    };
    const barMoveCb = moveCbFactory(barEl)
    boxEl.addEventListener('wheel', wheelCb);
    barEl.addEventListener('mousedown', barMoveCb);
    boxEl.addEventListener('mousedown', boxGrabCb);

    return () => {
      boxEl.removeEventListener('wheel', wheelCb);
      barEl.removeEventListener('mousedown', barMoveCb);
      boxEl.removeEventListener('mousedown', boxGrabCb);
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
        setStyle(bar.current, 'width', width);
      },
      setBarColor(color) {
        bar.current.style.background = color;
      },
      setBarLeft: setOffset.bind(bar.current),
      createRod(name) {
        const ins = new ScrollEl(bar.current.parentElement).maxHeight().setStyle('width', 6).setStyle('background','#4169E1')
          ins.el.innerHTML = `
              <span style="user-select:none;position:absolute;bottom:-24px;width:100px;line-height:24px;left:-50px;text-align:center">
              ${name}
              </span>
              <div style="margin-left:-9px;position:absolute; width: 0; height: 0; border: 12px solid; border-color: #4169E1 transparent transparent transparent"></div>
          `
        return ins
      }
    };
  };
  return [bar as any, g];

  function setOffset(offset: number, isfire = true) {
    const boxEl = box.current;
    var boxRec = boxEl.getBoundingClientRect();
    const barRex = this.getBoundingClientRect();
    var { width: boxWidth } = boxRec;
    var { width: barWidth } = barRex;
    const distance = boxWidth - barWidth;
    const result = offset <= 0 ? 0 : offset >= distance ? distance : offset;
    if (this.style['left'] != (result + 'px')) {
      setStyle(this, 'left', result);
      if (isfire) resolve(result);
    }
  }

  function setStyle(el: HTMLElement, key: string, value: number) {
    el.style[key] = value + 'px';
  }
}
function getCoordInDocument(e: MouseEvent) {
  e = (e as any) || window.event;
  var x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
  var y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
  return { x: x, y: y };
}

export default useScroll;
