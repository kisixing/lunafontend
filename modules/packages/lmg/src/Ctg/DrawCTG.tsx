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
  alarmcontext: CanvasRenderingContext2D;
  baseleft: number;
  basetop: number;
  min: number;
  max: number;
  xspan: number;
  yspan: number;
  scalespan:number;
  starttime: string;
  fhroffset : number;
  constructor(suit: Suit, xspan = 40,yspan = 1,scalespan=30, fhroffset = -20 ,baseleft = 0,basetop = 10, min = 50, max = 210) {
    this.suit = suit;
    this.context = suit.context1;
    this.linecontext = suit.contextline;
    this.datacontext = suit.context2;
    this.alarmcontext = suit.contextalarm;
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
    const rect = this.suit.wrap.getBoundingClientRect();
    const { width, height } = rect;
    this.suit.canvasline.width = width;
    this.suit.canvasline.height = height;
    this.suit.canvasalarm.width = width;
    this.suit.canvasalarm.height = height;
    this.suit.canvas1.width = width;
    this.suit.canvas1.height = height;
    this.suit.canvas2.width = width;
    this.suit.canvas2.height = height;
    this.yspan = (height - this.scalespan - this.basetop) / (this.max + 100 -this.min );
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
    context.fillRect(0, 50 * this.yspan+this.basetop, cwidth, 50 * this.yspan);
    sethorizontal(cwidth, cur,drawtimespan);
    setvertical(cwidth, cur);
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
    const { fhr, toco,fm } = suit.data;
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
      //TODO : kisi 2019-10-08 待增加曲线颜色设置
      let alarmstate = 0;
      let fetaldraw = 0;
      let curfhroffset = 0;
      if(fetal == 1){
        curfhroffset = this.fhroffset;
      }else if(fetal == 2){
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
        if(i==start){       
          linecontext.moveTo(lastx, (max - fhr[fetal][start]-curfhroffset) * this.yspan+this.basetop);
        }
        if(fhr[fetal][inneri]){
          lasty = fhr[fetal][inneri];
        }else{
          continue;
        }
        if (lasty == 0) {
          if (inneri + 1 < length) {
            linecontext.moveTo(lastx, (max - fhr[fetal][inneri + 1]-curfhroffset) * this.yspan+this.basetop);
          }
        } else {
          // 增加 报警颜色处理
          if(lasty>160||lasty<110){
            let type = 1;
            if(alarmstate!=type){
              this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan+this.basetop);
              this.linecontext.stroke();
              this.linecontext.beginPath();             
              this.linecontext.strokeStyle = 'rgb(255, 1, 1)';
              alarmstate = 1;
            }
            this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan+this.basetop);
          }else{
            let type = 0; 
            if(alarmstate!=type){
              this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan+this.basetop);
              this.linecontext.stroke();
              this.linecontext.beginPath();             
              this.linecontext.strokeStyle = 'rgb(0,0,0)';
              alarmstate = 0;
            }
            this.linecontext.lineTo(lastx, (max - lasty - curfhroffset) * this.yspan+this.basetop);
          }
        }
      }     
      this.linecontext.stroke();
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
    //kisi 2019-10-10 fm 128 判断
    this.alarmcontext.clearRect(0, 0, suit.canvasalarm.width, suit.canvasalarm.height);
    for (var i = start; i < cur; i++) {

      if (i % 2 == 1) continue;
        if (start == 0) {
          lastx = Math.floor((suit.canvasline.width * 2 - cur + i) / 2);
        } else {
          lastx = Math.floor((i - start) / 2);
        }
    //     for (var fetal = 0; fetal < this.suit.fetalcount; fetal++) {
    //       //start 统一为画布的位置点，需根据显示采样率调整取值
    //       let fetaldraw = 0;
    //       let lasty = fhr[fetal][i];
    //       let curfhroffset = 0;
    //       if(fetal == 1){
    //         curfhroffset = this.fhroffset;
    //       }else if(fetal == 2){
    //         curfhroffset = -this.fhroffset;
    //       }
          
            
    //     }
      if (fm[i] == 128 || fm[i] == 1) {
        i = i +2;
        this.showfm(lastx);
      }
    }
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
    var offsetlpx = 40-Math.floor((length % xspan));
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
          let tmpyoffset = Math.floor((max-min)*this.yspan + this.scalespan/4)+this.basetop;
          //console.log(startposition,primaryscaleflag, ioff % 6,ioff,offsetmin,fMinutes);
          if (offseti > linecount - i - 2) {
            var flag = Math.ceil(ioff/6) % 2;
            if (flag == minflag) {
              var date = new Date(this.starttime);
              let timescale = formatDate(date.setMinutes(date.getMinutes() + fMinutes), 'HH:mm');
              if (startposition == 0 && i == 1) {
                context.fillText(timescale, length - offsetpx, tmpyoffset);
              } else {
                context.fillText(timescale, baseleft + xspan * i - offsetpx- offsetlpx - 10, tmpyoffset);
              }
            } else {
              fMinutes = Math.ceil(fMinutes);
              if (startposition == 0 && i == 0) {
                context.fillText(fMinutes + '分', baseleft - offsetpx,tmpyoffset);
              } else {
                context.fillText(
                  fMinutes + '分',
                  baseleft + xspan * i + baseleft - offsetpx - offsetlpx- 10,
                  tmpyoffset
                );
              }
            }
          }
        }
      }
      
      context.moveTo(xspan * i - offsetlpx+ baseleft - offsetpx, (max-min)*this.yspan + this.scalespan+this.basetop);
      context.lineTo(xspan * i - offsetlpx+baseleft - offsetpx, (max-min+100)*this.yspan + this.scalespan+this.basetop);
      context.moveTo(xspan * i - offsetlpx+baseleft - offsetpx, 0+this.basetop);
      context.lineTo(xspan * i - offsetlpx+baseleft - offsetpx, (max - min) * this.yspan+this.basetop);
      //console.log(length,offsetlpx,xspan * i - offsetlpx+ baseleft - offsetpx,offsetpx);
      context.stroke();
      if (ioff % 6 == primaryscaleflag) {
        setrules(xspan * (i+3) + baseleft-offsetlpx - offsetpx);
      }
    }
  };
  sethorizontalright = (length: number, startposition: number,drawtimespan=true) => {
    const { setrules, context, baseleft, min, max, xspan } = this;
    if(drawtimespan){
      this.starttime = this.suit.data.starttime;
    }
    if (this.starttime == '') {
      this.starttime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }
    var offsetpx = Math.floor(((length-startposition) % (xspan * 2)) / 2);
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
      context.beginPath();
      context.strokeStyle = this.suit.ctgconfig.secondarygrid;
      context.lineWidth = 0.8;
      if (ioff % 3 == primaryflag) {
        context.strokeStyle = this.suit.ctgconfig.primarygrid;
      }
      if (ioff % 6 == primaryscaleflag) {
        if(drawtimespan){      
          this.setscalestyle(context, this.suit.ctgconfig.scale);
          let fMinutes = Math.ceil(offsetmin - (1.0 * (linecount*2 - i)) / 3);
          let tmpyoffset = Math.floor((max-min)*this.yspan + this.scalespan/4)+this.basetop;
          if (offseti > linecount*2 - i - 2) {
            var flag = Math.ceil((ioff - 1) / 6) % 2;
            if (flag == 1) {
              var date = new Date(this.starttime);
              let timescale = formatDate(date.setMinutes(date.getMinutes() + fMinutes), 'HH:mm');
              if (startposition == 0 && i == 1) {
                context.fillText(timescale, length - offsetpx, tmpyoffset);
              } else {
                context.fillText(timescale, baseleft + xspan * i - offsetpx - 10, tmpyoffset);
              }
            } else {
              fMinutes = Math.ceil(fMinutes);
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
      context.moveTo(xspan * i + baseleft -40 +lineoff + offsetpx, (max-min)*this.yspan + this.scalespan+this.basetop);
      console.log(xspan * i + baseleft-40 +lineoff + offsetpx,lineoff,i);
      context.lineTo(xspan * i + baseleft-40 +lineoff + offsetpx, (max-min+100)*this.yspan + this.scalespan+this.basetop);
      context.moveTo(xspan * i + baseleft-40 +lineoff + offsetpx, 0+this.basetop);
      context.lineTo(xspan * i + baseleft-40  +lineoff + offsetpx, (max - min) * this.yspan+this.basetop);
      //console.log((max - min) * this.yspan);
      context.stroke();
      if (ioff % 6 == primaryscaleflag) {
        setrules(xspan * (i+3) + baseleft - offsetpx);
      }
    }
  };
  setvertical = (_maxline: number, startposition: number) => {
    const { context, baseleft, min, max } = this;
    for (var i = 0; i < (max - min) / 10 + 1; i++) {
      context.beginPath();
      context.lineWidth = 0.8;
      if (i % 3 == 0) {
        context.strokeStyle = this.suit.ctgconfig.primarygrid;
      } else {
        context.strokeStyle = this.suit.ctgconfig.secondarygrid; // 横轴浅线
      }
      context.moveTo(baseleft, this.yspan * i*10+this.basetop);
      context.lineTo(_maxline, this.yspan * i*10+this.basetop);
      context.stroke();
    }
    for (var i = 0; i < 12; i++) {
      context.beginPath();
      context.lineWidth = 0.8;
      context.strokeStyle = this.suit.ctgconfig.primarygrid;
      if (i % 2 == 1) {
        context.strokeStyle = this.suit.ctgconfig.secondarygrid;
      }
      context.moveTo(baseleft, (max - min + i*10 )* this.yspan +this.scalespan+this.basetop);
      context.lineTo(_maxline, (max - min + i*10 )* this.yspan +this.scalespan+this.basetop);
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
      if (i % 3 == 1) {
        context.fillText(String(max - (i-1) * 10), x, (i-1) * 10 * this.yspan + 2);
      }
    }
    for (var i = 0; i < 11; i++) {
      if (i % 2 == 0) {
        context.fillText(String((10 - i) * 10), x, (max-min+i*10) * this.yspan+this.basetop+this.scalespan);
      }
    }
    context.stroke();
  };
  showcur = (x:number) => {
    const { suit, datacontext } = this;
    const { fhr, toco } = suit.data;
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
      if(typeof(fhr[i][x]) != "undefined"){
        curvalue = fhr[i][x];
        if(fhr[i][x]>160||fhr[i][x]<110){
          datacontext.fillStyle = 'red';
        }
      }
      datacontext.fillText('FHR'+(i+1) +' : ' +curvalue, 10,curpostion);
      curpostion += fontsize;
    }
    datacontext.fillStyle = 'blue';
    if(typeof(toco[x]) != "undefined"){
      curvalue = toco[x];
    }else{
      curvalue = '-- --';
    }
    datacontext.fillText('TOCO: ' +curvalue, 10,curpostion);
  };
  showfm = postion => {
    const { context, max,min } = this;
    let yposition = this.yspan * (max-min) + this.basetop + 18;
    context.beginPath();
    context.strokeStyle = 'rgb(0,0,0)';
    context.lineWidth = 6;
    context.moveTo(postion, yposition);
    context.lineTo(postion, yposition+6);
    context.stroke();
  };
}
