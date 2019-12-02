import Draw from "../Draw";
import Queue from "./Queue";
import { _R } from "@lianmed/utils";
import { ICacheItem } from "../services/types";
const BASE_INEVAL = 128;
const adu = 52;
const samplingrate = 90;
const points_one_times = 8;
const gride_width = 40;
const gx = points_one_times * ((gride_width * 5) / samplingrate);
const x_start = 25;
// const law_index = 1;
// const draw_lines_index = [0, 1, 2];
const ruler = [64, 64, 64, 64, 64, 64, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 64, 64, 64, 64, 64, 64];
let isstop = true;
let loopmill = 90;
type Canvas = HTMLCanvasElement;
type Ctx = CanvasRenderingContext2D;
interface I {
  wrap: HTMLDivElement;
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
enum displayMode {
  canvas,
  text
}

export class DrawEcg extends Draw {
  data: ICacheItem
  mode: displayMode = displayMode.canvas
  static Queue: typeof Queue = Queue
  wrap: HTMLDivElement;
  MultiParam: number[];
  Ple: number[];
  Tre: number[];
  canvas: Canvas;
  canvasline: Canvas;
  canvasmonitor: Canvas;
  ctx: Ctx;
  linectx: Ctx;
  datactx: Ctx;
  ecg_scope?= 2;
  current_times?= 0;
  max_times?= 135;
  current_time_millis?= 0;
  start?= NaN;
  intervalIds: NodeJS.Timeout[] = [];
  last_points: number[];
  constructor(args: I) {
    super()
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
    if (data) {
      this.data = data
      this.current_time_millis = 0;
      this.current_times = 0;
      isstop = false;
      //this.loop();
      // console.log("loop");
      this.last_points = [];
      this.timerEcg(loopmill);
      console.log(this);
    }
  }
  _resize() {
    const { height, width } = this
    this.mode = height <= 50 ? displayMode.text : displayMode.canvas
    Object.assign(this.canvas, { width, height })
    Object.assign(this.canvasline, { width, height })
    Object.assign(this.canvasmonitor, { width, height })
    this.addfilltext();
    this.initparm();
  }
  destroy() {
    isstop = false;
    this.intervalIds.forEach(_ => clearInterval(_));
    this.canvas = null;
    this.canvasline = null;
    this.canvasmonitor = null;
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
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 14px';
    ctx.fillText('' + 'I' + '', 10, 10);
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
    const { datactx, data, height, width } = this;
    const keys = ['脉率bpm', '血氧%', '体温°C', '心率bpm', '呼吸（次/分）', '血压(S/D/M)mmHg'];
    const v = Object.assign(Array(7).fill('--'), data.ecgdata)
    v[2] = `${v[2]} ~ ${v[3]}`
    v.splice(3, 1)
    const entries = _R.zip(keys, v)
    datactx.clearRect(0, 0, width, height);

    if (height > 60) {
      const V = (height) / 6;
      let size = V / 2;
      let D = 10;
      datactx.fillStyle = "#000";
      datactx.font = size - 2 + "px bold 黑体";
      datactx.textAlign = 'right';
      datactx.textAlign = "center";
      datactx.textBaseline = "middle";

      entries.forEach(([k, v], i) => {
        const isRight = i > 2
        const x = (isRight ? 10 : 26)
        const y = D + (i % 3) * V + 3 * size
        datactx.fillText(`${k}`, width - size * x, y);
        datactx.fillText(`${v}`, width - size * (x - 8), y);
      })

    } else {
      const d = width / 6
      let size = 16;
      let D = 14;
      datactx.fillStyle = "#eee";
      datactx.fillRect(0, 0, width, height)
      datactx.fillStyle = "#666";
      datactx.font = size + "px bold 黑体";
      datactx.textAlign = "center";
      datactx.textBaseline = "middle";

      entries.forEach(([k, v], i) => {
        const x = 20 + d * i
        datactx.fillText(`${k}`, x, D);
        datactx.fillText(`${v || ''}`, x, 2.5 * D);
      })

    }
  }

  //kisi 2019-10-03
  //根据ws数据压入队列
  // adddata(F, C, E, J) {
  //   const { MultiParam, Ple, Tre } = this;
  //   for (let index = 0; index < 360; index++) {
  //     const G = new Array(3);
  //     G[0] = (MultiParam[(index * 2) % 375] + 128) * 0.1;
  //     G[1] = Ple[index % 60];
  //     G[2] = Tre[index % 180];
  //     this.oQueue.EnQueue(G);
  //   }
  //   return;
  // }

  initparm() {
    const { canvasline, linectx } = this;
    if (canvasline.width < 150) {
      // alert(' width is limited');
    } else {
      this.max_times = Math.floor((canvasline.width - 25) * 0.6 / gx);
    }
    // console.log('ecg-width', canvasline.width);
    linectx.strokeStyle = '#9d6003';
    this.current_times = 0;
  }

  timerEcg(dely) {
    let id = setInterval(() => {
      if (!this) {
        console.log('ecg','clear interval');
        clearInterval(id);
      }
      this.DrawDatatext();
      const A = new Date().getTime();
      this.current_time_millis = A;
      console.log('ecg','interval',);
      if (!isNaN(this.start) || this.data.ecg.GetSize() > points_one_times * 5) {
        this.start = 1;
        this.drawsingle();
      }
    }, dely);
    this.intervalIds.push(id);
  }

  // loop() {
  //   const y_starts = this.GetYStarts(12);
  //   this.DrawDatatext();
  //   const A = new Date().getTime();
  //   this.current_time_millis = A;
  //   if (!isNaN(this.start) || this.oQueue.GetSize() > points_one_times * 5) {
  //     this.start = 1;
  //     this.drawsingle(y_starts, adu, samplingrate, this.max_times, this.linectx);
  //   }
  //   if (isstop) {
  //     setTimeout(this.loop.bind(this), loopmill);
  //     // const C = new Date().getTime();
  //     // const B = C - this.current_time_millis + 1;
  //     // if (B < loopmill) {
  //     // }
  //   }
  //   if (this.oQueue.IsEmpty()) {
  //     this.Convert16Scale();
  //   }
  // }
  // 绘制单心电走纸
  drawsingle() {
    const { last_points, max_times, linectx } = this;
    const y_starts = this.GetYStarts(12);
    //2019-10-03 kisi 根据容器调整高度
    // let scale = this.height / 100;
    if (isstop) {
      return;
    }
    isstop = true;
    this.current_times = this.current_times % max_times;
    if (this.data.ecg.IsEmpty()) {
      this.start = NaN;
      isstop = false;
      return;
    }
    if (this.data.ecg.GetSize() < points_one_times*5) {
      this.start = NaN;
      isstop = false;
      return;
    }
    this.clearcanvans(this.current_times, points_one_times, samplingrate, linectx);
    let F = [];
    let invalid = 0;
    for (let J = 0; J < points_one_times; J++) {
      let ecgdot = this.data.ecg.DeQueue();
      if (ecgdot == 1) {
        invalid++;
      } else {
        invalid = 0;
      }
      if (ecgdot > BASE_INEVAL) {
        ecgdot = ecgdot - BASE_INEVAL;
      } else if (ecgdot > 0) {
        ecgdot = -ecgdot;
      }
      F.push(ecgdot * this.ecg_scope);
    }
    if (invalid > 7) {
      return;
    }
    let L = x_start + this.current_times * points_one_times * ((gride_width * 5) / samplingrate);
    linectx.beginPath();
    for (let K = 0; K < F.length; K++) {
      const C = F[K] - BASE_INEVAL;
      let I = K * (gride_width * 5 / samplingrate);
      let M;
      linectx.strokeStyle = '#9d6003';
      if (this.ecg_scope != 0) {
        M = Math.abs(C);
      } else {
        M = (Math.abs(C) * (adu / (gride_width * 2))) / 2;
      }
      if (K == 0) {
        if (this.current_times != 0) {
          linectx.moveTo(last_points[0], last_points[1]);
          var D = parseFloat(C >= 0 ? y_starts[0] - M : y_starts[0] + M);
          linectx.lineTo(last_points[0], D);
          last_points[0] = last_points[0];
          last_points[1] = D;
        } else {
          var D = parseFloat(C >= 0 ? y_starts[0] - M : y_starts[0] + M);
          linectx.moveTo(x_start, D);
          last_points[0] = x_start;
          last_points[1] = D;
        }
      } else {
        linectx.moveTo(last_points[0], last_points[1]);
        var D = parseFloat(C >= 0 ? y_starts[0] - M : y_starts[0] + M);
        linectx.lineTo(L + I, D);
        if (L + I < last_points[0]) {
          // console.log('error data', this.current_times, L, I, K, last_points);
        }
        last_points[0] = L + I;
        last_points[1] = D;
      }
    }
    linectx.stroke();
    this.current_times++;
    isstop = false;
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
        B[A] = -BASE_INEVAL / 2 + A * 100 - 20 + 0.3 * height;
      } else {
        B[A] = -BASE_INEVAL / 2 + A * 100 - 20 + 0.3 * height;
      }
    }
    return B;
  }
}
