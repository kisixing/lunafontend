import { useEffect, useState } from 'react';

import { event } from '@lianmed/utils'
import request from "@lianmed/request";
import { obvue } from '@lianmed/f_types';


function copyFhr(origin: obvue.ctg_exams_data, single: boolean): obvue.ctg_exams_data {
    const { fhr1, fhr2, fhr3 } = origin
    const data = { ...origin, _fhr1: fhr1, _fhr2: fhr2, _fhr3: fhr3 }
    if (single) {
        data.fhr2 = null
        data.fhr3 = null
    }
    return data
}

export const useCtgData = (docid: string, single = false) => {
    const [fetal, setFetal] = useState<1 | 2 | 3>(1)

    const [loading, setLoading] = useState(false)
    const [ctgData, setCtgData] = useState<obvue.ctg_exams_data>({ fetalnum: '1', docid })

    function fetchData() {
        if (docid) {
            setLoading(true)
            return request.get(`/ctg-exams-data/${docid}`).then(res => {
                if (!res) return
                const d = { docid, keepSelection: true, ...res, ...(copyFhr(res, single)) }
                if (single) {
                    setFhr(1, d)
                } else {
                    setCtgData(d)
                }

            }).finally(() => setLoading(false))

        } else {
            return Promise.resolve()
        }
    }
    useEffect(() => {
        fetchData()
    }, [docid])

    useEffect(() => {
        const fn = data => {
            setCtgData({ ...ctgData, ...data })
        }
        event.on('analysis:setCtgData', fn)
        return () => {
            event.off('analysis:setCtgData', fn)
        }
    }, [ctgData])

    function setFhr(index: 0 | 1 | 2 | 3, from = ctgData) {
        let data: any = {}
        if (index) {
            const { fhr1 } = from
            const key = `fhr${index}`
            const value = from[`_${key}`]
            const emptyData = Array(fhr1 ? fhr1.length : 0).fill(0).join('')
            data = { fhr1: emptyData, fhr2: emptyData, fhr3: emptyData, [key]: value }
        } else {
            Array(Number(from.fetalnum)).fill(0).forEach((_, i) => {
                i = i + 1
                data[`fhr${i}`] = from[`_fhr${i}`]
            })

        }
        setCtgData({ ...from, ...data, noOffset: !!index })
    }
    useEffect(() => {
        setFhr(fetal)
    }, [fetal])
    return { ctgData, loading, setFhr, fetal, setFetal, fetchData };
}

export default useCtgData
