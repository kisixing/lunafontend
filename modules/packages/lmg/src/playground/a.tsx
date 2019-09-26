const BASE_INEVAL = 128;
const adu = 52;
const samplingrate = 128;
const points_one_times = 8;
const gride_width = 25;
const gx = points_one_times * ((gride_width * 5) / samplingrate);
const x_start = 25;
const draw_lines_index = [0, 1, 2];
const isstop = true;
const last_points = [
  [25, 100],
  [25, 200],
  [25, 300],
  [25, 400],
  [25, 500],
  [25, 600],
  [25, 700],
  [25, 800],
  [25, 900],
  [25, 1000],
  [25, 1100],
  [25, 1200],
];
// let ecg_scope = 1;
// let current_times = 0;
// let max_times = 135;
// let canvas = null;
// let canvasline = null;
// let ctx = null;
// let linectx = null;
// let width = 0;
// let height = 0;
// let current_time_millis = 0;

const loopmill = 62;

class Queue {
  B = [];
  capacity: number;
  EnQueue(C) {
    if (C == null) {
      return -1;
    }
    if (this.B.length >= this.capacity) {
      this.B.shift();
    }
    this.B.push(C);
  }
  DeQueue() {
    if (this.B.length == 0) {
      return null;
    } else {
      return this.B.shift();
    }
  }
  GetSize() {
    return this.B.length;
  }
  GetHead() {
    if (this.B.length == 0) {
      return null;
    } else {
      return this.B[0];
    }
  }
  MakeEmpty() {
    this.B.length = 0;
  }
  IsEmpty() {
    if (this.B.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}
type Canvas = HTMLCanvasElement;
type Ctx = CanvasRenderingContext2D;
interface I {
  MultiParam: number[];
  Ple: number[];
  Tre: number[];
  canvas: Canvas;
  canvasline: Canvas;

  ecg_scope?: number;
  current_times?: number;
  max_times?: number;
  width?: number;
  height?: number;
}
export class DrawEcg {
  oQueue = new Queue();
  MultiParam: number[];
  Ple: number[];
  Tre: number[];
  canvas: Canvas;
  canvasline: Canvas;
  ctx: Ctx;
  linectx: Ctx;

  ecg_scope? = 1;
  current_times? = 0;
  max_times? = 135;
  width? = 0;
  height? = 0;
  current_time_millis? = 0;

  constructor(args: I) {
    const { canvas, canvasline } = args;
    const { width, height } = canvas;
    Object.assign(this, {
      ...args,
      width,
      height,
      ctx: canvas.getContext('2d'),
      linectx: canvasline.getContext('2d'),
    });

    this.ecg();
  }

  ecg() {
    this.addfilltext();
    this.initparm();
    this.Convert16Scale();
    this.loop();
  }
  Convert16Scale() {
    this.adddata(null, 1, 8, 128);
  }
  addfilltext() {
    const { height, ctx } = this;
    const A = ['I', 'II', 'III'];
    const C = (height - 10) / 3;
    let D = 0;
    for (let E = 0; E < draw_lines_index.length; E++) {
      D = D + C;
      ctx.font = 'bold 14px';
      ctx.fillText('' + A[draw_lines_index[E]] + '', 10, D);
    }
  }

  adddata(F, C, E, J) {
    const { MultiParam, Ple, Tre } = this;
    for (let index = 0; index < 360; index++) {
      const G = new Array(3);
      G[0] = (MultiParam[(index * 2) % 375] + 128) * 0.1;
      G[1] = Ple[index % 60];
      G[2] = Tre[index % 180];
      this.oQueue.EnQueue(G);
    }
    return;
  }
  initparm() {
    const { width, linectx } = this;
    if (width < 150) {
      alert(' width is limited');
    } else {
      this.max_times = Math.floor((width - 50) / gx);
    }
    linectx.strokeStyle = '#9d6003';
  }
  loop() {
    const y_starts = this.GetYStarts(12);

    const A = new Date().getTime();
    this.current_time_millis = A;
    this.draw(
      y_starts,
      BASE_INEVAL,
      adu,
      samplingrate,
      this.max_times,
      points_one_times,
      this.linectx,
      draw_lines_index
    );
    if (isstop) {
      setTimeout(this.loop.bind(this), loopmill);
      const C = new Date().getTime();
      const B = C - this.current_time_millis + 1;
      if (B < loopmill) {
      }
    }
    if (this.oQueue.IsEmpty()) {
      this.Convert16Scale();
    }
  }

  draw(Q, B, P, N, G, H, A, E) {
    const { oQueue } = this;
    let areaedge = 200;
    this.current_times = this.current_times % G;
    if (oQueue.IsEmpty()) {
      return;
    }
    if (oQueue.GetSize() < H) {
      return;
    }
    this.clearcanvans(this.current_times, H, N, A);
    const F = [];
    for (let J = 0; J < H; J++) {
      F.push(oQueue.DeQueue());
    }
    A.beginPath();
    for (let J = 0; J < 3; J++) {
      for (let K = 0; K < F.length; K++) {
        const O = F[K];
        const C = O[E[J]];
        const I = (K * (gride_width * 5)) / N;
        let M;
        A.strokeStyle = '#9d6003';
        A.beginPath();
        if (this.ecg_scope != 0) {
          M = Math.abs(C) * (P / (gride_width * 2)) * this.ecg_scope;
        } else {
          M = (Math.abs(C) * (P / (gride_width * 2))) / 2;
        }
        const L = x_start + this.current_times * H * ((gride_width * 5) / N);
        if (K == 0) {
          if (this.current_times != 0) {
            A.moveTo(last_points[J][0], last_points[J][1]);
            var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
            A.lineTo(last_points[J][0], D);
            last_points[J][0] = last_points[J][0];
            last_points[J][1] = D;
          } else {
            var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
            console.log(D);
            A.moveTo(x_start, D);
            last_points[J][0] = x_start;
            last_points[J][1] = D;
          }
        } else {
          A.moveTo(last_points[J][0], D);
          var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
          A.lineTo(L + I, D);
          last_points[J][0] = L + I;
          last_points[J][1] = D;
        }

        if (J == 1) {
          const linear = A.createLinearGradient(L + I, D, L + I, D + 50);
          linear.addColorStop(0, 'rgba(0,255,0,0.6)');
          //linear.addColorStop(1,"rgba(255,255,255,0)");
          A.strokeStyle = linear;
          A.beginPath();
          A.moveTo(L + I, D);
          A.lineTo(L + I, areaedge);
        }
        A.stroke();
      }
    }
    A.stroke();
    this.current_times++;
  }
  clearcanvans(B, F, C, D) {
    const A = F * ((gride_width * 5) / C);
    const E = x_start + B * A;
    if (B != 0) {
      D.clearRect(E, 0, 20, this.height);
    } else {
      D.clearRect(E - 10, 0, E + 20, this.height);
    }
  }
  GetYStarts(C) {
    const { height } = this;
    const B = [];
    if (C >= 3) {
      for (let A = 0; A < C; A++) {
        if (height < 480) {
          B[A] = 100 + A * 100;
        } else {
          B[A] = 100 + A * 100;
        }
      }
    } else {
      if (C == 2) {
        if (height < 480) {
          B[0] = 130;
          B[1] = 300;
        } else {
          B[0] = 130;
          B[1] = 370;
        }
      } else {
        if (C == 1) {
          B[0] = 200;
        } else {
          return null;
        }
      }
    }
    return B;
  }
}
