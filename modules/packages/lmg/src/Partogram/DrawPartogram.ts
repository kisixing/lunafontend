type Canvas = HTMLCanvasElement;
type Ctx = CanvasRenderingContext2D;
interface I {
  canvas: Canvas;
  canvas2: Canvas;
  width: number;
  height: number;
}
export class DrawPartogram {
  canvas: Canvas;
  context: Ctx;
  canvas2: Canvas;
  context2: Ctx;
  width: number;
  height: number;
  maxindex = 750;

  lastx = 0;
  lasty = 0;
  baseleft = 50;
  basetop = 50;
  type = 0; //  0，伴行型 1,交叉型
  isshowevent = 1; //是否显示事件
  max = 210;
  start = '2019-09-01 05:30';
  demodata = [
    { checktime: '2019-09-01 07:01', cd: '3.5', df: '-2', event: '阴检' },
    { checktime: '2019-09-01 09:01', cd: '5', df: '0.5', event: '阴检' },
  ];
  lastcurrx = 0;
  currentx = 10;
  constructor(args: I) {
    const { canvas, canvas2, width, height } = args;
    Object.assign(this, {
      ...args,
      width,
      height,
      context: canvas.getContext('2d'),
      context2: canvas2.getContext('2d'),
    });
    canvas.width = width;
    canvas.height = height;
    canvas2.width = width;
    canvas2.height = height;
    this.drawgrid();
    this.printline();
    this.canvas.addEventListener(
      'click',
      e => {
        const p = this.getEventPosition(e);
        alert(p);
      },
      false
    );
  }
  showcur(x, fhr, toco) {
    const { context } = this;

    context.font = 'bold 10px consolas';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.font = 'bold 16px arial';
    context.fillStyle = 'blue';
    var title = document.getElementById('curtitle');
    title.innerHTML = 'FHR1:' + fhr + '  ' + 'TOCO:' + toco;
  }

  selectfrom(lowValue, highValue) {
    var choice = highValue - lowValue + 1;
    return Math.floor(Math.random() * choice + lowValue);
  }

  setrules(x, align) {
    const { canvas, context } = this;
    if (canvas == null) return false;

    context.font = 'bold 15px consolas';
    context.textAlign = align;
    context.textBaseline = 'top';
    context.fillStyle = 'rgba(0,51,102,1)'; // 轴数
    for (var i = 0; i < 11; i++) {
      context.fillText(String(10 - i), x, 45 + i * 40);
    }
    context.fillText('宫', 20, 100);
    context.fillText('颈', 20, 150);
    context.fillText('扩', 20, 200);
    context.fillText('张', 20, 250);
    context.fillText('(cm)', 32, 300);
    context.stroke();
    this.drawarc(15, 350);
    this.drawcross(930, 340);
  }

  drawarc(x, y) {
    const { context } = this;

    context.beginPath();
    context.arc(x, y, 8, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.strokeStyle = 'red';
    context.fill();
    context.stroke();
  }

  drawcross(x, y) {
    const { context } = this;

    context.beginPath();
    context.fillStyle = '#394a6d';
    context.strokeStyle = '#394a6d';
    context.lineWidth = 0;
    context.moveTo(x, y);
    context.lineTo(x + 5, y);
    context.lineTo(x + 20, y + 15);
    context.lineTo(x + 15, y + 15);
    context.lineTo(x, y);
    context.moveTo(x + 15, y);
    context.lineTo(x + 20, y);
    context.lineTo(x + 5, y + 15);
    context.lineTo(x, y + 15);
    context.lineTo(x + 15, y);
    context.fill();
  }

  showevent(x, y, data) {
    const { isshowevent, context, basetop } = this;

    if (isshowevent && data != '') {
      context.textAlign = 'left';
      context.textBaseline = 'top';
      context.font = 'bold 14px arial';
      context.fillStyle = 'black';
      for (let i = 0; i < data.length; i++) {
        context.fillText(data.charAt(i), x, basetop + y + 15 * i);
      }
    }
  }

  setrrules(x, align) {
    const { canvas, context, type } = this;

    if (canvas == null) return false;

    context.font = 'bold 15px consolas';
    context.textAlign = align;
    context.textBaseline = 'top';
    context.fillStyle = 'rgba(0,51,102,1)'; // 轴数
    for (var i = 0; i < 11; i++) {
      var scale = 0;
      let stringScale = '';
      if (type == 0) {
        scale = 5 - i;
      } else {
        scale = i - 5;
      }
      stringScale = String(scale);
      if (scale > 0) {
        stringScale = '+' + scale;
      }
      context.fillText(stringScale, x, 45 + i * 40);
    }
    context.fillText('胎', 930, 120);
    context.fillText('头', 930, 170);
    context.fillText('下', 930, 220);
    context.fillText('降', 930, 270);
    context.stroke();
  }

  sethrules() {
    const { canvas, context, baseleft } = this;

    if (canvas == null) return false;

    context.font = 'bold 15px consolas';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = 'rgba(0,51,102,1)'; // 轴数
    for (var i = 1; i < 25; i++) {
      context.fillText(String(i), baseleft + i * 35, 5 + 450);
    }
    context.stroke();
  }

  setvertical(maxline) {
    const { canvas, context, baseleft, basetop } = this;

    if (canvas == null) return false;
    context.beginPath();
    context.strokeStyle = 'rgb(150,150,150)'; // 横轴线
    context.lineWidth = 1;
    for (var i = 0; i < 10 + 1; i++) {
      context.moveTo(baseleft, basetop + 40 * i);
      context.lineTo(baseleft + 840, basetop + 40 * i);
    }
    context.stroke();
  }

  sethorizontal(length: number) {
    const { canvas, context, baseleft, basetop } = this;

    if (canvas == null) return false;
    context.beginPath();
    context.lineWidth = 1.1;
    context.strokeStyle = 'rgb(150,150,150)'; // 竖轴线
    for (var i = 0; i < 25; i++) {
      context.moveTo(35 * i + baseleft, basetop);
      context.lineTo(35 * i + baseleft, basetop + 400);
    }
    context.stroke();
  }

  converttime(start, current) {
    let interval = new Date(current).getTime() - new Date(start).getTime();
    interval = interval / 1000;
    return (interval / (60 * 60)).toFixed(1);
  }

  drawgrid() {
    this.sethorizontal(900);
    this.setvertical(900);
    this.setrules(40, 'right');
    this.setrrules(900, 'left');
    this.sethrules();
  }

  printline() {
    const { canvas2, context2, demodata, baseleft, basetop, start, type } = this;

    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    var lastx,
      lasty1,
      lasty2 = 0;
    for (var i = 0; i < demodata.length; i++) {
      var curx = baseleft + parseFloat(this.converttime(start, demodata[i].checktime)) * 35;
      var cury1 = basetop + (10 - Number(demodata[i].cd)) * 40;
      var cury2 = 0;
      if (type == 0) {
        cury2 = (5 - Number(demodata[i].df)) * 40;
      } else {
        cury2 = (5 + Number(demodata[i].df)) * 40;
      }
      this.drawarc(curx, cury1);
      this.drawcross(curx - 10, cury2);
      if (lastx != 0) {
        context2.beginPath();
        context2.lineWidth = 2.5;
        context2.strokeStyle = 'red';
        context2.moveTo(lastx, lasty1);
        context2.lineTo(curx, cury1);
        context2.stroke();
        context2.beginPath();
        context2.lineWidth = 2.5;
        context2.strokeStyle = '#394a6d';
        context2.moveTo(lastx, lasty2 + 5);
        context2.lineTo(curx, cury2 + 5);
        context2.stroke();
      }
      lastx = curx;
      lasty1 = cury1;
      lasty2 = cury2;
      this.showevent(curx, lasty1, demodata[i].event);
    }
  }

  setting(showtype) {
    this.isshowevent = Number(showtype);
    this.printline();
  }
  getEventPosition(ev) {
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
      x = ev.offsetX;
      y = ev.offsetY;
    }
    //return {x: x, y: y};
    return x + '-' + y;
  }
  formatDate(date: any, format) {
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
}
// var starttime = draw.formatDate(new Date(), 'HH:mm');
