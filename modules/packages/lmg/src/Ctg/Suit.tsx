import DrawCTG from './DrawCTG';
//var rulercolor = 'rgb(67,205,128)';
import { IBarTool, TLineTool } from '../ScrollBar/useScroll';
import ScrollEl from '../ScrollBar/ScrollEl';
import request from '@lianmed/request';
import { convertstarttime } from '../services/utils';
import { throttle } from 'lodash';
import { ICacheItem } from '../services/WsService';
import Draw from '../Draw';
import bindEvents from './bindEvents';
import { DrawAnalyse, AnalyseData } from './DrawAnalyse';
let sid = 0;
type Canvas = HTMLCanvasElement;
type Context = CanvasRenderingContext2D;
export class Suit extends Draw {
  drawAnalyse: DrawAnalyse

  needScroll = false;
  isOn: boolean;
  emitInterval: number;
  static option: { [x: string]: string };
  option = Suit.option;
  initFlag = false;
  sid = sid++;
  log = console.log.bind(console, 'suit', this.sid);
  startingBar: ScrollEl;
  endingBar: ScrollEl;
  selectingBar: ScrollEl;
  rowline: ScrollEl;
  intervalIds: NodeJS.Timeout[] = [];
  data: ICacheItem;
  starttime = '2019-09-26';
  fetalcount = 1;
  type = 0; // 0 实时数据，1 历史数据
  currentdot = 10; //当前实时绘制点
  currentx = 10;
  viewposition = 0;
  lineTool: TLineTool;
  scollscale = 1;
  buffersize = 16;
  curr = -16;
  alarm = 0; //报警状态
  ctgconfig = {
    normalarea: 'rgb(224,255,255)',
    selectarea: 'rgba(192,192,192,0.5)',
    rule: 'rgba(0,51,102,1)',
    scale: 'rgba(0,0,0,1)',
    // primarygrid: 'rgba(144, 159, 180,1)',
    // secondarygrid: 'rgba(221, 230, 237,1)',
    primarygrid: 'rgba(100, 100, 100, 1)',
    secondarygrid: 'rgba(200, 200, 200, 1)',
    fhrcolor: ['green', 'blue', 'rgb(0,0,0)'],
    tococolor: 'rgb(0,0,0)',
    alarmcolor: 'rgb(255, 1, 1)',
    alarm_enable: true,
    alarm_high: 160,
    alarm_low: 110,
    print_interval: 20,
  };
  fetalposition = {
    fhr1: '',
    fhr2: '',
    fhr3: '',
  };
  printlen = 4800;
  selectstart = 0; // 选择开始点
  selectstartposition = 0; // 选择开始相对位置与数据长度无关
  toolbarposition = 0; //滚动条位置，事件更新
  selectrpstart = 0; // 相对开始位置
  selectend = 0; // 选择结束点
  selectrpend = 0; // 相对结束位置
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
  barTool: IBarTool;
  drawobj: DrawCTG;
  dragtimestamp = 0;
  interval = 5000;
  timeout: NodeJS.Timeout;
  get $selectrpend() {
    return this.selectrpend;
  }
  set $selectrpend(value: number) {
    this.selectrpend = value;
    const absLen = (value - this.leftViewposition) / 2;
    this.endingBar.setLeft(absLen, false);
    this.drawobj.showselect();
    this.selectflag && this.drawobj.showcur(value);
    this.emit('endTime', value);
  }
  get $selectrpstart() {
    return this.selectrpstart;
  }
  set $selectrpstart(value: number) {
    this.selectrpstart = value;
    const absLen = (value - this.leftViewposition) / 2;

    this.startingBar.setLeft(absLen, false);
    this.drawobj.showselect();
    this.selectflag && this.drawobj.showcur(value);
    this.emit('startTime', value);
  }
  get leftViewposition() {
    return this.rightViewPosition >= this.width * 2 ? this.rightViewPosition - this.width * 2 : 0;
  }
  get selectingBarPoint() {
    return ~~(this.leftViewposition + (this.selectingBar ? this.selectingBar.getLeft() * 2 : 0));
  }
  get rightViewPosition() {
    return this.viewposition;
  }
  set rightViewPosition(value: number) {
    this.viewposition = value;

    this.emit('change:selectPoint', this.selectingBarPoint)

    this.updateBarTool();
    this.drawobj.drawdot(this.viewposition);
  }

  constructor(
    canvasgrid: Canvas,
    canvasdata: Canvas,
    canvasline: Canvas,
    canvasselect: Canvas,
    canvasanalyse: Canvas,
    wrap: HTMLElement,
    barTool: IBarTool,
    type: number
  ) {
    super();
    bindEvents.call(this);
    this.wrap = wrap;
    this.canvasgrid = canvasgrid;
    this.canvasdata = canvasdata;
    this.canvasline = canvasline;
    this.canvasselect = canvasselect;
    this.contextgrid = canvasgrid.getContext('2d');
    this.contextdata = canvasdata.getContext('2d');
    this.contextline = canvasline.getContext('2d');
    this.contextselect = canvasselect.getContext('2d');
    this.barTool = barTool;
    this.drawobj = new DrawCTG(this);
    this.type = type;
    this.drawAnalyse = new DrawAnalyse(canvasanalyse)
    if (this.option) {
      this.ctgconfig.tococolor = this.option.tococolor;
      this.ctgconfig.fhrcolor[0] = this.option.fhrcolor1;
      this.ctgconfig.fhrcolor[1] = this.option.fhrcolor2;
      this.ctgconfig.fhrcolor[2] = this.option.fhrcolor3;
      if (this.option.alarm_enable == '0') {
        this.ctgconfig.alarm_enable = false;
      } else {
        this.ctgconfig.alarm_enable = true;
      }
      this.ctgconfig.alarm_enable = true;
      this.ctgconfig.alarm_high = Number(this.option.alarm_high);
      this.ctgconfig.alarm_low = Number(this.option.alarm_low);
      this.ctgconfig.print_interval = Number(this.option.print_interval) || 20;
    }
  }

  init(data: ICacheItem) {
    this.log('init')
    this.drawAnalyse.init()
    if (!data) {
      return;
    }
    // this.log('init', data)
    this.initFlag = true;
    let defaultinterval = 500;
    this.data = data;
    this.currentdot = data.index;
    if (data.status) {
      this.type = 0;
    } else {
      this.type = 1;
      if (typeof data.index == 'undefined') {
        this.data = this.InitFileData(data) as any;
        if (this.data.index > this.width * 2) {
          this.needScroll = true;
        }
      }
    }
    this.drawobj.showcur(0, false);
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
      this.rightViewPosition = this.curr;
    } else {
      this.timerCtg(defaultinterval);
    }
    this.barTool.watch(value => {
      //显示历史数据
      //kisi 优化拖动赋值
      this.toolbarposition = value;
      //console.log(this.curr,this.rightViewPosition,value,this.canvasline.width ,this.data.index);
      this.dragtimestamp = new Date().getTime();
      let len = 100;
      if (this.data.index < this.canvasline.width * 4) {
        len = Math.floor((this.canvasline.width * 4 - this.data.index) / 2);
      }
      let _viewposition =
        this.canvasline.width * 2 +
        Math.floor(
          ((this.data.index - this.canvasline.width * 2) * value) / (this.canvasline.width - len)
        );
      if (this.viewposition < this.canvasline.width * 2) {
        _viewposition = this.canvasline.width * 2;
      }
      this.rightViewPosition = _viewposition;
      this.updateSelectCur();
      this.drawobj.showselect();
      this.drawobj.drawdot(this.rightViewPosition, false);
      this.log('gg', this.rightViewPosition, len, value);
    });
    this.barTool.watchGrab(value => {
      let _viewposition;
      value = ~~value * 2;
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
      if (this.rightViewPosition - value < this.canvasline.width * 2) {
        _viewposition = this.canvasline.width * 2;
        this.drawobj.drawdot(this.rightViewPosition, false);
        // if (this.selectflag) {
        if (this.selectend == 1) {
          this.endingBar.setLeft(
            this.canvasline.width - Math.floor((this.rightViewPosition - this.selectrpend) / 2)
          );
        }
        this.drawobj.showselect();
        // }
        this.updateBarTool();
        return;
      }
      //方向确认
      // console.log('print_drag1', value, this.rightViewPosition, this.selectrpend);
      if (this.rightViewPosition - value < this.data.index) {
        _viewposition = this.rightViewPosition - value;
        //this.movescoller();
        this.drawobj.drawdot(this.rightViewPosition, false);
      } else {
        _viewposition = this.data.index;
        this.drawobj.drawdot(this.rightViewPosition, false);
        // console.log('print_drag--', this.rightViewPosition);
      }
      this.updateBarTool();
      this.rightViewPosition = _viewposition;
      // if (this.selectflag) {
      // console.log('print_drag2', value, this.rightViewPosition, this.selectrpend, Math.floor((this.rightViewPosition - this.selectrpend)) / 2);
      if (this.selectend == 1 && this.rightViewPosition - this.selectrpend > -2) {
        // this.endingBar.setVisibility(true);
        //this.endingBar.setOffset(this.selectrpend / 2);
        this.endingBar.setLeft(
          this.canvasline.width - Math.floor((this.rightViewPosition - this.selectrpend) / 2)
        );
      } else {
        // this.endingBar.setVisibility(false);
      }
      this.drawobj.showselect();
      // }
    });
    this.createBar();

  }
  analyse(data:AnalyseData){
    this.drawAnalyse.setData(data)
    this.drawobj.drawdot(this.canvasline.width * 2, false);


  }
  lazyEmit = throttle((type: string, ...args: any[]) => {
    // console.log(`Suit:${type}`)
    this.emit(type, ...args);
    // console.log('alarmtype in',type,this)
    return true;
  }, this.emitInterval || 0);
  // 报警
  alarmOn(alarmType: string = '') {
    this.lazyEmit('alarmOn', alarmType);
  }
  alarmOff(alarmType: string) {
    this.lazyEmit('alarmOff', alarmType);
  }

  createLine() {
    if (this.rowline) return;
    const { barTool } = this;

    const lineTool = (this.lineTool = barTool.createHLine('blue'));
    const { rowline, addDot, setBase } = lineTool;
    // 横线监听y变化
    this.rowline = rowline.on('change:y', v => {
      console.log('rowline', v);
    });

    // 添加点
    const dot0 = addDot({ left: 10 });
    const dot1 = addDot({ left: 100 });

    rowline.setStyle('background', '#FFCC99');
    // dot0.setStyle('background', 'green')
    dot0.setStyle('border-right-color', '#AA33AA');
    dot0.setStyle('border-bottom-color', '#AA33AA');
    dot1.setStyle('border-left-color', '#FF2233');
    dot1.setStyle('border-bottom-color', '#FF2233');
    // 点监听x变化
    dot0.on('change:x', v => {
      console.log('dot0', v);
    });
    dot1.on('change:x', v => {
      console.log('dot1', v);
    });

    // 隐藏示例
    const dot2 = addDot({ left: 100 });
    dot2.setVisibility(false);

    // 最后设置位置
    setBase(200);
    lineTool.toggleVisibility();
  }
  createBar() {
    if (this.startingBar && this.endingBar && this.selectingBar) {
      this.selectingBar.setLeft(0)
      this.startingBar.setLeft(0);

      return;
    }
    this.createLine();
    const { barTool } = this;
    const startingBar = (this.startingBar = barTool.createRod('开始'));
    const endingBar = (this.endingBar = barTool.createRod('结束'));
    const selectingBar = (this.selectingBar = barTool.createRod('选择'));
    this.type === 0 && selectingBar.setVisibility(false);
    selectingBar.setLeft(0);
    startingBar.setLeft(0);
    //endingBar.setOffset(100)
    endingBar.toggleVisibility();
    startingBar.toggleVisibility();
    selectingBar.on('change:x', value => {
      this.drawobj.showcur(this.selectingBarPoint, false);
      this.emit('change:selectPoint', this.selectingBarPoint)


    });
    startingBar.on('change:x', value => {
      // this.selectrpstart = value * 2;
      // this.selectstartposition = value;
      // // console.log('print_开始', value, this.rightViewPosition, this.canvasline.width);
      // if (value !== 0 && this.type < 1) {
      //   this.dragtimestamp = new Date().getTime();
      // }
      // if (this.rightViewPosition > this.canvasline.width * 2) {
      //   this.selectstart = value * 2 + this.rightViewPosition - 2 * this.canvasline.width;
      // } else {
      //   if (this.type < 1) {
      //     this.selectstart = value * 2 + this.rightViewPosition - 2 * this.canvasline.width;
      //   } else {
      //     this.selectstart = value * 2;
      //   }
      // }
      // this.drawobj.showcur(this.selectstart, false);
      // this.selectrpstart = this.selectstart;
      this.$selectrpstart = this.leftViewposition + value * 2;
      // this.emit('startTime', this.selectstart)
    });
    endingBar.on('change:x', value => {
      if (this.data.index < this.canvasline.width * 2) {
        this.selectrpend = value * 2;
      } else {
        this.selectrpend = this.rightViewPosition - (this.canvasline.width - value) * 2;
      }
      if (this.selectrpstart > this.selectrpend) {
        return;
      }
      // console.log('print_结束', value, this.selectrpstart, this.selectrpend)
      this.drawobj.showselect();
      this.emit('endTime', this.selectrpend);

      this.$selectrpend = this.leftViewposition + value * 2;
      // this.emit('startTime', this.selectstart)
    });
    // selectingBar.on('change:x', value => {
    //   this.selectingBarPoit = value
    // })
  }
  lockStartingBar(status: boolean) {
    // console.log('lockStartingBar', status)
  }
  destroy() {
    this.log('destroy')
    this.intervalIds.forEach(_ => clearInterval(_));
    this.canvasgrid = null;
    this.canvasdata = null;
    this.contextgrid = null;
    this.contextdata = null;
    this.canvasline = null;
    this.contextline = null;
    this.canvasselect = null;
    this.contextselect = null;
    // this.p = null;
    this.wrap = null;
    this.drawobj = null;
    this.barTool = null;
  }
  _resize() {
    // this.log('resize');
    const { width, height } = this.wrap.getBoundingClientRect()

    this.drawobj.resize();
    this.drawAnalyse.resize(width, height)
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
    this.toolbarposition = Math.floor(
      ((this.canvasline.width - len) * (this.rightViewPosition - this.canvasline.width * 2)) /
      (this.data.index - this.canvasline.width * 2)
    );
    this.barTool.setBarLeft(this.toolbarposition, false);
  }

  updateSelectCur() {
    // if (!this.selectflag) {
    if (this.rightViewPosition > this.canvasline.width * 2) {
      this.selectstart =
        this.selectstartposition * 2 + this.rightViewPosition - 2 * this.canvasline.width;
    } else {
      this.selectstart = this.selectstartposition * 2;
    }
    // this.emit('startTime', this.selectstart)
    this.drawobj.showcur(this.selectstart, false);
    // }
  }
  movescoller() { }

  //胎心数据处理
  InitFileData(oriobj) {
    let CTGDATA = {
      fhr: [[], [], []],
      toco: [],
      fm: [],
      fetal_num: 2,
      index: 0,
      starttime: '',
      fetalposition: {},
      analyse: { acc: [], dec: [], baseline: [], start: 0, end: 0 },
    };
    if (oriobj.docid) {
      let pureidarr: string[] = oriobj.docid.split('_');
      let pureid = pureidarr[2];
      CTGDATA.starttime = convertstarttime(pureid);
    }
    if (
      typeof oriobj.fetalposition != 'undefined' &&
      oriobj.fetalposition != null &&
      oriobj.fetalposition != ''
    ) {
      let positionobj = JSON.parse(oriobj.fetalposition);
      CTGDATA.fetalposition = positionobj;
      console.log(
        oriobj.fetalposition,
        typeof this.data.fetalposition,
        this.data.fetalposition,
        this
      );
    }
    Object.keys(oriobj).forEach(key => {
      let oridata = oriobj[key];
      if (!oridata || oridata === '') {
        return false;
      }
      if (key === 'docid') {
        return false;
      }


      if (key === 'analyse' && oridata) {
        Object.assign(CTGDATA.analyse, oridata);
        return;
      }
      if (key === 'fhr1') {
        CTGDATA.index = oridata.length / 2;
      }
      for (let i = 0; i < CTGDATA.index; i++) {
        if (typeof oridata != 'string' || oridata.length < 2) {
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
    if (
      this.data.starttime &&
      this.data.starttime != '' &&
      this.data.status == 1 &&
      this.data.index > 0 &&
      this.isOn
    ) {
      if (isNaN(this.data.csspan)) return;
      this.curr =
        (Math.floor(new Date().getTime() / 1000) -
          Math.floor(new Date(this.data.starttime).getTime() / 1000)) *
        4 +
        this.data.csspan;
      if (this.curr < 0) return;
      this.drawobj.drawdot(this.curr, true);
      this.rightViewPosition = this.curr;
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
          this.startingBar.setLeft(0);
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
    });
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
          if (datacache.fhr[1]) datacache.fhr[1][i] = data_to_push;
        } else if (key === 'fhr3') {
          if (datacache.fhr[2]) datacache.fhr[2][i] = data_to_push;
        } else if (key === 'toco') {
          datacache.toco[i] = data_to_push;
        } else if (key === 'fm') {
          datacache.fm[i] = data_to_push;
        }
        oridata = oridata.substring(2, oridata.length);
      }
    });
  }
  selectBasedOnStartingBar(isLeft = true) {
    const {
      // startingBar,
      // endingBar,
      // needScroll,
      width,
      ctgconfig,
      data,
      // selectstart,
      // leftViewposition: baseViewposition,
      // selectingBarPoint,
    } = this;
    let endPosition;
    if (isLeft) {
      if (this.selectingBarPoint < 1) {
        this.rightViewPosition = this.data.index;
        this.selectingBar.setLeft(this.width);
      }
      endPosition = this.selectingBarPoint - ctgconfig.print_interval * 240;
      this.$selectrpstart = endPosition < 0 ? 0 : endPosition;
      this.$selectrpend = this.selectingBarPoint;
    } else {
      if (this.selectingBarPoint + 10 >= data.index) {
        this.rightViewPosition = width * 2;
        this.selectingBar.setLeft(0);
      }

      endPosition = this.selectingBarPoint + ctgconfig.print_interval * 240;
      this.$selectrpend = endPosition > data.index ? data.index : endPosition;
      this.$selectrpstart = this.selectingBarPoint;
    }
  }
}

// function formatAnalyseData(obj: { [x: string]: string }) {
//   const keys = ['acc', 'baseline', 'dec', 'meanbaseline'];
//   const arr: [string, number[]][] = Object.entries(obj)
//     .filter(([k, v]) => keys.includes(k))
//     .map(([k, v]) => {
//       v = typeof v === 'string' ? v : '';
//       return [
//         k,
//         v
//           .split(',')
//           .map(_ => parseInt(_))
//           .filter(_ => !isNaN(_)),
//       ];
//     });
//   return {
//     ...obj,
//     ...arr.reduce((a, [k, v]) => {
//       return Object.assign(a, { [k]: v });
//     }, {}),
//   };
// }
