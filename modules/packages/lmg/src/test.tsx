import Drwa8 from './draw88';
var rulercolor = 'rgb(67,205,128)';

export class P {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  isDown: boolean;

  suit: Suit;
  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,

    suit: Suit
  ) {
    this.suit = suit;
    this.draw(x, y, w, h, color);
  }
  draw(x: number, y: number, w: number, h: number, color: string) {
    const { context2 } = this.suit;
    context2.clearRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    context2.strokeStyle = this.color;
    context2.strokeRect(this.x, this.y, this.w, this.h);
  }
  OnMouseMove(evt) {
    //timeout = true;
    if (this.isDown) {
      var X = evt.layerX - this.w / 2;
      var Y = evt.layerY - this.h / 2;
      this.draw(X, 0, 6, 428, rulercolor);
    }
    clearInterval();
  }
  OnMouseDown(evt) {
    this.suit.btnaudiopause();
    var X = evt.layerX;
    var Y = evt.layerY;
    if (X < this.x + this.w && X > this.x) {
      if (Y < this.y + this.h && Y > this.y) {
        this.isDown = true;
      }
    } else {
      this.isDown = true;
    }
  }
  OnMouseUp(evt) {
    this.suit.btnaudiopause();
    this.isDown = false;
    let seconds = (evt.layerX / 75) * 60;
    if (seconds > this.suit.audio.duration) {
    } else {
      this.suit.showcur(evt.layerX, this.suit.fhr[evt.layerX], this.suit.toco[evt.layerX]);
      this.suit.currentx = evt.layerX;
      this.suit.audio.currentTime = seconds;
    }
  }
}

export class Suit {
  fhr = [];
  toco = [];
  fm = [];
  fmp = [];
  audio: HTMLAudioElement;
  canvas1: HTMLCanvasElement;
  context1: CanvasRenderingContext2D;
  canvas2: HTMLCanvasElement;
  context2: CanvasRenderingContext2D;
  title: HTMLElement;
  wrap: HTMLElement;
  p: P;
  currentx = 10;
  timeout: NodeJS.Timeout;
  constructor(
    data: object,
    audio: HTMLAudioElement,
    canvas1: HTMLCanvasElement,
    canvas2: HTMLCanvasElement,
    title: HTMLElement,
    wrap: HTMLElement
  ) {
    const rect = wrap.getBoundingClientRect();
    const { width, height } = rect;
    this.audio = audio;

    canvas1.width = width;
    canvas1.height = height;
    canvas2.width = width;
    canvas2.height = height;

    this.canvas1 = canvas1;
    this.canvas2 = canvas2;
    this.context1 = canvas1.getContext('2d');
    this.context2 = canvas2.getContext('2d');
    this.title = title;
    this.initfhrdata(data);

    new Drwa8(this).draw();
    var rulercolor = 'rgb(67,205,128)';

    this.p = new P(20, 0, 6, 428, rulercolor, this); // 竖向选择线
    audio.currentTime = 16;

    this.btnaudioplay();
  }

  initfhrdata(data) {
    // const keys = ['fhr','toco','fmp','fm']
    Object.keys(data).forEach(key => {
      let oridata = data[key] as string;
      if (!oridata) {
        return;
      }
      var push_account = oridata.length / 2;
      for (var i = 0; i < push_account; i++) {
        let hexBits = oridata.substring(0, 2);
        let data_to_push = parseInt(hexBits, 16);
        this[key].push(data_to_push);
        oridata = oridata.substring(2, oridata.length);
      }
    });
  }
  showcur(x, fhr, toco) {
    const { context1, title } = this;
    context1.font = 'bold 10px consolas';
    context1.textAlign = 'left';
    context1.textBaseline = 'top';
    context1.font = 'bold 16px arial';
    context1.fillStyle = 'blue';
    if (title) {
      title.innerHTML = 'FHR1:' + fhr + '  ' + 'TOCO:' + toco;
    }
  }
  movescoll() {
    const { currentx } = this;
    this.p.draw(currentx, 0, 6, 428, rulercolor);

    this.currentx = currentx + 1;
    this.showcur(currentx, this.fhr[currentx], this.toco[currentx]);
  }

  btnaudioplay() {
    const { timeout, audio, onStatusChange } = this;
    onStatusChange(true);
    audio;

    if (!timeout) {
      audio
        .play()
        .then(r => {})
        .catch(e => {
          console.error('err', e);
        });
      return (this.timeout = this.timerscoll(1000));
    }
  }

  btnaudiopause() {
    const { timeout, audio, onStatusChange } = this;
    onStatusChange(false);
    if (timeout) {
      clearInterval(timeout);
      this.timeout = null;
      audio.pause();
    }
  }

  timerscoll(dely): NodeJS.Timeout {
    let id = setInterval(() => {
      if (!this) {
        clearInterval(id);
      }
      this.movescoll();
    }, dely);
    return id;
  }
  onStatusChange(status: boolean): boolean | void {
    return status;
  }
}
