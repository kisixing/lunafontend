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

export class Suit {

  fhr = [];
  toco = [];
  fm = [];
  fmp = [];
  starttime = '2019-09-26';
  fetalcount = 1;
  type = 0; // 0 实时数据，1 历史数据
  currentdot = 10; //当前实时绘制点
  currentx = 10;
  ctgconfig = {
    normalarea: 'rgb(224,255,255)',
    rule: 'rgba(0,51,102,1)',
    scale: 'rgba(0,0,0,1)',
    primarygrid: 'rgba(144, 159, 180,1)',
    secondarygrid: 'rgba(221, 230, 237,1)',
  };
  width: number;
  canvas1: HTMLCanvasElement;
  context1: CanvasRenderingContext2D;
  canvas2: HTMLCanvasElement;
  context2: CanvasRenderingContext2D;
  canvasline: HTMLCanvasElement;
  contextline: CanvasRenderingContext2D;
  wrap: HTMLElement;
  drawobj: DrawCTG;
  barToll: IBarTool;
  p: P;
  timeout: NodeJS.Timeout;
  constructor(
    canvas1: HTMLCanvasElement,
    canvas2: HTMLCanvasElement,
    canvasline: HTMLCanvasElement,
    width: number,
    height: number,
    barToll: IBarTool
  ) {
    canvas1.width = width;
    canvas1.height = height;
    canvas2.width = width;
    canvas2.height = height;
    canvasline.width = width;
    canvasline.height = height;
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.canvasline = canvasline;
    this.context1 = canvas1.getContext('2d');
    this.context2 = canvas2.getContext('2d');
    this.contextline = canvasline.getContext('2d');
    this.width = width;
    this.barToll = barToll;

  }
  init(data) {
    console.log('init',data);
    /*return 
    for (var i = 0; i < this.fetalcount; i++) {
      this.fhr[i] = [];
    }
    for (var i = 0; i < 100; i++) {
      this.initfhrdata(data);
    }*/
    this.fhr[0] = data.fhr[0];
    this.fhr[1] = data.fhr[1];
    this.toco = data.toco; 
    //this.currentdot = data.
    this.drawobj = new DrawCTG(this);
    this.drawobj.drawgrid(0);
    if (this.type > 0) {
      this.drawobj.drawline(0);
      if (this.toco.length > (this.width * this.width)) {
        this.barToll.setBarWidth(150);
      }
    } else {
      this.barToll.setBarWidth(0);
      this.timerCtg(500);
    }
    this.barToll.watch(value => {
      console.log('change', value);
      this.drawobj.drawgrid(value);
      this.drawobj.drawline(value);
    });

    this.p = new P(20, 0, 6, 428, rulercolor, this); // 竖向选择线
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
    this.drawobj.drawdot(this.currentdot);
    this.currentdot++;
    if (this.currentdot > 1500) {
      this.barToll.setBarWidth(150);
    }
  }

  timerscoll(dely): NodeJS.Timeout {
    let id = setInterval(() => {
      if (!this) {
        clearInterval(id);
      }
      this.movescoll();
    }, dely);
    return id;
  }

  timerCtg(dely): NodeJS.Timeout {
    let id = setInterval(() => {
      if (!this) {
        clearInterval(id);
      }
      this.drawdot();
    }, dely);
    return id;
  }
  onStatusChange(status: boolean): boolean | void {
    return status;
  }
}
