
import { useState, useEffect, useRef, MutableRefObject } from 'react';
import request from "@lianmed/request";
import { _R } from "@lianmed/utils";
import { FormInstance } from 'antd/lib/form';
import { obvue } from "@lianmed/f_types";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { AnalyseType } from '@lianmed/lmg/lib/interface';
import { tableData } from './methods/tableData';

const MARKS = Object.keys(tableData) as AnalyseType[]

const limitMap: { [x in AnalyseType]: any } = {
    Krebs: 30,
    Nst: 20,
    Fischer: 20,
    Sogc: 20,
    Cst: 20
}

export default (v: Suit, docid: string, fetal: any, setFhr: (index: 2 | 1 | 3) => void, ctgData: obvue.ctg_exams_data) => {

    const [initData, setInitData] = useState<obvue.ctg_exams_analyse>()
    const [isToShort, setIsToShort] = useState(false)
    const [mark, setMark] = useState(MARKS[0])
    const [interval, setInterval] = useState(20)
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)
    const [analyseLoading, setAnalyseLoading] = useState(false)
    const Fischer_ref = useRef<FormInstance>()
    const Krebs_ref = useRef<FormInstance>()
    const Nst_ref = useRef<FormInstance>()
    const analysis_ref = useRef<FormInstance>()
    const old_ref = useRef<{ [x: string]: any }>({})

    const hasInitAnalysed = useRef(false)


    const mapFormToMark = {
        Fischer_ref,
        Krebs_ref,
        Nst_ref,
        analysis_ref
    }
    // const checkLength = () => {
    //     return v && v.data && v.data.length > (mark === 'Fischer' ? 30 : 20) * 240
    // }


    const remoteAnalyse = () => {
        return new Promise((res) => {
            if ((isToShort || initData || endTime === 0)) {
                res()
            } else {
                setAnalyseLoading(true)
                request.post(`/ctg-exams-analyse`, {
                    data: { docid, mark, start: startTime, end: endTime, fetal },
                })
                    .then((r: obvue.ctg_exams_analyse) => {
                        // r.analysis.dec = [{
                        //     index: 100,
                        //     start: 0,
                        //     end: 1,
                        //     peak: 11,
                        //     duration:11, 
                        //     ampl: 11,
                        //     // local re
                        //     type:'ed'
                        // }]
                        r.score = {
                            sogcdata: {
                                bhrscore: 0,
                                ltvvalue: 0,
                                ltvscore: 0,
                                accscore: 0,
                                accvalue: 0,
                                bhrvalue: 0,
                            },
                            ret: 0,
                            msg: '',
                            cstdata: null,
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
                            }
                        }
                        setInitData(r)
                    })
                    .finally(() => {
                        setAnalyseLoading(false)
                        res()
                    })
            }


        })


    }

    const setFormData = (r: obvue.ctg_exams_analyse) => {
        if (!r) return;
        const { analysis, score } = r

        const f = score[`${mark.toLowerCase()}data`]
        const cur: MutableRefObject<FormInstance> = mapFormToMark[`${mark}_ref`]
        cur.current && cur.current.setFieldsValue(f);
        old_ref.current[mark] = f

        const { stv, ucdata, acc, dec, fhrbaselineMinute, ...others } = analysis
        analysis_ref.current && analysis_ref.current.setFieldsValue({ stv, ...ucdata, ...others })
    }
    useEffect(() => {

        if (!analyseLoading) {
            remoteAnalyse()
        }

    }, [remoteAnalyse])



    useEffect(() => {

        const id = hasInitAnalysed.current ? 0 : window.setInterval(() => {
            console.log('111', initData, v)
            if (initData && v) {

                clearInterval(id)
                let r = v.drawAnalyse.analyse(mark, startTime, endTime, initData)
                hasInitAnalysed.current = true
                setFormData(r)
            }
        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [initData, v, mark, startTime, endTime, setFormData])

    const analyse = () => {
        remoteAnalyse().then(() => {
            v && setFormData(v.drawAnalyse.analyse(mark, startTime, endTime))
        })
    }

    useEffect(() => {
        const s = (time) => {
            time = time + 4800 <= v.data.index ? time : ((v.data.index - 4800) > 0 ? (v.data.index - 4800) : 0)
            docid && setStartTime(time)
        }

        v && v.on('change:selectPoint', s)
        return () => {

            v && v.off('change:selectPoint', s)

        };
    }, [interval, v, docid])

    useEffect(() => {
        Object.values(mapFormToMark).forEach(f => f.current && f.current.resetFields())
        hasInitAnalysed.current = false
        setInitData(null)
        setStartTime(0)
    }, [docid])

    useEffect(() => {
        setFhr(fetal)
        setInitData(null)
        hasInitAnalysed.current = false
    }, [fetal])


    useEffect(() => {
        if (ctgData && ctgData.fhr1) {
            const value = startTime + interval * 240 > ctgData.fhr1.length ? ctgData.fhr1.length : startTime + interval * 240
            setEndTime(value)
        }
    }, [startTime, interval, ctgData])

    useEffect(() => {
        const diff = Math.round((endTime - startTime) / 240)
        if (diff < limitMap[mark] && endTime !== 0) {
            setIsToShort(true)
        } else {
            setIsToShort(false)
        }
    }, [startTime, endTime, mark])





    return {
        setMark(m: AnalyseType) {
            setMark(m);
            analyse()
        },
        mark,
        MARKS,
        analyse,
        startTime, endTime, setStartTime, interval, setInterval,
        Fischer_ref,
        Nst_ref,
        Krebs_ref,
        analysis_ref,
        old_ref,
        analyseLoading,
        isToShort
    }
}













export interface IResult {
    fhr_uptime_score: 0,
    fhrbaseline_score: 0,
    fm_fhrv_score: 0,
    fm_score: 0,
    zhenfu_lv_score: 0,
}
