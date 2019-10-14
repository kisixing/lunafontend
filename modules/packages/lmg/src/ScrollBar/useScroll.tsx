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
      border: '1px solid #4169E1',
      width: 30, height: 6, bottom: 0
    })
    const wheelCb = function (e: Event | any) {
      e.preventDefault();
      e.stopPropagation();

      var delta = -e.wheelDelta / 120;

      requestAnimationFrame(() => {
        bar.setOffset(delta * 30 + parseInt(bar.el.style.left) || 0)
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
    boxEl.addEventListener('wheel', wheelCb);
    boxEl.addEventListener('mousedown', boxGrabCb);

    return () => {
      boxEl.removeEventListener('wheel', wheelCb);
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
      createRod(name) {
        const ins = new ScrollEl(wrapper.current).maxHeight().setStyle('width', 6).setStyle('background', '#4169E1')
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
  return [g];




}
function getCoordInDocument(e: MouseEvent) {
  e = (e as any) || window.event;
  var x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
  var y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
  return { x: x, y: y };
}

export default useScroll;
