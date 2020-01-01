import { useEffect, MutableRefObject } from 'react';
import ScrollEl from './ScrollEl'
import { getCoordInDocument } from './ScrollEl'
type TResolve = (value: number, isfire?: boolean) => void;


export type TLineTool = { toggleVisibility: () => void, rowline: ScrollEl, setBase: (n: number) => void, addDot: (obj: { width?: number, height?: number, left?: number }) => ScrollEl }
export interface IBarTool {
  watch: (fn: TResolve) => void;
  watchGrab: (fn: TResolve, interval?: number) => void;
  setBarWidth: (width: number) => void;
  setBarLeft?: TResolve;
  createRod?: (name: string) => ScrollEl
  createHLine?: (bg: string) => TLineTool
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

    const boxGrabCb = (e: MouseEvent) => {
      // alert('box click')
      var { x: x1 } = getCoordInDocument(e);
      let temp = x1;
      boxEl.style.cursor = 'grab';
      const fn = function (e) {

        requestAnimationFrame(() => {
          var { x: x2 } = getCoordInDocument(e);
          if (Math.abs(x2 - temp) > dragInterval) {
            resolveGrab(x2 - x1);

            temp = x2;
          }
        });
      };
      document.addEventListener('mousemove', fn)

      document.addEventListener('mouseup', function () {

        //移除鼠标移动事件
        document.removeEventListener('mousemove', fn)
        boxEl.style.cursor = 'auto';
      })
    };
    const boxTouchCb = (e: TouchEvent) => {
      // alert('box touch')
      var { x: x1 } = getCoordInDocument(e);
      let temp = x1;

      const fn = function (e) {

        requestAnimationFrame(() => {
          var { x: x2 } = getCoordInDocument(e as any);

          if (Math.abs(x2 - temp) > dragInterval) {
            resolveGrab(x2 - x1);
            temp = x2;
          }
        });
      }
      document.addEventListener('touchmove', fn)

      document.addEventListener('touchend', function () {

        //移除鼠标移动事件
        document.removeEventListener('touchmove', fn)
        boxEl.style.cursor = 'auto';
      })

    };

    boxEl.addEventListener('mousedown', boxGrabCb);
    boxEl.addEventListener('touchstart', boxTouchCb);

    return () => {

      boxEl.removeEventListener('mousedown', boxGrabCb);
      boxEl.removeEventListener('touchstart', boxTouchCb);

    };
  }, []);
  const g = (): IBarTool => {
    return {
      watch(fn) {
        bar.on('change:x', value => {
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
      createHLine(bg = '#FFCC99') {

        const ins0 = new ScrollEl(wrapper.current, { lockMovementX: true }).setStyles({
          width: '100%',
          background: bg,
          height: '2px',
          cursor: 'n-resize'
        }).on('mousedown', () => {
          document.body.style.cursor = 'n-resize'
        }).on('mouseup', () => {
          document.body.style.cursor = 'auto'
        })
        const ins: ScrollEl[] = []
        return {

          toggleVisibility() {
            ins.forEach(_ => _.toggleVisibility())
            ins0.toggleVisibility()
          },
          rowline: ins0,
          setBase(n: number) {
            ins0.setStyle('bottom', n)
            ins.forEach(i => i.setStyle('bottom', n + ins0.getRect().height))
          },
          addDot({ width = 4, height = 10, left = 0 }) {
            const i = new ScrollEl(wrapper.current, { lockMovementY: true }).setStyles({
              background: 'transparent',
              border: `6px solid transparent`,
              left,
              height: 0
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


export default useScroll;
