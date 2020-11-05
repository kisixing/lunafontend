
import { obvue } from "@lianmed/f_types";
import { ctg_exams_analyse_score } from '@lianmed/f_types/lib/obvue/ctg_exams_analyse';
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { AnalyseType } from '@lianmed/lmg/lib/interface';
import request from "@lianmed/request";
import { event } from '@lianmed/utils';
import { FormInstance } from 'antd/lib/form';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import store from "store";
import { historyItem } from "./data";
import { tableData } from './methods/tableData';
import { queryHistory } from './service';
export const MARKS = Object.keys(tableData) as AnalyseType[]
const AUTOFM_KEY = 'autofm'
const AUTOANALYSE_KEY = 'auto_analuse'
const SHOW_BASE = 'show_base'
const MARK_KEY = 'analyse_mark'
const INTERVAL_KEY = 'analyse_interval'
// const limitMap: { [x in AnalyseType]: any } = {
//     Krebs: 30,
//     Nst: 20,
//     Fischer: 20,
//     Sogc: 20,
//     Cst: 20,
//     Cstoct: 20
// }
const getEmptyScore = (): ctg_exams_analyse_score => {
    return {
        sogcdata: {
            bhrscore: 0,
            ltvvalue: 0,
            ltvscore: 0,
            accscore: 0,
            accvalue: 0,
            bhrvalue: 0,
            decscore: 0,
            decvalue: 0,
            total: 0,
            result: ''
        },

        ret: 0,
        msg: '',
        nstdata: {
            bhrscore: 0,
            ltvscore: 0,
            accdurationscore: 0,
            accamplscore: 0,
            fmscore: 0,
            total: 0,
            bhrvalue: 0,
            ltvvalue: 0,
            accdurationvalue: 0,
            accamplvalue: 0,
            fmvalue: 0,
        },
        krebsdata: {
            ltvvalue: 0,
            total: 0,
            bhrscore: 0,
            ltvscore: 0,
            stvscore: 0,
            accscore: 0,
            decscore: 0,
            fmscore: 0,
            bhrvalue: 0,
            ltvalue: 0,
            stvvalue: 0,
            accvalue: 0,
            decvalue: '',
            fmvalue: 0,
        },
        fischerdata: {
            ltvvalue: 0,
            bhrscore: 0,
            ltvscore: 0,
            stvscore: 0,
            accscore: 0,
            decscore: 0,
            total: 0,
            bhrvalue: 0,
            ltvalue: 0,
            stvvalue: 0,
            accvalue: 0,
            decvalue: '',
        },
        cstoctdata: {
            ldvalue: 0,
            ldscore: 0,
            vdscore: 0,
            vdvalue: 0,
            edscore: 0,
            edvalue: 0,
            bhrscore: 0,
            ltvvalue: 0,
            ltvscore: 0,
            accscore: 0,
            accvalue: 0,
            bhrvalue: 0,
            decscore: 0,
            decvalue: 0,
            sinusoidscore: 0,
            sinusoidvalue: 0,
            total: 0,
            result: ''
        },
        cstdata: {
            bhrscore: 0,
            ltvvalue: 0,
            ltvscore: 0,
            stvscore: 0,
            stvvalue: 0,
            accscore: 0,
            accvalue: 0,
            bhrvalue: 0,
            decscore: 0,
            decvalue: 0,
            total: 0,
        }
    }
}
export default (suit: MutableRefObject<Promise<Suit>>, docid: string, fetal: any, ctgData: obvue.ctg_exams_data) => {

    const [initData, setInitData] = useState<obvue.ctg_exams_analyse>()
    // const [isToShort, setIsToShort] = useState(false)
    const [mark, setMark] = useState(store.get(MARK_KEY) || MARKS[0])
    const [interval, setInterval] = useState(store.get(INTERVAL_KEY) || 20)
    const [startTime, setStartTime] = useState(0)
    // const [endTime, setEndTime] = useState(0)
    const [analyseLoading, setAnalyseLoading] = useState(false)
    const [autoFm, setAutoFm] = useState<boolean>(store.get(AUTOFM_KEY) || false)
    const [showBase, setShowBase] = useState<boolean>(store.get(SHOW_BASE))
    const [autoAnalyse, setAutoAnalyse] = useState<boolean>(store.get(AUTOANALYSE_KEY) || false)
    const [currentHistory, setCurrentHistory] = useState<historyItem>({})
    const [isEditBase, setIsEditBase] = useState(false)
    const [historyList, setHistoryList] = useState<historyItem[]>([])
    const [fakeHistoryLoading, setFakeHistoryLoading] = useState(false)

    const Fischer_ref = useRef<FormInstance>()
    const Krebs_ref = useRef<FormInstance>()
    const Nst_ref = useRef<FormInstance>()
    const Cst_ref = useRef<FormInstance>()
    const Cstoct_ref = useRef<FormInstance>()
    const Sogc_ref = useRef<FormInstance>()
    const analysis_ref = useRef<FormInstance>()
    const old_ref = useRef<{ [x: string]: any }>({})
    let endTime = (ctgData && ctgData.fhr1) ? (startTime + interval * 240 > ctgData.fhr1.length / 2 ? ctgData.fhr1.length / 2 : startTime + interval * 240) : 0
    // const diff = Math.round((endTime - startTime) / 240)

    function fetchHistoryList() {

        queryHistory({ note: docid }).then(data => {
            setHistoryList(data)
        })
    }


    const hardAnalyse = useCallback(
        function hardAnalyse() {

            suit.current.then(s => {
                s.drawAnalyse.analyse()
            })
        },
        [],
    )
    const mapFormToMark = {
        Fischer_ref,
        Krebs_ref,
        Nst_ref,
        Cst_ref,
        Cstoct_ref,
        Sogc_ref,
        analysis_ref
    }





    function fetchData(e?: number) {
        return suit.current.then(s => {
            e = e ? e : s.getAnalyseEndTime(interval)
            if ((e - startTime) <= 10) {
                return Promise.reject()
            }
            setAnalyseLoading(true)
            return request.post(`/ctg-exams-analyse`, {
                data: { docid, mark, start: startTime, end: e, fetal, autoFm },
            })
                .then((r: obvue.ctg_exams_analyse) => {
                    return r
                })
                .finally(() => {
                    setAnalyseLoading(false)
                })
        })
    }

    const reAnalyse = () => {
        fetchData()
            .then(r => {
                suit.current.then(s => {
                    // const analysisData = s.drawAnalyse.analysisData
                    // if (analysisData) {
                    //     r.analysis.acc = analysisData.analysis.acc
                    //     r.analysis.dec = analysisData.analysis.dec
                    // }
                    r.score = getEmptyScore()

                    setInitData(r)
                    setCurrentHistory(null)
                    s.drawAnalyse.showBase = showBase
                    s.drawAnalyse.autoFm = autoFm
                    s.drawAnalyse.analyse(mark, startTime, s.getAnalyseEndTime(interval), r)
                })
            })
            .catch(() => { })


    }



    function setFormData(r: obvue.ctg_exams_analyse) {
        if (!r) return;
        const { analysis, score } = r
        setInitData(r)
        const f = score[`${mark.toLowerCase()}data`]
        const cur: MutableRefObject<FormInstance> = mapFormToMark[`${mark}_ref`]
        cur.current && cur.current.setFieldsValue(f);
        old_ref.current[mark] = f
        const { stv, ucdata, acc, dec, fhrbaselineMinute, ...others } = analysis
        analysis_ref.current && analysis_ref.current.setFieldsValue({ stv, ...ucdata, ...others })
    }


    useEffect(() => {
        function initCb() {
            autoAnalyse && reAnalyse()
        }
        event
            .on('suit:afterInit', initCb)
            .on('suit:afterAnalyse', setFormData)
        return () => {
            event
                .off('suit:afterInit', initCb)
                .off('suit:afterAnalyse', setFormData)

        }
    }, [autoAnalyse, initData, setFormData])

    useEffect(() => {

        const s = (time) => {

            suit.current.then(ins => {
                time = time + 4800 <= ins.data.index ? time : ((ins.data.index - 4800) > 0 ? (ins.data.index - 4800) : 0)
                docid && setStartTime(time)
            })
        }

        suit.current.then(ins => {
            ins.on('change:selectPoint', s)
        })
        return () => {
            suit.current.then(ins => {
                ins.off('change:selectPoint', s)
            })

        };
    }, [interval, docid])

    useEffect(() => {
        reset()
        setStartTime(0)
        fetchHistoryList()
        autoAnalyse && reAnalyse()
        console.log('docid', autoAnalyse)
    }, [docid, autoAnalyse])
    function reset() {
        Object.values(mapFormToMark).forEach(f => f.current && f.current.resetFields())
        setInitData(null)
    }



    return {
        setMark(m: AnalyseType) {
            setMark(m);
            store.set(MARK_KEY, m)
            suit.current.then(ins => {
                ins.drawAnalyse.type = m
                hardAnalyse()
            })

        },
        mark,
        reAnalyse,
        startTime, endTime, setStartTime, interval,
        setInterval(i) {
            console.log('setFormData setInterval', mark, interval)

            store.set(INTERVAL_KEY, i)
            setInterval(i)
            reAnalyse()
        },
        mapFormToMark,
        analysis_ref,
        old_ref,
        analyseLoading,
        setAutoFm(flag: boolean) {
            setAutoFm(flag)

            store.set(AUTOFM_KEY, flag)
            suit.current.then(s => {

                s.drawAnalyse.autoFm = flag
                s.drawAnalyse.analyse(mark, startTime, endTime, initData,)

            })
        },
        autoFm,
        initData,
        autoAnalyse,
        setAutoAnalyse(s: boolean) {
            setAutoAnalyse(s)
            store.set(AUTOANALYSE_KEY, s)
        },
        showBase,
        setShowBase(s: boolean) {
            setShowBase(s)
            suit.current.then(ins => ins.drawAnalyse.showBase = s)
            store.set(SHOW_BASE, s)
            hardAnalyse()
        },
        setFetalCb() {
            reset()

            if (autoAnalyse) {

                reAnalyse()
            }
        },
        fakeHistoryLoading,
        setCurrentHistory(i: historyItem) {
            setCurrentHistory(i)
            setFakeHistoryLoading(true)
            setTimeout(() => {
                setFakeHistoryLoading(false)
            }, 700);
            const { diagnosis, analysis, result } = i
            console.log('result', result)
            if (analysis) {
                suit.current?.then(s => {
                    // s.drawAnalyse.showBase = true
                    // s.drawAnalyse.autoFm = true
                    analysis_ref.current?.setFieldsValue(diagnosis)
                    s.drawAnalyse.analyse(result?.type as any, result?.startTime, result?.endTime, analysis)
                    setMark(result?.type)
                    setStartTime(result.startTime)
                    setInterval(~~((result.endTime - result.startTime) / 240))
                    // suit.isCheckBaelinePoint = true
                })
            }
        },
        historyList,
        currentHistory,
        isEditBase,
        setIsEditBase(flag: boolean) {
            suit.current.then(s => {
                setIsEditBase(flag)
                s.isCheckBaelinePoint = flag
                if (flag && !showBase) {
                    setShowBase(true)
                    s.drawAnalyse.showBase = true
                    store.set(SHOW_BASE, true)
                    hardAnalyse()
                }
            })

        },
        fetchHistoryList
    }
}


