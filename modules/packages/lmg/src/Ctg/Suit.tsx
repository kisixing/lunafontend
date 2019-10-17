import DrawCTG from './DrawCTG';
var rulercolor = 'rgb(67,205,128)';
import { IBarTool } from '../ScrollBar/useScroll';
import { Drawer } from "../interface";
import ScrollEl from '../ScrollBar/ScrollEl';
import { EventEmitter } from '@lianmed/utils'
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
    //context2.clearRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    context2.strokeStyle = this.color;
    context2.strokeRect(this.x, this.y, this.w, this.h);
    console.log(this.x, this.y, this.w, this.h);
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
export class Suit extends EventEmitter implements Drawer {
  initFlag = false
  sid = sid++;
  log = console.log.bind(console, 'suit', this.sid)
  startingBar: ScrollEl;
  endingBar: ScrollEl;
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
    selectarea: 'rgba(192,192,192,0.5)',
    rule: 'rgba(0,51,102,1)',
    scale: 'rgba(0,0,0,1)',
    primarygrid: 'rgba(144, 159, 180,1)',
    secondarygrid: 'rgba(221, 230, 237,1)',
  };
  selectstart = 0;// 选择开始点
  selectrpstart = 0;// 相对开始位置
  width: number;
  canvas1: Canvas;
  context1: Context;
  canvas2: Canvas;
  context2: Context;
  canvasline: Canvas;
  contextline: Context;
  canvasalarm: Canvas;
  contextalarm: Context;
  wrap: HTMLElement;
  drawobj: DrawCTG;
  barTool: IBarTool;
  p: P;
  dragtimestamp = 0;
  interval = 5000;
  timeout: NodeJS.Timeout;
  constructor(
    canvas1: Canvas,
    canvas2: Canvas,
    canvasline: Canvas,
    canvasalarm: Canvas,
    wrap: HTMLElement,
    barTool: IBarTool,
    type: number
  ) {
    super()
    this.wrap = wrap;
    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.canvasline = canvasline;
    this.canvasalarm = canvasalarm;
    this.context1 = canvas1.getContext('2d');
    this.context2 = canvas2.getContext('2d');
    this.contextline = canvasline.getContext('2d');
    this.contextalarm = canvasalarm.getContext('2d');
    this.barTool = barTool;
    this.drawobj = new DrawCTG(this);
    this.type = type
    this.p = new P(20, 0, 6, 428, rulercolor, this); // 竖向选择线
    // this.resize();
    this.barTool.watchGrab(value => {
    });
    this.on('suit:receive', value => {
      //更新状态 this.log(value);
      this.startingBar.toggleVisibility();
      this.endingBar.toggleVisibility();
      console.log(this.selectstart,this.curr);
      this.drawobj.showselect(this.selectrpstart,this.curr);
    })
  }
  emitSomething(value) {
    this.emit('suit:startTime', value)
  }
  init(data) {
    if (!data) {
      return
    }
    this.log('init')
    this.initFlag = true
    let defaultinterval = 500;
    this.data = data;
    this.fetalcount = data.fetal_num;
    for (let i = 0; i < this.fetalcount; i++) {
      this.fhr[i] = data.fhr[i];
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
        this.curr = this.canvasline.width * 2;
        //console.log(this.canvasline.width * 2, this.data.index);
        this.barTool.setBarWidth(100);
        this.barTool.setBarLeft(0, false);
      } else {
        this.drawobj.drawdot(this.data.index);
        this.curr = this.data.index;
      }
      this.viewposition = this.curr;
      this.createBar();
    } else {
      this.barTool.setBarWidth(0);
      this.timerCtg(defaultinterval);
    }
    this.barTool.watch(value => {
      //显示历史数据
      this.dragtimestamp = new Date().getTime();
      if (this.curr > this.canvasline.width * 4) {
        this.viewposition = this.canvasline.width * 2 + Math.floor((this.curr - this.canvasline.width * 2) * value / (this.canvasline.width - 100));
      } else {
        this.viewposition = value + this.curr;
      }
      console.log('scollchange', value, this.curr, this.canvasline.width, value, this.viewposition);
      if (this.viewposition < this.canvasline.width * 2) {
        this.drawobj.drawdot(this.canvasline.width * 2);
        return;
      }
      this.drawobj.drawdot(this.viewposition);
    });
    this.barTool.watchGrab(value => {
      if (this.data.index < this.canvasline.width * 2) {
        return;
      }
      this.dragtimestamp = new Date().getTime();
      //判断开始点
      if (this.viewposition - value < this.canvasline.width * 2) {
        this.drawobj.drawdot(this.canvasline.width * 2);
        return;
      }
      //方向确认
      if (this.viewposition - value < this.data.index) {
        this.viewposition -= value;
        this.movescoller();
        this.drawobj.drawdot(this.viewposition);
      }
    });
  }
  createBar() {
    if (this.startingBar && this.endingBar) {
      return
    }
    const { barTool } = this
    const startingBar = this.startingBar = barTool.createRod('开始')
    const endingBar = this.endingBar = barTool.createRod('结束')

    startingBar.setOffset(20)
    endingBar.setOffset(100)
    endingBar.toggleVisibility()
    startingBar.on('change', value => {
      this.selectrpstart = value;
      console.log('开始', value,this.viewposition,this.canvasline.width);
      if(this.viewposition>this.canvasline.width*2){
        this.selectstart = value + this.viewposition - 2*this.canvasline.width;
      }else{
        this.selectstart = value;
      }
      this.emitSomething(this.selectstart)
    })
    endingBar.on('change', value => console.log('结束', value))
  }
  lockStartingBar(status: boolean) {
    console.log('lockStartingBar', status)
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
    this.barTool = null;
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
      if (isNaN(this.data.csspan))
        return;
      this.curr = (Math.floor(new Date().getTime() / 1000) - Math.floor(new Date(this.data.starttime).getTime() / 1000)) * 4 + this.data.csspan;
      if(this.curr <0)
        return;
      this.drawobj.drawdot(this.curr);
      this.viewposition = this.curr;
      //console.log(this.curr,this.data.index);
      if (this.data.index > this.canvasline.width * 2) {
        if (this.data.index < this.canvasline.width * 4) {
          let len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
          this.barTool.setBarWidth(len);
        } else {
          this.barTool.setBarWidth(100);
        }
        this.barTool.setBarLeft(this.canvasline.width, false);
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
