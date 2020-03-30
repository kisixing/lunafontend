
import { useState, useEffect, useMemo, useRef, MutableRefObject } from 'react';
import request from "@lianmed/request";
import { _R } from "@lianmed/utils";
import { FormInstance } from 'antd/lib/form';
import { obvue } from "@lianmed/f_types";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';


export default (v: Suit, docid, fetal: any, setFhr: (index: 2 | 1 | 3) => void) => {
    const resultData = useMemo<{ [x: string]: IResponseData }>(() => { return {} }, [])

    const [mark, setMark] = useState(MARKS[0])
    const [interval, setInterval] = useState(20)
    const [startTime, setStartTime] = useState(0)

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

    const analyse = () => {
        console.log('yyyyyyyyyyyy--------analyse', v)

        v && request.post(`/ctg-exams-analyse`, {
            data: { docid, mark, start: startTime, end: startTime + interval * 240, fetal },
        }).then((r: obvue.ctg_exams_analyse) => {


            const { analysis, score } = r
            const f = score[`${mark.toLowerCase()}data`]
            const cur: MutableRefObject<FormInstance> = mapFormToMark[`${mark}_ref`]
            console.log('yyyyyyyyyyyy--------cur', cur.current)

            cur.current.setFieldsValue(f);
            old_ref.current[mark] = f



            const { stv, ucdata, acc, dec, fhrbaselineMinute, ...others } = analysis
            analysis_ref.current.setFieldsValue({ stv, ...ucdata, ...others })
            v.analyse({
                start: startTime,
                end: startTime + 240 * interval,
                acc,
                dec,
                baseline: fhrbaselineMinute
            })


        })
    }

    useEffect(() => {
        const s = (time) => {
            console.log('change', time, docid)

            time = time + 4800 <= v.data.index ? time : v.data.index - 4800
            docid && setStartTime(time)
        }
        console.log('yyyyyyyyyyyy--------on', v)

        v && v.on('change:selectPoint', s).on('afterInit', analyse)
        return () => {
            console.log('yyyyyyyyyyyy--------off', v)

            v && v.off('change:selectPoint', s).off('afterInit', analyse)

        };
    }, [interval, v, docid, analyse])

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
        responseData: resultData,
        MARKS, analyse, startTime, endTime: startTime + 240 * interval, setStartTime, interval, setInterval,
        Fischer_ref,
        Nst_ref,
        Krebs_ref,
        analysis_ref,
        old_ref,
    }
}








const mapItemsToMarks = {
    Nst: [
        'fhrbaseline_score',
        'zhenfu_lv_score',
        'fhr_uptime_score',
        'fm_fhrv_score',
        'fm_score',
    ],
    Fischer: [
        'fhrbaseline_score',
        'zhenfu_lv_score',
        'zhouqi_lv_score',
        'acc_score',
        'dec_score',
    ],
    Krebs: [
        'fhrbaseline_score',
        'zhenfu_lv_score',
        'zhouqi_lv_score',
        'acc_score',
        'dec_score',
        'movement_score',
    ]
}
const MARKS = Object.keys(mapItemsToMarks)



interface IResponseData {
    acc?: string,
    dec?: string,
    baseline?: any,
    meanbaseline?: string,
    mark?: string,
    result: string,
    diagnosis?: any
}

export interface IResult {
    fhr_uptime_score: number;
    fhrbaseline_score: number;
    fm_fhrv_score: number;
    fm_score: number;
    zhenfu_lv_score: number;
}
