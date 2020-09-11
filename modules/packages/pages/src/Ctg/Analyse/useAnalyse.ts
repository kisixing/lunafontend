
import { useState, useEffect, useRef, MutableRefObject } from 'react';
import request from "@lianmed/request";
import { _R } from "@lianmed/utils";
import { FormInstance } from 'antd/lib/form';
import { obvue } from "@lianmed/f_types";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { AnalyseType } from '@lianmed/lmg/lib/interface';
import { tableData } from './methods/tableData';
import store from "store";
import { ctg_exams_analyse_score } from '@lianmed/f_types/lib/obvue/ctg_exams_analyse';
import { event } from '@lianmed/utils';

const MARKS = Object.keys(tableData) as AnalyseType[]
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
export default (v: MutableRefObject<Suit>, docid: string, fetal: any, ctgData: obvue.ctg_exams_data) => {

    const [initData, setInitData] = useState<obvue.ctg_exams_analyse>()
    // const [isToShort, setIsToShort] = useState(false)
    const [mark, setMark] = useState(store.get(MARK_KEY) || MARKS[0])
    const [interval, setInterval] = useState(store.get(INTERVAL_KEY) || 20)
    const [startTime, setStartTime] = useState(0)
    // const [endTime, setEndTime] = useState(0)
    const [analyseLoading, setAnalyseLoading] = useState(false)
    const [autoFm, setAutoFm] = useState<boolean>(store.get(AUTOFM_KEY) || false)
    const [autoAnalyse, setAutoAnalyse] = useState<boolean>(store.get(AUTOANALYSE_KEY) || false)
    const [showBase, setShowBase] = useState<boolean>(true)
    const [tryCount, setTryCount] = useState(0)
    const Fischer_ref = useRef<FormInstance>()
    const Krebs_ref = useRef<FormInstance>()
    const Nst_ref = useRef<FormInstance>()
    const Cst_ref = useRef<FormInstance>()
    const Cstoct_ref = useRef<FormInstance>()
    const Sogc_ref = useRef<FormInstance>()
    const analysis_ref = useRef<FormInstance>()
    const old_ref = useRef<{ [x: string]: any }>({})
    const hasInitAnalysed = useRef(false)
    let endTime = (ctgData && ctgData.fhr1) ? (startTime + interval * 240 > ctgData.fhr1.length / 2 ? ctgData.fhr1.length / 2 : startTime + interval * 240) : 0
    // const diff = Math.round((endTime - startTime) / 240)


    const mapFormToMark = {
        Fischer_ref,
        Krebs_ref,
        Nst_ref,
        Cst_ref,
        Cstoct_ref,
        Sogc_ref,
        analysis_ref
    }
    useEffect(() => {
        function initCb(d) {
            d.resize()
            if (!autoAnalyse) return
            const index = d.data.index
            let e = (index) ? (startTime + interval * 240 > index  ? index  : startTime + interval * 240) : 0
            if (!initData) {
                fetchData(e)
                    .then(r => {
                        r.score = getEmptyScore()
                        v.current.resize()
                        setInitData(r)
                        v.current.drawAnalyse.analyse(mark, showBase, startTime, e, r)
                    })
                    .finally(() => setTryCount(1))
            }
            v.current.drawAnalyse.analyse(mark, showBase, startTime, endTime, initData,)

            setFm(autoFm)
        }
        event
            .on('suit:afterInit', initCb)
            .on('suit:afterAnalyse', setFormData)
        return () => {
            event
                .off('suit:afterInit', initCb)
                .off('suit:afterAnalyse', setFormData)

        }
    }, [showBase, autoFm, autoAnalyse, setFormData, initData, fetchData, ctgData])
    function setFm(flag = true) {
        if (v.current && initData) {
            if (flag) {
                const fmIndex = initData.analysis.fm || []
                const fm = v.current.data.fm
                fmIndex.forEach(_ => {
                    fm[_] = 1
                    fm[_ - 1] = 1
                })
                hardAnalyse()
            }
        }
    }

    function fetchData(e = endTime) {
        // if(docid==undefined){
        //     return;
        // }
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
    }

    const reAnalyse = async () => {
        const r = await fetchData()
        const analysisData = v.current.drawAnalyse.analysisData
        if (analysisData) {
            r.analysis.acc = analysisData.analysis.acc
            r.analysis.dec = analysisData.analysis.dec
        }
        r.score = getEmptyScore()
        setInitData(r)
        v.current.drawAnalyse.analyse(mark, showBase, startTime, endTime, r)
    }



    function setFormData(r: obvue.ctg_exams_analyse) {
        if (!r) return;
        const { analysis, score } = r
        console.log('form', analysis, score)
        const f = score[`${mark.toLowerCase()}data`]
        const cur: MutableRefObject<FormInstance> = mapFormToMark[`${mark}_ref`]
        cur.current && cur.current.setFieldsValue(f);
        old_ref.current[mark] = f

        const { stv, ucdata, acc, dec, fhrbaselineMinute, ...others } = analysis
        analysis_ref.current && analysis_ref.current.setFieldsValue({ stv, ...ucdata, ...others })
    }
    // useEffect(() => {


    //     if (!(initData || endTime === 0 || analyseLoading || tryCount) && autoAnalyse) {
    //         fetchData()
    //             .then(r => {
    //                 r.score = getEmptyScore()
    //                 v.current.resize()
    //                 setInitData(r)
    //             })
    //             .finally(() => setTryCount(1))
    //     }
    // }, [ctgData, analyseLoading, autoAnalyse, initData, tryCount, v])



    // useEffect(() => {

    //     const id = (hasInitAnalysed.current) ? 0 : window.setInterval(() => {
    //         if (initData && v.current && !hasInitAnalysed.current) {
    //             console.log('xxx', '---');

    //             clearInterval(id)
    //             let r = v.current.drawAnalyse.analyse(mark, showBase, startTime, endTime, initData)
    //             hasInitAnalysed.current = true
    //             setFormData(r)
    //             setFm(autoFm)
    //         }
    //     }, 1000)
    //     return () => {
    //         clearInterval(id)
    //     }
    // }, [initData, v.current, mark, startTime, setFormData, autoAnalyse, setFm, autoFm, showBase])


    const hardAnalyse = (show = showBase) => {
        v.current.drawAnalyse.analyse(mark, show)
    }
    useEffect(() => {
        const s = (time) => {
            time = time + 4800 <= v.current.data.index ? time : ((v.current.data.index - 4800) > 0 ? (v.current.data.index - 4800) : 0)
            docid && setStartTime(time)
        }


        v.current && v.current.on('change:selectPoint', s).on('suit:analyseMark', hardAnalyse)
        return () => {

            v.current && v.current.off('change:selectPoint', s).off('suit:analyseMark', hardAnalyse)

        };
    }, [interval, v.current, docid, hardAnalyse])

    useEffect(() => {
        Object.values(mapFormToMark).forEach(f => f.current && f.current.resetFields())
        hasInitAnalysed.current = false
        setInitData(null)
        setStartTime(0)
    }, [docid])

    useEffect(() => {
        // setFhr(fetal)
        setInitData(null)
        hasInitAnalysed.current = false
    }, [fetal])


    // useEffect(() => {
    //     if (ctgData && ctgData.fhr1) {
    //         const value = startTime + interval * 240 > ctgData.fhr1.length / 2 ? ctgData.fhr1.length / 2 : startTime + interval * 240
    //         setEndTime(value)
    //     }
    // }, [startTime, interval, ctgData])

    // useEffect(() => {
    //     const diff = Math.round((endTime - startTime) / 240)
    //     if (diff < limitMap[mark] && endTime !== 0) {
    //         setIsToShort(true)
    //     } else {
    //         setIsToShort(false)
    //     }
    // }, [startTime, mark])


    useEffect(() => {
        v.current && hardAnalyse()
        store.set(MARK_KEY, mark)

        if (mark === 'Krebs') {
            setInterval(30)
        }
    }, [mark])

    useEffect(() => {
        store.set(INTERVAL_KEY, interval)

    }, [interval])


    return {
        setMark(m: AnalyseType) {
            setMark(m);

        },
        mark,
        MARKS,
        reAnalyse,
        startTime, endTime, setStartTime, interval, setInterval,
        mapFormToMark,
        analysis_ref,
        old_ref,
        analyseLoading,
        setAutoFm(s: boolean) {
            setAutoFm(s)
            setFm(s)
            store.set(AUTOFM_KEY, s)
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
            store.set(SHOW_BASE, s)
            hardAnalyse(s)
        },
    }
}


