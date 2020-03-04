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
    constructor(width: number = 0, height: number = 0, canvas?: HTMLCanvasElement) {
        super()
        this.canvas = canvas
        this.context2D = canvas && canvas.getContext('2d')
        this.width = width
        this.height = height

    }
    log = console.log.bind(console, this.constructor.name, this.sid)
    destroy() { }
    init(data: any) { }
    resize(w = 0, h = 0) {
        const rect = this.wrap ? this.wrap.getBoundingClientRect() : { width: w, height: h };
        const { width, height } = rect;
        this.width = width
        this.height = height
        this._resize()
    }
    _resize() {

    }
}