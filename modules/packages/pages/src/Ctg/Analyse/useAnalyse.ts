
import { useState, useEffect, useRef, MutableRefObject } from 'react';
import request from "@lianmed/request";
import { _R } from "@lianmed/utils";
import { FormInstance } from 'antd/lib/form';
import { obvue } from "@lianmed/f_types";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { tableData } from './methods/tableData';

const MARKS = Object.keys(tableData)
export default (v: Suit, docid, fetal: any, setFhr: (index: 2 | 1 | 3) => void) => {

    const [mark, setMark] = useState(MARKS[0])
    const [interval, setInterval] = useState(20)
    const [startTime, setStartTime] = useState(0)
    const [analyseLoading, setAnalyseLoading] = useState(false)
    const Fischer_ref = useRef<FormInstance>()
    const Krebs_ref = useRef<FormInstance>()
    const Nst_ref = useRef<FormInstance>()
    const analysis_ref = useRef<FormInstance>()
    const old_ref = useRef<{ [x: string]: any }>({})

    const mapFormToMark = {
        Fischer_ref,
        Krebs_ref,
        Nst_ref,
        analysis_ref
    }

    const remoteAnalyse = () => {
        setAnalyseLoading(true)
        v && request.post(`/ctg-exams-analyse`, {
            data: { docid, mark, start: startTime, end: startTime + interval * 240, fetal },
        }).then((r: obvue.ctg_exams_analyse) => {


            const { analysis, score } = r
            analysis.start = startTime
            analysis.end = startTime + 240 * interval
            const f = score[`${mark.toLowerCase()}data`]
            const cur: MutableRefObject<FormInstance> = mapFormToMark[`${mark}_ref`]
            cur.current.setFieldsValue(f);
            old_ref.current[mark] = f

            const { stv, ucdata, acc, dec, fhrbaselineMinute, ...others } = analysis
            analysis_ref.current.setFieldsValue({ stv, ...ucdata, ...others })
            v.analyse(r)

        }).finally(() => setAnalyseLoading(false))
    }
    const analyse = () => {
        setAnalyseLoading(true)
        v && v.ctgscore
    }

    useEffect(() => {
        const s = (time) => {
            time = time + 4800 <= v.data.index ? time : ((v.data.index - 4800) > 0 ? (v.data.index - 4800) : 0)
            docid && setStartTime(time)
        }

        v && v.on('change:selectPoint', s).on('afterInit', remoteAnalyse)
        return () => {

            v && v.off('change:selectPoint', s).off('afterInit', remoteAnalyse)

        };
    }, [interval, v, docid, remoteAnalyse])

    useEffect(() => {
        Object.values(mapFormToMark).forEach(f => f.current && f.current.resetFields())
        setStartTime(0)
    }, [docid])
    useEffect(() => { setMarkAndItems(MARKS[0]) }, [])

    useEffect(() => {
        setFhr(fetal)
    }, [fetal])


    const setMarkAndItems = (mark: string) => {
        setMark(mark)
    }

    return {
        setMark: setMarkAndItems, mark,
        MARKS,
        analyse,
        startTime, endTime: startTime + 240 * interval, setStartTime, interval, setInterval,
        Fischer_ref,
        Nst_ref,
        Krebs_ref,
        analysis_ref,
        old_ref,
        analyseLoading,
    }
}













export interface IResult {
    fhr_uptime_score: number;
    fhrbaseline_score: number;
    fm_fhrv_score: number;
    fm_score: number;
    zhenfu_lv_score: number;
}
