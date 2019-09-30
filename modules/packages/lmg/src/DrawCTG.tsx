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
  baseleft: number;
  min: number;
  max: number;
  starttime: string;
  constructor(suit: Suit, baseleft = 0, min = 50, max = 210) {
    this.suit = suit;
    this.context = suit.context1;
    this.linecontext = suit.contextline;
    this.baseleft = baseleft;
    this.min = min;
    this.max = max;
    this.starttime = suit.starttime;
  }
  drawgrid(cur) {
    const { suit, sethorizontal, setvertical, context } = this;
    const { toco } = suit;
    let len = toco.length;
    let cwidth = suit.canvasline.width;
    let cheight = suit.canvasline.height;
    if (len < 1500) {
      context.clearRect(0, 0, cwidth, cheight);
      //横向选择区域设置填充色
      context.fillStyle = suit.ctgconfig.normalarea;
      context.fillRect(0, 50 * 1.5, cwidth, 50 * 1.5);
      sethorizontal(1500, cur);
      setvertical(1500, cur);
    } else {
      context.clearRect(0, 0, cwidth, cheight);
      //横向选择区域设置填充色
      context.fillStyle = suit.ctgconfig.normalarea;
      context.fillRect(0, 50 * 1.5, cwidth, 50 * 1.5);
      sethorizontal(cwidth, cur);
      setvertical(cwidth, cur);
    }
  }
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
          linecontext.moveTo(lastx, (max - fhr[cur + i + 1]) * 1.5);
        }
      } else {
        if (i > 1 && lasty - fhr[cur + i - 1] > 30) {
          linecontext.moveTo(lastx, (max - fhr[cur + i]) * 1.5);
        } else if (i > 1 && fhr[cur + i - 1] - lasty > 30) {
          linecontext.moveTo(lastx, (max - fhr[cur + i]) * 1.5);
        } else {
          linecontext.lineTo(lastx, (max - lasty) * 1.5);
        }
      }
    }
    lastx = 0;
    lasty = 0;
    linecontext.moveTo(lastx, 420);
    for (var i = 0; i < limit; i++) {
      lastx = i + baseleft;
      lasty = toco[cur + i];
      linecontext.lineTo(lastx, 420 - lasty * 1.5);
    }
    linecontext.stroke();
    /*
    linecontext.moveTo(lastx, 240);
    for (var i = 1; i < fmp.length; i++) {
      lastx = i + baseleft;
      lasty = fmp[i];
      linecontext.lineTo(lastx, 240 - lasty * 1.5);
    }
    linecontext.stroke();
    for (var i = 1; i < fm.length; i++) {
      if (fm[i] == 1) {
        showfm(i);
      }
    }
    */
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
          linecontext.moveTo(lastx, (max - fhr[i + 1]) * 1.5);
        }
      } else {
        if (i > 1 && lasty - fhr[i - 1] > 30) {
          linecontext.moveTo(lastx, (max - fhr[i]) * 1.5);
        } else if (i > 1 && fhr[i - 1] - lasty > 30) {
          linecontext.moveTo(lastx, (max - fhr[i]) * 1.5);
        } else {
          linecontext.lineTo(lastx, (max - lasty) * 1.5);
        }
      }
    }
    lastx = 0;
    lasty = 0;
    linecontext.moveTo(lastx, 420);
    for (var i = 0; i < cur; i++) {
      lastx = i + baseleft;
      lasty = toco[i];
      linecontext.lineTo(lastx, 420 - lasty * 1.5);
    }
    linecontext.stroke();
    /*
    linecontext.moveTo(lastx, 240);
    for (var i = 1; i < fmp.length; i++) {
      lastx = i + baseleft;
      lasty = fmp[i];
      linecontext.lineTo(lastx, 240 - lasty * 1.5);
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
    this.drawgrid(cur);
    var lastx = 0;
    var lasty = 0;
    linecontext.clearRect(0, 0, suit.canvasline.width, suit.canvasline.height);
    linecontext.beginPath();
    linecontext.strokeStyle = 'rgb(0,0,0)';
    linecontext.lineWidth = 0.8;
    lastx = 0;
    lasty = 0;
    for (var fetal = 0; fetal < this.suit.fetalcount; fetal++) {
      var start = cur - suit.canvasline.width > 0 ? cur - suit.canvasline.width : 0;
      for (var i = start; i < cur; i++) {
        if (start == 0) {
          lastx = suit.canvasline.width - cur + i;
        } else {
          lastx = i - start;
        }
        lasty = fhr[fetal][i];
        if (lasty == 0) {
          if (cur + i + 1 < length) {
            linecontext.moveTo(lastx, (max - fhr[fetal][i + 1]) * 1.5);
          }
        } else {
          if (i > 1 && lasty - fhr[fetal][i - 1] > 30) {
            linecontext.moveTo(lastx, (max - fhr[fetal][i]) * 1.5);
          } else if (i > 1 && fhr[fetal][i - 1] - lasty > 30) {
            linecontext.moveTo(lastx, (max - fhr[fetal][i]) * 1.5);
          } else {
            linecontext.lineTo(lastx, (max - lasty) * 1.5);
          }
        }
      }
    }
    lastx = 0;
    lasty = 0;
    for (var i = start; i < cur; i++) {
      if (start == 0) {
        lastx = suit.canvasline.width - cur + i;
      } else {
        lastx = i - start;
      }
      if (lasty == 0) {
        lasty = toco[i];
        linecontext.moveTo(lastx, 420 - lasty * 1.5);
      } else {
        lasty = toco[i];
      }
      linecontext.lineTo(lastx, 420 - lasty * 1.5);
    }
    linecontext.stroke();
    /*
    linecontext.moveTo(lastx, 240);
    for (var i = 1; i < fmp.length; i++) {
      lastx = i + baseleft;
      lasty = fmp[i];
      linecontext.lineTo(lastx, 240 - lasty * 1.5);
    }
    linecontext.stroke();
    for (var i = 1; i < fm.length; i++) {
      if (fm[i] == 1) {
        showfm(i);
      }
    }
    */
  }
  sethorizontal = (length: number, startposition: number) => {
    const { setrules, context, baseleft, min, max } = this;
    var offsetpx = startposition % 25;
    var offseti = Math.floor(startposition / 25);
    var offsetmin = startposition / 75;
    var linecount = Math.ceil(length / 25);
    var primaryflag = linecount % 3;
    var primaryscaleflag = linecount % 6;
    for (var i = linecount; i > 0; i--) {
      var ioff = i + offseti;
      context.beginPath();
      context.strokeStyle = this.suit.ctgconfig.secondarygrid;
      context.lineWidth = 0.8;
      if (ioff % 3 == primaryflag) {
        context.strokeStyle = this.suit.ctgconfig.primarygrid;
      }
      if (ioff % 6 == primaryscaleflag) {
        this.setscalestyle(context, this.suit.ctgconfig.scale);
        var fMinutes = Math.floor(offsetmin - (1.0 * (linecount - i)) / 3);
        if (offseti > linecount - i - 2) {
          var flag = Math.ceil((ioff - 1) / 6) % 2;
          // console.log(flag);
          if (flag == 1) {
            var date = new Date(this.starttime);
            var timescale = formatDate(date.setMinutes(date.getMinutes() + fMinutes), 'HH:mm');
            if (startposition == 0 && i == 1) {
              context.fillText(timescale.toString(), length - offsetpx, max + 30);
            } else {
              // console.log(baseleft + (linecount - i) * 25 - 10 - offsetpx);
              context.fillText(
                timescale.toString(),
                baseleft + 25 * i + baseleft - offsetpx - 10,
                max + 30
              );
            }
          } else {
            fMinutes = Math.floor(fMinutes);
            if (startposition == 0 && i == 0) {
              context.fillText(fMinutes + '分', baseleft - offsetpx, max + 30);
            } else {
              context.fillText(
                fMinutes + '分',
                baseleft + 25 * i + baseleft - offsetpx - 10,
                max + 30
              );
            }
          }
        }
      }
      context.moveTo(25 * i + baseleft - offsetpx, max + 60);
      context.lineTo(25 * i + baseleft - offsetpx, max + 60 + 150);

      context.moveTo(25 * i + baseleft - offsetpx, 0);
      context.lineTo(25 * i + baseleft - offsetpx, ((max - min) * 15) / 10);
      context.stroke();
      if (ioff % 9 == 3) {
        setrules(25 * i + baseleft - offsetpx);
      }
    }
  };
  setvertical = (_maxline: number, startposition: number) => {
    const { context, baseleft, min, max } = this;
    let lines = (max - min) / 10 + 11;
    let vspan = this.suit.canvas2.height / lines;

    for (var i = 1; i < (max - min) / 10 + 1; i++) {
      context.beginPath();
      context.lineWidth = 0.8;
      if (i % 2 == 1) {
        context.strokeStyle = this.suit.ctgconfig.secondarygrid;
      } else {
        context.strokeStyle = this.suit.ctgconfig.primarygrid; // 横轴线
      }
      context.moveTo(baseleft, vspan * i);
      context.lineTo(_maxline, vspan * i);
      context.stroke();
    }
    for (var i = 0; i < 12; i++) {
      context.beginPath();
      context.lineWidth = 0.8;
      context.strokeStyle = this.suit.ctgconfig.primarygrid;
      if (i % 2 == 1) {
        context.strokeStyle = this.suit.ctgconfig.secondarygrid;
      }
      context.moveTo(baseleft, max + 60 + i * vspan);
      context.lineTo(_maxline, max + 60 + i * vspan);
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
  setrules = (x: number) => {
    const { min, max, context } = this;
    context.beginPath();
    this.setscalestyle(context, this.suit.ctgconfig.rule); // 轴坐标值
    for (var i = 1; i < (max - min) / 10 + 1; i++) {
      if (i % 2 == 1) {
        context.fillText(String(max - i * 10), x, i * 15 - 8);
      }
    }
    for (var i = 0; i < 11; i++) {
      if (i % 2 == 0) {
        context.fillText(String((10 - i) * 10), x, max + 60 + i * 15 - 8);
      }
    }
    context.stroke();
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
