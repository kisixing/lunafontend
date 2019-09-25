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
  constructor(suit: Suit, baseleft = 0, min = 50, max = 210) {
    this.suit = suit;
    this.context = suit.context1;
    this.linecontext = suit.contextline;
    this.baseleft = baseleft;
    this.min = min;
    this.max = max;
  }

  draw() {
    const { suit, sethorizontal, setvertical, context,linecontext, baseleft, max, showfm } = this;
    var lastx = 0;
    var lasty = 0;
    const { fhr, toco, fm, fmp } = suit;
    let len = fhr.length;
    if (len < 1500) {
      sethorizontal(1500);
      setvertical(1500);
    } else {
      // canvas.width = len;
      // canvas2.width = len;
      context.fillStyle = 'rgb(224,255,255)'; //横向选择区域设置填充色
      context.fillRect(0, 50 * 1.5, len, 50 * 1.5);
      sethorizontal(len);
      setvertical(len);
    }
    linecontext.beginPath();
    linecontext.strokeStyle = 'rgb(0,0,0)';
    linecontext.lineWidth = 0.8;
    lastx = 0;
    lasty = 0;
    for (var i = 1; i < len; i++) {
      lastx = i + baseleft;
      lasty = fhr[i];
      if (lasty == 0) {
        if (i + 1 < length) {
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
    for (var i = 1; i < toco.length; i++) {
      lastx = i + baseleft;
      lasty = toco[i];
      linecontext.lineTo(lastx, 420 - lasty * 1.5);
    }
    lastx = 0;
    lasty = 0;
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
  }
  sethorizontal = (length: number) => {
    const { setrules, context, baseleft, min, max } = this;
    var starttime = formatDate(new Date(), 'HH:mm');
    context.strokeStyle = '#eee'; // 竖轴线
    for (var i = 1; i < length / 25; i++) {
      context.beginPath();
      context.strokeStyle = 'rgba(144, 159, 180,1)';
      context.lineWidth = 0.6;
      if (i % 3 == 0) {
        context.strokeStyle = 'rgba(144, 159, 180,1)';
        context.lineWidth = 1.2;
      }
      if (i % 6 == 1) {
        context.font = 'bold 10px consolas';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.font = 'bold 10px arial';
        context.fillStyle = 'black';
        var flag = ((i - 1) / 6) % 2;
        if (flag == 0) {
          context.fillText(starttime, i * 25 - 20, max + 30);
        } else {
          context.fillText((i - 1) / 3 + '分', i * 25 - 20, max + 30);
        }
      }
      context.moveTo(25 * i + baseleft, max + 60);
      context.lineTo(25 * i + baseleft, max + 60 + 150);
      
      context.moveTo(25 * i + baseleft, 0);
      context.lineTo(25 * i + baseleft, ((max - min) * 15) / 10);
      context.stroke();      
      if (i % 9 == 1) {
        setrules(25 * i);
      }
    }
  };
  setvertical = (_maxline?: any) => {
    const { context, baseleft, min, max } = this;
    let lines = (max - min) / 10 + 11;
    console.log(lines);
    let vspan = this.suit.canvas2.height/lines;
    console.log(vspan);
    for (var i = 1; i < (max - min) / 10 + 1; i++) {
      context.beginPath();
      context.strokeStyle = 'rgba(0,102,204,0.4)'; // 横轴线
      context.lineWidth = 0.5;
      if (i % 2 == 1) {
        context.lineWidth = 1;
      }
      context.moveTo(baseleft, vspan * i);
      context.lineTo(_maxline, vspan * i);
      context.stroke();
    }
    for (var i = 0; i < 12; i++) {
      context.beginPath();
      context.strokeStyle = 'rgba(0,102,204,0.4)'; // 横轴线
      context.lineWidth = 0.5;
      if (i % 2 == 0) {
        context.lineWidth = 1;
      }
      context.moveTo(baseleft, max + 60 + i * vspan);
      context.lineTo(_maxline, max + 60 + i * vspan);
      context.stroke();
    }
  };
  setrules = (x: number) => {
    const { min, max, context } = this;
    context.beginPath();
    context.font = 'bold 10px consolas';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillStyle = 'rgba(0,51,102,1)'; // 轴坐标值
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
