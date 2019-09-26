const baseineval = 128;
const adu = 52;
const samplingrate = 128;
let max_times = 135;
const points_one_times = 8;
const gride_width = 25;
const gx = points_one_times * ((gride_width * 5) / samplingrate);
const x_start = 25;
const y_starts = GetYStarts(12);
const draw_lines_index = [0, 1, 2];
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
let ecg_scope = 1;
let current_times = 0;

const loopmill = 62;
import { MultiParam, Ple, Tre } from './data';

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

let canvas = null;
let canvasline = null;
let ctx = null;
let linectx = null;
let width = 0;
let height = 0;
const isstop = true;
export function drawecg() {
  canvas = document.getElementById('background');
  canvasline = document.getElementById('line');
  width = canvas.width;
  height = canvas.height;
  ctx = canvas.getContext('2d');
  linectx = canvasline.getContext('2d');
  //drawgrid();
  addfilltext();
}

const oQueue = new Queue();
export function ecg() {
  initparm();
  Convert16Scale();
  loop();
}
function Convert16Scale() {
  adddata(null, 1, 8, 128);
}
function addfilltext() {
  const A = ['I', 'II', 'III'];
  const C = (height - 10) / 3;
  let D = 0;
  for (let E = 0; E < draw_lines_index.length; E++) {
    D = D + C;
    ctx.font = 'bold 14px';
    ctx.fillText('' + A[draw_lines_index[E]] + '', 10, D);
  }
}

function adddata(F, C, E, J) {
  for (let index = 0; index < 360; index++) {
    const G = new Array(3);
    G[0] = (MultiParam[(index * 2) % 375] + 128) * 0.1;
    G[1] = Ple[index % 60];
    G[2] = Tre[index % 180];
    oQueue.EnQueue(G);
  }
  return;
}
function initparm() {
  if (width < 150) {
    alert(' width is limited');
  } else {
    max_times = Math.floor((width - 50) / gx);
  }
  linectx.strokeStyle = '#9d6003';
}
let current_time_millis = 0;
function loop() {
  const A = new Date().getTime();
  current_time_millis = A;
  draw(
    y_starts,
    baseineval,
    adu,
    samplingrate,
    max_times,
    points_one_times,
    linectx,
    draw_lines_index
  );
  if (isstop) {
    setTimeout(loop, loopmill);
    const C = new Date().getTime();
    const B = C - current_time_millis + 1;
    if (B < loopmill) {
    }
  }
  if (oQueue.IsEmpty()) {
    Convert16Scale();
  }
}
function GetYStarts(C) {
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
function draw(Q, B, P, N, G, H, A, E) {
  let areaedge = 200;
  current_times = current_times % G;
  if (oQueue.IsEmpty()) {
    return;
  }
  if (oQueue.GetSize() < H) {
    return;
  }
  clearcanvans(current_times, H, N, A);
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
      if (ecg_scope != 0) {
        M = Math.abs(C) * (P / (gride_width * 2)) * ecg_scope;
      } else {
        M = (Math.abs(C) * (P / (gride_width * 2))) / 2;
      }
      const L = x_start + current_times * H * ((gride_width * 5) / N);
      if (K == 0) {
        if (current_times != 0) {
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
  current_times++;
}
function clearcanvans(B, F, C, D) {
  const A = F * ((gride_width * 5) / C);
  const E = x_start + B * A;
  if (B != 0) {
    D.clearRect(E, 0, 20, height);
  } else {
    D.clearRect(E - 10, 0, E + 20, height);
  }
}
