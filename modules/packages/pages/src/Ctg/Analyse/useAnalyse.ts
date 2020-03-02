
import { useState, useEffect, useMemo, useRef, MutableRefObject } from 'react';
import request from "@lianmed/request";
import { _R } from "@lianmed/utils";
import { Rule } from 'rc-field-form/lib/interface';
import { FormInstance } from 'antd/lib/form';
import { obvuew } from "@lianmed/f_types";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';


export default (v: Suit, docid, fetal: any) => {
    const resultData = useMemo<{ [x: string]: IResponseData }>(() => { return {} }, [])

    const [mark, setMark] = useState(MARKS[0])
    const [activeItem, setActiveItem] = useState<IItem[]>([])
    const [interval, setInterval] = useState(20)
    const [startTime, setStartTime] = useState(0)

    const Fischer_ref = useRef<FormInstance>(null)
    const Krebs_ref = useRef<FormInstance>(null)
    const Nst_ref = useRef<FormInstance>(null)
    const analysis_ref = useRef<FormInstance>(null)

    const fetalKey = `fhr${fetal}`
    const mapFormToMark = {
        Fischer_ref,
        Krebs_ref,
        Nst_ref,
        analysis_ref
    }
    useEffect(() => {
        console.log('zzzz',v)
        const s = (time) => {
            console.log('zzz', time)
            setStartTime(time)
        }
       v && v.on('change:selectPoint', s)
        return () => {
           v && v.off('change:selectPoint', s)

        };
    }, [interval, v])


    useEffect(() => { setMarkAndItems(MARKS[0]) }, [])
    useEffect(() => {
        const keys: string[] = mapItemsToMarks[mark]
        setActiveItem(allItems.filter(_ => keys.includes(_.key)))
        console.log('mark', mark)
    }, [mark])
    useEffect(() => {
        const defaultMark = MARKS[0]
        const keys = mapItemsToMarks[defaultMark]
        const value = resultData[fetalKey] = resultData[fetalKey] || { result: JSON.stringify(_R.zipObj(keys, keys.map(() => null))), mark: defaultMark }
        setMark(value.mark)

    }, [fetalKey])
    const analyse = () => {
        v  && request.post(`/ctg-exams-analyse`, {
            data: { docid, mark, start: startTime, end: startTime + interval * 240, fetal }
        }).then((r: obvuew.ctg_exams_analyse) => {

            const f = r.score[`${mark.toLowerCase()}data`]
            const cur: MutableRefObject<FormInstance> = mapFormToMark[`${mark}_ref`]
            cur &&  cur.current.setFieldsValue(f)

     
            const ucdata = r.analysis.ucdata
            analysis_ref.current.setFieldsValue({...ucdata})
        })
    }

    const setMarkAndItems = (mark: string) => {
        setMark(mark)

    }
    const modifyData = () => {
        resultData[fetalKey] = { ...resultData[fetalKey], result: JSON.stringify({}) }
    }

    return {
        setMark: setMarkAndItems, mark,
        activeItem, responseData: resultData,
        MARKS, analyse, startTime, setStartTime, interval, setInterval, modifyData,
        Fischer_ref,
        Nst_ref,
        Krebs_ref,
        analysis_ref
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

const allItems: IItem[] = [
    { key: 'fhrbaseline_score', label: '基线' },
    { key: 'zhenfu_lv_score', label: '振幅' },
    { key: 'fhr_uptime_score', label: '胎动FHR上升时间' },
    { key: 'fm_fhrv_score', label: '胎动FHR变化' },
    { key: 'fm_score', label: '胎动次数' },
    { key: 'Fischer', label: '分析法' },
    { key: 'zhouqi_lv_score', label: '周期变异' },
    { key: 'acc_score', label: '加速' },
    { key: 'dec_score', label: '减速' },
    { key: 'Krebs', label: '分析法' },
    { key: 'movement_score', label: '胎动' },
].map(_ => ({ ..._, rules: [{ required: true, message: '请输入分数' }] }))

interface IResponseData {
    acc?: string,
    dec?: string,
    baseline?: any,
    meanbaseline?: string,
    mark?: string,
    result: string,
    diagnosis?: any
}
interface IItem {
    key: string;
    label: string;
    rules: Rule[]
}
export interface IResult {
    fhr_uptime_score: number;
    fhrbaseline_score: number;
    fm_fhrv_score: number;
    fm_score: number;
    zhenfu_lv_score: number;
}
