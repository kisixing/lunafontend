
import { useState, useEffect, useMemo } from 'react';
import request from "@lianmed/request";
import { Suit } from '@lianmed/lmg/lib/Ctg/Suit';
import { event, _R } from "@lianmed/utils";
import { WrappedFormUtils } from 'antd/lib/form/Form';

export default (v: { suit: Suit }, docid, fetal: any, form: WrappedFormUtils, cb: (result: IResult) => void) => {
    const resultData = useMemo<{ [x: string]: IResponseData }>(() => { return {} }, [])

    const [mark, setMark] = useState(MARKS[0])
    const [activeItem, setActiveItem] = useState<IItem[]>([])
    const [interval, setInterval] = useState(20)
    const [startTime, setStartTime] = useState(0)


    const fetalKey = `fhr${fetal}`

    useEffect(() => {
        const s = (time) => {
            setStartTime(time)
        }
        v.suit && v.suit
            .on('startTime', s)
        return () => {
            v.suit && v.suit
                .off('startTime', s)

        };
    }, [interval, v])


    useEffect(() => { setMarkAndItems(MARKS[0]) }, [])
    useEffect(() => { analyse() }, [mark])
    useEffect(() => {
        const value = resultData[fetalKey] = resultData[fetalKey] || { result: JSON.stringify(_R.zipObj(activeItem.map(_ => _.key), activeItem.map(() => 0))) }
        form.setFieldsValue(JSON.parse(value.result))
        setMark(value.mark|| MARKS[0])
    }, [fetal, fetalKey])

    const analyse = () => {
        v.suit && v.suit.data && request.post(`/ctg-exams-analyse`, {
            data: { docid, mark, start: startTime, end: startTime + interval * 240, fetal }
        }).then((r: IResponseData) => {

            Object.assign(resultData[fetalKey], r)

            event.emit('analysis:setCtgData', { analyse: resultData[fetalKey] })

            let _result: IResult = null
            try {
                _result = JSON.parse(r.result)
            } catch (error) {
                console.log('parse analysis data error')
            }
            console.log(_result)
            cb(_result)

        })
    }

    const setMarkAndItems = (mark: string) => {
        setMark(mark)
        const keys: string[] = mapItemsToMarks[mark]
        setActiveItem(allItems.filter(_ => keys.includes(_.key)))
    }
    const modifyData = () => {
        resultData[fetalKey] = { ...resultData[fetalKey], result: JSON.stringify(form.getFieldsValue()) }
    }

    return { setMark: setMarkAndItems, mark, activeItem, responseData: resultData, MARKS, analyse, startTime, setStartTime, interval, setInterval, modifyData }
}







const mapItemsToMarks = {
    Nst: [
        'fhrbaseline_score',
        'zhenfu_lv_score',
        'fhr_uptime_score',
        'fm_fhrv_score',
        'fm_score',
    ],
    Fisher: [
        'fhrbaseline_score',
        'zhenfu_lv_score',
        'zhouqi_lv_score',
        'acc_score',
        'dec_score',
    ],
    Kerbs: [
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
].map(_ => ({ ..._, required: true, message: '请输入分数' }))

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
    message: string;
    required: boolean;
}
export interface IResult {
    fhr_uptime_score: number;
    fhrbaseline_score: number;
    fm_fhrv_score: number;
    fm_score: number;
    zhenfu_lv_score: number;
}
