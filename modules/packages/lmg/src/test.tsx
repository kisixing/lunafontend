let audio = document.getElementById('audio') as HTMLAudioElement;
let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;

let context = null;
let context2 = null;
import draw88 from './draw88';

export function btnaudioplay() {
  audio.play();
  timeout = false;
  timerscoll(1000);
}
export function btnaudiopause() {
  timeout = true;
  audio.pause();
}
var timeout = false; //启动及关闭按钮
function timerscoll(dely) {
  if (timeout) {
    return;
  }
  movescoll();
  setTimeout(timerscoll, 800); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
}

var fhr = [];
var toco = [];
var fm = [];
var fmp = [];

var rulercolor = 'rgb(67,205,128)';

export function handleServiceData(data) {
  initfhrdata(data.fhr, fhr);
  initfhrdata(data.toco, toco);
  initfhrdata(data.fm, fmp);
  initfhrdata(data.fmp, fm);
}
//胎心数据处理
export function initfhrdata(oridata, arrdata) {
  if (!oridata) {
    return;
  }
  var push_account = oridata.length / 2;
  for (var i = 0; i < push_account; i++) {
    let data_to_push = oridata.substring(0, 2);
    data_to_push = parseInt(data_to_push, 16);
    arrdata.push(data_to_push);

    oridata = oridata.substring(2, oridata.length);
  }
}
var lastx = 0;
var lasty = 0;
var baseleft = 0;
var min = 50;
var max = 210;
var seconds;
var currentx = 10;

function showcur(x, fhr, toco) {
  context = canvas.getContext('2d');
  context.font = 'bold 10px consolas';
  context.textAlign = 'left';
  context.textBaseline = 'top';
  context.font = 'bold 16px arial';
  context.fillStyle = 'blue';
  var title = document.getElementById('curtitle');
  title.innerHTML = 'FHR1:' + fhr + '  ' + 'TOCO:' + toco;
  //context.fillText('FHR1:'+fhr, x-50,5);
  //context.fillText('TOCO:'+toco, x-50,20);
}

export function draw8() {
  draw88(canvas, canvas2, fhr, toco, fm, fmp, context, lastx, baseleft, min, max, lasty);
}

function movescoll() {
  Draw.move(currentx);
  currentx = currentx + 1;
  showcur(currentx, fhr[currentx], toco[currentx]);
}

var Draw = {
  init: function() {
    this.cObj = context2;
    this.event();
    this.draw.prototype = this;

    this.p = new this.draw(20, 0, 6, 428, rulercolor); // 竖向选择线
    audio.currentTime = 16;
    /*             window.setTimeout(function(){
                           this.p.draw(45,145,70,70,"red")
                       }.bind(this),2000)*/
  },
  draw: function(x, y, w, h, color) {
    this.cObj.clearRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.cObj.strokeStyle = this.color;
    this.cObj.strokeRect(this.x, this.y, this.w, this.h);
  },
  move: function(x) {
    this.p.draw(x, 0, 6, 428, rulercolor);
  },
  OnMouseMove: function(evt) {
    //timeout = true;
    if (this.p.isDown) {
      var X = evt.layerX - this.p.w / 2;
      var Y = evt.layerY - this.p.h / 2;
      this.p.draw(X, 0, 6, 428, rulercolor);
    }
    clearInterval();
  },
  OnMouseDown: function(evt) {
    btnaudiopause();
    var X = evt.layerX;
    var Y = evt.layerY;
    if (X < this.p.x + this.p.w && X > this.p.x) {
      if (Y < this.p.y + this.p.h && Y > this.p.y) {
        this.p.isDown = true;
      }
    } else {
      this.p.isDown = true;
    }
  },
  OnMouseUp: function(evt) {
    btnaudiopause();
    this.p.isDown = false;
    seconds = (evt.layerX / 75) * 60;
    if (seconds > audio.duration) {
      //audio.pause();
      //btnaudiopause();
    } else {
      showcur(evt.layerX, fhr[evt.layerX], toco[evt.layerX]);
      currentx = evt.layerX;
      audio.currentTime = seconds;

      /*
              audio.play();
              timeout = false;
              timerscoll(1000);
              */
      //btnaudioplay();
      //setInterval("movescoll()", 1000);//1000为1秒钟 ,重入不准
    }
  },
  event: function() {
    canvas2.addEventListener('mousedown', this.OnMouseDown.bind(this), false);
    canvas2.addEventListener('mousemove', this.OnMouseMove.bind(this), false);
    canvas2.addEventListener('mouseup', this.OnMouseUp.bind(this), false);
  },
};
export const initDom = () => {
  audio = document.getElementById('audio') as HTMLAudioElement;
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
  context = canvas.getContext('2d');
  context2 = canvas2.getContext('2d');
};
export const init = Draw.init.bind(Draw);
