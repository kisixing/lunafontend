import { EventEmitter } from "@lianmed/utils";
import { Drawer } from "./interface";

export default class Draw extends EventEmitter implements Drawer {
    width: number
    height: number
    wrap: HTMLElement
    destroy() { }
    init(data: any) { }
    resize() {
        const rect = this.wrap.getBoundingClientRect();
        const { width, height } = rect;
        this.width = width
        this.height = height
    }
}