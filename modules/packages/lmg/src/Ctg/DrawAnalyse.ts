import Draw from "../Draw";

interface accDecPoint {
    index: number;
    start: number;
    end: number;
    peak: number;
    duration: number;
    ampl: number;
}
export interface AnalyseData {
    acc?: accDecPoint[]
    dec?: accDecPoint[]
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
        context2D.lineWidth = 1;


        if (leftViewposition <= analyseData.start && cur > analyseData.start) {

            let baselineoff = Math.ceil((analyseData.start - leftViewposition) / (xspan * 6));
            let firstindex = baselineoff - 2 > 0 ? baselineoff - 2 : 0;
            console.log(firstindex);
            context2D.moveTo(baselineoff * xspan * 3, (max - curfhroffset - analyseData.baseline[firstindex]) * yspan + basetop);
            for (var i = baselineoff * xspan * 3 + 1; i < cur; i++) {
                baselineoff = Math.ceil((i - leftViewposition) / (xspan * 6));
                if (baselineoff >= analyseData.baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
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
    drawflag = (canvas,x, y, index: number) => {
        const { context2D, analyseData } = this;
        if (!context2D || !analyseData) return
        const acc = analyseData.acc.map(_ => _.index)
        const dec = analyseData.dec.map(_ => _.index)
        context2D.textAlign = 'left';
        context2D.textBaseline = 'top';
        let txt = '';
        if (acc.indexOf(index) > -1 || acc.indexOf(index-1) > -1) {
            console.log(acc,index);
            txt = '+';
            canvas.font = '25px arial';
            canvas.fillStyle = 'black';
            canvas.fillText(txt, x + 1, y - 1);
        } else if (dec.indexOf(index) > -1 || dec.indexOf(index-1) > -1) {
            txt = '—';
            canvas.font = 'bold 15px arial';
            canvas.fillStyle = 'red';
            canvas.fillText(txt, x + 1, y - 1);
        }
    }

}
