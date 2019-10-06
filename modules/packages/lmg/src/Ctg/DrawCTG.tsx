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
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
    return dict[arguments[0]];
  });
}

export default class DrawCTG {
  suit: Suit;
  context: CanvasRenderingContext2D;
  linecontext: CanvasRenderingContext2D;
  datacontext: CanvasRenderingContext2D;
  baseleft: number;
  min: number;
  max: number;
  xspan: number;
  yspan: number;
  scalespan:number;
  starttime: string;
  constructor(suit: Suit, xspan = 40,yspan = 1,scalespan=40, baseleft = 0, min = 50, max = 210) {
    this.suit = suit;
    this.context = suit.context1;
    this.linecontext = suit.contextline;
    this.datacontext = suit.context2;
    this.xspan = xspan;
    this.yspan = yspan;
    this.scalespan = scalespan;
    this.baseleft = baseleft;
    this.min = min;
    this.max = max;
    this.starttime = suit.starttime;
  }
  resize() {
    const rect = this.suit.wrap.getBoundingClientRect();
    const { width, height } = rect;
    this.suit.canvasline.width = width;
    this.suit.canvasline.height = height;
    this.suit.canvas1.width = width;
    this.suit.canvas1.height = height;
    this.suit.canvas2.width = width;
    this.suit.canvas2.height = height;
    this.yspan = (height - this.scalespan) / (this.max + 100 -this.min );
    //console.log(this.suit.data,width,height,this.yspan);
    if(this.suit.data){
      this.drawdot(this.suit.viewposition);
    }else{
      this.drawgrid(width,false);
    }
  }
  drawgrid(cur,drawtimespan=true) {
    const { suit, sethorizontal, setvertical, context } = this;
    let cwidth = suit.canvasline.width;
    let cheight = suit.canvasline.height;
    context.clearRect(0, 0, cwidth, cheight);
    //横向选择区域设置填充色
    context.fillStyle = suit.ctgconfig.normalarea;
    context.fillRect(0, 50 * this.yspan, cwidth, 50 * this.yspan);
    sethorizontal(cwidth, cur,drawtimespan);
    setvertical(cwidth, cur);
  }
  /*
   * 绘制非实时数据
   */
  drawline(cur) {
    const { suit, linecontext, baseleft, max } = this;
    const { fhr, toco } = suit;
    var lastx = 0;
    var lasty = 0;
    linecontext.clearRect(0, 0, suit.canvasline.width, suit.canvasline.height);
    linecontext.beginPath();
    linecontext.strokeStyle = 'rgb(0,0,0)';
    linecontext.lineWidth = 0.8;
    lastx = 0;
    lasty = 0;
    let len = fhr.length;
    var limit = len - cur > suit.canvasline.width ? suit.canvasline.width : len - cur;
    for (var i = 0; i < limit; i++) {
      lastx = i + baseleft;
      lasty = fhr[cur + i];
      if (lasty == 0) {
        if (cur + i + 1 < length) {
          linecontext.moveTo(lastx, (max - fhr[cur + i + 1]) * this.yspan);
        }
      } else {
        if (i > 1 && lasty - fhr[cur + i - 1] > 30) {
          linecontext.moveTo(lastx, (max - fhr[cur + i]) * this.yspan);
        } else if (i > 1 && fhr[cur + i - 1] - lasty > 30) {
          linecontext.moveTo(lastx, (max - fhr[cur + i]) * this.yspan);
        } else {
          linecontext.lineTo(lastx, (max - lasty) * this.yspan);
        }
      }
    }
    lastx = 0;
    lasty = 0;
    linecontext.moveTo(lastx, this.suit.canvasline.height);
    for (var i = 0; i < limit; i++) {
      lastx = i + baseleft;
      lasty = toco[cur + i];
      linecontext.lineTo(lastx, this.suit.canvasline.height - lasty * this.yspan);
    }
    linecontext.stroke();
  }

  drawdotright(cur) {
    const { suit, linecontext, baseleft, max } = this;
    const { fhr, toco } = suit;
    var lastx = 0;
    var lasty = 0;
    linecontext.clearRect(0, 0, suit.canvasline.width, suit.canvasline.height);
    linecontext.beginPath();
    linecontext.strokeStyle = 'rgb(0,0,0)';
    linecontext.lineWidth = 0.8;
    lastx = 0;
    lasty = 0;
    // let len = fhr.length;
    // var limit = len - cur > suit.canvasline.width ? suit.canvasline.width : len - cur;
    for (var i = 0; i < cur; i++) {
      lastx = i + baseleft;
      lasty = fhr[i];
      if (lasty == 0) {
        if (cur + i + 1 < length) {
          linecontext.moveTo(lastx, (max - fhr[i + 1]) * this.yspan);
        }
      } else {
        if (i > 1 && lasty - fhr[i - 1] > 30) {
          linecontext.moveTo(lastx, (max - fhr[i]) * this.yspan);
        } else if (i > 1 && fhr[i - 1] - lasty > 30) {
          linecontext.moveTo(lastx, (max - fhr[i]) * this.yspan);
        } else {
          linecontext.lineTo(lastx, (max - lasty) * this.yspan);
        }
      }
    }
    lastx = 0;
    lasty = 0;
    linecontext.moveTo(lastx, this.suit.canvasline.height);
    for (var i = 0; i < cur; i++) {
      lastx = i + baseleft;
      lasty = toco[i];
      linecontext.lineTo(lastx, this.suit.canvasline.height - lasty * this.yspan);
    }
    linecontext.stroke();
    /*
    linecontext.moveTo(lastx, 240);
    for (var i = 1; i < fmp.length; i++) {
      lastx = i + baseleft;
      lasty = fmp[i];
      linecontext.lineTo(lastx, 240 - lasty * this.yspan);
    }
    linecontext.stroke();
    for (var i = 1; i < fm.length; i++) {
      if (fm[i] == 1) {
        showfm(i);
      }
    }
    */
  }
  drawdot(cur) {
    const { suit, linecontext, max } = this;
    const { fhr, toco } = suit;
    //cur = suit.data.index;
    this.drawgrid(cur);
    this.showcur(cur);
    var lastx = 0;
    var lasty = 0;
    linecontext.clearRect(0, 0, suit.canvasline.width, suit.canvasline.height);
    linecontext.beginPath();
    linecontext.strokeStyle = 'rgb(0,0,0)';
    linecontext.lineWidth = 0.8;
    // 0.5 s 一个点,一个像素画两个点
    var start = cur - suit.canvasline.width * 2 > 0 ? cur - suit.canvasline.width * 2 : 0;
    for (var fetal = 0; fetal < this.suit.fetalcount; fetal++) {
      //start 统一为画布的位置点，需根据显示采样率调整取值
      //TODO : kisi 增加多胎偏移处理
      let fetaldraw = 0;
      for (let i = start; i < cur; i++) {
        if (i % 2 == 1) continue;
        if (start == 0) {
          lastx = Math.floor((suit.canvasline.width * 2 - cur + i) / 2);
        } else {
          lastx = Math.floor((i - start) / 2);
        }
        let inneri = i;
        
        if(fhr[fetal][inneri]){
          lasty = fhr[fetal][inneri];
        }else{
          continue;
        }
        if (lasty == 0) {
          if (inneri + 1 < length) {
            linecontext.moveTo(lastx, (max - fhr[fetal][inneri + 1]) * this.yspan);
          }
        } else {
          if (inneri > 1 && lasty - fhr[fetal][inneri - 1] > 30) {
            linecontext.moveTo(lastx, (max - fhr[fetal][inneri]) * this.yspan);
          } else if (inneri > 1 && fhr[fetal][inneri + 1] - lasty > 30) {
            linecontext.moveTo(lastx, (max - fhr[fetal][inneri]) * this.yspan);
          } else {
            if(fetaldraw<fetal){
              linecontext.moveTo(lastx, (max - lasty) * this.yspan);
              fetaldraw = fetal;
            }
            linecontext.lineTo(lastx, (max - lasty) * this.yspan);
          }
        }
      }
    }
    lastx = 0;
    lasty = 0;
    for (var i = start; i < cur; i++) {
      if (i % 2 == 1) continue;
      if (start == 0) {
        lastx = Math.floor((suit.canvasline.width * 2 - cur + i) / 2);
      } else {
        lastx = Math.floor((i - start) / 2);
      }
      if (toco[i]) {
        if (lasty == 0) {
          lasty = toco[i];
          linecontext.moveTo(lastx, this.suit.canvasline.height - lasty * this.yspan);
        } else {
          lasty = toco[i];
        }
        linecontext.lineTo(lastx, this.suit.canvasline.height - lasty * this.yspan);
      } else {
        linecontext.moveTo(lastx, this.suit.canvasline.height);
      }
    }
    linecontext.stroke();
  }
  sethorizontal = (length: number, startposition: number,drawtimespan=true) => {
    const { setrules, context, baseleft, min, max, xspan } = this;
    if(drawtimespan){
      this.starttime = this.suit.data.starttime;
    }
    if (this.starttime == '') {
      this.starttime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }
    var offsetpx = Math.floor((startposition % (xspan * 2)) / 2);
    var offseti = Math.floor(startposition / (xspan * 2));
    //kisi 2019-10-02 开始时间点 ，因为现在间隔0.5s取点
    var offsetmin = startposition / (xspan * 2 * 3);
    //kisi 2019-10-06 修改为ceil方法使得网格走纸不延时
    var linecount = Math.ceil(length / (xspan * 2));
    var primaryflag = linecount % 3;
    var primaryscaleflag = linecount % 6;
    for (var i = linecount * 2; i > 0; i--) {
      var ioff = i + offseti;
      context.beginPath();
      context.strokeStyle = this.suit.ctgconfig.secondarygrid;
      context.lineWidth = 0.8;
      if (ioff % 3 == primaryflag) {
        context.strokeStyle = this.suit.ctgconfig.primarygrid;
      }
      if (ioff % 6 == primaryscaleflag) {
        if(drawtimespan){      
          this.setscalestyle(context, this.suit.ctgconfig.scale);
          let fMinutes = Math.floor(offsetmin - (1.0 * (linecount - i)) / 3);
          let tmpyoffset = Math.floor((max-min)*this.yspan + this.scalespan/4);
          if (offseti > linecount - i - 2) {
            var flag = Math.ceil((ioff - 1) / 6) % 2;
            if (flag == 1) {
              var date = new Date(this.starttime);
              let timescale = formatDate(date.setMinutes(date.getMinutes() + fMinutes), 'HH:mm');
              //console.log(timescale);
              if (startposition == 0 && i == 1) {
                context.fillText(timescale, length - offsetpx, tmpyoffset);
              } else {
                context.fillText(timescale, baseleft + xspan * i - offsetpx - 10, tmpyoffset);
              }
            } else {
              fMinutes = Math.floor(fMinutes);
              if (startposition == 0 && i == 0) {
                context.fillText(fMinutes + '分', baseleft - offsetpx,tmpyoffset);
              } else {
                context.fillText(
                  fMinutes + '分',
                  baseleft + xspan * i + baseleft - offsetpx - 10,
                  tmpyoffset
                );
              }
            }
          }
        }
      }
      context.moveTo(xspan * i + baseleft - offsetpx, (max-min)*this.yspan + this.scalespan);
      context.lineTo(xspan * i + baseleft - offsetpx, (max-min+100)*this.yspan + this.scalespan);
      context.moveTo(xspan * i + baseleft - offsetpx, 0);
      context.lineTo(xspan * i + baseleft - offsetpx, (max - min) * this.yspan);
      //console.log((max - min) * this.yspan);
      context.stroke();
      if (ioff % 9 == 3) {
        setrules(xspan * i + baseleft - offsetpx);
      }
    }
  };
  setvertical = (_maxline: number, startposition: number) => {
    const { context, baseleft, min, max } = this;
    for (var i = 1; i < (max - min) / 10 + 1; i++) {
      context.beginPath();
      context.lineWidth = 0.8;
      if (i % 2 == 1) {
        context.strokeStyle = this.suit.ctgconfig.secondarygrid;
      } else {
        context.strokeStyle = this.suit.ctgconfig.primarygrid; // 横轴线
      }
      context.moveTo(baseleft, this.yspan * i*10);
      context.lineTo(_maxline, this.yspan * i*10);
      context.stroke();
    }
    for (var i = 0; i < 12; i++) {
      context.beginPath();
      context.lineWidth = 0.8;
      context.strokeStyle = this.suit.ctgconfig.primarygrid;
      if (i % 2 == 1) {
        context.strokeStyle = this.suit.ctgconfig.secondarygrid;
      }
      context.moveTo(baseleft, (max - min + i*10 )* this.yspan +this.scalespan);
      context.lineTo(_maxline, (max - min + i*10 )* this.yspan +this.scalespan);
      context.stroke();
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
    const { min, max, context } = this;
    context.beginPath();
    this.setscalestyle(context, this.suit.ctgconfig.rule); // 轴坐标值
    for (var i = 1; i < (max - min) / 10 + 1; i++) {
      if (i % 2 == 1) {
        context.fillText(String(max - i * 10), x, i * 10 * this.yspan - 8);
      }
    }
    for (var i = 0; i < 11; i++) {
      if (i % 2 == 0) {
        context.fillText(String((10 - i) * 10), x, (max-min+i*10) * this.yspan+this.scalespan - 8);
      }
    }
    context.stroke();
  };
  showcur = (x:number) => {
    const { suit, datacontext } = this;
    const { fhr, toco } = suit;
    let curpostion = 10;
    let curvalue = '-- --';
    let fontsize = Math.floor(suit.canvasline.height/20);
    if(fontsize<16)
      fontsize = 16;
    datacontext.clearRect(0,0,fontsize*10,fontsize*5);
    datacontext.textAlign = 'left';
    datacontext.textBaseline = 'top';
    datacontext.font = 'bold '+fontsize+'px arial';
    datacontext.fillStyle = 'blue';
    for(let i=0;i<suit.fetalcount;i++){
      if(fhr[i][x]){
        curvalue = fhr[i][x];
      }
      datacontext.fillText('fhr'+(i+1) +' : ' +curvalue, 10,curpostion);
      curpostion += fontsize;
    }
    if(toco[x]){
      curvalue = toco[x];
    }else{
      curvalue = '-- --';
    }
    datacontext.fillText('toco: ' +curvalue, 10,curpostion);
  };
  showfm = postion => {
    const { context, max } = this;
    context.beginPath();
    context.strokeStyle = 'rgb(153,254,153)';
    context.lineWidth = 4;
    context.moveTo(postion, max + 44);
    context.lineTo(postion, max + 52);
    context.stroke();
  };
}
