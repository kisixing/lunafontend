import Draw from "../Draw";
import Queue from "./Queue";
import { _R } from "@lianmed/utils";
import { DrawPle } from "./DrawPle";
import { ICacheItem } from "../services/types";
export const L_SCALE = 1
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
  canvas: Canvas;
  canvasline: Canvas;
  canvasmonitor: Canvas;
  canvasPle: Canvas;
  ecg_scope?: number;
  current_times?: number;
  max_times?: number;
  width?: number;
  height?: number;
  data: any
}
// enum displayMode {
//   canvas,
//   text
// }

export class DrawEcg extends Draw {
  static Queue: typeof Queue = Queue
  private data: ICacheItem
  // private mode: displayMode = displayMode.canvas
  // private wrap: HTMLDivElement;
  canvas: Canvas;
  canvasline: Canvas;
  private canvasmonitor: Canvas;
  private ctx: Ctx;
  private linectx: Ctx;
  private datactx: Ctx;
  private ecg_scope?= 2;
  private _current_times?= 0;
  private drawPle: DrawPle
  public get current_times() {
    return this._current_times;
  }
  public set current_times(value) {
    this._current_times = value % this.max_times;
  }
  private max_times?= 135;
  // private current_time_millis?= 0;
  private start?= NaN;
  private intervalIds: NodeJS.Timeout[] = [];
  private last_points: number[];
  constructor(args: I) {
    super(args.wrap)
    const { canvas, canvasline, canvasmonitor, canvasPle } = args;

    this.drawPle = new DrawPle(args.wrap, canvasPle)
    canvas.style.letterSpacing = '5px';
    Object.assign(this, {
      ...args,

      ctx: canvas.getContext('2d'),
      linectx: canvasline.getContext('2d'),
      datactx: canvasmonitor.getContext('2d'),
      plectx: canvasPle.getContext('2d')
    });
    this.ecg();
  }
  init(data: ICacheItem) {

    if (data) {
      this.drawPle.init(data)
      this.data = data
      // this.current_time_millis = 0;
      this.current_times = 0;
      isstop = false;
      //this.loop();
      // console.log("loop");
      this.last_points = [];
      this.timerEcg();
      console.log(this);
    }
  }
  _resize() {
    const { height, width } = this
    // this.mode = height <= 50 ? displayMode.text : displayMode.canvas
    Object.assign(this.canvas, { width, height })
    Object.assign(this.canvasline, { width, height })
    Object.assign(this.canvasmonitor, { width, height })
    this.drawPle.resize()
    this.addfilltext();
    this.initparm();
  }
  destroy() {
    isstop = false;
    this.intervalIds.forEach(_ => clearInterval(_));
    this.canvas = null;
    this.canvasline = null;
    this.canvasmonitor = null;
    this.drawPle.destroy()
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
    ctx.moveTo(x_start, ruler[0] * scale);
    for (let i = 0; i < ruler.length; i++) {
      ctx.lineTo(i + x_start, ruler[i] * scale);
    }
    ctx.stroke();
  }

  DrawDatatext() {
    const { datactx, data, height, width } = this;
    const keys = ['脉率bpm', '血氧%', '体温℃', '心率bpm', '呼吸(次/分)', '血压(SDM)mmHg'];
    const v = Object.assign(Array(7).fill('--'), data.ecgdata)
    v[2] = `${v[2]} ~ ${v[3]}`
    v.splice(3, 1)
    const entries = _R.zip(keys, v);
    datactx.clearRect(0, 0, width, height);

    if (height > 60) {
      // 大屏显示
      return
      const V = (height) / 6;
      let size = V / 2;
      let D = 10;
      datactx.fillStyle = "#222";
      datactx.font = `normal ${size}px YaHei`;
      datactx.textAlign = 'right';
      datactx.textAlign = "center";
      datactx.textBaseline = "middle";

      entries.forEach(([k, v], i) => {
        const isRight = i > 2;
        const x = (isRight ? 10 : 26);
        const y = D + (i % 3) * V + 3 * size;
        datactx.fillText(`${k}`, width - size * x, y);
        datactx.fillText(`${v}`, width - size * (x - 8), y);
      })
    } else if (height > 30) {
      // 小屏显示时
      const d = width / 6 + -2
      let size = 14;
      let D = 12;
      datactx.fillStyle = "#eee";
      datactx.fillRect(0, 0, width, height)
      if (width < 622) {
        size = 12;
      }
      if (width < 520) {
        size = 10;
      }
      datactx.font = `normal ${size}px YaHei`;
      datactx.fillStyle = "#222";
      datactx.textAlign = "center";
      datactx.textBaseline = "middle";

      // // 全部由几个字符
      // const allByteL = Math.floor(width / size * 100) / 100;
      // let xxx = width;
      // for (var i = entries.length - 1; i >= 0; i--) {
      //   const [k, v] = entries[i];
      //   // 字符串长度
      //   const byteL = this.getLength(k);
      //   const w = (byteL / allByteL) * width;

      //   xxx = xxx - w;
      //   datactx.fillText(`${k}`, xxx, D, w);
      //   datactx.fillText(`${v || ''}`, xxx, 2.5 * D, w);
      // }

      entries.forEach(([k, v], i) => {
        let x = 50 + d * i;
        if (width < 622) {
          x = 40 + d * i;
        }

        datactx.fillText(`${k}`, x, D, d);
        datactx.fillText(`${v || ''}`, x, 2.5 * D, d);
      })
    } else {
      const d = width / 6 + -2
      let size = d < 100 ? 9 : 11;
      let D = 14;
      datactx.fillStyle = "#eee";
      datactx.fillRect(0, 0, width, height)

      datactx.font = `normal ${size}px YaHei`;
      datactx.fillStyle = "#222";
      datactx.textAlign = "center";
      datactx.textBaseline = "middle";
      entries.forEach(([k, v], i) => {
        let x = 40 + (i > 0 ? (i > 4 ? d - 2 : (d - 6)) : d) * i;
        datactx.fillText(`${k}${v || ''}`, x, D, d);
      })
    }
  }

  /**
   * 获取字符串的字节长度
   * @param  {string} val 字符串
   * @return {number}     字节长度
   */
  getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
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
    linectx.lineJoin = 'round'
    linectx.strokeStyle = '#9d6003';
    if (canvasline.width < 150) {
      // alert(' width is limited');
    } else {
      this.max_times = Math.floor((canvasline.width - 25) * L_SCALE / gx);
    }
    // console.log('ecg-width', canvasline.width);
    this.current_times = 0;
  }

  timerEcg() {
    let id = setInterval(() => {
      if (!this) {
        console.log('ecg', 'clear interval');
        clearInterval(id);
      }
      this.DrawDatatext();
      // const A = new Date().getTime();
      // this.current_time_millis = A;
      if (!isNaN(this.start) || this.data.ecg.GetSize() > points_one_times * 5) {
        this.start = 1;
        this.drawsingle();
      }

    }, loopmill);
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
    const { last_points, linectx } = this;
    const y_starts = this.GetYStarts(12);
    //2019-10-03 kisi 根据容器调整高度
    // let scale = this.height / 100;
    if (isstop) {
      return;
    }
    isstop = true;
    if (this.data.ecg.IsEmpty()) {
      this.start = NaN;
      isstop = false;
      return;
    }
    if (this.data.ecg.GetSize() < points_one_times * 5) {
      this.start = NaN;
      isstop = false;
      return;
    }
    this.clearcanvans();
    let F = [];
    let invalid = 0;
    for (let J = 0; J < points_one_times; J++) {
      let ecgdot = this.data.ecg.DeQueue();
      if (ecgdot == 1) {
      console.log('drawsingle invalid++')

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
      console.log('drawsingle invalid')
      isstop = false;
      return;
    }
    let L = x_start + this.current_times * gx;
    linectx.beginPath();
    for (let K = 0; K < F.length; K++) {
      const C = F[K] - BASE_INEVAL;
      let I = K * (gride_width * 5 / samplingrate);
      let M;

      if (this.ecg_scope != 0) {
        M = Math.abs(C);
      } else {
        M = (Math.abs(C) * (adu / (gride_width * 2))) / 2;
      }
      var D = parseFloat(C >= 0 ? y_starts[0] - M : y_starts[0] + M);

      if (K == 0) {
        if (this.current_times != 0) {
          linectx.moveTo(last_points[0], last_points[1]);
          linectx.lineTo(last_points[0], D);
          last_points[0] = last_points[0];
          last_points[1] = D;
        } else {
          linectx.moveTo(x_start, D);
          last_points[0] = x_start;
          last_points[1] = D;
        }
      } else {
        linectx.moveTo(last_points[0], last_points[1]);
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

  clearcanvans() {
    const current_times = this.current_times
    const linectx = this.linectx
    if (current_times != 0) {
      linectx.clearRect(x_start + current_times * gx, 0, 20, this.height);
    } else {
      linectx.clearRect(x_start - 10, 0, x_start + 20, this.height);
    }
  }

  GetYStarts(C) {
    const { height } = this;
    const B = [];
    for (let A = 0; A < C; A++) {
      if (height < 480) {
        B[A] = -BASE_INEVAL / 2 + A * 100 - 20 + 0.2 * height;
      } else {
        B[A] = -BASE_INEVAL / 2 + A * 100 - 20 + 0.2 * height;
      }
    }
    return B;
  }
}
