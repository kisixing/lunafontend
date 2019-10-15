import { EventEmitter } from "@lianmed/utils";
export default class ScrollEl extends EventEmitter {
    wrapper: HTMLElement;
    el: HTMLElement;
    constructor(wrapper: HTMLElement) {
        super()
        const el = this.el = document.createElement('div')
        this.wrapper = wrapper;
        el.addEventListener('mousedown', this.moveCb)
        wrapper.append(el)
        el.setAttribute('style', `background:red;position:absolute;user`)

    }
    setStyle(key: string, value: string | number) {
        const keys = ['width', 'height', 'left', 'right', 'top', 'bottom', 'margin']
        this.el.style[key] = String(value) + ((keys.includes(key) && typeof value === 'number') ? 'px' : '')
        return this
    }
    setStyles(styles: { [x: string]: string | number }) {
        Object.keys(styles).forEach(key => {
            this.setStyle(key, styles[key])
        })
        return this
    }
    addEventListener<k extends keyof HTMLElementEventMap>(key: k, cb: (e: HTMLElementEventMap[k]) => void) {
        this.el.addEventListener(key, cb)
        return this
    }
    // maxHeight() {
    //     const rect = this.wrapper.getBoundingClientRect();
    //     var { height } = rect;
    //     this.setStyle('height', height)
    //     this.setStyle('margin-bottom', height)
    //     return this
    // }
    moveCb = (e) => {
        e.stopPropagation();
        const { el, wrapper } = this
        var { x } = this.getCoordInDocument(e);

        const elRex = el.getBoundingClientRect();
        var boxRec = wrapper.getBoundingClientRect();
        var { left: elLeft } = elRex;
        var { left: boxLeft } = boxRec;
        const span = x - elLeft;

        document.onmousemove = (e) => {
            requestAnimationFrame(() => {
                var { x } = this.getCoordInDocument(e);

                let offsetLeft = x - (boxLeft + span);
                this.setOffset(offsetLeft);
            });
        };

        document.onmouseup = function () {
            document.onmousemove = null;
        };
    }
    setOffset(offset: number, isfire = true) {
        const { el, wrapper } = this
        var boxRec = wrapper.getBoundingClientRect();
        const barRex = el.getBoundingClientRect();
        var { width: boxWidth } = boxRec;
        var { width: barWidth } = barRex;
        const distance = boxWidth - barWidth;

        const result = offset <= 0 ? 0 : offset >= distance ? distance : offset;
        if (el.style['left'] != (result + 'px')) {
            this.setStyle('left', result);
            if (isfire) this.emit('change', result);

        }
    }


    getCoordInDocument(e: MouseEvent) {
        e = (e as any) || window.event;
        var x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        var y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        return { x: x, y: y };
    }
}