import { EventEmitter } from "@lianmed/utils";
import { Drawer } from "./interface";
let sid = 0;

export default class Draw extends EventEmitter implements Drawer {
    sid = sid++
    width: number
    height: number
    wrap: HTMLElement
    constructor() {
        super()
        console.log('resize', this)
    }
    log = console.log.bind(console, this.constructor.name, this.sid)
    destroy() { }
    init(data: any) { }
    resize() {
        const rect = this.wrap.getBoundingClientRect();
        const { width, height } = rect;
        this.width = width
        this.height = height
        this._resize()
    }
    _resize() {

    }
}