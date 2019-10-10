import { Drawer } from "../interface";
import Queue from "./Queue";
const BASE_INEVAL = 128;
const adu = 52;
const samplingrate = 128;
const points_one_times = 8;
const gride_width = 25;
const gx = points_one_times * ((gride_width * 5) / samplingrate);
const x_start = 25;
// const draw_lines_index = [0, 1, 2];
const ruler = [80, 80, 80, 80, 80, 80, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 80, 80, 80, 80, 80, 80];
let isstop = true;
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
const MultiParam = [
  597,
  556,
  507,
  416,
  352,
  287,
  191,
  123,
  30,
  -44,
  -91,
  -107,
  -114,
  -115,
  -111,
  -106,
  -95,
  -91,
  -80,
  -75,
  -68,
  -60,
  -58,
  -57,
  -57,
  -58,
  -59,
  -59,
  -58,
  -58,
  -56,
  -56,
  -55,
  -55,
  -56,
  -57,
  -56,
  -56,
  -55,
  -55,
  -53,
  -53,
  -53,
  -52,
  -52,
  -53,
  -54,
  -53,
  -52,
  -52,
  -51,
  -51,
  -50,
  -49,
  -49,
  -50,
  -50,
  -49,
  -49,
  -49,
  -48,
  -46,
  -46,
  -46,
  -46,
  -46,
  -46,
  -46,
  -46,
  -46,
  -45,
  -44,
  -44,
  -42,
  -42,
  -44,
  -44,
  -42,
  -42,
  -42,
  -39,
  -37,
  -35,
  -31,
  -27,
  -24,
  -14,
  -9,
  2,
  8,
  16,
  24,
  31,
  42,
  49,
  57,
  64,
  71,
  80,
  88,
  96,
  100,
  105,
  114,
  119,
  126,
  130,
  135,
  140,
  143,
  150,
  154,
  156,
  157,
  157,
  156,
  156,
  157,
  160,
  162,
  164,
  164,
  164,
  162,
  159,
  155,
  149,
  144,
  141,
  140,
  139,
  136,
  134,
  128,
  124,
  118,
  108,
  101,
  92,
  84,
  78,
  68,
  58,
  47,
  37,
  27,
  14,
  7,
  -8,
  -15,
  -28,
  -35,
  -40,
  -50,
  -54,
  -63,
  -67,
  -71,
  -74,
  -75,
  -75,
  -76,
  -76,
  -75,
  -74,
  -75,
  -74,
  -73,
  -73,
  -73,
  -72,
  -72,
  -72,
  -72,
  -72,
  -72,
  -72,
  -71,
  -71,
  -70,
  -68,
  -68,
  -68,
  -67,
  -68,
  -68,
  -68,
  -68,
  -67,
  -66,
  -63,
  -63,
  -61,
  -61,
  -61,
  -63,
  -60,
  -60,
  -59,
  -59,
  -58,
  -59,
  -60,
  -60,
  -60,
  -60,
  -58,
  -57,
  -57,
  -57,
  -56,
  -56,
  -55,
  -54,
  -53,
  -54,
  -53,
  -53,
  -53,
  -54,
  -52,
  -52,
  -51,
  -50,
  -50,
  -51,
  -50,
  -50,
  -50,
  -50,
  -49,
  -49,
  -49,
  -49,
  -48,
  -48,
  -47,
  -47,
  -47,
  -46,
  -45,
  -45,
  -45,
  -46,
  -46,
  -46,
  -46,
  -46,
  -46,
  -46,
  -46,
  -45,
  -45,
  -44,
  -44,
  -44,
  -44,
  -44,
  -42,
  -40,
  -39,
  -39,
  -38,
  -38,
  -38,
  -39,
  -39,
  -38,
  -38,
  -38,
  -37,
  -37,
  -37,
  -36,
  -36,
  -37,
  -35,
  -33,
  -28,
  -23,
  -14,
  0,
  7,
  16,
  24,
  34,
  40,
  49,
  57,
  61,
  68,
  69,
  69,
  70,
  71,
  72,
  73,
  72,
  70,
  68,
  67,
  60,
  55,
  48,
  42,
  34,
  24,
  15,
  -1,
  -8,
  -18,
  -25,
  -30,
  -35,
  -37,
  -40,
  -42,
  -42,
  -42,
  -42,
  -40,
  -39,
  -40,
  -40,
  -39,
  -39,
  -39,
  -38,
  -38,
  -37,
  -36,
  -36,
  -36,
  -36,
  -37,
  -37,
  -37,
  -36,
  -36,
  -36,
  -35,
  -36,
  -35,
  -35,
  -35,
  -35,
  -35,
  -34,
  -34,
  -34,
  -33,
  -34,
  -34,
  -35,
  -38,
  -48,
  -53,
  -58,
  -70,
  -77,
  -88,
  -92,
  -91,
  -77,
  -54,
  25,
  78,
  137,
  233,
  301,
  404,
  468,
  523,
  583,
  600,
];
export const Ple = [
  48,
  47,
  46,
  45,
  45,
  43,
  42,
  40,
  38,
  36,
  34,
  32,
  31,
  30,
  30,
  30,
  30,
  30,
  31,
  31,
  31,
  31,
  29,
  28,
  28,
  26,
  24,
  23,
  21,
  20,
  19,
  17,
  16,
  15,
  13,
  12,
  12,
  11,
  10,
  9,
  7,
  6,
  6,
  6,
  6,
  6,
  7,
  10,
  13,
  18,
  24,
  30,
  40,
  44,
  49,
  49,
  49,
  49,
  49,
  47,
];
const loopmill = 100;


type Canvas = HTMLCanvasElement;
type Ctx = CanvasRenderingContext2D;
interface I {
  MultiParam: number[];
  Ple: number[];
  Tre: number[];
  canvas: Canvas;
  canvasline: Canvas;
  canvasmonitor: Canvas;
  ecg_scope?: number;
  current_times?: number;
  max_times?: number;
  width?: number;
  height?: number;
  data: any
}
export class DrawEcg implements Drawer {
  static Queue: typeof Queue = Queue
  oQueue = new Queue();
  values = [100, 120, 37.5, 38, 50, 80, '100/69/120'];
  MultiParam: number[];
  Ple: number[];
  Tre: number[];
  canvas: Canvas;
  canvasline: Canvas;
  canvasmonitor: Canvas;
  ctx: Ctx;
  linectx: Ctx;
  datactx: Ctx;
  ecg_scope?= 1;
  current_times?= 0;
  max_times?= 135;
  width?= 0;
  height?= 0;
  current_time_millis?= 0;
  start?=NaN;

  constructor(args: I) {
    const { canvas, canvasline, canvasmonitor } = args;
    const { width, height } = canvas;
    Object.assign(this, {
      ...args,
      width,
      height,
      ctx: canvas.getContext('2d'),
      linectx: canvasline.getContext('2d'),
      datactx: canvasmonitor.getContext('2d'),
    });
    this.ecg();
  }
  init(data) {
    console.log('ecg', data)
    if(data){
      //this.oQueue = data.ecg;
      this.current_time_millis = 0;
      isstop=true;
      this.loop();
    }
  }
  resize() {

  }
  destroy() {
    isstop = false;
  }
  ecg() {
    this.addfilltext();
    this.initparm();
  }
  Convert16Scale() {
    //this.adddata(null, 1, 8, 128);
    this.adddatatest(null, 1, 8, 128);
  }
  addfilltext() {
    const { height, ctx } = this;
    // const A = ['I', 'II', 'III'];
    // const C = (height - 10) / 3;
    // let D = 0;
    // for (let E = 0; E < draw_lines_index.length; E++) {
    //   D = D + C;
    //   ctx.font = 'bold 14px';
    //   ctx.fillText('' + A[draw_lines_index[E]] + '', 10, D);
    // }
    //kisi 2019-10-03 add ruler
    let scale = height / 100;
    ctx.strokeStyle = '#006003';
    ctx.beginPath();
    ctx.moveTo(x_start * 2, ruler[0] * scale);
    for (let i = 0; i < ruler.length; i++) {
      ctx.lineTo(i + x_start * 2, ruler[i] * scale);
    }
    ctx.stroke();
  }

  DrawDatatext() {
    const { datactx } = this;
    if (this.canvasmonitor.height > 60) {
      const V = (this.canvasmonitor.height - 10) / 5;
      const H = (this.canvasmonitor.width - 10) / 14;
      let size = V > H ? H : V;
      let D = 10;
      // 设置颜色 字体
      datactx.fillStyle = "#000";
      datactx.font = size + "px bold 黑体";
      // 设置水平对齐方式
      datactx.textAlign = 'right';
      datactx.textAlign = "center";
      // 设置垂直对齐方式
      datactx.textBaseline = "middle";
      datactx.clearRect(0, 0, this.canvasmonitor.width, this.canvasmonitor.height);
      const keys = ['脉率', '血氧', '体温', '心率', '呼吸', '血压(S/D/M)'];
      datactx.fillText(' ' + keys[0] + '', size * 2, D);
      datactx.fillText(' ' + this.values[0] + '', size * 4, D);
      datactx.fillText(' ' + keys[1] + '', size * 8, D);
      datactx.fillText(' ' + this.values[1] + '', size * 10, D);
      datactx.fillText(' ' + keys[2] + '', size * 2, D + V);
      datactx.fillText(' ' + this.values[2] + '', size * 4, D + V);
      datactx.fillText(' ' + this.values[3] + '', size * 8, D + V);
      datactx.fillText(' ' + keys[3] + '', size * 2, D + 2 * V);
      datactx.fillText(' ' + this.values[4] + '', size * 4, D + 2 * V);
      datactx.fillText(' ' + keys[4] + '', size * 8, D + 2 * V);
      datactx.fillText(' ' + this.values[5] + '', size * 10, D + 2 * V);
      datactx.fillText(' ' + keys[5] + '', size * 4, D + 3 * V);
      datactx.fillText(' ' + this.values[6] + '', size * 10, D + 3 * V);
    } else {
      let size = 16;
      let D = 10;
      // 设置颜色 字体
      datactx.fillStyle = "#000";
      datactx.font = size + "px bold 黑体";
      // 设置水平对齐方式
      datactx.textAlign = 'right';
      datactx.textAlign = "center";
      // 设置垂直对齐方式
      datactx.textBaseline = "middle";
      datactx.clearRect(0, 0, this.canvasmonitor.width, this.canvasmonitor.height);
      const keys = ['脉率', '血氧', '体温', '心率', '呼吸', '血压(S/D/M)'];
      datactx.fillText(' ' + keys[0] + '', size * 2, D);
      datactx.fillText(' ' + this.values[0] + '', size * 4, D);
      datactx.fillText(' ' + keys[1] + '', size * 8, D);
      datactx.fillText(' ' + this.values[1] + '', size * 10, D);
      datactx.fillText(' ' + keys[2] + '', size * 12, D);
      datactx.fillText(' ' + this.values[2] + '', size * 14, D);
      datactx.fillText(' ' + this.values[3] + '', size * 18, D);
      datactx.fillText(' ' + keys[3] + '', size * 32, D);
      datactx.fillText(' ' + this.values[4] + '', size * 24, D);
      datactx.fillText(' ' + keys[4] + '', size * 28, D);
      datactx.fillText(' ' + this.values[5] + '', size * 30, D);
      datactx.fillText(' ' + keys[5] + '', size * 34, D);
      datactx.fillText(' ' + this.values[6] + '', size * 40, D);
    }
  }

  //kisi 2019-10-03
  //根据ws数据压入队列
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
  //kisi 2019-10-03
  //根据ws数据压入队列
  adddatatest(F, C, E, J) {
    // const { MultiParam } = this;
     for (let index = 0; index < 360; index++) {
       this.oQueue.EnQueue((MultiParam[(index * 2) % 375] + 128) * 0.1);
     }
    // return;
  }
  initparm() {
    const { width, linectx } = this;
    if (width < 150) {
      alert(' width is limited');
    } else {
      this.max_times = Math.floor((width - 25) / gx);
    }
    linectx.strokeStyle = '#9d6003';
  }
  loop() {
    const y_starts = this.GetYStarts(12);
    this.DrawDatatext();
    const A = new Date().getTime();
    this.current_time_millis = A;
    // this.draw(
    //   y_starts,
    //   BASE_INEVAL,
    //   adu,
    //   samplingrate,
    //   this.max_times,
    //   points_one_times,
    //   this.linectx,
    //   draw_lines_index
    // );
    if(!isNaN(this.start) || this.oQueue.GetSize() > points_one_times*5){
      this.start = 1;
      this.drawsingle(y_starts, adu, samplingrate, this.max_times, this.linectx);
    }
    if (isstop) {
      setTimeout(this.loop.bind(this), loopmill);
      // const C = new Date().getTime();
      // const B = C - this.current_time_millis + 1;
      // if (B < loopmill) {
      // }
    }
    if (this.oQueue.IsEmpty()) {
      this.Convert16Scale();
    }
  }
  // 绘制单心电走纸
  drawsingle(Q, P, N, G, A) {
    const { oQueue } = this;
    //2019-10-03 kisi 根据容器调整高度
    let scale = this.height / 100;
    this.current_times = this.current_times % G;
    if (oQueue.IsEmpty()) {
      this.start = NaN;
      return;
    }
    if (oQueue.GetSize() < points_one_times) {
      this.start = NaN;
      return;
    }
    this.clearcanvans(this.current_times, points_one_times, N, A);
    const F = [];
    for (let J = 0; J < points_one_times; J++) {
      F.push(oQueue.DeQueue());
    }
    A.beginPath();
    for (let K = 0; K < F.length; K++) {
      const C = F[K]- BASE_INEVAL;
      const I = (K * (gride_width * 5)) / N;
      let M;
      A.strokeStyle = '#9d6003';
      //A.beginPath();
      if (this.ecg_scope != 0) {
        M = Math.abs(C) * (P / (gride_width * 2)) * this.ecg_scope;
      } else {
        M = (Math.abs(C) * (P / (gride_width * 2))) / 2;
      }
      const L = x_start + this.current_times * points_one_times * ((gride_width * 5) / N);
      if (K == 0) {
        if (this.current_times != 0) {
          A.moveTo(last_points[0][0], last_points[0][1]);
          var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
          A.lineTo(last_points[0][0], D);
          last_points[0][0] = last_points[0][0];
          last_points[0][1] = D;
        } else {
          var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
          A.moveTo(x_start, D);
          last_points[0][0] = x_start;
          last_points[0][1] = D;
        }
      } else {
        A.moveTo(last_points[0][0], D);
        var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
        A.lineTo(L + I, D);
        last_points[0][0] = L + I;
        last_points[0][1] = D;
      }
    }
    A.stroke();
    this.current_times++;
  }
  draw(Q, B, P, N, G, H, A, E) {
    const { oQueue } = this;
    let areaedge = 200;
    //2019-10-03 kisi 根据容器调整高度
    let scale = this.height / 300;
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
            A.moveTo(last_points[J][0], last_points[J][1] * scale);
            var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
            A.lineTo(last_points[J][0], D * scale);
            last_points[J][0] = last_points[J][0];
            last_points[J][1] = D;
          } else {
            var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
            console.log(D);
            A.moveTo(x_start, D * scale);
            last_points[J][0] = x_start;
            last_points[J][1] = D;
          }
        } else {
          A.moveTo(last_points[J][0], D * scale);
          var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
          A.lineTo(L + I, D * scale);
          last_points[J][0] = L + I;
          last_points[J][1] = D;
        }
        if (J == 1) {
          const linear = A.createLinearGradient(L + I, D, L + I, D + 50);
          linear.addColorStop(0, 'rgba(0,255,0,0.6)');
          //linear.addColorStop(1,"rgba(255,255,255,0)");
          A.strokeStyle = linear;
          A.beginPath();
          A.moveTo(L + I, D * scale);
          A.lineTo(L + I, areaedge * scale);
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
