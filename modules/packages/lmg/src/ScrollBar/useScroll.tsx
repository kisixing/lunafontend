import { useEffect, MutableRefObject } from 'react';
import ScrollEl from './ScrollEl'

type TResolve = (value: number, isfire?: boolean) => void;

export interface IBarTool {
  watch: (fn: TResolve) => void;
  watchGrab: (fn: TResolve, interval?: number) => void;
  setBarWidth: (width: number) => void;
  setBarLeft?: TResolve;
  createRod?: (name: string) => ScrollEl
}

function useScroll(
  box: MutableRefObject<HTMLElement>,
  wrapper: MutableRefObject<HTMLElement>
): [() => IBarTool] {



  let bar: ScrollEl
  let resolveGrab: TResolve = () => { };
  let dragInterval = 10;



  useEffect(() => {
    const boxEl = box.current;

    bar = new ScrollEl(wrapper.current).setStyles({
      background: '#4169E1',
      width: 10, height: 6, bottom: 0
    })

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

    boxEl.addEventListener('mousedown', boxGrabCb);

    return () => {

      boxEl.removeEventListener('mousedown', boxGrabCb);
    };
  }, []);
  const g = (): IBarTool => {
    return {
      watch(fn) {
        bar.on('change', value => {
          fn(value)
        })
      },
      watchGrab(fn, interval = 10) {
        resolveGrab = fn;
        dragInterval = interval;
      },
      setBarWidth(width: number) {
        bar.setStyles({ width })
      },

      setBarLeft: bar.setOffset.bind(bar),
      createRod(name,bg='#aaa') {
        const ins = new ScrollEl(wrapper.current).setStyles({
          width: 6,
          background: bg,
          height: '100%',
          cursor: 'e-resize'
          // 'margin-bottom': '100%'
        }).on('mousedown', () => {
          document.body.style.cursor = 'e-resize'
        }).on('mouseup', () => {
          document.body.style.cursor = 'auto'
        })
        ins.el.innerHTML = `
              <span style="user-select:none;position:absolute;bottom:-24px;width:100px;line-height:24px;left:-50px;text-align:center">
              ${name}
              </span>
              <div style="margin-left:-7px; margin-top:-1px;width: 0; height: 0; border: 10px solid; border-color: ${bg} transparent transparent transparent"></div>
          `
        return ins
      }
    };
  };
  return [g];




}
function getCoordInDocument(e: MouseEvent) {
  e = (e as any) || window.event;
  var x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
  var y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
  return { x: x, y: y };
}

export default useScroll;
