import { EventEmitter } from "@lianmed/utils";
import { Drawer } from "./interface";
let sid = 0;

export default class Draw extends EventEmitter implements Drawer {
    sid = sid++
    canvas: HTMLCanvasElement
    context2D: CanvasRenderingContext2D
    _width: number
    _height: number

    get width() {
        return this._width
    }
    set width(v: number) {
        this._width = v
        this.canvas && (this.canvas.width = v)
    }
    get height() {
        return this._height
    }
    set height(v: number) {
        this._height = v
        this.canvas && (this.canvas.height = v)
    }

    wrap: HTMLElement
    constructor(wrap: HTMLElement, canvas?: HTMLCanvasElement) {
        super()
        this.wrap = wrap
        this.canvas = canvas
        this.context2D = canvas && canvas.getContext('2d')
        this.autoWH()

    }
    log = console.log.bind(console, this.constructor.name, this.sid)
    destroy() { }
    init(data: any) { }
    resize() {
        this.autoWH()
        this._resize()
    }
    autoWH() {
        const rect = this.wrap ? this.wrap.getBoundingClientRect() : { width: 0, height: 0 };
        const { width, height } = rect;
        console.log('auto 000', width, height)
        this.width = width
        this.height = height
    }
    _resize() {

    }
}