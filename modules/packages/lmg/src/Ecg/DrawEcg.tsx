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
const ruler = [64, 64, 64, 64, 64, 64, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 64, 64, 64, 64, 64, 64];
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
    if(data){
      this.oQueue = data.ecg;
      this.values = data.ecgdata;
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
    //this.adddatatest(null, 1, 8, 128);
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
    let scale = 1;
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
      const V = (this.canvasmonitor.height - 10) / 10;
      const H = (this.canvasmonitor.width - 10) / 20;
      let size = V > H ? H : V;
      console.log('ecg',V,H,size);
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
    // let scale = this.height / 100;
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
      const I = K * (gride_width * 5 / N);
      let M;
      A.strokeStyle = '#9d6003';
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
      for (let A = 0; A < C; A++) {
        if (height < 480) {
          B[A] = -BASE_INEVAL/2 + A * 100;
        } else {
          B[A] = -BASE_INEVAL/2 + A * 100;
        }
      }
    return B;
  }
}
