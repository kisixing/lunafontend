import DrawCTG from './DrawCTG';
var rulercolor = 'rgb(67,205,128)';
import { IBarTool } from '../ScrollBar/useScroll';
import { Drawer } from "../interface";
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

let sid = 0;
type Canvas = HTMLCanvasElement;
type Context = CanvasRenderingContext2D;
export class Suit implements Drawer{
  initFlag = false
  sid = sid++;
  log = console.log.bind(console, 'suit', this.sid)

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
  buffersize = 16;
  curr = -16;
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
  interval = 5000;
  timeout: NodeJS.Timeout;
  constructor(
    canvas1: Canvas,
    canvas2: Canvas,
    canvasline: Canvas,
    wrap: HTMLElement,
    barToll: IBarTool,
    type: number
  ) {
    this.log('constructor')

    this.wrap = wrap;
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.canvasline = canvasline;
    this.context1 = canvas1.getContext('2d');
    this.context2 = canvas2.getContext('2d');
    this.contextline = canvasline.getContext('2d');
    this.barToll = barToll;
    this.drawobj = new DrawCTG(this);
    this.type = type
    this.p = new P(20, 0, 6, 428, rulercolor, this); // 竖向选择线
    // this.resize();
    this.barToll.watchGrab(value => {
    });
  }
  init(data) {
    this.log('init')
    if (!data || this.initFlag) {
      return
    }
    this.initFlag = true
    let defaultinterval = 500;
    this.data = data;
    this.fetalcount = data.fetal_num;
    for (let i = 0; i < this.fetalcount; i++) {
      this.fhr[i] = data.fhr[i];
      console.log(data);
    }
    this.toco = data.toco;
    this.currentdot = data.index;
    this.drawobj.drawgrid(0);
    if (this.type > 0) {
      //kisi 2019-10-08 不在曲线内处理
      // let json; // 调用方式restful如  api/ctg-exams-data/2_2_190930222541   请求的json数据
      // this.initctgdata(json.fhr1, this.fhr[0]);
      // this.initctgdata(json.fhr2, this.fhr[1]);
      // this.initctgdata(json.fhr3, this.fhr[2]);
      // this.initctgdata(json.toco, this.toco);
      if (this.data.index > this.canvasline.width * 2) {
        this.drawobj.drawdot(this.canvasline.width * 2);
        this.barToll.setBarWidth(100);
        this.barToll.setBarLeft(0, false);
      } else {
        this.drawobj.drawdot(this.data.index);
      }
      this.curr = this.data.index;
    } else {
      this.barToll.setBarWidth(0);
      this.timerCtg(defaultinterval);
    }
    this.barToll.watch(value => {
      //显示历史数据
      this.dragtimestamp = new Date().getTime();
      this.viewposition = Math.floor(this.curr * value / (this.canvasline.width - 100));
      //console.log('scollchange', this.curr ,this.canvasline.width,value,this.viewposition);
      this.drawobj.drawdot(this.viewposition);
    });
    this.barToll.watchGrab(value => {
      this.dragtimestamp = new Date().getTime();
      //方向确认
      if (this.viewposition - value < this.data.index) {
        this.viewposition -= value;
        this.movescoller();
        this.drawobj.drawdot(this.viewposition);
      }
    });
  }
  destroy() {
    this.log('destroy')
    this.intervalIds.forEach(_ => clearInterval(_));
    this.canvas1 = null;
    this.canvas2 = null;
    this.context1 = null;
    this.context2 = null;
    this.canvasline = null;
    this.contextline = null;
    this.p = null;
    this.wrap = null;
    this.drawobj = null;
    this.barToll = null;
  }
  resize() {
    this.log('resize')
    this.drawobj.resize();
  }

  movescoller() { }

  //胎心数据处理
  initctgdata(oridata, arrdata) {
    if (!oridata) {
      return;
    }
    var push_account = oridata.length / 2;
    for (var i = 0; i < push_account; i++) {
      var data_to_push = parseInt(oridata.substring(0, 2), 16);
      arrdata.push(data_to_push);
    }
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
  }

  drawdot() {
    if (this.data.starttime && this.data.starttime != '' && this.data.status == 1 && this.data.index > 0) {
      if (this.curr == -16) {
        this.buffersize = this.data.index - (Math.floor(new Date().getTime() / 1000) - Math.floor(new Date(this.data.starttime).getTime() / 1000)) * 4 - 20;
        console.log(this.data.index, this.buffersize);
      }
      this.curr = (Math.floor(new Date().getTime() / 1000) - Math.floor(new Date(this.data.starttime).getTime() / 1000)) * 4 + this.buffersize;
      this.drawobj.drawdot(this.curr);
      this.viewposition = this.curr;
      if (this.data.index > this.canvasline.width * 2) {
        this.barToll.setBarWidth(100);
        this.barToll.setBarLeft(this.canvasline.width, false);
      }
    } else {
      this.drawobj.showcur(this.data.index + 1);
    }
  }

  timerscoll(dely) {
    let id = setInterval(() => {
      if (!this) {
        clearInterval(id);
      }
      this.movescoll();
    }, dely);
    this.intervalIds.push(id);
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
    this.intervalIds.push(id);
  }
  onStatusChange(status: boolean): boolean | void {
    return status;
  }
}
