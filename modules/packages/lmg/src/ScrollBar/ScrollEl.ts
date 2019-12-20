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
    //     const { height } = rect;
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
        const { x, y } = this.getCoordInDocument(e);

        const elRex = el.getBoundingClientRect();
        const boxRec = wrapper.getBoundingClientRect();
        const { left: elLeft, top: elTop } = elRex;
        const { left: boxLeft, top: boxTop } = boxRec;
        const xSpan = x - elLeft;
        const ySpan = y - elTop;

        document.onmousemove = (e) => {
            requestAnimationFrame(() => {
                const { x, y } = this.getCoordInDocument(e);

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
    setPosition(offset: number, isfire = true, direction: 'left' | 'top') {
        const valueKey = direction === 'left' ? 'width' : 'height'

        const { el, wrapper, mates, matesOldRect, oldRect } = this

        mates.forEach((_, i) => _.setPosition(offset + matesOldRect[i][direction] - oldRect[direction], true, direction))

        const boxRec = wrapper.getBoundingClientRect();
        const target = el.getBoundingClientRect();

        const boxValue = boxRec[valueKey]
        const targetValue = target[valueKey]

        const distance = boxValue - targetValue;
        const result = offset <= 0 ? 0 : offset >= distance ? distance : offset;
        if (el.style[direction] !== (result + 'px')) {
            this.setStyle(direction, result);
            isfire && this.emit(`change:${direction === 'left' ? 'x' : 'y'}`, result);
        }
        return this
    }
    setLeft(offset: number, isfire = true) {
        return this.setPosition(offset, isfire, 'left')
    }
    setTop(offset: number, isfire = true) {
        return this.setPosition(offset, isfire, 'top')
    }

    getRect() {
        return this.el.getBoundingClientRect()
    }

    getCoordInDocument(e: MouseEvent) {
        e = (e as any) || window.event;
        const x = e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        const y = e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        return { x: x, y: y };
    }
}