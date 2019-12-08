import DrawCTG from './DrawCTG';
//var rulercolor = 'rgb(67,205,128)';
import { IBarTool } from '../ScrollBar/useScroll';
import ScrollEl from '../ScrollBar/ScrollEl';
import request from "@lianmed/request"
import { convertstarttime } from "../services/utils";
import { throttle } from "lodash";
import { ICacheItem } from '../services/WsService';
import Draw from '../Draw';
let sid = 0;
type Canvas = HTMLCanvasElement;
type Context = CanvasRenderingContext2D;
export class Suit extends Draw {
  isOn: boolean
  emitInterval: number
  static option: { [x: string]: string }
  option = Suit.option
  initFlag = false
  sid = sid++;
  log = console.log.bind(console, 'suit', this.sid)
  startingBar: ScrollEl;
  endingBar: ScrollEl;
  intervalIds: NodeJS.Timeout[] = [];
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
  alarm = 0; //报警状态
  ctgconfig = {
    normalarea: 'rgb(224,255,255)',
    selectarea: 'rgba(192,192,192,0.5)',
    rule: 'rgba(0,51,102,1)',
    scale: 'rgba(0,0,0,1)',
    primarygrid: 'rgba(144, 159, 180,1)',
    secondarygrid: 'rgba(221, 230, 237,1)',
    fhrcolor: ['green', 'blue', 'rgb(0,0,0)'],
    tococolor: 'rgb(0,0,0)',
    alarmcolor: 'rgb(255, 1, 1)',
    alarm_enable: true,
    alarm_high: 160,
    alarm_low: 110,
  };
  fetalposition = {
    fhr1: '',
    fhr2: '',
    fhr3: ''
  };
  printlen = 4800;
  selectstart = 0;// 选择开始点
  selectstartposition = 0;// 选择开始相对位置与数据长度无关
  toolbarposition = 0; //滚动条位置，事件更新
  selectrpstart = 0;// 相对开始位置
  selectend = 0;// 选择结束点
  selectrpend = 0;// 相对结束位置
  selectflag = false;
  requestflag = false;
  canvasgrid: Canvas;
  contextgrid: Context;
  canvasdata: Canvas;
  contextdata: Context;
  canvasline: Canvas;
  contextline: Context;
  canvasselect: Canvas;
  contextselect: Context;
  canvasanalyse: Canvas;
  contextanalyse: Context;
  drawobj: DrawCTG;
  barTool: IBarTool;
  dragtimestamp = 0;
  interval = 5000;
  timeout: NodeJS.Timeout;
  constructor(
    canvasgrid: Canvas,
    canvasdata: Canvas,
    canvasline: Canvas,
    canvasselect: Canvas,
    canvasanalyse: Canvas,
    wrap: HTMLElement,
    barTool: IBarTool,
    type: number,
  ) {
    super()
    this.wrap = wrap;
    this.canvasgrid = canvasgrid;
    this.canvasdata = canvasdata;
    this.canvasline = canvasline;
    this.canvasselect = canvasselect;
    this.canvasanalyse = canvasanalyse;
    this.contextgrid = canvasgrid.getContext('2d');
    this.contextdata = canvasdata.getContext('2d');
    this.contextline = canvasline.getContext('2d');
    this.contextselect = canvasselect.getContext('2d');
    this.contextanalyse = canvasanalyse.getContext('2d');
    this.barTool = barTool;
    this.drawobj = new DrawCTG(this);
    this.type = type;
    // this.resize();
    this.barTool.watchGrab(value => {
    });
    if (this.option) {
      this.ctgconfig.tococolor = this.option.tococolor;
      this.ctgconfig.fhrcolor[0] = this.option.fhrcolor1;
      this.ctgconfig.fhrcolor[1] = this.option.fhrcolor2;
      this.ctgconfig.fhrcolor[2] = this.option.fhrcolor3;
      if (this.option.alarm_enable == "0") {
        this.ctgconfig.alarm_enable = false;
      } else {
        this.ctgconfig.alarm_enable = true;
      }
      this.ctgconfig.alarm_enable = true;
      this.ctgconfig.alarm_high = Number(this.option.alarm_high);
      this.ctgconfig.alarm_low = Number(this.option.alarm_low);
    }

  }

  init(data: ICacheItem) {
    if (!data) {
      return
    }
    // this.log('init', data)
    this.initFlag = true
    let defaultinterval = 500;
    this.data = data;
    this.currentdot = data.index;
    if (data.status) {
      this.type = 0
    } else {
      this.type = 1;
      if (typeof (data.index) == 'undefined') {
        this.data = this.InitFileData(data);
      }
    }
    this.createBar();
    this.drawobj.showcur(0, false);
    this.startingBar.setOffset(0);
    if (this.type > 0) {
      //kisi 2019-10-29 测试增加analyse属性
      // console.log(this.data);
      if (this.data.index > this.canvasline.width * 2) {
        this.curr = this.canvasline.width * 2;
        // console.log('type_check', this.canvasline.width, this.canvasline.width * 2, this.data.index);
        if (this.data.index < this.canvasline.width * 4) {
          let len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
          this.barTool.setBarWidth(len);
        } else {
          this.barTool.setBarWidth(100);
        }
        this.barTool.setBarLeft(0, false);
      } else {
        this.barTool.setBarWidth(0);
        this.barTool.setBarLeft(0, false);
        this.curr = this.data.index;
      }
      this.drawobj.drawdot(this.canvasline.width * 2, false);
      this.viewposition = this.curr;
    } else {
      this.timerCtg(defaultinterval);
    }
    this.barTool.watch(value => {
      //显示历史数据
      //kisi 优化拖动赋值
      this.toolbarposition = value;
      //console.log(this.curr,this.viewposition,value,this.canvasline.width ,this.data.index);
      this.dragtimestamp = new Date().getTime();
      let len = 100;
      if (this.data.index < this.canvasline.width * 4) {
        len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
      }
      this.viewposition = this.canvasline.width * 2 + Math.floor((this.data.index - this.canvasline.width * 2) * value / (this.canvasline.width - len));
      if (this.viewposition < this.canvasline.width * 2) {
        this.viewposition = this.canvasline.width * 2;
      }
      this.updateSelectCur();
      this.drawobj.drawdot(this.viewposition, false);
    });
    this.barTool.watchGrab(value => {
      if (this.type == 0 && this.data.past > 0) {
        //console.log('print', this.data,this.selectrpstart, this.selectrpend);
        if (!this.requestflag) {
          this.requestflag = true;
          this.getoffline(this.data.docid, this.data.past);
        }
      }
      if (this.data.index < this.canvasline.width * 2) {
        return;
      }
      this.dragtimestamp = new Date().getTime();
      //判断开始点
      if (this.viewposition - value < this.canvasline.width * 2) {
        this.viewposition = this.canvasline.width * 2;
        this.drawobj.drawdot(this.viewposition, false);
        if (this.selectflag) {
          if (this.selectend == 1) {
            this.endingBar.setOffset(this.canvasline.width - Math.floor((this.viewposition - this.selectrpend) / 2));
          }
          this.drawobj.showselect(this.selectrpstart, this.selectrpend);
        }
        this.updateBarTool();
        return;
      }
      //方向确认
      // console.log('print_drag1', value, this.viewposition, this.selectrpend);
      if (this.viewposition - value < this.data.index) {
        this.viewposition -= value;
        //this.movescoller();
        this.drawobj.drawdot(this.viewposition, false);
      } else {
        this.viewposition = this.data.index;
        this.drawobj.drawdot(this.viewposition, false);
        // console.log('print_drag--', this.viewposition);
      }
      this.updateBarTool();
      if (this.selectflag) {
        // console.log('print_drag2', value, this.viewposition, this.selectrpend, Math.floor((this.viewposition - this.selectrpend)) / 2);
        if (this.selectend == 1 && this.viewposition - this.selectrpend > -2) {
          this.endingBar.setVisibility(true);
          //this.endingBar.setOffset(this.selectrpend / 2);
          this.endingBar.setOffset(this.canvasline.width - Math.floor((this.viewposition - this.selectrpend) / 2));
        } else {
          this.endingBar.setVisibility(false);
        }
        this.drawobj.showselect(this.selectrpstart, this.selectrpend);
      }
    });
  }
  lazyEmit = throttle((type: string, ...args: any[]) => {
    // console.log(`Suit:${type}`)
    this.emit(type, ...args)
    // console.log('alarmtype in',type,this)  
    return true
  }, this.emitInterval || 0)
  // 报警
  alarmOn(alarmType: string = '') {
    this.lazyEmit('alarmOn', alarmType)
  }
  alarmOff(alarmType: string) {
    this.lazyEmit('alarmOff', alarmType)
  }
  createBar() {
    if (this.startingBar && this.endingBar) {
      return
    }
    const { barTool } = this
    const startingBar = this.startingBar = barTool.createRod('')
    const endingBar = this.endingBar = barTool.createRod('结束')
    startingBar.setOffset(0)
    //endingBar.setOffset(100)
    endingBar.toggleVisibility()
    startingBar.on('change', value => {
      this.selectrpstart = value * 2;
      this.selectstartposition = value;
      // console.log('print_开始', value, this.viewposition, this.canvasline.width);
      if (value != 0 && this.type < 1) {
        this.dragtimestamp = new Date().getTime();
      }
      if (this.viewposition > this.canvasline.width * 2) {
        this.selectstart = value * 2 + this.viewposition - 2 * this.canvasline.width;
      } else {
        if (this.type < 1) {
          this.selectstart = value * 2 + this.viewposition - 2 * this.canvasline.width;
        } else {
          this.selectstart = value * 2;
        }
      }
      this.drawobj.showcur(this.selectstart, false);
      this.selectrpstart = this.selectstart;
      this.emit('startTime', this.selectstart)
    })
    endingBar.on('change', value => {
      if (this.data.index < this.canvasline.width * 2) {
        this.selectrpend = value * 2;
      } else {
        this.selectrpend = this.viewposition - (this.canvasline.width - value) * 2;
      }
      if (this.selectrpstart > this.selectrpend) {
        return;
      }
      // console.log('print_结束', value, this.selectrpstart, this.selectrpend)
      this.drawobj.showselect(this.selectrpstart, this.selectrpend);
      this.emit('endTime', this.selectrpend)
    })

    this.on('locking', value => {
      //更新状态
      // console.log('print_locking', value);
      this.selectflag = value;
      if (this.selectflag) {
        this.startingBar.toggleVisibility();
        this.barTool.setBarWidth(0);
        this.selectend = 0;
        //this.endingBar.toggleVisibility();
        // console.log('print_lock', this.selectstart, this.data.index);
        this.selectrpstart = this.selectstart;
        this.selectrpend = this.data.index < this.selectrpstart + this.printlen ? this.data.index : this.selectrpstart + this.printlen
        this.drawobj.showselect(this.selectrpstart, this.selectrpend);
        this.endingBar.setVisibility(false);
        this.emit('endTime', this.selectrpend);
      } else {
        this.startingBar.toggleVisibility();
        //this.endingBar.toggleVisibility();
        this.endingBar.setVisibility(false);
        // console.log(this.selectstart, this.data.index);
        this.drawobj.showselect(0, 0);
      }
    })
      .on('customizing', value => {
        // this.log('customizing', value, this.selectrpend, this.viewposition);
        if (value && this.selectflag) {
          this.selectend = 1;
          if (this.data.index < this.canvasline.width * 2) {
            this.endingBar.setVisibility(true);
            this.endingBar.setOffset(Math.floor(this.viewposition / 2));
          }
          else if (this.viewposition - this.selectrpend >= 0) {
            this.endingBar.setVisibility(true);
            this.endingBar.setOffset(this.canvasline.width - Math.floor((this.viewposition - this.selectrpend) / 2));
          }
        } else {
          this.selectend = 0;
          this.endingBar.setVisibility(false);
        }
      })
      .on('setStartingTime', value => {
        // this.log('setStartingTime', value);

      })
      .on('setEndingTime', value => {
        // this.log('setEndingTime', value);

      })
  }
  lockStartingBar(status: boolean) {
    // console.log('lockStartingBar', status)
  }
  destroy() {
    // this.log('destroy')
    this.intervalIds.forEach(_ => clearInterval(_));
    this.canvasgrid = null;
    this.canvasdata = null;
    this.contextgrid = null;
    this.contextdata = null;
    this.canvasline = null;
    this.contextline = null;
    this.canvasselect = null;
    this.contextselect = null;
    this.canvasanalyse = null;
    this.contextanalyse = null;
    // this.p = null;
    this.wrap = null;
    this.drawobj = null;
    this.barTool = null;
  }
  _resize() {
    // this.log('resize');
    this.drawobj.resize();
  }
  //kisi 2019-11-14 update fhr position
  setfetalposition(fhr1, fhr2, fhr3) {
    
    this.data.fetalposition.fhr1 = fhr1;
    this.data.fetalposition.fhr2 = fhr2;
    this.data.fetalposition.fhr3 = fhr3;
  }
  //kisi 2019-12-08 update fhr position
  // setfetalpositionbyobj(position) {
  //   if (typeof (position.fhr1) != 'undefined') {
  //     this.data.fetalposition.fhr1 = position.fhr1;
  //   }
  //   if (typeof (position.fhr2) != 'undefined') {
  //     this.data.fetalposition.fhr2 = position.fhr2;
  //   }
  //   if (typeof (position.fhr3) != 'undefined') {
  //     this.data.fetalposition.fhr3 = position.fhr3;
  //   }
  // }
  //kisi 2019-11-21 同步移动barTool
  updateBarTool() {
    this.updateSelectCur();
    let len = 100;
    if (this.data.index < this.canvasline.width * 4) {
      len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
    }
    this.toolbarposition = Math.floor((this.canvasline.width - len) * (this.viewposition - this.canvasline.width * 2) / (this.data.index - this.canvasline.width * 2));
    this.barTool.setBarLeft(this.toolbarposition, false);
  }

  updateSelectCur() {
    if (!this.selectflag) {
      if (this.viewposition > this.canvasline.width * 2) {
        this.selectstart = this.selectstartposition * 2 + this.viewposition - 2 * this.canvasline.width;
      } else {
        this.selectstart = this.selectstartposition * 2;
      }
      this.emit('startTime', this.selectstart)
      this.drawobj.showcur(this.selectstart, false);
    }
  }
  movescoller() { }

  //胎心数据处理
  InitFileData(oriobj) {
    let CTGDATA = { fhr: [[], [], []], toco: [], fm: [], fetal_num: 2, index: 0, starttime: '', analyse: { acc: [], dec: [], baseline: [], start: 0, end: 0 } };
    if (oriobj.docid) {
      let pureidarr: string[] = oriobj.docid.split('_');
      let pureid = pureidarr[2]
      CTGDATA.starttime = convertstarttime(pureid)
    }
    if (typeof (oriobj.fetalposition) != 'undefined' && oriobj.fetalposition != null && oriobj.fetalposition != '') {
      let positionobj = JSON.parse(oriobj.fetalposition);
      
      // this.setfetalpositionbyobj(positionobj);
      //console.log(this.fetalposition);
      this.data.fetalposition = positionobj
    }
    Object.keys(oriobj).forEach(key => {
      let oridata = oriobj[key];
      if (!oridata || oridata === '') {
        return false;
      }
      if (key === 'docid') {
        return false;
      }
      if (key === 'analyse') {
        Object.assign(CTGDATA.analyse, formatAnalyseData(oridata))
        return
      }
      if (key === 'fhr1') {
        CTGDATA.index = oridata.length / 2;
      }
      for (let i = 0; i < CTGDATA.index; i++) {
        if (typeof (oridata) != "string" || oridata.length < 2) {
          return;
        }
        let hexBits = oridata.substring(0, 2);
        let data_to_push = parseInt(hexBits, 16);
        if (key === 'fhr1') {
          CTGDATA.fhr[0][i] = data_to_push;
        } else if (key === 'fhr2') {
          CTGDATA.fhr[1][i] = data_to_push;
        } else if (key === 'fhr3') {
          CTGDATA.fhr[2][i] = data_to_push;
        } else if (key === 'toco') {
          CTGDATA.toco[i] = data_to_push;
        } else if (key === 'fm') {
          CTGDATA.fm[i] = data_to_push;
        }
        oridata = oridata.substring(2, oridata.length);
      }
    });
    return CTGDATA;
  }

  //TODO: 增加 断网事件，接收到断网事件后，drawdot 方法停止
  //所有suit的状态位置，隐藏状态
  //
  drawdot() {
    if (this.data.starttime && this.data.starttime != '' && this.data.status == 1 && this.data.index > 0) {
      if (isNaN(this.data.csspan))
        return;
      this.curr = (Math.floor(new Date().getTime() / 1000) - Math.floor(new Date(this.data.starttime).getTime() / 1000)) * 4 + this.data.csspan;
      if (this.curr < 0)
        return;
      this.drawobj.drawdot(this.curr, true);
      this.viewposition = this.curr;
      if (this.data.index > this.canvasline.width * 2) {
        if (this.data.index < this.canvasline.width * 4) {
          let len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
          this.barTool.setBarWidth(len);
        } else {
          this.barTool.setBarWidth(100);
        }
        this.barTool.setBarLeft(this.canvasline.width, false);
      } else {
        this.barTool.setBarWidth(0);
      }
    } else {
      // console.log('status',this.data.status);
      this.alarmOff('');
      this.drawobj.showcur(this.data.index + 2, false);
      this.drawobj.drawdot(this.data.index + 2, false);
    }
  }

  timerCtg(dely) {
    let id = setInterval(() => {
      if (!this) {
        clearInterval(id);
      }
      var curstamp = new Date().getTime();
      if (curstamp - this.dragtimestamp > this.interval) {
        if (this.selectstartposition != 0) {
          this.startingBar.setOffset(0);
        }
        this.drawdot();
      }
    }, dely);
    this.intervalIds.push(id);
  }

  onStatusChange(status: boolean): boolean | void {
    return status;
  }

  getoffline(doc_id: string, offlineend: number) {
    request.get(`/ctg-exams-data/${doc_id}`).then(responseData => {
      // console.log(doc_id, offlineend, responseData, this.data.past);
      if (responseData) {
        this.initfhrdata(responseData, this.data, offlineend);
        this.data.past = 0;
        this.requestflag = false;
      }
    })
  }

  initfhrdata(data, datacache, offindex) {
    Object.keys(data).forEach(key => {
      let oridata = data[key] as string;
      if (!oridata) {
        return;
      }
      for (let i = 0; i < offindex; i++) {
        let hexBits = oridata.substring(0, 2);
        let data_to_push = parseInt(hexBits, 16);
        if (key === 'fhr1') {
          datacache.fhr[0][i] = data_to_push;
        } else if (key === 'fhr2') {
          if (datacache.fhr[1])
            datacache.fhr[1][i] = data_to_push;
        } else if (key === 'fhr3') {
          if (datacache.fhr[2])
            datacache.fhr[2][i] = data_to_push;
        } else if (key === 'toco') {
          datacache.toco[i] = data_to_push;
        } else if (key === "fm") {
          datacache.fm[i] = data_to_push;
        }
        oridata = oridata.substring(2, oridata.length);
      }
    });
  }
}

function formatAnalyseData(obj: { [x: string]: string }) {
  const keys = ['acc', 'baseline', 'dec', 'meanbaseline']
  const arr: [string, number[]][] = Object.entries(obj)
    .filter(([k, v]) => keys.includes(k))
    .map(([k, v]) => {
      v = typeof v === 'string' ? v : ''
      return [k, v.split(',').map(_ => parseInt(_)).filter(_ => !isNaN(_))]
    })
  return {
    ...obj,
    ...arr.reduce((a, [k, v]) => {
      return Object.assign(a, { [k]: v })
    }, {})
  }
}