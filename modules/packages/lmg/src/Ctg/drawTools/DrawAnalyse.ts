import Draw from "../../Draw";
import { } from "@lianmed/f_types";
import { AccPoint, DecPoint } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";

export interface AnalyseData {
    acc?: AccPoint[]
    dec?: DecPoint[]
    baseline?: number[]
    start?: number
    end?: number
}

export class DrawAnalyse extends Draw {
    analyseData: AnalyseData
    constructor(canvas: HTMLCanvasElement, width = 0, height = 0) {
        super(width, height, canvas)
    }
    init() {
        this.analyseData = null
    }
    setData(analyseData: AnalyseData, ) {
        this.analyseData = analyseData
    }
    drawBaseline(cur, color, yspan, xspan, max, basetop) {
        //清空分析画布
        const { context2D, width, height, analyseData } = this;
        context2D && context2D.clearRect(0, 0, width, height)

        if (!analyseData) {
            return
        }
        let lastx = 0;
        const leftViewposition = cur - width * 2 > 0 ? cur - width * 2 : 0;
        //kisi 2019-10-29 baseline
        //TODO
        let curfhroffset = 0;
        context2D.beginPath();
        context2D.strokeStyle = color;//基线颜色
        context2D.lineWidth = 2;
        //if (leftViewposition <= analyseData.start && cur > analyseData.start) {
        //kisi 2020-03-05 基线是完整分析曲线每分钟一一对应
        if (true) {
            let baselineoff = 0;
            let firstindex = Math.floor(leftViewposition / (xspan * 6));
            //console.log("==0==",cur,firstindex,baselineoff);
            context2D.moveTo(baselineoff * xspan * 3, (max - curfhroffset - analyseData.baseline[firstindex]) * yspan + basetop);
            for (var i = leftViewposition; i < cur; i++) {
                baselineoff = Math.ceil(i / (xspan * 6));
                if (baselineoff >= analyseData.baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    //console.log("==1==",cur,firstindex,baselineoff);
                    lastx = Math.floor((i - leftViewposition) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - analyseData.baseline[baselineoff]) * yspan + basetop);
                }
            }
            context2D.lineTo(cur, (max - curfhroffset - analyseData.baseline[baselineoff]) * yspan + basetop)
            context2D.stroke();

        } else if (leftViewposition < analyseData.end) {

            let baselineoff = Math.ceil((leftViewposition - analyseData.start) / (xspan * 6));
            let firstindex = baselineoff - 1 > 0 ? baselineoff - 1 : 0;
            context2D.moveTo(0, (max - curfhroffset - analyseData.baseline[firstindex]) * yspan + basetop);
            for (var i = leftViewposition + 1; i < cur; i++) {
                baselineoff = Math.ceil((i - analyseData.start) / (xspan * 6));
                if (baselineoff >= analyseData.baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    lastx = Math.floor((i - leftViewposition) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - analyseData.baseline[baselineoff]) * yspan + basetop);
                }
            }
            context2D.lineTo((analyseData.end - leftViewposition) / 2, (max - curfhroffset - analyseData.baseline[baselineoff]) * yspan + basetop)

            context2D.stroke();

        }
    }
    //kisi 2019-10-28 绘制 acc dec
    //2020-03-04 用 linecanvas 绘制标记
    drawflag = (canvas, x: number, y: number, index: number) => {
        const { context2D, analyseData } = this;
        if (!context2D || !analyseData) return
        const acc = analyseData.acc.map(_ => _.index)
        const dec = analyseData.dec.map(_ => _.index)
        context2D.textAlign = 'left';
        context2D.textBaseline = 'top';
        let txt = '';
        if (acc.indexOf(index) > -1 || acc.indexOf(index - 1) > -1) {
            const target = analyseData.acc.find(_ => [index, index - 1].includes(_.index))
            target.x = x
            target.y = y
            txt = `${(target.reliability / 10 || 0).toFixed(1)}`;
            canvas.font = '15px arial';
            canvas.fillStyle = 'blue';
            canvas.fillText(txt, x + 1, y + 10);
        } else if (dec.indexOf(index) > -1 || dec.indexOf(index - 1) > -1) {
            const target = analyseData.dec.find(_ => [index, index - 1].includes(_.index))
            target.x = x
            target.y = y
            txt = target ? target.type : '-';
            canvas.font = 'bold 15px arial';
            canvas.fillStyle = 'red';
            canvas.fillText(txt, x + 1, y - 1);
        }
    }
    revice(x: number, y: number) {
        if (!this.analyseData) return
        const edge = 20; 
        const { acc, dec } = this.analyseData

        const target = acc.find(_ => (x < _.x + edge) && (x > _.x - edge)) || dec.find(_ => (x < _.x + edge) && (x > _.x - edge))
        if (target && (y < (target.y + edge) && y > (target.y - edge))) {
            console.log(x, y, target)
        }
    }
}
