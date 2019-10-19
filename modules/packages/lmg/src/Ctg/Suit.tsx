import DrawCTG from './DrawCTG';
var rulercolor = 'rgb(67,205,128)';
import { IBarTool } from '../ScrollBar/useScroll';
import { Drawer } from "../interface";
import ScrollEl from '../ScrollBar/ScrollEl';
import { EventEmitter, event } from '@lianmed/utils'
import request from "@lianmed/request"

let sid = 0;
type Canvas = HTMLCanvasElement;
type Context = CanvasRenderingContext2D;
export class Suit extends EventEmitter implements Drawer {
  static option: {[x:string]:string} = {}
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
  selectstart = 0;// 选择开始点
  selectrpstart = 0;// 相对开始位置
  selectend = 0;// 选择结束点
  selectrpend = 0;// 相对结束位置
  selectflag = false;
  requestflag = false;
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
    this.type = type;
    // this.resize();
    this.barTool.watchGrab(value => {
    });
    this.log('option', this.option)
    this.ctgconfig.tococolor = this.option.tococolor;
    this.ctgconfig.fhrcolor[0] = this.option.fhrcolor1;
    this.ctgconfig.fhrcolor[1] = this.option.fhrcolor2;
    this.ctgconfig.fhrcolor[2] = this.option.fhrcolor3;
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
    this.currentdot = data.index;
    if (!data.status) {
      this.type = 1;
      if (!data.index) {
        this.data = this.InitFileData(data);
        this.fetalcount = this.data.fetal_num;
      }
      console.log('type_check', this.data, this.fetalcount);
    }
    if (this.type > 0) {
      //kisi 2019-10-08 不在曲线内处理
      // let json; // 调用方式restful如  api/ctg-exams-data/2_2_190930222541   请求的json数据
      // this.initctgdata(json.fhr1, this.fhr[0]);
      // this.initctgdata(json.fhr2, this.fhr[1]);
      // this.initctgdata(json.fhr3, this.fhr[2]);
      // this.initctgdata(json.toco, this.toco);
      if (this.data.index > this.canvasline.width * 2) {
        this.curr = this.canvasline.width * 2;
        console.log('type_check', this.canvasline.width, this.canvasline.width * 2, this.data.index);
        this.barTool.setBarWidth(100);
        this.barTool.setBarLeft(0, false);
      } else {
        this.curr = this.data.index;
      }
      this.drawobj.drawdot(this.canvasline.width * 2);
      this.viewposition = this.curr;
      this.createBar();
    } else {
      this.drawobj.drawgrid(0);
      this.barTool.setBarWidth(0);
      this.timerCtg(defaultinterval);
    }
    this.barTool.watch(value => {
      if (this.selectflag) {
        this.drawobj.showselect(this.selectrpstart, this.selectrpend);
      }
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
      if(this.type == 0 && this.data.past >0){
        //console.log('print', this.data,this.selectrpstart, this.selectrpend);
        if(!this.requestflag){
          this.requestflag = true;
          this.getoffline(this.data.docid,this.data.past);
        }
      }
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
      if (this.selectflag) {
        if (this.selectend == 1 && this.viewposition - this.selectrpend > 0) {
          this.endingBar.setVisibility(true);
          this.endingBar.setOffset(this.canvasline.width - Math.floor((this.viewposition - this.selectrpend) / 2));
        } else {
          this.endingBar.setVisibility(false);
        }
        this.drawobj.showselect(this.selectrpstart, this.selectrpend);
      }
    });
  }
  // 报警
  alarmOn(alarmType = '') {
    event.emit('suit:alarmOn', alarmType)
    console.log('suit:alarmOn emit')
  }
  alarmOff(alarmType) {
    event.emit('suit:alarmOff', alarmType)
    console.log('suit:alarmOff emit')
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
      console.log('print_开始', value, this.viewposition, this.canvasline.width);
      if (this.viewposition > this.canvasline.width * 2) {
        this.selectstart = value * 2 + this.viewposition - 2 * this.canvasline.width;
      } else {
        this.selectstart = value * 2;
      }
      this.emit('suit:startTime', this.selectstart)
    })
    endingBar.on('change', value => {
      this.selectrpend = this.viewposition - (this.canvasline.width - value) * 2;
      console.log('print_结束', value, this.selectrpstart, this.selectrpend)
      this.drawobj.showselect(this.selectrpstart, this.selectrpend);
      this.emit('suit:endTime', this.selectrpend)
    })

    this.on('locking', value => {
      //更新状态
      console.log('print_locking', value);
      this.selectflag = value;
      if (this.selectflag) {
        this.startingBar.toggleVisibility();
        this.selectend = 0;
        //this.endingBar.toggleVisibility();
        console.log(this.selectstart, this.data.index);
        this.selectrpend = this.data.index < this.selectrpstart + 4800 ? this.data.index : this.selectrpstart + 4800
        this.drawobj.showselect(this.selectrpstart, this.selectrpend);
      } else {
        this.startingBar.toggleVisibility();
        //this.endingBar.toggleVisibility();
        console.log(this.selectstart, this.data.index);
        this.drawobj.showselect(0, 0);
      }
    })
      .on('customizing', value => {
        this.log('customizing', value);
        if (value && this.selectflag) {
          this.selectend = 1;
          if (this.viewposition - this.selectrpend > 0) {
            this.endingBar.setVisibility(true);
            this.endingBar.setOffset(this.canvasline.width - Math.floor((this.viewposition - this.selectrpend) / 2));
          }
        } else {
          this.selectend = 0;
          this.endingBar.setVisibility(false);
        }
      })
      .on('setStartingTime', value => {
        this.log('setStartingTime', value);

      })
      .on('setEndingTime', value => {
        this.log('setEndingTime', value);

      })
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
    // this.p = null;
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
  InitFileData(oriobj) {
    let pureidarr = oriobj.docid.split('_');
    let CTGDATA = { fhr: [[], [], []], toco: [], fm: [], fetal_num: 2, index: 0, starttime: '' };
    if (pureidarr.length > 2) {
      let pureid = pureidarr[2];
      CTGDATA.starttime =
        '20' +
        pureid.substring(0, 2) +
        '-' +
        pureid.substring(2, 4) +
        '-' +
        pureid.substring(4, 6) +
        ' ' +
        pureid.substring(6, 8) +
        ':' +
        pureid.substring(8, 10) +
        ':' +
        pureid.substring(10, 12);
    }
    Object.keys(oriobj).forEach(key => {
      let oridata = oriobj[key];
      if (!oridata) {
        return;
      }
      if (key === 'fhr1') {
        CTGDATA.index = oridata.length / 2;
      }
      for (let i = 0; i < CTGDATA.index; i++) {
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

  drawdot() {
    if (this.data.starttime && this.data.starttime != '' && this.data.status == 1 && this.data.index > 0) {
      if (isNaN(this.data.csspan))
        return;
      this.curr = (Math.floor(new Date().getTime() / 1000) - Math.floor(new Date(this.data.starttime).getTime() / 1000)) * 4 + this.data.csspan;
      if (this.curr < 0)
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

 getoffline(doc_id: string, offlineend: number) {
    request.get(`/ctg-exams-data/${doc_id}`).then(responseData => {
        console.log(doc_id, offlineend, responseData, this.data.past);
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
