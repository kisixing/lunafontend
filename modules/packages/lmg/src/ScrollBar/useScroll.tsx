import { useEffect, MutableRefObject } from 'react';
import ScrollEl from './ScrollEl'

type TResolve = (value: number, isfire?: boolean) => void;

export interface IBarTool {
  watch: (fn: TResolve) => void;
  watchGrab: (fn: TResolve, interval?: number) => void;
  setBarWidth: (width: number) => void;
  setBarLeft?: TResolve;
  createRod?: (name: string) => ScrollEl
  createHLine?: (name: string) => { rowline: ScrollEl, setBase: (n: number) => void, addDot: (obj: { width?: number, height?: number, left?: number }) => ScrollEl }
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

    bar = new ScrollEl(wrapper.current, { lockMovementY: true }).setStyles({
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
    // const boxTouchCb = e => {
    //   var { x: x1 } = getCoordInDocument(e);
    //   let temp = x1;
    //   boxEl.style.cursor = 'grab';
    //   document.ontouchmove = function (e) {
    //     requestAnimationFrame(() => {
    //       var { x: x2 } = getCoordInDocument(e as any);
    //       if (Math.abs(x2 - temp) > dragInterval) {
    //         resolveGrab(x2 - x1);
    //         temp = x2;
    //       }
    //     });
    //   };

    //   document.onmouseup = function () {
    //     //移除鼠标移动事件
    //     document.onmousemove = null;
    //     boxEl.style.cursor = 'auto';
    //   };
    // };

    boxEl.addEventListener('mousedown', boxGrabCb);
    // boxEl.addEventListener('touchstart', boxTouchCb);

    return () => {

      boxEl.removeEventListener('mousedown', boxGrabCb);
      // boxEl.removeEventListener('touchstart', boxTouchCb);

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

      setBarLeft: bar.setLeft.bind(bar),
      createRod(name, bg = '#aaa') {
        const ins = new ScrollEl(wrapper.current, { lockMovementY: true }).setStyles({
          width: 4,
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
              <div style="margin-left:-8px; margin-top:-1px;width: 0; height: 0; border: 10px solid; border-color: ${bg} transparent transparent transparent"></div>
          `
        return ins
      },
      createHLine(name, bg = '#aaa') {

        const ins0 = new ScrollEl(wrapper.current, { lockMovementX: true }).setStyles({
          width: '100%',
          background: bg,
          height: '2px',
        })
        const ins = []
        return {
          rowline: ins0,
          setBase(n: number) {
            ins0.setStyle('bottom', n)
            ins.forEach(i => i.setStyle('bottom', n + ins0.getRect().height))
          },
          addDot({ width = 4, height = 10, left = 0 }) {
            const i = new ScrollEl(wrapper.current, { lockMovementY: true }).setStyles({
              width,
              background: bg,
              height,
              left,
            })
            ins.push(i)
            ins0.mates.push(i)
            return i
          }
        }
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
