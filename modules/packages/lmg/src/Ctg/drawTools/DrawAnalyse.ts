import { obvue } from "@lianmed/f_types";
import Draw from "../../Draw";
import { AnalyseType, PointType } from '../../interface';
import { Suit } from "../Suit";
import { DecType, AccPoint, DecPoint } from "@lianmed/f_types/lib/obvue/ctg_exams_analyse";
import { event } from "@lianmed/utils";


// export interface AnalyseData {
//     acc?: AccPoint[]
//     dec?: DecPoint[]
//     baseline?: number[]
//     start?: number
//     end?: number
// }
const resultMap = ['正常', '可疑', '异常', '时长不足']

// function genDeformedScore(obj: Object) {
//     const keys = Object.keys(obj)
//     keys.forEach(k => {
//         const rm = k.match(/(.*)score$/)
//         if (rm) {
//             obj[k] = resultMap[obj[k]] ? resultMap[obj[k]] : obj[k];

//         }
//     })
// }
export class DrawAnalyse extends Draw {
    pointToInsert: { type: PointType, index: number }
    pointToEdit: AccPoint | DecPoint
    baselinePointIndex = -1
    mapXtoY: { [x: string]: { y: number, index: number } } = {}
    mapBaselilneXtoY: { [x: string]: number } = {}
    mapBaselilneXtoIndex: { [x: string]: number } = {}
    // private _analyseData: AnalyseData
    analysisData: obvue.ctg_exams_analyse
    suit: Suit
    constructor(wrap: HTMLElement, canvas: HTMLCanvasElement, suit: Suit) {
        super(wrap, canvas)
        this.suit = suit
    }
    init() {
        this.analysisData = null
    }
    _acc: number[]
    _dec: number[]
    setData(r: obvue.ctg_exams_analyse,) {
        if (!r.analysis || !this.suit.data) return
        const fmIndex = r.analysis.fm || []
        const fm = this.suit.data.fm
        const autoFmValue = this.autoFm ? 1 : 0
        r.analysis.acc = r.analysis.acc && r.analysis.acc.map(_ => ({ ..._, duration: _.dataClean ? _.duration : _.duration / 4, dataClean: true }))
        r.analysis.dec = r.analysis.dec && r.analysis.dec.map(_ => ({ ..._, duration: _.dataClean ? _.duration : _.duration / 4, dataClean: true })).filter(_ => _.reliability >= 90 || _.user)
        this._acc = r.analysis.acc.map(_ => _.index)
        this._dec = r.analysis.dec.map(_ => _.index)
        this.analysisData = r
        fmIndex.forEach(_ => {
            fm[_] = autoFmValue
            fm[_ - 1] = autoFmValue
        })
    }
    drawBaseline(cur, color, yspan, xspan, max, basetop) {
        //清空分析画布
        let { context2D, width, height, analysisData: analyseData } = this;
        width = Math.floor(width)
        context2D && context2D.clearRect(0, 0, width, height)

        if (!analyseData || !this.showBase) {
            return
        }
        const { analysis: { fhrbaselineMinute: baseline, start, end } } = analyseData
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
        this.mapBaselilneXtoY = {}
        if (true) {
            let baselineoff = 0;
            let firstindex = Math.floor(leftViewposition / (xspan * 6));
            //console.log("==0==",cur,firstindex,baselineoff);
            context2D.moveTo(baselineoff * xspan * 3, (max - curfhroffset - baseline[firstindex]) * yspan + basetop);

            for (var i = leftViewposition; i < cur; i++) {
                baselineoff = Math.ceil(i / (xspan * 6));
                if (baselineoff >= baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    //console.log("==1==",cur,firstindex,baselineoff);
                    lastx = Math.floor((i - leftViewposition) / 2);

                    context2D.lineTo(lastx, (max - curfhroffset - baseline[baselineoff]) * yspan + basetop);

                    this.mapBaselilneXtoIndex[lastx] = baselineoff
                    this.mapBaselilneXtoY[lastx] = (max - curfhroffset - baseline[baselineoff]) * yspan + basetop
                }
            }
            context2D.lineTo(cur, (max - curfhroffset - baseline[baselineoff]) * yspan + basetop)
            context2D.stroke();

        } else if (leftViewposition < end) {

            let baselineoff = Math.ceil((leftViewposition - start) / (xspan * 6));
            let firstindex = baselineoff - 1 > 0 ? baselineoff - 1 : 0;
            context2D.moveTo(0, (max - curfhroffset - baseline[firstindex]) * yspan + basetop);
            for (var i = leftViewposition + 1; i < cur; i++) {
                baselineoff = Math.ceil((i - start) / (xspan * 6));
                if (baselineoff >= baseline.length - 1) {
                    break;
                }
                if ((i) % (xspan * 6) == 0) {
                    lastx = Math.floor((i - leftViewposition) / 2);
                    context2D.lineTo(lastx, (max - curfhroffset - baseline[baselineoff]) * yspan + basetop);
                }
            }
            context2D.lineTo((end - leftViewposition) / 2, (max - curfhroffset - baseline[baselineoff]) * yspan + basetop)

            context2D.stroke();

        }
    }

    showBase: boolean
    type: AnalyseType
    autoFm = false
    analyse(type?: AnalyseType, start?: number, end?: number, data = this.analysisData) {
        if (type) {
            this.type = type
        } else {
            type = this.type
        }
        if (!data) return
        const { suit } = this
        this.setData(data)
        if (!start && !end && this.analysisData) {
            start = this.analysisData.analysis.start
            end = this.analysisData.analysis.end
        }
        console.log('analyse', type, start, end, data)
        suit.drawSelect.$selectrpend = data.analysis.end = end
        suit.drawSelect.$selectrpstart = data.analysis.start = start

        // this.emit('selectForward', data.end - data.start)
        //this.drawobj.drawdot(this.canvasline.width * 2, false);
        //kisi 2020-03-05 
        let newData = this.ctgscore(type)
        suit.drawobj.drawdot((suit.type > 0 && suit.viewposition < suit.width * 2) ? suit.width * 2 : suit.viewposition, false);
        console.log('setFormData', type, data, newData)

        event.emit('suit:afterAnalyse', newData)
        return newData
    }
    //kisi 2019-10-28 绘制 acc dec
    //2020-03-04 用 linecanvas 绘制标记
    drawflag = (canvas: CanvasRenderingContext2D, x: number, y: number, index: number) => {

        this.mapXtoY[x] = { y: y + this.suit.drawobj.basetop, index }
        const { context2D, analysisData: analyseData } = this;
        if (!context2D || !analyseData) return
        const { analysis: { acc, dec } } = analyseData
        const _acc = this._acc
        const _dec = this._dec
        context2D.textAlign = 'left';
        context2D.textBaseline = 'top';
        let txt = '';
        // const baseY = this.suit.getBaseY(x) + (acc.find(_ => [index, index - 1].includes(_.index)) || dec.find(_ => [index, index - 1].includes(_.index)) || { ampl: 10 }).ampl
        // y = y === undefined ? -baseY : y
        if (_acc.indexOf(index) > -1 || _acc.indexOf(index - 1) > -1) {
            const target = acc.find(_ => [index, index - 1].includes(_.index))
            target.x = x
            target.y = y
            // 90%(后台默认处理90%marked为true)以上直接显示为绿色加速标记（+）
            if (target.marked) {
                txt = "+";
                canvas.font = '18px arial';
                canvas.fillStyle = 'green';
                canvas.fillText(txt, x + 1, y + 10);
                // canvas.fillRect(x, y, 2, 2)
                // canvas.fillRect(x + 1, y + 10, 2, 2)

            } else if (target.reliability > 45) { //45%~90%，显示橙色加速标记（+）及橙色**%确定度
                if (!target.remove) {
                    txt = "+" + `${target.reliability}%`;
                    canvas.font = '15px arial';
                    canvas.fillStyle = 'orange';
                    canvas.fillText(txt, x + 1, y + 10);
                    // canvas.fillRect(x, y, 2, 2)
                    // canvas.fillRect(x + 1, y + 10, 2, 2)
                }
            }
        } else if (_dec.indexOf(index) > -1 || _dec.indexOf(index - 1) > -1) {
            const target = dec.find(_ => [index, index - 1].includes(_.index))
            target.x = x
            target.y = y
            txt = target ? target.type.toUpperCase() : '-';
            canvas.font = 'bold 15px arial';
            canvas.fillStyle = 'red';
            canvas.fillText(txt, x + 1, y + 20);
            // canvas.fillRect(x, y, 2, 2)
            // canvas.fillRect(x + 1, y + 20, 2, 2)
        }
    }
    // kisi 2020-04-08 增加本地分数统计
    inRange = (value: number, min: number, max: number) => {
        let result = false;
        if (value >= min && value <= max)
            result = true;
        return result;
    }
    //遍历时间段内的可信加速
    countAcc = (start: number, end: number) => {
        let accnum = 0;
        const { analysisData } = this
        if (!analysisData) return accnum;
        const { analysis } = analysisData
        analysis.acc.map((item) => {
            if (item.index > end) {
                return accnum;
            } else if (item.index >= start) {
                if (item.marked)
                    accnum++;
            }
        })
        return accnum;
    }
    //遍历时间段内的某类型减速
    countDec = (start: number, end: number, type: string) => {
        let decnum = 0;
        const { analysisData } = this
        if (!analysisData) return decnum;
        const { analysis } = analysisData
        analysis.dec.map((item) => {
            if (item.index > end) {
                return decnum;
            } else if (item.index >= start) {
                if (item.type.toUpperCase() == type && !item.remove)
                    decnum++;
            }
        })
        return decnum;
    }
    //加速周期性判断
    cycleAcc = () => {
        let error = 8;
        const { analysisData } = this
        if (!analysisData) return 0;
        const { analysis } = analysisData
        if (analysis.acc.length < 3) return 0;
        let base = analysis.acc[1].index - analysis.acc[0].index;
        for (let i = 2; i < analysis.acc.length; i++) {
            let diff = analysis.acc[i].index - analysis.acc[i - 1].index;
            if (diff > base + error || diff < base - error) {
                return 1;
            }
        }
        return 0;
    }
    // fm 128 判断
    countFm = (start: number, end: number) => {
        let fmnum = 0;
        for (var i = start; i <= end; i++) {
            if (i % 2 == 1) continue;
            if (this.suit.data.fm[i] == 128 || this.suit.data.fm[i] == 1) {
                fmnum++;
            }
        }
        return fmnum;
    }
    //fm-fhr-duration
    fhrDuration = (start: number, end: number) => {
        let accnum = 0;
        let sum = 0;
        const { analysisData, suit: { data } } = this
        if (!analysisData || !data) return accnum;
        const { analysis } = analysisData

        analysis.acc.forEach(_ => {
            if (_.index >= start) {
                if (_.reliability > 50) {
                    sum += (_.end - _.start) > 0 ? _.end - _.start : 0
                    accnum++
                }
            }
        })
        return accnum ? Math.ceil(sum / accnum / 4) : 0

        // analysis.acc.map((item) => {
        //     if (item.index > end) {
        //         if (accnum == 0)
        //             return accnum;
        //         else {
        //             return Math.ceil(sum / accnum / 4);
        //         }
        //     } else if (item.index >= start) {
        //         if (item.marked) {
        //             if (item.duration != 0) {
        //                 sum += item.duration;
        //                 accnum++;
        //             }
        //             console.log(item.duration);
        //         }
        //     }
        // })
        // if (accnum == 0)
        //     return accnum;
        // else {
        //     return Math.ceil(sum / accnum / 4);
        // }
    }
    //fm-fhr-ampl
    fhrAmpl = (start: number, end: number) => {
        let accnum = 0;
        let sum = 0;
        const { analysisData } = this
        if (!analysisData) return accnum;
        const { analysis } = analysisData
        analysis.acc.map((item) => {
            if (item.index > end) {
                if (accnum == 0)
                    return accnum;
                else {
                    return Math.ceil(sum / accnum);
                }
            } else if (item.index >= start) {
                if (item.marked) {
                    if (item.ampl != 0) {
                        sum += item.ampl;
                        accnum++;
                    }
                }
            }
        })
        if (accnum == 0)
            return accnum;
        else {
            return Math.ceil(sum / accnum);
        }
    }
    // TODO：analysis 结构最好与score结构分开
    // 评分类型最好枚举实现
    ctgscore = (type: AnalyseType) => {
        let { analysisData } = this
        if (!analysisData) return null
        analysisData = JSON.parse(JSON.stringify(analysisData))
        const { analysis, score } = analysisData
        const { fhrbaselineMinute } = analysis
        const fhr_uptime = analysis._fhr_uptime = this.fhrDuration(analysis.start, analysis.end);
        let acc_num = analysis._acc_num = this.countAcc(analysis.start, analysis.end);
        let vdtimes = analysis.vdtimes = this.countDec(analysis.start, analysis.end, 'VD');//analysis.vdtimes;
        let ldtimes = analysis.ldtimes = this.countDec(analysis.start, analysis.end, 'LD');//analysis.ldtimes;
        let edtimes = analysis.edtimes = this.countDec(analysis.start, analysis.end, 'ED');//analysis.edtimes;
        analysis._baseline_avg = ~~(fhrbaselineMinute.reduce((a, b) => a + b, 0) / fhrbaselineMinute.length)
        analysis._dec_num = ldtimes + vdtimes + edtimes
        // let timeframe = end-start/4*60;
        let bhr = analysis.bhr;
        //NST(国内) 20分钟
        if (type == 'Nst') {
            // 基线选项
            score.nstdata.bhrvalue = bhr;
            if (bhr < 100)
                score.nstdata.bhrscore = 0;
            else if (this.inRange(bhr, 100, 109) || bhr > 160)
                score.nstdata.bhrscore = 1;
            else if (this.inRange(bhr, 110, 160)) {
                score.nstdata.bhrscore = 2;
            }
            // 振幅
            score.nstdata.ltvvalue = analysis.ltv;
            if (analysis.ltv < 5) {
                score.nstdata.ltvscore = 0;
            } else if (this.inRange(analysis.ltv, 5, 9) || analysis.ltv > 30) {
                score.nstdata.ltvscore = 1;
            } else if (this.inRange(analysis.ltv, 10, 30)) {
                score.nstdata.ltvscore = 2;
            }
            // 胎动fhr上升时间
            score.nstdata.accdurationvalue = fhr_uptime;
            if (fhr_uptime < 10) {
                score.nstdata.accdurationscore = 0;
            } else if (this.inRange(fhr_uptime, 10, 14)) {
                score.nstdata.accdurationscore = 1;
            } else if (fhr_uptime >= 15) {
                score.nstdata.accdurationscore = 2;
            }
            // 胎动fhr变化幅度
            let fhr_ampl = this.fhrAmpl(analysis.start, analysis.end);;
            score.nstdata.accamplvalue = fhr_ampl;
            if (fhr_ampl < 10) {
                score.nstdata.accamplscore = 0;
            } else if (this.inRange(fhr_ampl, 10, 14)) {
                score.nstdata.accamplscore = 1;
            } else if (fhr_ampl >= 15) {
                score.nstdata.accamplscore = 2;
            }
            // 胎动
            let fmnum = this.countFm(analysis.start, analysis.end);
            score.nstdata.fmvalue = fmnum;
            if (fmnum == 0) {
                score.nstdata.fmscore = 0;
            } else if (this.inRange(fmnum, 1, 2)) {
                score.nstdata.fmscore = 1;
            } else if (fmnum >= 3) {
                score.nstdata.fmscore = 2;
            }

            //@ts-ignore
            score.nstdata.total = score.nstdata.accamplscore + score.nstdata.accdurationscore + score.nstdata.bhrscore + score.nstdata.fmscore + score.nstdata.ltvscore;
            return this.analysisData = analysisData
        }
        //Krebs 30分钟
        else if (type == 'Krebs') {
            // 基线选项
            score.krebsdata.bhrvalue = bhr;
            if (bhr < 100 || bhr > 180) {
                score.krebsdata.bhrscore = 0;
            } else if (this.inRange(bhr, 100, 109) || this.inRange(bhr, 161, 180)) {
                score.krebsdata.bhrscore = 1;
            } else if (this.inRange(bhr, 110, 160)) {
                score.krebsdata.bhrscore = 2;
            }
            // 振幅变异
            let zhenfu_tv = analysis.ltv;
            score.krebsdata.ltvvalue = zhenfu_tv;
            if (zhenfu_tv < 5) {
                score.krebsdata.ltvscore = 0;
            } else if (this.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 25) {
                score.krebsdata.ltvscore = 1;
            } else if (this.inRange(zhenfu_tv, 10, 25)) {
                score.krebsdata.ltvscore = 2;
            }
            // 周期变异
            let zhouqi_tv = analysis.stv;
            score.krebsdata.stvvalue = zhouqi_tv;
            if (zhouqi_tv < 3) {
                score.krebsdata.stvscore = 0;
            } else if (this.inRange(zhouqi_tv, 3, 6)) {
                score.krebsdata.stvscore = 1;
            } else if (zhouqi_tv > 6) {
                score.krebsdata.stvscore = 2;
            }
            // 加速
            score.krebsdata.accvalue = acc_num;
            if (acc_num == 0) {
                score.krebsdata.accscore = 0;
            } else if (this.inRange(acc_num, 1, 4)) {
                score.krebsdata.accscore = 1;
            } else if (acc_num > 4) {
                score.krebsdata.accscore = 2;
            }
            // 减速

            let sum = ldtimes + vdtimes;
            if (sum > 1) {
                score.krebsdata.decscore = 0;
                score.krebsdata.decvalue = sum + "";
            } else if (sum == 1) {
                score.krebsdata.decscore = 1;
                score.krebsdata.decvalue = sum + "";
            } else {
                score.krebsdata.decscore = 2;
                if (edtimes > 0) {
                    score.krebsdata.decvalue = "早减";
                } else {
                    score.krebsdata.decvalue = "无";
                }
            }
            // 胎动
            let fmnum = this.countFm(analysis.start, analysis.end);
            score.krebsdata.fmvalue = fmnum;
            if (fmnum == 0) {
                score.krebsdata.fmscore = 0;
            } else if (this.inRange(fmnum, 1, 4)) {
                score.krebsdata.fmscore = 1;
            } else if (fmnum > 4) {
                score.krebsdata.fmscore = 2;
            }
            //@ts-ignore
            score.krebsdata.total = score.krebsdata.bhrscore + score.krebsdata.accscore + score.krebsdata.decscore + score.krebsdata.ltvscore + score.krebsdata.stvscore + score.krebsdata.fmscore;
        }
        //Fischer 20分钟
        else if (type == 'Fischer') {
            // 基线选项
            score.fischerdata.bhrvalue = bhr;
            if (bhr < 100 || bhr > 180) {
                score.fischerdata.bhrscore = 0;
            } else if (this.inRange(bhr, 100, 109) || this.inRange(bhr, 161, 180)) {
                score.fischerdata.bhrscore = 1;
            } else if (this.inRange(bhr, 110, 160)) {
                score.fischerdata.bhrscore = 2;
            }
            // 振幅变异
            let zhenfu_tv = analysis.ltv;
            score.fischerdata.ltvvalue = zhenfu_tv;
            if (zhenfu_tv < 5) {
                score.fischerdata.ltvscore = 0;
            } else if (this.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 30) {
                score.fischerdata.ltvscore = 1;
            } else if (this.inRange(zhenfu_tv, 10, 30)) {
                score.fischerdata.ltvscore = 2;
            }
            // 周期变异
            let zhouqi_tv = analysis.stv;
            score.fischerdata.stvvalue = zhouqi_tv;
            if (zhouqi_tv < 3) {
                score.fischerdata.stvscore = 0;
            } else if (this.inRange(zhouqi_tv, 3, 6)) {
                score.fischerdata.stvscore = 1;
            } else if (zhouqi_tv > 6) {
                score.fischerdata.stvscore = 2;
            }
            // 加速
            score.fischerdata.accvalue = acc_num;
            if (acc_num == 0) {
                score.fischerdata.accscore = 0;
            } else if (this.inRange(acc_num, 1, 4)) {
                score.fischerdata.accscore = 1;
            } else if (acc_num > 4) {
                score.fischerdata.accscore = 2;
            }
            // 减速
            if (ldtimes > 0) {
                score.fischerdata.decscore = 0;
                score.fischerdata.decvalue = 'LD';
            } else if (vdtimes > 0) {
                score.fischerdata.decscore = 1;
                score.fischerdata.decvalue = 'VD';
            } else {
                if (edtimes > 0) {
                    score.fischerdata.decvalue = 'ED';
                } else {
                    score.fischerdata.decvalue = '无';
                }
                score.fischerdata.decscore = 2;
            }
            //@ts-ignore
            score.fischerdata.total = score.fischerdata.bhrscore + score.fischerdata.accscore + score.fischerdata.decscore + score.fischerdata.ltvscore + score.fischerdata.stvscore;
        }
        //CST
        else if (type == 'Cst') {
            // 基线选项
            score.cstdata.bhrvalue = bhr;
            if (bhr < 100 || bhr > 180) {
                score.cstdata.bhrscore = 0;
            } else if (this.inRange(bhr, 100, 109) || this.inRange(bhr, 161, 180)) {
                score.cstdata.bhrscore = 1;
            } else if (this.inRange(bhr, 110, 160)) {
                score.cstdata.bhrscore = 2;
            }
            // 振幅变异
            let zhenfu_tv = analysis.ltv;
            score.cstdata.ltvvalue = zhenfu_tv;
            if (zhenfu_tv < 5) {
                score.cstdata.ltvscore = 0;
            } else if (this.inRange(zhenfu_tv, 5, 9) || zhenfu_tv > 30) {
                score.cstdata.ltvscore = 1;
            } else if (this.inRange(zhenfu_tv, 10, 30)) {
                score.cstdata.ltvscore = 2;
            }
            // 周期变异
            let zhouqi_tv = analysis.stv;
            score.cstdata.stvvalue = zhouqi_tv;
            if (zhouqi_tv < 3) {
                score.cstdata.stvscore = 0;
            } else if (this.inRange(zhouqi_tv, 3, 6)) {
                score.cstdata.stvscore = 1;
            } else if (zhouqi_tv > 6) {
                score.cstdata.stvscore = 2;
            }
            // 加速
            // score.cstdata.accvalue = accnum;
            if (acc_num == 0) {
                score.cstdata.accscore = 0;
                score.cstdata.accvalue = '无';
            } else if (this.cycleAcc() == 1) {
                score.cstdata.accscore = 1;
                score.cstdata.accvalue = '周期性';
            } else {
                score.cstdata.accscore = 2;
                score.cstdata.accvalue = '散在性';
            }
            // 减速

            if (ldtimes > 0) {
                score.cstdata.decscore = 0;
                score.cstdata.decvalue = '晚期'; // 晚期
            } else if (edtimes > 0) {
                //判为其他
                score.cstdata.decscore = 0;
                score.cstdata.decvalue = '其他';// 其他
            } else if (vdtimes > 0) {
                score.cstdata.decscore = 1;
                score.cstdata.decvalue = '变异减速';// 变异
            } else {
                score.cstdata.decscore = 2;
                score.cstdata.decvalue = '无';// 无
            }

            //@ts-ignore
            score.cstdata.total = score.cstdata.bhrscore + score.cstdata.accscore + score.cstdata.decscore + score.cstdata.ltvscore + score.cstdata.stvscore;
        }
        //NST-sogc 20~40分钟
        else if (type == 'Sogc') {
            //档案时长
            const length = analysis.length;
            // 基线选项
            score.sogcdata.bhrvalue = bhr;
            if (this.inRange(bhr, 110, 160))
                score.sogcdata.bhrscore = 0;
            else if (this.inRange(bhr, 100, 109) || bhr > 160)
                score.sogcdata.bhrscore = 1;
            else if (bhr < 100) {
                score.sogcdata.bhrscore = 2;
            }
            // 变异
            score.sogcdata.ltvvalue = analysis.ltv;
            if (analysis.ltv <= 5) {
                if (length < 40) {
                    score.sogcdata.ltvscore = 0;
                } else if (this.inRange(length, 40, 80)) {
                    score.sogcdata.ltvscore = 1;
                } else {
                    score.sogcdata.ltvscore = 2;
                }
            } else if (analysis.ltv >= 26 || analysis.sinusoid) {
                score.sogcdata.ltvscore = 2;
            } else {
                score.sogcdata.ltvscore = 0;
            }

            // 加速
            score.sogcdata.accvalue = acc_num;
            if (acc_num >= 2) {
                score.sogcdata.accscore = 0;
            } else {
                if (length > 80) {
                    score.sogcdata.accscore = 2;
                } else if (this.inRange(length, 40, 80)) {
                    score.sogcdata.accscore = 1;
                } else {
                    score.sogcdata.accscore = 3;
                }
            }
            // if (accnum == 0) {
            //     score.sogcdata.accscore = 0;
            // } else if (this.inRange(accnum, 1, 2)) {
            //     score.sogcdata.accscore = 1;
            // } else if (accnum > 2) {
            //     score.sogcdata.accscore = 2;
            // }
            // 减速
            // let ld = analysis.ldtimes = this.countDec(analysis.start, analysis.end, 'LD');//analysis.ldtimes;
            if (edtimes > 0) {
                score.sogcdata.decvalue = 'ed';
                score.sogcdata.decscore = 2;
            } else if (vdtimes > 0) {
                const all = analysis.dec.filter(_ => _.type === 'vd' && _.start >= analysis.start && _.end <= analysis.end)
                const gt60 = all.find(_ => _.duration > 60)
                const btw = all.find(_ => this.inRange(_.duration, 30, 60))
                if (gt60) {
                    score.sogcdata.decscore = 2;
                } else if (btw) {
                    score.sogcdata.decscore = 1;
                }
                score.sogcdata.decvalue = 'vd';

            } else {
                score.sogcdata.decscore = 0;
                score.sogcdata.decvalue = '无';
            }
            score.sogcdata.total = 0;
            const { bhrscore, accscore, decscore, ltvscore } = score.sogcdata
            const all = [bhrscore, accscore, decscore, ltvscore]

            if (all.some(_ => _ === 2)) {
                score.sogcdata.total = 2;
            } else if (all.some(_ => _ === 1)) {
                score.sogcdata.total = 1;
            } else if (all.some(_ => _ === 3)) {
                score.sogcdata.total = 3;
            }
            score.sogcdata.result = resultMap[score.sogcdata.total]
        }
        //CST-OCT sogc
        else if (type == 'Cstoct') {
            // 基线选项
            score.cstoctdata.bhrvalue = bhr;
            if (this.inRange(bhr, 110, 160))
                score.cstoctdata.bhrscore = 0;
            else if (this.inRange(bhr, 100, 109) || bhr > 160)
                score.cstoctdata.bhrscore = 1;
            else if (bhr < 100) { // bhr < 100 || (bhr > 160 && length > 30)
                score.cstoctdata.bhrscore = 2;
            }
            // 变异
            score.cstoctdata.ltvvalue = analysis.ltv;
            if (analysis.ltv < 5) {
                if (length < 40) {
                    score.cstoctdata.ltvscore = 2;
                } else if (this.inRange(length, 40, 80)) {
                    score.cstoctdata.ltvscore = 1;
                } else {
                    score.cstoctdata.ltvscore = 0;
                }
            } else if (this.inRange(analysis.ltv, 5, 9) || analysis.ltv > 30) {
                score.cstoctdata.ltvscore = 1;
            } else if (this.inRange(analysis.ltv, 6, 25)) {
                score.cstoctdata.ltvscore = 0;
            }
            //正弦判断
            if (!analysis.sinusoid) {
                score.cstoctdata.sinusoidscore = 0;
                score.cstoctdata.sinusoidvalue = '无';
            } else {
                score.cstoctdata.sinusoidscore = 2;
                score.cstoctdata.sinusoidvalue = '有';
            }
            // 加速
            if (acc_num == 0) {
                score.cstoctdata.accvalue = '无';
                score.cstoctdata.accscore = 2;


            } else if (this.inRange(acc_num, 1, 2)) {
                score.cstoctdata.accvalue = '刺激胎儿后仍缺失';
                score.cstoctdata.accscore = 1;
            } else if (acc_num > 2) {
                score.cstoctdata.accscore = 0;
                score.cstoctdata.accvalue = '有';
            }
            // 减速
            score.cstoctdata.ldvalue = ldtimes || '无'
            score.cstoctdata.vdvalue = vdtimes || '无'
            score.cstoctdata.edvalue = edtimes || '无'
            if (ldtimes > 0) {
                score.cstoctdata.decscore = 0;
                score.cstoctdata.decvalue = 'LD';
                score.cstoctdata.ldscore = 1
            } else if (vdtimes > 0) {
                score.cstoctdata.decscore = 1;
                score.cstoctdata.decvalue = 'VD';
                score.cstoctdata.vdscore = 1

                analysis.dec.map((item) => {
                    if (item.type.toUpperCase() == 'VD') {
                        if (this.inRange(item.duration, 30, 60)) {
                            score.cstoctdata.decscore = 1;
                            score.cstoctdata.decvalue = 'VD';
                            score.cstoctdata.vdscore = 1

                        } else if (item.duration > 60) {
                            score.cstoctdata.decscore = 0;
                            score.cstoctdata.decvalue = 'VD';
                            score.cstoctdata.vdscore = 2

                        }
                    }
                })
            } else {
                if (edtimes > 0) {
                    score.cstoctdata.decvalue = 'ED';
                    score.cstoctdata.edscore = 1

                } else {
                    score.cstoctdata.decvalue = '无';
                }
                score.cstoctdata.decscore = 2;
            }
            score.cstoctdata.total = 0;
            const { bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore } = score.cstoctdata
            const all = [bhrscore, accscore, sinusoidscore, ltvscore, ldscore, edscore, vdscore]
            //@ts-ignore
            if (all.some(_ => _ === 2)) {
                score.cstoctdata.total = 2;
            } else if (all.some(_ => _ === 1)) {
                score.cstoctdata.total = 1;
            } else if (all.some(_ => _ === 3)) {
                score.cstoctdata.total = 3;
            }
            score.cstoctdata.result = resultMap[score.cstoctdata.total]

        }
        // genDeformedScore(score.cstoctdata)
        // genDeformedScore(score.sogcdata)
        return (this.analysisData = analysisData)

    }
    revicePoint(x: number, y: number) {
        if (!this.analysisData) return
        const edge = 20;
        const { analysis: { acc, dec } } = this.analysisData

        const target = acc.find(_ => (x < _.x + edge) && (x > _.x - edge)) || dec.find(_ => (x < _.x + edge) && (x > _.x - edge))
        if (target && (y < (target.y + edge) && y > (target.y - edge))) {
            const isAcc = 'reliability' in target

            return isAcc ? '' : ''
        }
        return null
    }
    refresh() {
        // this.suit.emit('suit:analyseMark')
        this.analyse()
        // this.suit.drawobj.drawdot(this.suit.viewposition < this.width * 2 ? this.width * 2 : this.suit.viewposition);
    }

    markAccPoint() {
        if (!this.analysisData) return
        const { analysis: { acc } } = this.analysisData

        acc.push({
            marked: true,
            index: this.pointToInsert.index,
            start: 0,
            end: 0,
            peak: 0,
            duration: 0,
            ampl: 0,
            reliability: 0,
            user: true
        })
        this.refresh()
    }
    editAccPoint(marked = true) {
        if (!this.analysisData) return
        const { analysis: { acc } } = this.analysisData
        const target = this.pointToEdit as AccPoint
        target.marked = marked
        target.remove = !marked;
        const { user } = target
        if (user && !marked) {
            const index = acc.findIndex(_ => _.index === target.index)
            acc.splice(index, 1)
        }
        this.refresh()
    }
    editBaselinePoint(n = 0) {
        if (!this.analysisData) return
        const { analysis: { fhrbaselineMinute } } = this.analysisData

        const index = this.baselinePointIndex
        fhrbaselineMinute[index] = fhrbaselineMinute[index] + n

        this.refresh()
        this.baselinePointIndex = -1
    }
    markDecPoint(type: DecType) {
        if (!this.analysisData) return
        const { analysis: { dec } } = this.analysisData
        dec.push({
            index: this.pointToInsert.index,
            type,
            start: 0,
            end: 0,
            peak: 0,
            duration: 0,
            ampl: 0,
            marked: true,
            user: true
        })
        this.refresh()
    }
    editDecPoint(type: DecType) {
        if (!this.analysisData) return
        const { analysis: { dec } } = this.analysisData

        const target = this.pointToEdit as DecPoint
        const { user } = target

        target.type = type;
        if (type == "ld" || type == "vd" || type == "ed") {
            target.remove = false;
        } else {
            target.remove = true;
        }
        if (user && !type) {
            const index = dec.findIndex(_ => _.index === target.index)
            dec.splice(index, 1)
        }

        this.refresh()
    }


}