import DrawCTG from './DrawCTG';
var rulercolor = 'rgb(67,205,128)';
import { IBarTool } from './ScrollBar/useScroll';
export class P {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  isDown: boolean;
  suit: Suit;
  constructor(x: number, y: number, w: number, h: number, color: string, suit: Suit) {
    this.suit = suit;
    this.draw(x, y, w, h, color);
  }
  draw(x: number, y: number, w: number, h: number, color: string) {
    const { context2 } = this.suit;
    context2.clearRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    context2.strokeStyle = this.color;
    context2.strokeRect(this.x, this.y, this.w, this.h);
  }
  OnMouseMove(evt) {
    //timeout = true;
    if (this.isDown) {
      var X = evt.layerX - this.w / 2;
      // var Y = evt.layerY - this.h / 2;
      this.draw(X, 0, 6, 428, rulercolor);
    }
    clearInterval();
  }
  OnMouseDown(evt) {
    var X = evt.layerX;
    var Y = evt.layerY;
    if (X < this.x + this.w && X > this.x) {
      if (Y < this.y + this.h && Y > this.y) {
        this.isDown = true;
      }
    } else {
      this.isDown = true;
    }
  }
  OnMouseUp(evt) {
    this.isDown = false;
    // let seconds = (evt.layerX / 75) * 60;
    {
      this.suit.showcur(evt.layerX, this.suit.fhr[evt.layerX], this.suit.toco[evt.layerX]);
      this.suit.currentx = evt.layerX;
    }
  }
}

let sid = 0
type Canvas = HTMLCanvasElement
type Context = CanvasRenderingContext2D
export class Suit {
  sid:number;
  intervalIds: NodeJS.Timeout[] = [];
  fhr = [];
  toco = [];
  fm = [];
  fmp = [];
  data: any;
  starttime = '2019-09-26';
  fetalcount = 1;
  type = 0; // 0 实时数据，1 历史数据
  currentdot = 10; //当前实时绘制点
  currentx = 10;
  viewposition = 0;
  scollscale = 1;
  ctgconfig = {
    normalarea: 'rgb(224,255,255)',
    rule: 'rgba(0,51,102,1)',
    scale: 'rgba(0,0,0,1)',
    primarygrid: 'rgba(144, 159, 180,1)',
    secondarygrid: 'rgba(221, 230, 237,1)',
  };
  width: number;
  canvas1: Canvas;
  context1: Context;
  canvas2: Canvas;
  context2: Context;
  canvasline: Canvas;
  contextline: Context;
  wrap: HTMLElement;
  drawobj: DrawCTG;
  barToll: IBarTool;
  p: P;
  dragtimestamp = 0;
  interval = 6000;
  timeout: NodeJS.Timeout;
  constructor(
    canvas1: Canvas,
    canvas2: Canvas,
    canvasline: Canvas,
    wrap:HTMLElement,
    barToll: IBarTool,
  ) {
    this.sid = sid++
    this.wrap = wrap
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.canvasline = canvasline;
    this.context1 = canvas1.getContext('2d');
    this.context2 = canvas2.getContext('2d');
    this.contextline = canvasline.getContext('2d');
    this.barToll = barToll;
    this.drawobj = new DrawCTG(this);
    this.p = new P(20, 0, 6, 428, rulercolor, this); // 竖向选择线
    this.drawobj.resize()
  }
  init(data) {
    console.log('init', data);
    let defaultinterval = 500;
    /*return 
    for (var i = 0; i < this.fetalcount; i++) {
      this.fhr[i] = [];
    }
    for (var i = 0; i < 100; i++) {
      this.initfhrdata(data);
    }*/
    this.data = data;
    this.fhr[0] = data.fhr[0];
    this.fhr[1] = data.fhr[1];
    this.toco = data.toco;
    this.currentdot = data.index;
    this.drawobj.drawgrid(0);
    if (this.type > 0) {
      this.drawobj.drawdot(1500);
      if (this.toco.length > (this.width * this.width)) {
        this.barToll.setBarWidth(150);
      }
    } else {
      this.barToll.setBarWidth(0);
      this.timerCtg(defaultinterval);
    }
    this.barToll.watch(value => {
      console.log('scollchange', value);
      //显示静态数据
      this.viewposition = Math.floor(this.scollscale * value);
      this.drawobj.drawdot(this.viewposition);
    });
    this.barToll.watchDrag(value => {
      this.dragtimestamp = new Date().getTime();

      console.log('dragchange', value);
      console.log('viewposition', this.viewposition);
      console.log('index', this.data.index);

      //方向确认
      if (this.viewposition - value < this.data.index) {
        this.viewposition -= value;
        this.movescoller();
        this.drawobj.drawdot(this.viewposition);
      }
    });

    this.resize()
  }
  destroy() {
    this.intervalIds.forEach(_ => clearInterval(_))
    this.canvas1 = null
    this.canvas2 = null
    this.context1 = null
    this.context2 = null
    this.canvasline = null
    this.contextline = null
    this.p = null
    this.wrap = null
    this.drawobj = null
    this.barToll = null
  }
  resize(){
    const {canvas1,canvas2,canvasline,wrap} = this
    const rect = wrap.getBoundingClientRect();
    const { width, height } = rect;
    canvas1.width = width;
    canvas1.height = height;
    canvas2.width = width;
    canvas2.height = height;
    canvasline.width = width;
    canvasline.height = height;
    this.width = width;
  }
  movescoller() {

  }

  initfhrdata(data) {
    // const keys = ['fhr','toco','fmp','fm']
    Object.keys(data).forEach(key => {
      let oridata = data[key] as string;
      if (!oridata) {
        return;
      }
      var push_account = oridata.length / 2;
      for (var i = 0; i < push_account; i++) {
        let hexBits = oridata.substring(0, 2);
        let data_to_push = parseInt(hexBits, 16);
        if (key == 'fhr') {
          for (var fetal = 0; fetal < this.fetalcount; fetal++) {
            this[key][fetal].push(data_to_push);
          }
        } else {
          this[key].push(data_to_push);
        }
        oridata = oridata.substring(2, oridata.length);
      }
    });
  }
  showcur(x, fhr, toco) {
    const { context1 } = this;
    context1.font = 'bold 10px consolas';
    context1.textAlign = 'left';
    context1.textBaseline = 'top';
    context1.font = 'bold 16px arial';
    context1.fillStyle = 'blue';
  }
  movescoll() {
    const { currentx } = this;
    this.p.draw(currentx, 0, 6, 428, rulercolor);
    this.currentx = currentx + 1;
    this.showcur(currentx, this.fhr[currentx], this.toco[currentx]);
  }

  drawdot() {
    this.drawobj.drawdot(this.data.index);
    this.viewposition = this.data.index;
    if (this.data.index > this.canvasline.width) {
      this.barToll.setBarWidth(150);
      this.scollscale = this.data.index / (this.canvasline.width - 150);
    }
  }

  timerscoll(dely) {
    let id = setInterval(() => {
      if (!this) {
        clearInterval(id);
      }
      this.movescoll();
    }, dely);
    this.intervalIds.push(id)
  }

  timerCtg(dely) {
    let id = setInterval(() => {
      if (!this) {
        clearInterval(id);
      }
      var curstamp = new Date().getTime();
      if (curstamp - this.dragtimestamp > this.interval) {
        this.drawdot();
      }
    }, dely);
    this.intervalIds.push(id)
  }
  onStatusChange(status: boolean): boolean | void {
    return status;
  }
}
