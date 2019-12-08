import { Suit } from './Suit';

function formatDate(date: any, format) {
  if (!date) return;
  if (!format) format = 'yyyy-MM-dd';
  switch (typeof date) {
    case 'string':
      date = new Date(date.replace(/-/, '/'));
      break;
    case 'number':
      date = new Date(date);
      break;
  }
  if (!(date instanceof Date)) return;
  var dict = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: ('' + (date.getMonth() + 101)).substr(1),
    dd: ('' + (date.getDate() + 100)).substr(1),
    HH: ('' + (date.getHours() + 100)).substr(1),
    mm: ('' + (date.getMinutes() + 100)).substr(1),
    ss: ('' + (date.getSeconds() + 100)).substr(1),
  };
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]];
  });
}

export default class DrawCTG {
  suit: Suit;
  gridcontext: CanvasRenderingContext2D;
  linecontext: CanvasRenderingContext2D;
  datacontext: CanvasRenderingContext2D;
  selectcontext: CanvasRenderingContext2D;
  analysecontext: CanvasRenderingContext2D;
  baseleft: number;
  basetop: number;
  min: number;
  max: number;
  xspan: number;
  yspan: number;
  scalespan: number;
  starttime: string;
  fhroffset: number;
  constructor(suit: Suit, xspan = 40, yspan = 1, scalespan = 30, fhroffset = -20, baseleft = 0, basetop = 10, min = 50, max = 210) {
    this.suit = suit;
    this.gridcontext = suit.contextgrid;
    this.linecontext = suit.contextline;
    this.datacontext = suit.contextdata;
    this.selectcontext = suit.contextselect;
    this.analysecontext = suit.contextanalyse;
    this.xspan = xspan;
    this.yspan = yspan;
    this.scalespan = scalespan;
    this.basetop = basetop;
    this.baseleft = baseleft;
    this.fhroffset = fhroffset;
    this.min = min;
    this.max = max;
    this.starttime = suit.starttime;
  }
  resize() {
    const { width, height } = this.suit;
    const oldwidth = JSON.parse(JSON.stringify(this.suit.canvasline.width));
    console.log('resize', oldwidth);
    this.suit.canvasline.width = width;
    this.suit.canvasline.height = height;
    this.suit.canvasselect.width = width;
    this.suit.canvasselect.height = height;
    this.suit.canvasgrid.width = width;
    this.suit.canvasgrid.height = height;
    this.suit.canvasdata.width = width;
    this.suit.canvasdata.height = height;
    this.suit.canvasanalyse.width = width;
    this.suit.canvasanalyse.height = height;
    this.yspan = (height - this.scalespan - this.basetop) / (this.max + 100 - this.min);
    console.log('resize', this.suit.data, this.suit.viewposition, this.suit.toolbarposition, oldwidth, width);
    if (typeof (this.suit.data) != 'undefined') {
      if (this.suit.data.index > width * 2) {
        this.suit.viewposition = Math.floor(2 * width);
        if (this.suit.data.index < width * 4) {
          let len = Math.floor((width * 4 - this.suit.data.index) / 2);
          this.suit.barTool.setBarWidth(len);
        } else {
          this.suit.barTool.setBarWidth(100);
        }
        this.suit.barTool.setBarLeft(Math.floor(this.suit.toolbarposition * width / oldwidth), false);
      }
      this.drawdot(this.suit.viewposition, false);
    } else {
      this.drawgrid(width * 2, false);
    }
    if (this.suit.selectstartposition > width) {
      this.suit.startingBar.setOffset(width);
    }
  }
  drawgrid(cur, drawtimespan = true) {
    const { suit, sethorizontal, setvertical, gridcontext } = this;
    let cwidth = suit.canvasline.width;
    let cheight = suit.canvasline.height;
    gridcontext.clearRect(0, 0, cwidth, cheight);
    //横向选择区域设置填充色
    gridcontext.fillStyle = suit.ctgconfig.normalarea;
    gridcontext.fillRect(0, 50 * this.yspan + this.basetop, cwidth, 50 * this.yspan);
    sethorizontal(cwidth, cur, drawtimespan);
    setvertical(cwidth, cur);
  }

  drawdotright(cur) {
    // const { suit, linecontext, baseleft, max } = this;
    // const { fhr, toco } = suit;
    // var lastx = 0;
    // var lasty = 0;
    // linecontext.clearRect(0, 0, suit.canvasline.width, suit.canvasline.height);
    // linecontext.beginPath();
    // linecontext.strokeStyle = 'rgb(0,0,0)';
    // linecontext.lineWidth = 0.8;
    // lastx = 0;
    // lasty = 0;
    // // let len = fhr.length;
    // // var limit = len - cur > suit.canvasline.width ? suit.canvasline.width : len - cur;
    // for (var i = 0; i < cur; i++) {
    //   lastx = i + baseleft;
    //   lasty = fhr[i];
    //   if (lasty == 0) {
    //     if (cur + i + 1 < length) {
    //       linecontext.moveTo(lastx, (max - fhr[i + 1]) * this.yspan);
    //     }
    //   } else {
    //     if (i > 1 && lasty - fhr[i - 1] > 30) {
    //       linecontext.moveTo(lastx, (max - fhr[i]) * this.yspan);
    //     } else if (i > 1 && fhr[i - 1] - lasty > 30) {
    //       linecontext.moveTo(lastx, (max - fhr[i]) * this.yspan);
    //     } else {
    //       linecontext.lineTo(lastx, (max - lasty) * this.yspan);
    //     }
    //   }
    // }
    // lastx = 0;
    // lasty = 0;
    // linecontext.moveTo(lastx, this.suit.canvasline.height);
    // for (var i = 0; i < cur; i++) {
    //   lastx = i + baseleft;
    //   lasty = toco[i];
    //   linecontext.lineTo(lastx, this.suit.canvasline.height - lasty * this.yspan);
    // }
    // linecontext.stroke();
  }
  drawdot(cur, isemit) {
    const { suit, linecontext, max, analysecontext } = this;
    const { fhr, toco, fm } = suit.data;
    if (typeof (fhr[0]) == "undefined") {
      this.drawgrid(cur, false);
      return;
    }
    this.drawgrid(cur);
    if (suit.type == 0) {
      this.showcur(cur, isemit);
    }
    var lastx = 0;
    var lasty = 0;
    linecontext.clearRect(0, 0, suit.canvasline.width, suit.canvasline.height);
    //清空分析画布
    analysecontext.clearRect(0, 0, suit.canvasanalyse.width, suit.canvasanalyse.height)
    // 0.5 s 一个点,一个像素画两个点
    var start = cur - suit.canvasline.width * 2 > 0 ? cur - suit.canvasline.width * 2 : 0;
    //Draw FHR multiply 
    let alarmstate = 0;
    //kisi 2019-12-08 fetalcount 修改为 fetal_num
    for (var fetal = 0; fetal < suit.data.fetal_num; fetal++) {
      //start 统一为画布的位置点，需根据显示采样率调整取值
      //TODO : kisi 增加多胎偏移处理
      //TODO : kisi 2019-10-08 待增加曲线颜色设置
      //TODO : KISI 2019-10-17 待测试
      linecontext.beginPath();
      linecontext.strokeStyle = suit.ctgconfig.fhrcolor[fetal];
      linecontext.lineWidth = 1;
      let curfhroffset = 0;
      if (fetal == 1) {
        curfhroffset = this.fhroffset;
      } else if (fetal == 2) {
        curfhroffset = -this.fhroffset;
      }
      for (let i = start; i < cur; i++) {
        if (i % 2 == 1) continue;
        if (start == 0) {
          lastx = Math.floor((suit.canvasline.width * 2 - cur + i) / 2);
        } else {
          lastx = Math.floor((i - start) / 2);
        }
        let inneri = i;
        if (i == start) {
          linecontext.moveTo(lastx, (max - fhr[fetal][start] - curfhroffset) * this.yspan + this.basetop);
          continue;
        }
        if (typeof (fhr[fetal][inneri]) != "undefined" && fhr[fetal][inneri] && fhr[fetal][inneri] != 0) {
          lasty = fhr[fetal][inneri];
        } else {
          linecontext.moveTo(lastx, (max - 0 - curfhroffset) * this.yspan + this.basetop);
          continue;
        }
        if (i > 1 && (typeof (fhr[fetal][inneri - 2]) == "undefined" || fhr[fetal][inneri - 2] == 0 || (lasty - fhr[fetal][inneri - 2]) > 30 || (fhr[fetal][inneri - 2] - lasty) > 30)) {
          //kisi 2019-10-20 add 划线规则
          linecontext.moveTo(lastx, (max - fhr[fetal][inneri] - curfhroffset) * this.yspan + this.basetop);
        }
        else {
          // 增加 报警颜色处理
          //kisi 2019-11-08 
          //修复连线间变化
          if (suit.ctgconfig.alarm_enable && (lasty > suit.ctgconfig.alarm_high || lasty < suit.ctgconfig.alarm_low)) {
            let type = 1;
            let minoff = 0;
            let curstand = lasty;
            if (alarmstate != type) {
              if (lasty > suit.ctgconfig.alarm_high && fhr[fetal][inneri - 2] < suit.ctgconfig.alarm_high) {
                minoff = (lasty - suit.ctgconfig.alarm_high) / (lasty - fhr[fetal][inneri - 2]);
                curstand = suit.ctgconfig.alarm_high;
              } else if (lasty < suit.ctgconfig.alarm_low && fhr[fetal][inneri - 2] > suit.ctgconfig.alarm_low) {
                minoff = (lasty - suit.ctgconfig.alarm_low) / (lasty - fhr[fetal][inneri - 2]);
                curstand = suit.ctgconfig.alarm_low;
              }
              else {
                minoff = 0;
                curstand = lasty;
              }
              //console.log('alarm',type,start,inneri,fhr[fetal][inneri-2],lasty,minoff,curstand);
              this.linecontext.lineTo(lastx - 1 + minoff, (max - curstand - curfhroffset) * this.yspan + this.basetop);
              this.linecontext.stroke();
              this.linecontext.beginPath();
              linecontext.lineWidth = 1;
              this.linecontext.strokeStyle = suit.ctgconfig.alarmcolor;
              alarmstate = 1;
              this.linecontext.moveTo(lastx - 1 + minoff, (max - curstand - curfhroffset) * this.yspan + this.basetop);
              this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan + this.basetop);
            }
            this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan + this.basetop);
          } else {
            let type = 0;
            let minoff = 0;
            let curstand = lasty;
            if (alarmstate != type) {
              if (fhr[fetal][inneri - 2] > suit.ctgconfig.alarm_high) {
                minoff = (lasty - suit.ctgconfig.alarm_high) / (lasty - fhr[fetal][inneri - 2]);
                curstand = suit.ctgconfig.alarm_high;
              } else if (fhr[fetal][inneri - 2] < suit.ctgconfig.alarm_low) {
                minoff = (lasty - suit.ctgconfig.alarm_low) / (lasty - fhr[fetal][inneri - 2]);
                curstand = suit.ctgconfig.alarm_low;
              }
              //console.log('recover',type,start,inneri,fhr[fetal][inneri-2],lasty,minoff,curstand);
              this.linecontext.lineTo(lastx - 1 + minoff, (max - curstand - curfhroffset) * this.yspan + this.basetop);
              this.linecontext.stroke();
              this.linecontext.beginPath();
              linecontext.lineWidth = 1;
              this.linecontext.strokeStyle = suit.ctgconfig.fhrcolor[fetal];
              alarmstate = 0;
              this.linecontext.moveTo(lastx - 1 + minoff, (max - curstand - curfhroffset) * this.yspan + this.basetop);
              this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan + this.basetop);
            }
            this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan + this.basetop);
          }
          //kisi 2019-10-29
          //绘制加减速标记
          this.drawflag(lastx, (max - lasty - curfhroffset) * this.yspan, i);
        }
      }
      this.linecontext.stroke();
    }
    //draw TOCO
    lastx = 0;
    lasty = 0;
    linecontext.beginPath();
    linecontext.strokeStyle = suit.ctgconfig.tococolor;
    linecontext.lineWidth = 1;
    for (var i = start; i < cur - 2; i++) {
      if (i % 2 == 1) continue;
      if (start == 0) {
        lastx = Math.floor((suit.canvasline.width * 2 - cur + i) / 2);
      } else {
        lastx = Math.floor((i - start) / 2);
      }
      if (i > 2 && typeof (toco[i]) != "undefined" && typeof (toco[i - 2]) != "undefined" && toco[i] != 255) {
        linecontext.lineTo(lastx, suit.canvasline.height - toco[i] * this.yspan);
      } else {
        if (typeof (toco[i]) != "undefined" && toco[i] != 255) {
          linecontext.moveTo(lastx, suit.canvasline.height - toco[i] * this.yspan);
        } else if (typeof (toco[i - 2]) != "undefined" && toco[i] != 255) {
          linecontext.moveTo(lastx, suit.canvasline.height - toco[i - 2] * this.yspan);
        }
        else {
          linecontext.moveTo(lastx, suit.canvasline.height);
        }
      }
    }
    linecontext.stroke();
    //kisi 2019-10-10 fm 128 判断
    for (var i = start; i < cur; i++) {
      if (i % 2 == 1) continue;
      if (start == 0) {
        lastx = Math.floor((suit.canvasline.width * 2 - cur + i) / 2);
      } else {
        lastx = Math.floor((i - start) / 2);
      }
      if (fm[i] == 128 || fm[i] == 1) {
        i = i + 2;
        this.showfm(lastx);
      }
    }
    //kisi 2019-10-29 baseline
    //TODO
    // if(typeof(suit.data.analyse) != 'undefined'){
    //   let curfhroffset = 0;
    //   analysecontext.beginPath();
    //   analysecontext.strokeStyle = suit.ctgconfig.fhrcolor[2];//基线颜色
    //   analysecontext.lineWidth = 1;
    //   if(start <= suit.data.analyse.start && cur>suit.data.analyse.start){
    //     let baselineoff = Math.ceil((suit.data.analyse.start - start)/(this.xspan*6));
    //     let firstindex = baselineoff-2 >0 ? baselineoff-2 : 0;
    //     console.log(firstindex);
    //     analysecontext.moveTo(baselineoff*this.xspan*3,(max - curfhroffset - suit.data.analyse.baseline[firstindex]) * this.yspan+ this.basetop);
    //     for (var i = baselineoff*this.xspan*3+1; i < cur; i++) {
    //       baselineoff = Math.ceil((i-start)/(this.xspan*6));
    //       if(baselineoff>=suit.data.analyse.baseline.length-1){
    //         break;
    //       }
    //       if((i)%(this.xspan*6)== 0){
    //         lastx = Math.floor((i - start) / 2);
    //         analysecontext.lineTo(lastx, (max - curfhroffset - suit.data.analyse.baseline[baselineoff]) * this.yspan+ this.basetop);
    //       }
    //     }
    //     analysecontext.stroke();
    //   }else if(start < suit.data.analyse.end){
    //     let baselineoff = Math.ceil((start-suit.data.analyse.start)/(this.xspan*6));
    //     let firstindex = baselineoff-1 >0 ? baselineoff-1 : 0;
    //     analysecontext.moveTo(0, (max - curfhroffset - suit.data.analyse.baseline[firstindex]) * this.yspan+ this.basetop);
    //     for (var i = start+1; i < cur; i++) {
    //       baselineoff = Math.ceil((i-suit.data.analyse.start)/(this.xspan*6));
    //       if(baselineoff>=suit.data.analyse.baseline.length-1){
    //         break;
    //       }
    //       if((i)%(this.xspan*6)== 0){
    //         lastx = Math.floor((i - start) / 2);
    //         analysecontext.lineTo(lastx,(max - curfhroffset - suit.data.analyse.baseline[baselineoff]) * this.yspan+ this.basetop);
    //       }
    //     }
    //     analysecontext.stroke();
    //   }
    // }
  }

  //kisi 2019-10-28 绘制 acc dec
  drawflag = (x, y, index) => {
    const { analysecontext, suit } = this;
    analysecontext.textAlign = 'left';
    analysecontext.textBaseline = 'top';
    let txt = '';
    if (typeof (suit.data.analyse) != "undefined" && suit.data.analyse.acc.indexOf(index) > -1) {
      txt = '+';
      analysecontext.font = '25px arial';
      analysecontext.fillStyle = 'black';
      analysecontext.fillText(txt, x + 1, y + 5);
    } else if (typeof (suit.data.analyse) != "undefined" && suit.data.analyse.dec.indexOf(index) > -1) {
      txt = '—';
      analysecontext.font = 'bold 15px arial';
      analysecontext.fillStyle = 'red';
      analysecontext.fillText(txt, x + 1, y + 5);
    }
  }

  sethorizontal = (length: number, startposition: number, drawtimespan = true) => {
    const { setrules, gridcontext, baseleft, min, max, xspan } = this;
    if (drawtimespan) {
      this.starttime = this.suit.data.starttime;
    }
    if (this.starttime == '') {
      this.starttime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }
    var offsetpx = Math.floor((startposition % (xspan * 2)) / 2);
    var offseti = Math.floor(startposition / (xspan * 2));
    var offsetlpx = 40 - Math.floor((length % xspan));
    //kisi 2019-10-02 开始时间点 ，因为现在间隔0.5s取点
    var offsetmin = startposition / (xspan * 2 * 3);
    //kisi 2019-10-06 修改为ceil方法使得网格走纸不延时
    let linecount = Math.ceil(length / xspan);
    var primaryflag = linecount % 3;
    var primaryscaleflag = linecount % 6;
    var minflag = (linecount) % 2;
    //console.log(offsetpx,offseti, offsetlpx,offsetmin,linecount,primaryflag,primaryscaleflag,minflag);
    for (var i = linecount; i > 0; i--) {
      var ioff = i + offseti;
      gridcontext.beginPath();
      gridcontext.strokeStyle = this.suit.ctgconfig.secondarygrid;
      gridcontext.lineWidth = 0.8;
      if (ioff % 3 == primaryflag) {
        gridcontext.strokeStyle = this.suit.ctgconfig.primarygrid;
      }
      if (startposition == 0) {
        // console.log('drawctg',startposition);
        if (ioff % 6 == primaryscaleflag) {
          if (drawtimespan) {
            this.setscalestyle(gridcontext, this.suit.ctgconfig.scale);
            let fMinutes = Math.floor(offsetmin - (1.0 * (linecount - i)) / 3);
            if (fMinutes >= 0) {
              let tmpyoffset = Math.floor((max - min) * this.yspan + this.scalespan / 4) + this.basetop;
              gridcontext.fillText(
                fMinutes + '分',
                baseleft + xspan * i + baseleft - offsetpx - offsetlpx - 20,
                tmpyoffset
              );
            }
          }
        }
      }
      else {
        if (ioff % 6 == primaryscaleflag) {
          if (drawtimespan) {
            let firstoffset = 0;
            this.setscalestyle(gridcontext, this.suit.ctgconfig.scale);
            let fMinutes = Math.floor(offsetmin - (1.0 * (linecount - i)) / 3);
            let tmpyoffset = Math.floor((max - min) * this.yspan + this.scalespan / 4) + this.basetop;
            //console.log(startposition,primaryscaleflag, ioff % 6,ioff,offsetmin,fMinutes);
            if (fMinutes == 0) {
              firstoffset = 10;
            }
            if (offseti > linecount - i - 2) {
              var flag = Math.ceil(ioff / 6) % 2;
              if (flag == minflag) {
                var date = new Date(this.starttime);
                let timescale = formatDate(date.setMinutes(date.getMinutes() + fMinutes), 'HH:mm');
                if (startposition == 0 && i == 1) {
                  gridcontext.fillText(timescale, length - offsetpx, tmpyoffset);
                } else {
                  gridcontext.fillText(timescale, baseleft + xspan * i - offsetpx - offsetlpx - 10 + firstoffset, tmpyoffset);
                }
              } else {
                fMinutes = Math.ceil(fMinutes);
                if (startposition == 0 && i == 0) {
                  gridcontext.fillText(fMinutes + '分', baseleft - offsetpx, tmpyoffset);
                } else {
                  gridcontext.fillText(
                    fMinutes + '分',
                    baseleft + xspan * i + baseleft - offsetpx - offsetlpx - 10 + firstoffset,
                    tmpyoffset
                  );
                }
              }
            }
          }
        }
      }
      gridcontext.moveTo(xspan * i - offsetlpx + baseleft - offsetpx, (max - min) * this.yspan + this.scalespan + this.basetop);
      gridcontext.lineTo(xspan * i - offsetlpx + baseleft - offsetpx, (max - min + 100) * this.yspan + this.scalespan + this.basetop);
      gridcontext.moveTo(xspan * i - offsetlpx + baseleft - offsetpx, 0 + this.basetop);
      gridcontext.lineTo(xspan * i - offsetlpx + baseleft - offsetpx, (max - min) * this.yspan + this.basetop);
      //console.log(length,offsetlpx,xspan * i - offsetlpx+ baseleft - offsetpx,offsetpx);
      gridcontext.stroke();
      if (ioff % 6 == primaryscaleflag) {
        setrules(xspan * (i + 3) + baseleft - offsetlpx - offsetpx);
      }
    }
  };
  sethorizontalright = (length: number, startposition: number, drawtimespan = true) => {
    const { setrules, gridcontext, baseleft, min, max, xspan } = this;
    if (drawtimespan) {
      this.starttime = this.suit.data.starttime;
    }
    if (this.starttime == '') {
      this.starttime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }
    var offsetpx = Math.floor(((length - startposition) % (xspan * 2)) / 2);
    var offseti = Math.floor(startposition / (xspan * 2));
    //kisi 2019-10-02 开始时间点 ，因为现在间隔0.5s取点
    var offsetmin = startposition / (xspan * 2 * 3);
    //kisi 2019-10-06 修改为ceil方法使得网格走纸不延时
    let linecount = Math.ceil(length / (xspan * 2));
    let lineoff = length % (xspan * 2);
    var primaryflag = linecount % 3;
    var primaryscaleflag = linecount % 6;
    for (var i = linecount * 2; i > 0; i--) {
      var ioff = i + offseti;
      gridcontext.beginPath();
      gridcontext.strokeStyle = this.suit.ctgconfig.secondarygrid;
      gridcontext.lineWidth = 0.8;
      if (ioff % 3 == primaryflag) {
        gridcontext.strokeStyle = this.suit.ctgconfig.primarygrid;
      }
      if (ioff % 6 == primaryscaleflag) {
        if (drawtimespan) {
          this.setscalestyle(gridcontext, this.suit.ctgconfig.scale);
          let fMinutes = Math.ceil(offsetmin - (1.0 * (linecount * 2 - i)) / 3);
          let tmpyoffset = Math.floor((max - min) * this.yspan + this.scalespan / 4) + this.basetop;
          if (offseti > linecount * 2 - i - 2) {
            var flag = Math.ceil((ioff - 1) / 6) % 2;
            if (flag == 1) {
              var date = new Date(this.starttime);
              let timescale = formatDate(date.setMinutes(date.getMinutes() + fMinutes), 'HH:mm');
              if (startposition == 0 && i == 1) {
                gridcontext.fillText(timescale, length - offsetpx, tmpyoffset);
              } else {
                gridcontext.fillText(timescale, baseleft + xspan * i - offsetpx - 10, tmpyoffset);
              }
            } else {
              fMinutes = Math.ceil(fMinutes);
              if (startposition == 0 && i == 0) {
                gridcontext.fillText(fMinutes + '分', baseleft - offsetpx, tmpyoffset);
              } else {
                gridcontext.fillText(
                  fMinutes + '分',
                  baseleft + xspan * i + baseleft - offsetpx - 10,
                  tmpyoffset
                );
              }
            }
          }
        }
      }
      gridcontext.moveTo(xspan * i + baseleft - 40 + lineoff + offsetpx, (max - min) * this.yspan + this.scalespan + this.basetop);
      // console.log(xspan * i + baseleft - 40 + lineoff + offsetpx, lineoff, i);
      gridcontext.lineTo(xspan * i + baseleft - 40 + lineoff + offsetpx, (max - min + 100) * this.yspan + this.scalespan + this.basetop);
      gridcontext.moveTo(xspan * i + baseleft - 40 + lineoff + offsetpx, 0 + this.basetop);
      gridcontext.lineTo(xspan * i + baseleft - 40 + lineoff + offsetpx, (max - min) * this.yspan + this.basetop);
      //console.log((max - min) * this.yspan);
      gridcontext.stroke();
      if (ioff % 6 == primaryscaleflag) {
        setrules(xspan * (i + 3) + baseleft - offsetpx);
      }
    }
  };
  setvertical = (_maxline: number, startposition: number) => {
    const { gridcontext, baseleft, min, max } = this;
    for (var i = 0; i < (max - min) / 10 + 1; i++) {
      gridcontext.beginPath();
      gridcontext.lineWidth = 0.8;
      if (i % 3 == 0) {
        gridcontext.strokeStyle = this.suit.ctgconfig.primarygrid;
      } else {
        gridcontext.strokeStyle = this.suit.ctgconfig.secondarygrid; // 横轴浅线
      }
      gridcontext.moveTo(baseleft, this.yspan * i * 10 + this.basetop);
      gridcontext.lineTo(_maxline, this.yspan * i * 10 + this.basetop);
      gridcontext.stroke();
    }
    for (var i = 0; i < 12; i++) {
      gridcontext.beginPath();
      gridcontext.lineWidth = 0.8;
      gridcontext.strokeStyle = this.suit.ctgconfig.primarygrid;
      if (i % 2 == 1) {
        gridcontext.strokeStyle = this.suit.ctgconfig.secondarygrid;
      }
      gridcontext.moveTo(baseleft, (max - min + i * 10) * this.yspan + this.scalespan + this.basetop);
      gridcontext.lineTo(_maxline, (max - min + i * 10) * this.yspan + this.scalespan + this.basetop);
      gridcontext.stroke();
    }
  };
  setscalestyle(context, color) {
    context.font = 'bold 10px consolas';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.font = 'bold 10px arial';
    context.fillStyle = color;
  }
  //设置坐标轴的显示min~max 0~100
  setrules = (x: number) => {
    const { min, max, gridcontext } = this;
    gridcontext.beginPath();
    this.setscalestyle(gridcontext, this.suit.ctgconfig.rule); // 轴坐标值
    for (var i = 1; i < (max - min) / 10 + 1; i++) {
      if (i % 3 == 1) {
        gridcontext.fillText(String(max - (i - 1) * 10), x, (i - 1) * 10 * this.yspan + 2);
      }
    }
    for (var i = 0; i < 11; i++) {
      if (i % 2 == 0) {
        gridcontext.fillText(String((10 - i) * 10), x, (max - min + i * 10) * this.yspan + this.basetop + this.scalespan);
      }
    }
    gridcontext.stroke();
  };
  showcur = (x: number, eventemit: boolean) => {
    const { suit, datacontext } = this;
    const { fhr, toco } = suit.data;
    let curpostion = 10;
    let curvalue = '-- --';
    let startx = x;
    let fontsize = Math.floor(suit.canvasline.height / 20);
    if (fontsize < 16)
      fontsize = 16;
    datacontext.clearRect(0, 0, fontsize * 10, fontsize * 5);
    datacontext.textAlign = 'left';
    datacontext.textBaseline = 'top'; 
    if (typeof (fhr[0]) == "undefined") {
      return;
    }
    if(x<suit.data.index+1){
      for(let i=startx;i>0;i--){
        if(typeof(fhr[0][x]) != "undefined"){
          x = i;
          break;
        }
      }
    }
    //console.log('showcur',x,suit.data.index,suit.data.csspan);
    //datacontext.font = 'bold ' + fontsize + 'px arial';
    let alarm = 0;
    let label = '';
    let span = '';
    let offsetfhr = '';
    //kisi 2019-12-08 fetalcount 修改为 fetal_num
    for (let i = 0; i < suit.data.fetal_num; i++) {
      label = '';
      offsetfhr = '';
      span = '';
      curvalue = '-- --';
      datacontext.font = 'bold ' + fontsize + 'px arial';
      datacontext.fillStyle = suit.ctgconfig.fhrcolor[i];
      if (typeof (fhr[i]) == "undefined") {
        return;
      }
      if (typeof (fhr[i][x]) != "undefined") {
        curvalue = fhr[i][x];
        if (curvalue == "0") {
          curvalue = '-- --';
        } else {
          datacontext.fillStyle = suit.ctgconfig.alarmcolor;
          if (suit.ctgconfig.alarm_enable && fhr[i][x] > suit.ctgconfig.alarm_high) {
            if (eventemit) {
              //console.log('心率过高',fhr[i][x] );
              this.suit.alarmOn('心率过高');
            }
            alarm = 1;
            this.suit.alarm = alarm;
          } else if (suit.ctgconfig.alarm_enable && fhr[i][x] < suit.ctgconfig.alarm_low) {
            if (eventemit) {
              //console.log('心率过低',fhr[i][x] );
              this.suit.alarmOn('心率过低');
            }
            alarm = 1;
            this.suit.alarm = alarm;
          }
          else {
            datacontext.fillStyle = suit.ctgconfig.fhrcolor[i];
          }
        }
      }
      if (alarm == 0 && suit.ctgconfig.alarm_enable && this.suit.alarm==1) {
        this.suit.alarmOff('');
        this.suit.alarm = alarm;
      }
      //kisi todo 2019-11-14 增加3胎的备注
      //kisi 2019-12-08 对象修改到 suit.data
      //console.log('fetalposition',suit.data.fetalposition);
      if (i == 0) {
        if(suit.data.fetalposition && typeof(suit.data.fetalposition.fhr1)!='undefined'){
          label = suit.data.fetalposition.fhr1;
        }
      } else if (i == 1) {
        if(suit.data.fetalposition && typeof(suit.data.fetalposition.fhr2)!='undefined'){
          label = suit.data.fetalposition.fhr2;
        }
        offsetfhr = ' ' + this.fhroffset;
      } else if (i == 2) {
        if(suit.data.fetalposition && typeof(suit.data.fetalposition.fhr3)!='undefined'){
          label = suit.data.fetalposition.fhr3;
        }
        offsetfhr = ' ' + -this.fhroffset;
      } else {
        label = '';
      }
      if (typeof (label) == 'undefined') {
        label = '';
      }
      if (label.length > 0 || i > 0) {
        span = '    ';
      }
      datacontext.fillText('FHR' + (i + 1) + span + ' : ' + curvalue, 10, curpostion);
      if (label.length > 0 || i > 0) {
        datacontext.font = 'bold ' + fontsize / 2 + 'px arial';
        datacontext.fillText(label, 10 + fontsize * 2.8, curpostion);
        datacontext.fillText(offsetfhr, 10 + fontsize * 2.8, curpostion + fontsize / 2);
      }
      curpostion += fontsize;
    }
    datacontext.fillStyle = suit.ctgconfig.tococolor;
    if (typeof (toco[x]) != "undefined") {
      curvalue = toco[x];
    } else {
      curvalue = '-- --';
    }
    datacontext.font = 'bold ' + fontsize + 'px arial';
    datacontext.fillText('TOCO: ' + curvalue, 10, curpostion);
  };
  showfm = postion => {
    const { gridcontext, max, min } = this;
    let yposition = this.yspan * (max - min) + this.basetop + 18;
    gridcontext.beginPath();
    gridcontext.strokeStyle = 'rgb(0,0,0)';
    gridcontext.lineWidth = 6;
    gridcontext.moveTo(postion, yposition);
    gridcontext.lineTo(postion, yposition + 6);
    gridcontext.stroke();
  };
  showselect = (start: number, end: number) => {
    const { suit, selectcontext } = this;
    // console.log('printin', suit.viewposition,start, end);
    let drawwidth = suit.canvasselect.width;
    selectcontext.clearRect(0, 0, drawwidth, suit.canvasselect.height);
    if (end == 0) {
      return;
    }
    //横向选择区域设置填充色
    let curstart = suit.viewposition < drawwidth * 2 ? 0 : (suit.viewposition - drawwidth * 2);
    if (suit.data.index <= drawwidth * 2) {
      end = end / 2;
    } else {
      end = (suit.viewposition - end) > 0 ? drawwidth - Math.floor((suit.viewposition - end) / 2) : drawwidth;
    }
    // if(end>drawwidth*2){     
    //   end = (suit.viewposition - end) > 0 ? drawwidth - Math.floor((suit.viewposition - end) / 2) : drawwidth;
    // }else{
    //   end = Math.floor(end/2);
    // }
    // if(end >= drawwidth * 2){
    // }else{
    //   end = Math.floor(end/2);
    // }
    start = start - curstart > 0 ? start - curstart : 0;
    // console.log('printts1',curstart, start/2, end);
    selectcontext.fillStyle = suit.ctgconfig.selectarea;
    selectcontext.fillRect(start / 2, this.basetop, end - start / 2, suit.canvasselect.height - this.basetop);
    selectcontext.beginPath();
    selectcontext.strokeStyle = 'rgb(10, 10, 20)';
    selectcontext.lineWidth = 6;
    selectcontext.moveTo(start / 2, this.basetop);
    selectcontext.lineTo(start / 2, this.suit.canvasselect.height);
    if (suit.selectend == 0) {
      selectcontext.moveTo(end, this.basetop);
      selectcontext.lineTo(end, this.suit.canvasselect.height);
    }
    // console.log('printts2',curstart, start/2, end);
    selectcontext.stroke();
  };
}
