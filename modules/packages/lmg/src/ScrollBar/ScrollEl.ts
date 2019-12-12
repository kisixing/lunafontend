import { EventEmitter } from "@lianmed/utils";
interface IOptions {
    lockMovementX?: boolean
    lockMovementY?: boolean
    mates?: ScrollEl[]

}
export default class ScrollEl extends EventEmitter {
    wrapper: HTMLElement;
    el: HTMLElement;
    lockMovementX: false
    lockMovementY: false
    mates: ScrollEl[] = []
    private matesOldRect: (ClientRect | DOMRect)[] = []
    private oldRect: ClientRect | DOMRect
    constructor(wrapper: HTMLElement, options: IOptions = null) {
        super()
        Object.assign(this, options)
        const el = this.el = document.createElement('div')
        this.wrapper = wrapper;
        el.addEventListener('mousedown', this.moveCb)
        wrapper.appendChild(el)
        el.setAttribute('style', `background:red;position:absolute;user-select:none`)
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
    toggleVisibility() {
        const isHidden = this.el.style.visibility === 'hidden'
        this.setStyle('visibility', isHidden ? 'visible' : 'hidden')
    }
    setVisibility(isHidden) {
        this.setStyle('visibility', isHidden ? 'visible' : 'hidden')
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
        this.emit('mousedown')
        this.matesOldRect = this.mates.map(_ => _.getRect())
        this.oldRect = this.getRect()
        e.stopPropagation();
        const { el, wrapper } = this
        var { x, y } = this.getCoordInDocument(e);

        const elRex = el.getBoundingClientRect();
        var boxRec = wrapper.getBoundingClientRect();
        var { left: elLeft, top: elTop } = elRex;
        var { left: boxLeft, top: boxTop } = boxRec;
        const xSpan = x - elLeft;
        const ySpan = y - elTop;

        document.onmousemove = (e) => {
            requestAnimationFrame(() => {
                var { x, y } = this.getCoordInDocument(e);

                let offsetLeft = x - (boxLeft + xSpan);
                let offsetRight = y - (boxTop + ySpan);
                this.lockMovementX || this.setLeft(offsetLeft);
                this.lockMovementY || this.setTop(offsetRight);
            });
        };

        document.onmouseup = () => {
            this.emit('mouseup')
            document.onmousemove = null;
        };
    }
    setLeft(offset: number, isfire = true) {
        this.mates.forEach((_, i) => _.setLeft(offset + this.matesOldRect[i].left - this.oldRect.left))


        const { el, wrapper } = this
        var boxRec = wrapper.getBoundingClientRect();
        const barRex = el.getBoundingClientRect();
        var { width: boxWidth } = boxRec;
        var { width: barWidth } = barRex;
        const distance = boxWidth - barWidth;
        // const b = this.lockMovementX ? -this.getRect().width : 0
        const result = offset <= 0 ? 0 : offset >= distance ? distance : offset;
        if (el.style['left'] != (result + 'px')) {
            this.setStyle('left', result);
            if (isfire) this.emit('change', result);
            if (isfire) this.emit('change:x', result);
        }
    }
    setTop(offset: number, isfire = true) {
        this.mates.forEach((_, i) => _.setTop(offset + this.matesOldRect[i].top - this.oldRect.top))
        const { el, wrapper } = this
        var boxRec = wrapper.getBoundingClientRect();
        const barRex = el.getBoundingClientRect();
        var { height: boxHeight } = boxRec;
        var { height: barHeight } = barRex;
        const distance = boxHeight - barHeight;
        // const b = this.lockMovementY ? -this.getRect().height : 0

        const result = offset <= 0 ? 0 : offset >= distance ? distance : offset;
        if (el.style['top'] != (result + 'px')) {
            this.setStyle('top', result);
            if (isfire) this.emit('change:y', result);

        }
    }

    getRect() {
        return this.el.getBoundingClientRect()
    }

    getCoordInDocument(e: MouseEvent) {
        e = (e as any) || window.event;
        var x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        var y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        return { x: x, y: y };
    }
}