/**
 * 
*/
import Draw from "../Draw";
import { ICacheItem } from "../services/types";
import { L_SCALE } from "./DrawEcg";
import Queue from "./Queue";
// import { ICacheItem } from "../services/types";
// const BASE_INEVAL = 128;
// const adu = 52;
const samplingrate = 100;
const points_one_times = 6;
// const points_one_second = 1000 * points_one_times / samplingrate;
const gride_width = 1;
// const gx = points_one_times * ((gride_width * 5) / samplingrate);
const gx = points_one_times * gride_width;
const x_start = 40;
// const law_index = 1;
// const draw_lines_index = [0, 1, 2];
// let loopmill = 90;


// enum displayMode {
//   canvas,
//   text
// }
const scale = 0.5
const baseY = 180
export class DrawPle extends Draw {
  static Queue: typeof Queue = Queue
  // private mode: displayMode = displayMode.canvas
  // private wrap: HTMLDivElement;
  // private MultiParam: number[];
  // private Ple: number[];
  // private Tre: number[];
  private ple_data: Queue;
  private _current_times?= 0;
  public get current_times() {
    return this._current_times;
  }
  public set current_times(value) {
    this._current_times = value % this.max_times;
    // console.log('current', this.max_times * gx, value, this._current_times * gx)

  }
  private max_times?= 135;
  // private current_time_millis?= 0;
  start?= NaN;
  private intervalIds: NodeJS.Timeout[] = [];
  private last_points: number[];
  constructor(wrap: HTMLElement, canvas: HTMLCanvasElement) {
    super(wrap, canvas)
  }
  data: ICacheItem
  init(data: ICacheItem) {

    console.log('ple', this)

    if (data) {
      this.initparm()

      this.ple_data = data.ple
      this.data = data
      // this.current_time_millis = 0;
      this.current_times = 0;
      //this.loop();
      // console.log("loop");
      this.last_points = [];
      this.loop()


    }


  }

  destroy() {
    this.intervalIds.forEach(_ => clearInterval(_));
    this.canvas = null;
    this.canvas = null;
  }

  _resize() {
    this.initparm()
  }

  loop() {
    let id = setInterval(() => {
      if (!this) {
        console.log('ecg', 'clear interval');
        clearInterval(id);
      }
      // const A = new Date().getTime();
      // this.current_time_millis = A;

      this.drawsingle();


    }, samplingrate);
    this.intervalIds.push(id);
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
    const { width, context2D } = this;
    context2D.strokeStyle = '#006003';
    context2D.font = 'bold 16px'
    context2D.textAlign = 'left';
    context2D.textBaseline = 'top'
    context2D.lineJoin = 'round'
    if (width < 150) {
      // alert(' width is limited');
    } else {
      this.max_times = Math.floor((width - x_start * 2) * L_SCALE / gx);
      context2D.fillText('pleth', x_start - 30, baseY - 70)
      context2D.fillText('100', x_start - 30, baseY - 50)
      context2D.fillText('0', x_start - 30, baseY)
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


    const { last_points, context2D, height } = this;

    this.ple_data = this.data.ple

    if (this.ple_data.GetSize() < points_one_times * 1) {
      this.start = NaN;
      console.log('ws ws ws', height < 50, this.ple_data.GetSize() < points_one_times * 1)
      return;
    }

    this.clearcanvans();
    const F = [];
    // const append = (this.ple_data.GetSize() / points_one_second)
    // console.log('wsssss', append)
    for (let J = 0; J < points_one_times; J++) {
      let ecgdot = this.ple_data.DeQueue();
      F.push(ecgdot * scale);
    }
    if (height < 50) return
    let blockStartX = x_start + this.current_times * gx;
    context2D.beginPath();
    for (let K = 0; K < F.length; K++) {
      const y = baseY - F[K]
      const xSpan = K * gride_width;



      if (this.current_times !== 0) {
        context2D.moveTo(last_points[0], last_points[1]);
      }
      context2D.lineTo(blockStartX + xSpan, y);
      // console.log('current', blockStartX + xSpan)
      last_points[0] = blockStartX + xSpan;
      last_points[1] = y;
    }
    context2D.stroke();
    this.current_times++;
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


}
