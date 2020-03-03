import Draw from "../Draw";

interface AnalyseData {
    acc?: number[]
    dec?: number[]
    baseline?: number[]
    start?: number
    end?: number
}

export class DrawAnalyse extends Draw {
    analyseData: AnalyseData
    constructor(canvas: HTMLCanvasElement, width = 0, height = 0) {
        super(width, height, canvas)
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
        const start = cur - width * 2 > 0 ? cur - width * 2 : 0;




        //kisi 2019-10-29 baseline
        //TODO
        let curfhroffset = 0;
        context2D.beginPath();
        context2D.strokeStyle = color;//基线颜色
        context2D.lineWidth = 1;
        if (start <= analyseData.start && cur > analyseData.start) {
            let baselineoff = Math.ceil((analyseData.start - start) / (xspan * 6));
            let firstindex = baselineoff - 2 > 0 ? baselineoff - 2 : 0;
            console.log(firstindex);
            context2D.moveTo(baselineoff * xspan * 3, (max - curfhroffset - analyseData.baseline[firstindex]) * yspan + basetop);
            for (var i = baselineoff * xspan * 3 + 1; i < cur; i++) {
                baselineoff = Math.ceil((i - start) / (xspan * 6));
                if (baselineoff >= analyseData.baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    lastx = Math.floor((i - start) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - analyseData.baseline[baselineoff]) * yspan + basetop);
                }
            }
            context2D.stroke();
        } else if (start < analyseData.end) {
            let baselineoff = Math.ceil((start - analyseData.start) / (xspan * 6));
            let firstindex = baselineoff - 1 > 0 ? baselineoff - 1 : 0;
            context2D.moveTo(0, (max - curfhroffset - analyseData.baseline[firstindex]) * yspan + basetop);
            for (var i = start + 1; i < cur; i++) {
                baselineoff = Math.ceil((i - analyseData.start) / (xspan * 6));
                if (baselineoff >= analyseData.baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    lastx = Math.floor((i - start) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - analyseData.baseline[baselineoff]) * yspan + basetop);
                }
            }
            context2D.stroke();
        }
    }
    //kisi 2019-10-28 绘制 acc dec
    drawflag = (x, y, index) => {
        const { context2D, analyseData } = this;
        context2D.textAlign = 'left';
        context2D.textBaseline = 'top';
        let txt = '';
        if (typeof (analyseData) != "undefined" && analyseData.acc.indexOf(index) > -1) {
            txt = '+';
            context2D.font = '25px arial';
            context2D.fillStyle = 'black';
            context2D.fillText(txt, x + 1, y + 5);
        } else if (typeof (analyseData) != "undefined" && analyseData.dec.indexOf(index) > -1) {
            txt = '—';
            context2D.font = 'bold 15px arial';
            context2D.fillStyle = 'red';
            context2D.fillText(txt, x + 1, y + 5);
        }
    }

}
