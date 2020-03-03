import Draw from "../Draw";



export class DrawAnalyse extends Draw {

    constructor(canvas: HTMLCanvasElement, width = 30, height = -20) {
        super(width, height, canvas)
    }

    draw(analyseData, cur, color, yspan, xspan, max, basetop) {
        if (!analyseData) {
            return
        }
        const { context2D, width, height } = this;

        context2D.clearRect(0, 0, width, height)
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


}
