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
let isstop = true;
let loopmill = 90;


// enum displayMode {
//   canvas,
//   text
// }

export class DrawPle extends Draw {
  static Queue: typeof Queue = Queue
  // private mode: displayMode = displayMode.canvas
  // private wrap: HTMLDivElement;
  // private MultiParam: number[];
  // private Ple: number[];
  // private Tre: number[];
  private ecg_scope?= 2;
  private ple_data: Queue;
  private _current_times?= 0;
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
  constructor(width: number, height: number, canvas: HTMLCanvasElement) {
    super(width, height, canvas)
    this.context2D = this.context2D
  }
  init(ple_data:Queue) {


    if (ple_data) {
      this.ple_data = ple_data
      // this.current_time_millis = 0;
      this.current_times = 0;
      isstop = false;
      //this.loop();
      // console.log("loop");
      this.last_points = [];
    }
  }

  destroy() {
    isstop = false;
    this.intervalIds.forEach(_ => clearInterval(_));
    this.canvas = null;
    this.canvas = null;
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
    const { canvas, context2D } = this;
    context2D.lineJoin = 'round'
    context2D.strokeStyle = '#9d6003';
    if (canvas.width < 150) {
      // alert(' width is limited');
    } else {
      this.max_times = Math.floor((canvas.width - 25) * 0.6 / gx);
    }
    // console.log('ecg-width', canvas.width);
    this.current_times = 0;
  }



  // loop() {
  //   const y_starts = this.GetYStarts(12);
  //   const A = new Date().getTime();
  //   this.current_time_millis = A;
  //   if (!isNaN(this.start) || this.oQueue.GetSize() > points_one_times * 5) {
  //     this.start = 1;
  //     this.drawsingle(y_starts, adu, samplingrate, this.max_times, this.context2D);
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
    const { last_points, context2D } = this;
    const y_starts = this.GetYStarts(12);
    //2019-10-03 kisi 根据容器调整高度
    // let scale = this.height / 100;
    if (isstop) {
      return;
    }
    isstop = true;
    if (this.ple_data.IsEmpty()) {
      this.start = NaN;
      isstop = false;
      return;
    }
    if (this.ple_data.GetSize() < points_one_times * 5) {
      this.start = NaN;
      isstop = false;
      return;
    }
    this.clearcanvans();
    let F = [];
    let invalid = 0;
    for (let J = 0; J < points_one_times; J++) {
      let ecgdot = this.ple_data.DeQueue();
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
    let L = x_start + this.current_times * gx;
    context2D.beginPath();
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
          context2D.moveTo(last_points[0], last_points[1]);
          context2D.lineTo(last_points[0], D);
          last_points[0] = last_points[0];
          last_points[1] = D;
        } else {
          context2D.moveTo(x_start, D);
          last_points[0] = x_start;
          last_points[1] = D;
        }
      } else {
        context2D.moveTo(last_points[0], last_points[1]);
        context2D.lineTo(L + I, D);
        if (L + I < last_points[0]) {
          // console.log('error data', this.current_times, L, I, K, last_points);
        }
        last_points[0] = L + I;
        last_points[1] = D;
      }
    }
    context2D.stroke();
    this.current_times++;
    isstop = false;
  }

  clearcanvans() {
    const current_times = this.current_times
    const context2D = this.context2D
    if (current_times != 0) {
      context2D.clearRect(x_start + current_times * gx, 0, 20, this.height);
    } else {
      context2D.clearRect(x_start - 10, 0, x_start + 20, this.height);
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
